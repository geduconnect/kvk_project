import multer from "multer";
import path from "path";

// Storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder where images go
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
    );
  },
});

// File filter (only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter,
});

export default upload;
