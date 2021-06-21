const Query = {
    async chatBox(parent, { name }, { db }, info) {
      if (!name) {
        throw new Error("Missing Name for ");
      }
      const chatBox1 = await db.ChatBoxModel.findOne({ name:name });
      //console.log(chatBox1);
      return chatBox1;
    },
    
  };
  
  export { Query as default };