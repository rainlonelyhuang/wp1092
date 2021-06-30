import uuidv4 from 'uuid/v4';

const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

const checkUser = async (db, name, action) => {
  const existing = await db.UserModel.findOne({ name });
  return existing;
};
const newUser = async (db, name) => {
  await new db.UserModel({ name }).save();
};
const checkChatBox = async (db, name) => {
  const existing = await db.ChatBoxModel.findOne({ name });
  return existing;
};

const Mutation = {
  async createChatBox(parent, {name1, name2}, { db, pubsub }, info) {
    if (!name1 || !name2) {
      throw new Error("Missing chatBox name for createChatBox");
    }
    if (!(await checkUser(db, name1, "createChatBox"))) {
      console.log("User does not exist for createChatBox: " + name1);
      await newUser(db, name1);
    }
    const chatBoxName = makeName(name1, name2);
    let existing = await checkChatBox(db, chatBoxName);
    if (!existing) {
      console.log("ChatBox does not exist for createChatBox: " + chatBoxName);
      return (await new db.ChatBoxModel({name: chatBoxName}).save());
    }
    console.log("ChatBox exist for createChatBox: " + chatBoxName);
    return existing;
  },
  async createMessage(parent, {senderName , chatBoxName, messageBody}, { db, pubsub }, info) {
    if (!senderName || !chatBoxName || !messageBody) {
      throw new Error("Missing argument for createMessage");
    }
    const sender = await checkUser(db, senderName, "createMessage");
    if (!sender) {
      throw new Error("Sender does not exist for createChatBox: " + senderName);
    }

    // const chatBoxName = makeName(senderName, receiverName);
    let chatBox = await checkChatBox(db, chatBoxName);
    if (!chatBox) {
      throw new Error("ChatBox does not exist for createChatBox: " + chatBoxName);
    }
    const newMessage = new db.MessageModel({sender, body: messageBody});
    await newMessage.save();
    chatBox.messages.push(newMessage);
    await chatBox.save();
    console.log(chatBox.name);
    pubsub.publish(`chatBox ${chatBox.name}`, {
      message: newMessage
    });

    return newMessage;
  },
};

export { Mutation as default };
