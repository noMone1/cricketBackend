const { date } = require("joi");
const { Schema, model } = require("mongoose");

const companyEmployee = new Schema(
  {
    title: { type: String, required: false },
    name: { type: String, required: false },
    gender: { type: String, required: true,enum:["male","female","other"] },
    dateOfJoining:{type:Date, required: false, default: new Date()},
    designation:{type:String, required:false},
    email: { type: String, required: true,unique: true },
    phone: { type: String, required:false },
    wallet: { type: Number, default: 0, required: false},
    address: { type: String },
    password: { type: String, required: false },
    status: { type: String,default: "active", enum: ["active", "inactive","pending"] },
    userRefAccount:{ type: Schema.Types.ObjectId, ref: "User", required: true },
    metaData:{type:Object, default:{}},
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
companyEmployee.index({ employee_id: 1,userRefAccount:1 }, { unique: true });

const User = model("TenantUser", companyEmployee);
module.exports = User;
