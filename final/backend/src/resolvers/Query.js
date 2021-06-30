const makeName = (name, to) => {
  return [name, to].sort().join('_');
};


const Query = {
  async chatBox(parent, {name1, name2}, { db }, info) {
    if (!name1 || !name2) {
      throw new Error("Missing chatBox name for createChatBox");
    }
    const chatBoxName = makeName(name1, name2);
    const chatBox = await db.ChatBoxModel.findOne({name: chatBoxName});
    if (!chatBox) { 
      throw new Error(`ChatBox does not exist for subscription: ${chatBoxId}`);
    }
    return chatBox;
  },
};

export { Query as default };
