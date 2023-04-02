// create a function to store images to google drive returning public url of the image
const google = require('googleapis').google;
const { googleDriveConfig } = require('../config/googleDriveConfig.js');
const { logger } = require('../utils/logger.js');

const { client_id, client_secret, redirect_uris, token } = googleDriveConfig;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
);

oAuth2Client.setCredentials(token);

const drive = google.drive({
  version: 'v3',
  auth: oAuth2Client,
});

const uploadImage = async (image) => {
  console.log("Abhi tak yahan nhi aya")

  logger.info('Google Drive - Upload Image')
  try {
    const fileMetadata = {
      name: image.name,
      parents: ['1Yf7Jn5p5c5j5J5w5K5J5L5M5N5O5P5Q5R5S5T5U5V5W5X5Y5Z5a5b5c5d5e5f5g5h5i5j5k5l5m5n5o5p5q5r5s5t5u5v5w5x5y5z5A5B5C5D5E5F5G5H5I5J5K5L5M5N5O5P5Q5R5S5T5U5V5W5X5Y5Z5a5b5c5d5e5f5g5h5i5j5k5l5m5n5o5p5q5r5s5t5u5v5w5x5y5z5A5B5C5D5E5F5G5H5I5J5K5L5M5N5O5P5Q5R5S5T5U5V5W5X5Y5Z5a5b5c5d5e5f5g5h5i5j5k5l5m5n5o5p5q5r5s5t5u5v5w5x5y5z5A5B5C5D5E5F5G5H5I5J5K5L5M5N5O5P5Q5R5S5T5U5V5W5X5Y5Z5a5b5c5d5e5f5g5h5i5j5k5l5m5n5o5p5q5r5s5t5u5v5w5x5y5z5A5B5C5D5E5F5G5H5I5J5K5L5M5N5O5P5Q5R5S5T5U5V5W5X5Y5Z5a5b5c5d5e5f5g']
    };
    const media = {
      mimeType: image.mimetype,
      body: image.data,
    };
    logger.info('Google Drive - Upload Image - Create File')
    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });
    logger.info('Google Drive - Upload Image - Create File - Success')
    const fileId = file.data.id;
    const publicUrl = `https://drive.google.com/uc?id=${fileId}`;
    return publicUrl;
  } catch (error) {
    logger.error(error);
  }
};


module.exports = { uploadImage };