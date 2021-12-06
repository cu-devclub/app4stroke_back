import mongoose from 'mongoose';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  permissions: string;
  organization?: string;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    required: true,
  },
  permissions: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Custom validation for email
userSchema.path('email').validate((val: any) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, 'Invalid e-mail.');

export default mongoose.model('User', userSchema);
