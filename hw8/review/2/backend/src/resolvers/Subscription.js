const Subscription = {
    message: {
      subscribe(parent, { chatBoxName }, { db, pubsub }, info){
        let box = db.ChatBoxModel.findOne({name :chatBoxName});
  
        if (!box){
          throw new Error('Chatbox not found!');
        }
        console.log("CALLED SUB")
        return pubsub.asyncIterator(`message ${chatBoxName}`);
      },
    },
  }
  
  export default Subscription;