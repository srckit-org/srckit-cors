export interface CORSTestResult {
  url: string;
  error?: string;
  simpleRequest: {
    status: number;
    statusText: string;
    headers: Record<string,string>;
    corsAllowed: boolean;
  } | null;
  preflight: {
    status: number;
    statusText: string;
    allowOrigin: string;
    allowMethods: string;
    allowHeaders: string;
    maxAge: string;
    exposeHeaders: string;
    allowCredentials: string;
    corsAllowed: boolean;
  } | null;
}

export async function testCORS(url: string): Promise<CORSTestResult> {
  const result: CORSTestResult = { url, simpleRequest: null, preflight: null };
  try {
    // Simple GET
    const simple = await fetch(url, { method: 'GET', mode: 'cors' });
    const sh: Record<string,string> = {};
    simple.headers.forEach((v,k)=>{sh[k]=v});
    result.simpleRequest = {
      status: simple.status,
      statusText: simple.statusText,
      headers: sh,
      corsAllowed: !!sh['access-control-allow-origin'],
    };
  } catch(e) {
    result.error = (e as Error).message;
  }

  try {
    // Preflight OPTIONS
    const pre = await fetch(url, {
      method: 'OPTIONS',
      mode: 'cors',
      headers: {
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type, Authorization',
        'Origin': window.location.origin,
      },
    });
    const ph: Record<string,string> = {};
    pre.headers.forEach((v,k)=>{ph[k]=v});
    result.preflight = {
      status: pre.status,
      statusText: pre.statusText,
      allowOrigin: ph['access-control-allow-origin'] ?? '(not set)',
      allowMethods: ph['access-control-allow-methods'] ?? '(not set)',
      allowHeaders: ph['access-control-allow-headers'] ?? '(not set)',
      maxAge: ph['access-control-max-age'] ?? '(not set)',
      exposeHeaders: ph['access-control-expose-headers'] ?? '(not set)',
      allowCredentials: ph['access-control-allow-credentials'] ?? '(not set)',
      corsAllowed: !!ph['access-control-allow-origin'],
    };
  } catch { /* preflight may fail */ }
  return result;
}

export const CORS_HEADERS = [
  { header: 'Access-Control-Allow-Origin', desc: 'Which origins can access the resource. * means any.' },
  { header: 'Access-Control-Allow-Methods', desc: 'HTTP methods allowed in cross-origin requests.' },
  { header: 'Access-Control-Allow-Headers', desc: 'HTTP headers allowed in cross-origin requests.' },
  { header: 'Access-Control-Allow-Credentials', desc: 'Whether cookies/credentials can be included.' },
  { header: 'Access-Control-Expose-Headers', desc: 'Headers the browser can expose to the client.' },
  { header: 'Access-Control-Max-Age', desc: 'How long (seconds) to cache preflight results.' },
  { header: 'Origin', desc: 'Sent by browser indicating the request origin.' },
  { header: 'Access-Control-Request-Method', desc: 'Sent in preflight to ask which method is allowed.' },
  { header: 'Access-Control-Request-Headers', desc: 'Sent in preflight to ask which headers are allowed.' },
];

export const CORS_EXPLANATIONS = [
  { q: 'What is CORS?', a: 'Cross-Origin Resource Sharing. A browser security mechanism that controls which web pages can request resources from a different domain.' },
  { q: 'Why do I get CORS errors?', a: 'The server you\'re calling doesn\'t include the proper Access-Control-* headers in its response, or the origin doesn\'t match.' },
  { q: 'Simple vs Preflight?', a: 'Simple requests (GET, POST with standard content types) are sent directly. Others trigger a preflight OPTIONS request first.' },
  { q: 'How to fix CORS?', a: 'Add Access-Control-Allow-Origin header on the server. For development, use a proxy or browser extension.' },
  { q: 'CORS vs CSP?', a: 'CORS controls cross-origin reads. CSP (Content-Security-Policy) controls what resources a page can load from any origin.' },
];
