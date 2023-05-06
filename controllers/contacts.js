const { faker } = require('@faker-js/faker');
const {
  HttpError,
  ctrlWrapper,
  s3UploadV2,
  s3DeleteV2,
} = require('../helpers');
const { Contact } = require('../models/contact');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner }, '-createdAt -updatedAt');
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
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
  const contact = await Contact.findOne({ phone, owner });

  if (contact) {
    throw HttpError(409, 'Phone in use');
  }
  const newContact = await Contact.create({ ...req.body, owner });
  let avatarURL = '';
  if (req.file) {
    const file = req.file;
    avatarURL = (await s3UploadV2(file)).Location;
  } else {
    avatarURL = faker.image.avatar();
  }
  const result = await Contact.findByIdAndUpdate(newContact._id, { avatarURL });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findById(id);

  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  let avatarURL = contact.avatarURL;
  if (avatarURL.includes('https://phonebook-storage') && req.file) {
    const fileName = avatarURL.substring(64);
    s3DeleteV2(fileName);
  }
  if (req.file) {
    const file = req.file;
    avatarURL = await s3UploadV2(file);
  }
  const result = await Contact.findByIdAndUpdate(
    id,
    { ...req.body, avatarURL: avatarURL.Location },
    { new: true }
  );

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

const deleteById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  const avatarURL = contact.avatarURL;
  if (
    avatarURL !== 'undefined' &&
    avatarURL.includes('https://phonebook-storage')
  ) {
    const fileName = avatarURL.substring(64);
    s3DeleteV2(fileName);
  }
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: 'Delete success' });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteById: ctrlWrapper(deleteById),
};
