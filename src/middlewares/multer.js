// import multer from "multer";

// const storage = multer.memoryStorage();
// const multerUploads = multer({ storage }).single("image");

// export default multerUploads;
import multer from "multer";
import DatauriParser from "datauri/parser";
import path from "path";
import cloudinary from "cloudinary";

const getFileType = (type) => {
  switch (true) {
    case type.includes("image/"):
      return "image";
    case type.includes("audio/"):
      return "audio";
    case type.includes("video/"):
      return "video";
    default:
      return "file";
  }
};
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("files");
// const dUri = new Datauri();

// const dataUri = (req) => {
//   const { originalname, buffer } = req.file;
//   const processedFile = dUri.format(
//     path.extname(originalname).toString(),
//     buffer
//   );
//   return processedFile;
// };

const uploader = {
  async upload(file) {
    const parser = new DatauriParser();
    const { originalname, buffer, mimetype } = file;
    const processedFile = parser.format(
      path.extname(originalname).toString(),
      buffer
    ).content;

    const uploadedFile = await cloudinary.uploader.upload(
      processedFile,
      {
        resource_type: "auto",
      }
    );
    const fileType = getFileType(mimetype);

    return { uploadedFile, fileType };
  },
  async uploadVideo(file) {
    const parser = new DatauriParser();
    const { originalname, buffer, mimetype } = file;
    const processedFile = parser.format(
      path.extname(originalname).toString(),
      buffer
    ).content;
    const uploadedFile = await cloudinary.uploader.upload(
      processedFile,
      {
        resource_type: "video",
        chunk_size: 6000000,
      }
    );
    const fileType = getFileType(mimetype);

    return { uploadedFile, fileType };
  },
};
export { multerUploads, uploader };
