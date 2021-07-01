import uuidv4 from 'uuid/v4';
var ObjectId = require('mongodb').ObjectId; 


const checkUser = async (db, id) => {
  const existing = await db.UserModel.findOne({ id });
  return existing;
};


const Mutation = {

  async newUser(parent, {id, name, password}, { db, pubsub }, info) {
    let existing = await checkUser(db, id);
//    console.log("existing=",existing)
    if (!existing) {
      console.log("user not exit, register success:" + name + id + password)
      return (await new db.UserModel({id: id, name: name, password: password}).save());
    }
    console.log("user exist, cannot new: " + name + id + password);
    return existing;
  },

  async modifyUser(parent, {id, name, password}, { db, pubsub }, info) {
    let existing = await checkUser(db, id);
    if (existing) {
      console.log("user exit, update success" + name + id + password)
      let user = await db.UserModel.findOneAndUpdate({id:id},{id: id, name: name, password: password})
      console.log("newUser=",user)
      return user
      return (await new db.UserModel({id: id, name: name, password: password}).save());
    }
    console.log("user not exist, cannot modify");
    return existing
  },


  async newPost(parent, {title, publisherID, body, time}, { db, pubsub }, info) {
    ///////////////////////cannot return with like,unlike,comment
    let publisher = await checkUser(db,publisherID);
    if(!publisher){
      console.log("publisher not exist")
      return publisher
    }

    if (title && publisher && body && time) {
      console.log("newPost success")

      let like_p = await new db.PointModel({users:[],count:0,type:true}).save()
      let unlike_p = await new db.PointModel({users:[],count:0,type:false}).save()

      console.log("like_p",like_p)
      let post = await new db.PostModel({title:title, publisher:publisher, body:body, time:time, like:like_p, unlike:unlike_p, comments:[]}).save()
      console.log("post",post)
      return post;
    }
    console.log("missing input data");
    return null;
  },


  async newComment(parent, {publisherID, body, time, parentPostID}, { db, pubsub }, info) {

    let publisher = await checkUser(db,publisherID);
    let like_p = await new db.PointModel({users:[],count:0,type:true}).save()
    let unlike_p = await new db.PointModel({users:[],count:0,type:false}).save()

    let comment = await new db.CommentModel({publisher:publisher, body:body, time:time, like:like_p, unlike:unlike_p}).save()

    console.log(parentPostID)
    let old_post = await db.PostModel.findOne({_id:ObjectId(parentPostID)});
    let old_comments = old_post.comments
    console.log("pre post",old_post,old_comments)
    let new_post = await db.PostModel.findOneAndUpdate({_id:parentPostID},{time:time, comments:[...old_comments,comment._id]})
    console.log("changed post",new_post)
        console.log("comment",comment)
    return comment;
  },

  async deletePost(parent, {postID}, { db, pubsub }, info){
    let post = await db.PostModel.findOne({_id:ObjectId(postID)})
    await db.PointModel.deleteOne({_id:ObjectId(post.like)});
    await db.PointModel.deleteOne({_id:ObjectId(post.unlike)});
    let comments = post.comments
    for(let i = 0 ; i < comments.length; i++){
      let cmt = await db.CommentModel.findOne({_id:ObjectId(comments[i])});
      await db.PointModel.deleteOne({_id:ObjectId(cmt.like)});
      await db.PointModel.deleteOne({_id:ObjectId(cmt.unlike)});

      await db.CommentModel.deleteOne({_id:ObjectId(comments[i])});
    }
    await db.PostModel.deleteOne({_id:ObjectId(postID)});
    return true;
  },

  async doLike(parent, {userID, pointID}, { db, pubsub }, info){
    let point= await db.PointModel.findOne({_id:ObjectId(pointID)})
    //console.log("find point",point)
    let users = point.users
    let count = point.count
    let index = await users.indexOf(userID)
    //console.log("users",users,"count",count,"idnex",index)
    if(index >= 0){
      console.log("cancel ")
      await users.splice(index,1)
      //console.log("user now is",users)
      let point = await db.PointModel.findOneAndUpdate({_id:ObjectId(pointID)},{count:count-1, users: users})
      return point;
    }
    else{
      console.log("add ");
      await users.push(userID);
      let point = await db.PointModel.findOneAndUpdate({_id:ObjectId(pointID)},{count:count+1, users: users})
      return point;
    }
  },



};

export { Mutation as default };
