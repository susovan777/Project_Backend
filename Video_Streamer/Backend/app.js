import cors from 'cors';
import path from 'path';
import multer from 'multer';
import express from 'express';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('./uploads', express.static('uploads'));

// Multer Middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },

  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  },
});

// Multer Confifuration
const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
  res.json('👋 Hello, from server');
});

app.post('/upload', upload.single('file'), (req, res) => {
  console.log('File uploaded successfully!');

  res.status(200).json({ message: 'File uploaded successfully!' });
});

export default app;
