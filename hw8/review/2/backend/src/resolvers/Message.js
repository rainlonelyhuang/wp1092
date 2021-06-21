const Message = {
    async sender(parent, args, { db }, info){
        const user = await db.UserModel.findById(parent.sender)
        return user.name;
    }
  }
  
  export default Message;