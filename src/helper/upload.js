// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// });

// // Upload file buffer to Cloudinary
// const uploadFile = async (fileBuffer) => {
//   try {
//     // Upload file directly from buffer
//     const result = await cloudinary.uploader
//       .upload_stream(
//         { resource_type: "auto" }, // Automatically detects the file type (image, video, etc.)
//         (error, result) => {
//           if (error) {
//             console.log(error.message);
//             return;
//           }
//           return result.secure_url;
//         }
//       )
//       .end(fileBuffer); // End the stream with the file buffer
//     console.log(result, "OKAY");
//     return result;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// module.exports = uploadFile;

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Upload file buffer to Cloudinary
const uploadFile = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error.message);
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );
    uploadStream.end(fileBuffer);
  });
};

module.exports = uploadFile;
