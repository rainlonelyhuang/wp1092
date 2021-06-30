var ObjectId = require('mongodb').ObjectId; 

const makeName = (name, to) => {
  return [name, to].sort().join('_');
};


const Query = {
  async user(parent, {id}, { db }, info) {
    if (!id) {
      throw new Error("Missing id");
    }
    const user = await db.UserModel.findOne({id: id});
    if (!user) { 
      console.log("user not exit")
    }
    return user;
  },

  async post(parent, {id}, { db }, info) {
    if (!id) {
      throw new Error("Missing id");
    }
    const post = await db.PostModel.findOne({_id:ObjectId(id)});
    console.log("post",post)
    if (!post) { 
      console.log("post not exit")
    }
    return post;
  },

  async comment(parent, {id}, { db }, info) {
    if (!id) {
      throw new Error("Missing id");
    }
    const comment = await db.CommentModel.findOne({_id:ObjectId(id)});
    if (!comment) { 
      console.log("comment not exit")
    }
    return comment;
  },

  async point(parent, {id}, { db }, info) {
    if (!id) {
      throw new Error("Missing id");
    }
    const point = await db.PointModel.findOne({_id:ObjectId(id)});
    if (!point) { 
      console.log("point not exit")
    }
    return point;
  },

  //async postlist

};

export { Query as default };
