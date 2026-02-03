// Production configuration
const config = {
  // Security settings
  jwt: {
    expiresIn: '7d',
    algorithm: 'HS256'
  },
  
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },
  
  // Auth rate limiting (stricter)
  authRateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5 // limit each IP to 5 auth requests per windowMs
  },
  
  // Cache settings
  cache: {
    ttl: {
      products: 300000, // 5 minutes
      productDetails: 600000, // 10 minutes
      dashboardStats: 600000, // 10 minutes
      recentActivity: 300000 // 5 minutes
    }
  },
  
  // File upload settings
  upload: {
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 10,
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
  },
  
  // Email settings
  email: {
    from: '"meen Parfum" <noreply@meenparfum.com>',
    templates: {
      orderConfirmation: 'order-confirmation',
      welcome: 'welcome',
      passwordReset: 'password-reset'
    }
  },
  
  // Monitoring settings
  monitoring: {
    logLevel: 'info',
    logToFile: true,
    logRotation: {
      maxSize: '50m',
      maxFiles: 10
    }
  }
};

export default config;