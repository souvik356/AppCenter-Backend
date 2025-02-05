import fs from 'fs';
import path from 'path';

const uploadFileLocal = (file) => {
  return new Promise((resolve, reject) => {
    // Define the upload directory
    const uploadDir = path.join(process.cwd(), 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.originalname);

    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(filePath);
      }
    });
  });
};

export default uploadFileLocal;