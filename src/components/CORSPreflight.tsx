import { Paper, Typography, Chip } from '@mui/material';
import { CORS_HEADERS } from '../utils/corsUtils';

export default function CORSPreflight() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>Preflight Explained</Typography>
      <Typography variant="body2" color="text.secondary" className="mb-4">
        Before sending a cross-origin request, browsers send a preflight OPTIONS request to check if the actual request is safe.
      </Typography>

      <Paper variant="outlined" className="p-4 mb-4">
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }} gutterBottom>Preflight Flow</Typography>
        <pre className="text-xs font-mono bg-gray-100 p-3 rounded whitespace-pre-wrap">
{`1. Browser → Server:  OPTIONS /api/data HTTP/1.1
   Origin: https://mysite.com
   Access-Control-Request-Method: POST
   Access-Control-Request-Headers: Content-Type

2. Server → Browser:  HTTP/1.1 204 No Content
   Access-Control-Allow-Origin: https://mysite.com
   Access-Control-Allow-Methods: GET, POST, PUT
   Access-Control-Allow-Headers: Content-Type
   Access-Control-Max-Age: 86400

3. Browser → Server:  POST /api/data  (actual request)
   Content-Type: application/json
   {"key": "value"}`}
        </pre>
      </Paper>

      <Paper variant="outlined" className="p-4">
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }} gutterBottom>CORS Headers Reference</Typography>
        <div className="space-y-2">
          {CORS_HEADERS.map((h, i) => (
            <div key={i} className="flex items-start gap-2 p-2 border-b border-gray-100 last:border-0">
              <Chip label={h.header} size="small" color="primary" variant="outlined" className="font-mono shrink-0" />
              <Typography variant="body2" className="text-sm">{h.desc}</Typography>
            </div>
          ))}
        </div>
      </Paper>
    </div>
  );
}
