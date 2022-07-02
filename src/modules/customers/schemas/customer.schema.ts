import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: String,
  age: Number,
  orders: [{ id: String, amount: Number }],
  photoFile: String,
});
