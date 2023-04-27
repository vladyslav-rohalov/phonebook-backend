const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { HttpError, ctrlWrapper } = require('../helpers');
const { Contact } = require('../models/contact');

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  if (favorite) {
    const result = await Contact.find(
      { owner, favorite },
      '-createdAt -updatedAt',
      {
        skip,
        limit,
      }
    ).populate('owner', 'email');
    res.json(result);
  } else {
    const result = await Contact.find({ owner }, '-createdAt -updatedAt', {
      skip,
      limit,
    }).populate('owner', 'email');
    res.json(result);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id, '-createdAt -updatedAt');
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { phone } = req.body;
  const contact = await Contact.findOne({ phone });
  if (contact) {
    throw HttpError(409, 'Phone in use');
  }
  const avatarURL = gravatar.url();
  const result = await Contact.create({ ...req.body, avatarURL, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(201).json(result);
};

const updateStatusContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, 'missing field favorite');
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const updateAvatar = async (req, res) => {
  const { id } = req.params;
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName);
  await fs.rename(tempUpload, resultUpload);
  Jimp.read(resultUpload, (err, image) => {
    if (err) throw err;
    image.resize(250, 250).write(resultUpload);
  });
  const avatarURL = path.join('avatars', fileName);
  await Contact.findByIdAndUpdate(id, { avatarURL });

  res.json({ avatarURL });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: 'Delete success' });
};

const deleteAll = async (req, res) => {
  const result = await Contact.deleteMany();
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({
    message: `${result.deletedCount} was deleted, now DB - contacts is empty`,
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  updateAvatar: ctrlWrapper(updateAvatar),
  deleteById: ctrlWrapper(deleteById),
  deleteAll: ctrlWrapper(deleteAll),
};
