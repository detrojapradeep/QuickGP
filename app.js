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
const __dirname = dirname(__filename);

// Middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/appointmentForm', (req, res) => {
  console.log("Received POST request at /appointmentForm");

  const formData = req.body;
  const filePath = path.join(__dirname, 'appointments.txt');

  const dataToWrite = `${formData.hospitalName},${formData.doctorName},${formData.date},${formData.startTimeSlot}\n`;

  fs.stat(filePath, (err, stats) => {
    const header = 'Hospital,Doctor,Date,TimeSlot\n';
    if (err && err.code === 'ENOENT') {

      // File does not exist, create file with column names and append data
      fs.writeFile(filePath, header + dataToWrite, (err) => {
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
    } else if (stats.size === 0) {
      // File exists but is empty, write column names and append data
      fs.writeFile(filePath, header + dataToWrite, (err) => {
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
    } else {
      // File exists and is not empty, append data
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
    }
  });
});

app.get('/appointments', (req, res) => {
  const filePath = path.join(__dirname, 'appointments.txt');

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error("Error reading file", err);
      res.status(500).send("Internal Server Error");
    } else {
      const appointments = data.trim().split('\n').slice(1).map(line => {
        const [hospitalName, doctorName, date, startTimeSlot] = line.split(',');
        return { hospitalName, doctorName, date, startTimeSlot };
      });
      res.json(appointments);
    }
  });
});

app.listen(port, () => {
  console.log('Server running on port', port);
});
