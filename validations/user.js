const Joi = require('joi');
const userJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string(),
  role: Joi.string().valid('user', 'admin').default('user'),
  tenantId: Joi.string(),
  address: Joi.string(),
  password: Joi.string().required(),
  userStrength: Joi.number().default(0),
  planId: Joi.string().required(),
  status: Joi.string().valid('active', 'inactive', 'pending').default('active'),
  metaData: Joi.object().default({})
});
const userUpdateJoiSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string(),
  role: Joi.string().valid('user', 'admin'),
  tenantId: Joi.string(),
  address: Joi.string(),
  password: Joi.string().optional(),
  userStrength: Joi.number(),
  planId: Joi.string().optional(),
  status: Joi.string().valid('active', 'inactive', 'pending'),
  metaData: Joi.object()
});

  module.exports = {userJoiSchema,userUpdateJoiSchema};
