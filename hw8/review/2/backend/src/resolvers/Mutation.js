const checkUser = async (db,username,string)=>{
  if(string === "createChatBox")
    return db.UserModel.findOne({name:username})
};
const getUser = async (db,username)=>{
  const existing = await db.UserModel.findOne({ name:username });
  if (existing) return existing;
  return new db.UserModel({ name:username }).save();

  
};
const getChatBox = async (db,usernames)=>{
  let chatName = usernames[0].name <= usernames[1].name ? `${usernames[0].name}_${usernames[1].name}`: `${usernames[1].name}_${usernames[0].name}`
  let ChatBox = await db.ChatBoxModel.findOne({ name:chatName });
  const ObjectId = require('mongodb').ObjectID;
  const user1_idObject = ObjectId(usernames[0].id)
  const user2_idObject = ObjectId(usernames[1].id)
  //console.log(typeof(user1_idObject))
  if(!ChatBox)  {
    ChatBox = await new db.ChatBoxModel({
      name: chatName,
      users: [user1_idObject,user2_idObject] ,
    }).save()
   

  }
  else{
    //console.log("Already")
  }
  
  return ChatBox
    .populate('users') //用 foreign key的話要記得 populate
    .populate({ path: 'messages', populate: 'sender' })
    .execPopulate(); // 執行 populate 這件事情
}  
const Mutation = {
    async createChatBox(parent, { name1, name2 },
                                { db, pubsub }, info)
    {
      if (!name1 || !name2)
        throw new Error
        ("Missing chatBox name for CreateChatBox");
      if (!(await checkUser(db, name1, "createChatBox"))) {
        console.log
        ("User does not exist for CreateChatBox: " + name1);
      }
      if (!(await checkUser(db, name2, "createChatBox"))) {
        console.log
        ("User does not exist for CreateChatBox: " + name2);
      }

      const  user1 = await  getUser(db, name1);
      const  user2 = await  getUser(db, name2);
      //const user1 = db.UserModel.findById(user1_id)
      //const user2 = db.UserModel.findById(user2_id)
      //console.log(user1)
      const chat =  getChatBox(db,[user1,user2])
      return chat
     
    },

    async createMessage(parent, { name1, name2, body },
                                { db, pubsub }, info)
      {
        let chatName = name1 <= name2 ? `${name1}_${name2}`: `${name2}_${name1}`
        let ChatBox = await db.ChatBoxModel.findOne({name:chatName})
        let senderName = await db.UserModel.findOne({name:name1})
        const newMessage = await  new db.MessageModel({sender:senderName,body:body}).save()
        ChatBox.messages.push(newMessage)
        await ChatBox.save()

        pubsub.publish(`message ${chatName}`, {
          message: {
            mutation: 'CREATED',
            data: newMessage,
          }
        })
        return newMessage



      }
}
  export default Mutation ;