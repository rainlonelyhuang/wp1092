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

  async postList(parent, {Page}, { db }, info) {
    let perPage = 5
    let skipNum = Page * perPage
    //console.log("1",Page,await db.PostModel.findOne())     
    let posts = await db.PostModel.find().limit(perPage).skip(skipNum);
    //console.log("posts",posts)
    return posts
  },

  async commentList(parent, {Page,postID}, { db }, info) {
    let perPage = 5
    let skipNum = Page * perPage

    let post = await db.PostModel.findOne({_id:ObjectId(postID)});
    console.log("post",post,perPage,skipNum)
    let commentsIDs = await post.comments.slice(skipNum,skipNum + perPage)
    let comments = await commentsIDs.map(async(id) => {
      return await db.CommentModel.findOne({_id:id})
    })
    console.log("comments",comments);
    console.log("commentsID",commentsIDs);

    return comments
  }

};

export { Query as default };
