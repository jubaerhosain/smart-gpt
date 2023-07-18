// Middleware to handle file upload and set the bookUrl
export const uploadFile = (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          // Handle Multer errors
          return res.status(400).json({ error: 'File upload error' });
        } else if (err) {
          // Handle other errors
          return res.status(500).json({ error: 'Internal server error' });
        }
    
        // Set the bookUrl based on the uploaded file path
        req.body.bookUrl = `https://example.com/files/${req.file.filename}`;
    
        next();
      });
  };