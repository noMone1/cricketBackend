const Joi = require('joi');

const createUserSchema = Joi.object({
  title: Joi.string().optional(),
  name: Joi.string().required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  designation: Joi.string().optional(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  wallet: Joi.number().default(0).optional(),
  address: Joi.string().optional(),
  password: Joi.string().optional(),
  status: Joi.string().valid('active', 'inactive', 'pending').default('active'),
  userRefAccount: Joi.string().optional(),
  metaData: Joi.object().default({})
});

const updateUserSchema = Joi.object({
  title: Joi.string().optional(),
  name: Joi.string().optional(),
  gender: Joi.string().valid('male', 'female', 'other').optional(),
  designation: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  wallet: Joi.number().default(0).optional(),
  address: Joi.string().optional(),
  password: Joi.string().optional(),
  status: Joi.string().valid('active', 'inactive', 'pending').optional(),
  metaData: Joi.object().default({})
});


module.exports = {createUserSchema,updateUserSchema};
