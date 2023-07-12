const { Schema, model } = require("mongoose");

const PlanSchema = new Schema(
  {
    gamePrice: { type: Number, required: false },
    type: { type: String, required: false,enum:['back','lay'] },
    appliedAmount: { type: String, required: false },
    status: { type: String, default: "active", enum: ["active", "inactive"] },
  },{_id:false}
);
const GameHits = new Schema(
  {
    name: { type: String, required: false },
    id: { type: String, required: false },
    gameData: [PlanSchema],
    totalAmount: { type: Number, required: false },
    userId : {type: Schema.Types.ObjectId, required: true,ref:'TenantUser'},
    userRefAccount:{ type: Schema.Types.ObjectId, ref: "User", required: true },
    gameDate:{type:Date, required: false, default: new Date()}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
const Game = model("GameHits", GameHits);
module.exports = Game;
