const { s3 } = require("./connection/aws");

const upload = async (patch, buffer, mimetype) => {
  const arquivo = await s3
    .upload({
      Bucket: process.env.BUCKET,
      Key: patch,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise();

  return {
    url: arquivo.Location,
    path: arquivo.Key,
  };
};

module.exports = {
  upload,
};
