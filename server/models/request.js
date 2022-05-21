import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const requestSchema = new Schema({
  ip: String,
  request: String,
  userAgent: String,//navigator.userAgent
  referer: String
});

const RequestModel = model('requests', requestSchema);
export default RequestModel;

// const jokeSchema = new Schema({
//   title: String,
//   desc: String,
//   image: String,
//   cite: String,
//   date: String
// });