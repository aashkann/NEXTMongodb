import mongoose, { Schema } from "mongoose";

const CakeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  hint: { type: String, required: true },
}, { timestamps: true });

const Cake = mongoose.models.Cake || mongoose.model("Cake", CakeSchema);

export default Cake;
