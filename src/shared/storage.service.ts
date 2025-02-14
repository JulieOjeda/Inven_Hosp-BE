import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "storage/"); // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
      cb(null, uniqueName); // Renombrar archivo para evitar duplicados
    },
});

const storageService = multer({storage})
export default storageService;