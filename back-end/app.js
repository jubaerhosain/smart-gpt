import express from 'express';
import dotenv from 'dotenv';
import router from './routes/router.js'
import { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config/db.js';
import path from 'path';
import { getDirectoryName } from './utils/getDirectoryName.js';
//mport { config } from './config';

import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
dotenv.config();

const app = express();

//middleware
app.use(json());
app.use(cors());
app.use(express.static(path.join(getDirectoryName(import.meta.url), 'public')));

app.use('/api/v1', router);

app.post('/api/v1/upload-file', upload.single('file'), (req, res) => {
  // Access the uploaded file details
  const file = req.file;

  // Process the uploaded file as needed
  // For example, you can save it to a specific location
  // using the `fs` module
  const filePath = file.path; // Path to the temporarily saved file

  // Move the file to the desired destination
  const destination = '/public/filename.pdf';
  fs.renameSync(filePath, destination);

  // Respond with a success message
  res.json({ message: 'File uploaded and saved successfully' });
});

app.all("*", (req, res) => {
    res.send(`The requested url ${req.originalUrl} dosn't exist`);
})

//connect to mongodb server
async function connectToMongoDB() {
  try {
    await mongoose.connect(config.mongodb.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
connectToMongoDB();


app.listen(process.env.PORT, () => {
  console.log('Server app listening on port ' + process.env.PORT);
});