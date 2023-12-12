import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // const uploadPath = path.resolve(__dirname, '../public/images/uploads');
    cb(null, "backend/public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const upload = multer({ storage })

