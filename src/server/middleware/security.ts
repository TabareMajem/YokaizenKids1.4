import helmet from 'helmet';
import { expressCspHeader, SELF, NONE } from 'express-csp-header';

export const securityMiddleware = [
  // Basic security headers
  helmet(),
  
  // Content Security Policy
  expressCspHeader({
    directives: {
      'default-src': [SELF],
      'script-src': [SELF],
      'style-src': [SELF],
      'img-src': [SELF, 'data:', 'https:'],
      'font-src': [SELF],
      'object-src': [NONE],
      'connect-src': [SELF, 'https://api.stripe.com']
    }
  }),
  
  // Additional security headers
  (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  }
];