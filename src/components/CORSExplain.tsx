import { Paper, Typography } from '@mui/material';
import { CORS_EXPLANATIONS } from '../utils/corsUtils';

export default function CORSExplain() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>CORS Explained</Typography>
      <Typography variant="body2" color="text.secondary" className="mb-4">
        Common questions about Cross-Origin Resource Sharing.
      </Typography>
      <div className="space-y-3">
        {CORS_EXPLANATIONS.map((item, i) => (
          <Paper key={i} variant="outlined" className="p-4">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }} gutterBottom color="primary">
              {item.q}
            </Typography>
            <Typography variant="body2">{item.a}</Typography>
          </Paper>
        ))}
      </div>
    </div>
  );
}
