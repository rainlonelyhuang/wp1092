import mongoose from 'mongoose'

const { Schema } = mongoose;

const userSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  // chatBoxes: [{ type: mongoose.Types.ObjectId, ref: 'ChatBox' }],
});

const postSchema = new Schema({
  title: { type: String, required: true },
  publisher: { type: mongoose.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
  body: { type: String, required: true },
  like: { type: mongoose.Types.ObjectId, ref: "Point" },
  unlike: { type: mongoose.Types.ObjectId, ref: "Point" },
  time: { type: String, required: true },
  id: { type: mongoose.Types.ObjectId, ref: "Post" },
});

const pointSchema = new Schema({
  users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  count: { type: Number, required: true },
  type: {type: Boolean, required: true},
});


const commentSchema = new Schema({
  publisher: { type: mongoose.Types.ObjectId, ref: 'User' },
  body: { type: String, required: true },
  like: { type: mongoose.Types.ObjectId, ref: "Point" },
  unlike: { type: mongoose.Types.ObjectId, ref: "Point" },
  time: { type: String, required: true },
});

const UserModel = mongoose.model('User', userSchema);
const PostModel = mongoose.model('Post', postSchema);
const PointModel = mongoose.model('Point', pointSchema);
const CommentModel = mongoose.model('Comment', commentSchema);


export default {UserModel, PostModel, PointModel, CommentModel};