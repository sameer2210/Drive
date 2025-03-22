const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

// Upload file buffer to Cloudinary
const uploadFile = async (fileBuffer) => {
    try {
        // Upload file directly from buffer
        const result = await cloudinary.uploader.upload_stream(
            { resource_type: 'auto' }, // Automatically detects the file type (image, video, etc.)
            (error, result) => {
                if (error) {
                    console.log(error.message);
                    return;
                }
                console.log(result);
            }
        ).end(fileBuffer); // End the stream with the file buffer
        return result;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = uploadFile;
