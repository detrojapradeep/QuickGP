import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'; 

const app = express();
const port = process.env.PORT || 5500;

// Get the __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(__filename);

// Middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(_dirname, 'index.html'));
});

app.use(express.static(path.join(_dirname, 'public')));

app.post('/appointmentForm', (req, res) => {
  console.log("Received POST request at /appointmentForm");
  
  const formData = req.body;
  const filePath = path.join(_dirname, 'appointments.txt');
  
  const dataToWrite = `Hospital: ${formData.hospitalName}, Doctor: ${formData.doctorName}, Date: ${formData.date}, Time Slot: ${formData.startTimeSlot}\n`;
  
  fs.appendFile(filePath, dataToWrite, (err) => {
    if (err) {
      console.error("Error writing to file", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(`
        <script>
          window.location.href = "/";
          alert("Appointment Added successfully!");
        </script>
      `);
    }
  });
});

app.listen(port, () => {
  console.log('Server running on port', port);
});