import app from './App.js';

const port = 3000;
app.listen(port, () => {
  console.log(`Listening request from port ${port}`);
  console.log(`Click here: http://localhost:${port}`);
});