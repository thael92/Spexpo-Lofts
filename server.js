import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// CORS configuration (allow requests from frontend)
app.use(cors());
app.use(express.static('public')); // Serve static files from public

// Ensure directory exists
const uploadDir = path.join(__dirname, 'public', 'imglofts');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Count files to determine next number
        fs.readdir(uploadDir, (err, files) => {
            if (err) {
                console.error("Error reading dir", err);
                return cb(err, '');
            }

            // Filter only image files to be safe or just count all
            const count = files.length + 1;
            const ext = path.extname(file.originalname);
            // Example: loft-image-1.jpg, loft-image-2.jpg
            const name = `loft-image-${Date.now()}-${count}${ext}`;
            cb(null, name);
        });
    }
});

const upload = multer({ storage });

// Upload Endpoint
app.post('/api/upload', upload.array('photos', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    const fileUrls = (req.files as Express.Multer.File[]).map(file => {
        // Return relative path from public root, e.g., /imglofts/filename.jpg
        return `/imglofts/${file.filename}`;
    });

    res.json({ urls: fileUrls });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
