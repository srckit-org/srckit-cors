import { useState } from 'react';
import { TextField, Paper, Typography, Button, Chip, CircularProgress, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { testCORS } from '../utils/corsUtils';

export default function CORSTester() {
  const [url, setUrl] = useState('https://httpbin.org/get');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Awaited<ReturnType<typeof testCORS>> | null>(null);

  const handleTest = async () => {
    setLoading(true); setResult(null);
    const r = await testCORS(url);
    setResult(r);
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>CORS Tester</Typography>
      <Typography variant="body2" color="text.secondary" className="mb-4">
        Test any URL for CORS configuration. Sends a simple GET and an OPTIONS preflight from your browser.
      </Typography>
      <div className="flex gap-2 mb-4">
        <TextField value={url} onChange={e => setUrl(e.target.value)} size="small" fullWidth className="font-mono" slotProps={{ htmlInput: { className: 'font-mono text-sm' } }} placeholder="https://api.example.com" />
        <Button variant="contained" startIcon={loading ? <CircularProgress size={16} /> : <SendIcon />} onClick={handleTest} disabled={loading}>{loading ? 'Testing...' : 'Test'}</Button>
      </div>

      {result?.error && <Alert severity="error" className="mb-4">{result.error}</Alert>}

      {result?.simpleRequest && (
        <Paper variant="outlined" className="p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Simple GET Request</Typography>
            <Chip label={result.simpleRequest.status} size="small" color={result.simpleRequest.status < 400 ? 'success' : 'error'} />
            <Chip label={result.simpleRequest.corsAllowed ? 'CORS ✓' : 'CORS ✗'} size="small" color={result.simpleRequest.corsAllowed ? 'success' : 'warning'} />
          </div>
          <div className="text-xs font-mono space-y-0.5 max-h-40 overflow-auto">
            {Object.entries(result.simpleRequest.headers).map(([k,v]) => (
              <div key={k}><span className="text-blue-600">{k}</span>: {v}</div>
            ))}
          </div>
        </Paper>
      )}

      {result?.preflight && (
        <Paper variant="outlined" className="p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Preflight OPTIONS</Typography>
            <Chip label={result.preflight.status} size="small" color={result.preflight.status < 400 ? 'success' : 'error'} />
            <Chip label={result.preflight.corsAllowed ? 'CORS ✓' : 'CORS ✗'} size="small" color={result.preflight.corsAllowed ? 'success' : 'warning'} />
          </div>
          <div className="text-xs font-mono space-y-0.5 max-h-40 overflow-auto">
            {Object.entries(result.preflight).filter(([k]) => k !== 'status' && k !== 'statusText').map(([k,v]) => (
              <div key={k}><span className="text-blue-600">{k}</span>: {String(v)}</div>
            ))}
          </div>
        </Paper>
      )}

      {!result && !loading && (
        <Paper variant="outlined" className="p-8 text-center">
          <Typography color="text.secondary">Enter a URL and click <strong>Test</strong> to check its CORS configuration.</Typography>
        </Paper>
      )}
    </div>
  );
}
