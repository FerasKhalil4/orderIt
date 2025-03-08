import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./public/uploads/images");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, `${Date.now()}_${fileName}`);
  },
});

export const upload = multer({ storage });
