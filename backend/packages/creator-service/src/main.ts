import express from 'express';

const app = express();
const port = process.env.PORT || 3010;

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Creator service listening on ${port}`);
});
