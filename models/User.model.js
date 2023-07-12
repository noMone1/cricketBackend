const { Schema, model } = require("mongoose");

const companySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    role: { type: String, default: "user", enum: ["user", "admin","tenant"] },
    tenantId: { type: String },
    address: { type: String },
    password: { type: String, required: true },
    userStregnth: { type: Number, required: false,default: 0 },
    planId:{ type: Schema.Types.ObjectId, ref: "Plans", required: true },
    status: { type: String,default: "active", enum: ["active", "inactive","pending"] },
    metaData:{type:Object, default:{}},
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
const Company = model("User", companySchema, "user");
module.exports = Company;
