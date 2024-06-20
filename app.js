import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.port || 5500;

// Middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
  
app.post('/appointmentForm', (req, res) => {
  console.log("Received POST request at /appointmentForm");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
