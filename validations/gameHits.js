const Joi = require("joi");

// Define Joi schema for the Plan
const planSchema = Joi.object({
  gamePrice: Joi.number().optional(),
  type: Joi.string().valid('back', 'lay').optional(),
  appliedAmount: Joi.string().optional(),
  status: Joi.string().default("active").valid("active", "inactive").optional(),
});

// Define Joi schema for the GameHits
const gameHitsSchema = Joi.object({
  name: Joi.string().optional(),
  id: Joi.string().optional(),
  gameData: Joi.array().items(planSchema).optional(),
  totalAmount: Joi.number().optional(),
  userId: Joi.string().optional(),
  userRefAccount: Joi.string().optional(),
});

// Validate a GameHits object
function validateGameHits(gameHits) {
  return gameHitsSchema.validate(gameHits);
}

module.exports = {
  validateGameHits,
};
