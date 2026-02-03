// Simple in-memory cache for development
// In production, use Redis or similar
const cache = new Map();

const setCache = (key, value, ttl = 300000) => { // 5 minutes default TTL
  cache.set(key, {
    value,
    expires: Date.now() + ttl
  });
};

const getCache = (key) => {
  const cached = cache.get(key);
  if (!cached) return null;
  
  if (Date.now() > cached.expires) {
    cache.delete(key);
    return null;
  }
  
  return cached.value;
};

const deleteCache = (key) => {
  cache.delete(key);
};

const clearCache = () => {
  cache.clear();
};

// Cache middleware
const cacheMiddleware = (duration = 300000) => {
  return (req, res, next) => {
    const key = '__cache__' + req.originalUrl || req.url;
    const cachedBody = getCache(key);
    
    if (cachedBody) {
      res.send(cachedBody);
      return;
    }
    
    // Override res.send to capture response
    const send = res.send;
    res.send = (body) => {
      setCache(key, body, duration);
      send.call(res, body);
    };
    
    next();
  };
};

export { setCache, getCache, deleteCache, clearCache, cacheMiddleware };