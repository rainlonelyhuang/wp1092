var ObjectId = require('mongodb').ObjectId; 

var Math = require("mathjs")


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
    Page = Page - 1
    let perPage = 5
    let skipNum = Page * perPage
    //console.log("1",Page,await db.PostModel.findOne())     
    let posts = await db.PostModel.find().sort({time:-1}).limit(perPage).skip(skipNum);
    let count = await db.PostModel.count()
    return {posts:posts, pageNum:Math.ceil(count/perPage)}
  },

  async commentList(parent, {Page,postID}, { db }, info) {
    Page = Page - 1
    let perPage = 5
    let skipNum = Page * perPage

    let post = await db.PostModel.findOne({_id:ObjectId(postID)});
    let commentsIDs = await post.comments.slice(skipNum,skipNum + perPage)
    let comments = await commentsIDs.map(async(id) => {
      return await db.CommentModel.findOne({_id:id})
    })

    let count = post.comments.length
    return {comments:comments, pageNum:Math.ceil(count/perPage)}
  }

};

export { Query as default };
