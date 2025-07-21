import time
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import feedparser
import html

app = Flask(__name__)
CORS(app)

COINGECKO_ID = 'ethereum'
VS_CURRENCY = 'usd'
CACHE = {}
CACHE_TTL = 10  # saniye

# Basit cache fonksiyonları
def cache_get(key):
    v = CACHE.get(key)
    if v and v['expire'] > time.time():
        return v['data']
    return None

def cache_set(key, data):
    CACHE[key] = {'data': data, 'expire': time.time() + CACHE_TTL}

@app.route('/api/ethereum-price')
def eth_price():
    cached = cache_get('eth_price')
    if cached:
        return jsonify(cached)
    url = f'https://api.coingecko.com/api/v3/simple/price?ids={COINGECKO_ID}&vs_currencies={VS_CURRENCY}&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true&include_last_updated_at=true'
    r = requests.get(url)
    data = r.json()[COINGECKO_ID]
    result = {
        'price': data['usd'],
        'change_24h': data.get('usd_24h_change'),
        'market_cap': data.get('usd_market_cap'),
        'volume_24h': data.get('usd_24h_vol'),
        'last_updated': data.get('last_updated_at')
    }
    cache_set('eth_price', result)
    return jsonify(result)

@app.route('/api/ethereum-ohlc')
def eth_ohlc():
    interval = request.args.get('interval', '1h')
    limit = int(request.args.get('limit', 100))
    cached = cache_get(f'eth_ohlc_{interval}_{limit}')
    if cached:
        return jsonify(cached)
    # CoinGecko market_chart endpoint
    days_map = {'1m': '1', '5m': '1', '15m': '1', '1h': '1', '1D': '30', '1W': '90'}
    days = days_map.get(interval, '1')
    url = f'https://api.coingecko.com/api/v3/coins/{COINGECKO_ID}/market_chart?vs_currency={VS_CURRENCY}&days={days}'
    r = requests.get(url)
    data = r.json()
    # CoinGecko sadece 1d, 1h, 1m gibi granulariteyi doğrudan desteklemez, frontend'de filtrelenebilir
    ohlc = []
    for i in range(len(data['prices'])):
        ts = data['prices'][i][0]
        price = data['prices'][i][1]
        # OHLC için basit yaklaşım: open=close=price, high=low=price (örnek demo, gerçek OHLC için ek işleme gerek)
        ohlc.append([ts, price, price, price, price])
    cache_set(f'eth_ohlc_{interval}_{limit}', ohlc[-limit:])
    return jsonify(ohlc[-limit:])

@app.route('/api/ethereum-news')
def ethereum_news():
    FEEDS = [
        'https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml&section=ethereum',
        'https://cointelegraph.com/rss/tag/ethereum',
        'https://cryptopanic.com/news/ethereum/rss',
    ]
    for FEED_URL in FEEDS:
        try:
            feed = feedparser.parse(FEED_URL)
            news = []
            for entry in feed.entries[:10]:
                title = html.unescape(entry.title)
                link = entry.link if hasattr(entry, 'link') else ''
                published = html.unescape(getattr(entry, 'published', getattr(entry, 'pubDate', '')))
                news.append({
                    'title': title,
                    'link': link,
                    'published': published
                })
            if news:
                return jsonify({"news": news})
        except Exception:
            continue
    return jsonify({"news": []})

if __name__ == '__main__':
    app.run(debug=True) 