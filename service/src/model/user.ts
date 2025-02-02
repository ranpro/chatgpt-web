import { Schema, model } from 'mongoose'

const schema = new Schema({
  phone: {
    required: true,
    type: String,
  },
  token: {
    required: false,
    type: String,
  },
  tokens_count: {
    required: false,
    default: 0,
    type: Number,
  },
  expired_at: {
    required: false,
    type: Date,
  },
  is_admin: {
    required: true,
    type: Boolean,
  },
  password: {
    required: true,
    type: String,
  },
})

const User = model('User', schema)

export default User
