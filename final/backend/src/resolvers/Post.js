const Post = {
  async publisher(parent, args, { db }, info) {
    let user = await db.UserModel.findOne({_id:parent.publisher});
    return user;
  },
  
  async comments(parent, args, { db }, info) {
    return Promise.all(
    parent.comments.map((mId) =>
      db.CommentModel.findById(mId)),
    );
  },

  async like(parent, args, { db }, info) {
    let like = await db.PointModel.findOne({_id:parent.like,type:true});
    console.log("like",like)
    return like;
  },

  async unlike(parent, args, { db }, info) {
    let unlike = await db.PointModel.findOne({_id:parent.unlike,type:false});
    console.log("like",unlike)
    return unlike;
  },
};

export { Post as default };
