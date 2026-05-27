/**
 * Admin Auth Middleware
 * 
 * Protects admin routes with a Bearer token check.
 * Token must match ADMIN_API_TOKEN from environment.
 * 
 * Usage:
 *   router.use(adminAuth);
 *   — or —
 *   router.post('/bulk', adminAuth, handler);
 */

function adminAuth(req, res, next) {
  const token = process.env.ADMIN_API_TOKEN;

  if (!token) {
    console.error('[AdminAuth] ADMIN_API_TOKEN is not set in environment');
    return res.status(500).json({ error: 'Server misconfiguration — admin token not set' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing Authorization header (Bearer <token>)' });
  }

  const provided = authHeader.slice(7); // strip "Bearer "
  if (provided !== token) {
    return res.status(403).json({ error: 'Invalid admin token' });
  }

  next();
}

module.exports = adminAuth;
