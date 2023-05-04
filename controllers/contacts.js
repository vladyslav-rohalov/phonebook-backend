const { faker } = require('@faker-js/faker');
const { HttpError, ctrlWrapper } = require('../helpers');
const { s3UploadV2, s3DeleteV2 } = require('../helpers/s3service');
const { Contact } = require('../models/contact');

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
  const newContact = await Contact.create({ ...req.body, owner });
  let result = null;

  if (req.file) {
    const file = req.file;
    const avatarURL = await s3UploadV2(file);
    result = await Contact.findByIdAndUpdate(newContact._id, {
      avatarURL: avatarURL.Location,
    });
  } else {
    const avatarURL = faker.image.avatar();
    result = await Contact.findByIdAndUpdate(newContact._id, { avatarURL });
  }
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  console.log(req.body);
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

const deleteById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  const avatarURL = contact.avatarURL;
  if (avatarURL.includes('https://phonebook-storage')) {
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
