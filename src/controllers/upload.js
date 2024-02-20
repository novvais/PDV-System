const { s3 } = require("../connection/aws");
const storage = require("../storage");

const file = async (req, res) => {
  const { file } = req;

  try {
    const arquivos = await storage.upload(
      `imagens/${file.originalname}`,
      file.buffer,
      file.mimetype
    );

    return res.status(201).json(arquivos);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  file,
};
