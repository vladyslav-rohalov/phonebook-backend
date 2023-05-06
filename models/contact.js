const { Schema, model } = require('mongoose');
const { handleMogooseError } = require('../helpers');
const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().allow('').optional(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
  avatar: Joi.string(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
    },
    avatarURL: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

contactSchema.post('save', handleMogooseError);

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};
