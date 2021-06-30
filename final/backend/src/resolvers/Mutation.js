import uuidv4 from 'uuid/v4';
import { checkUser, makeName, newUser } from '../utils'

const Mutation = {
  async createChatBox(parent, { name1, name2 },
                              { db, pubsub }, info)
  {
    if (!name1 || !name2)
      throw new Error
      ("Missing chatBox name for CreateChatBox");
    if (!(await checkUser(db, name1))) {
      console.log
      ("User does not exist for CreateChatBox: " + name1);
      await newUser(db, name1);
    }
	const name = makeName(name1, name2);
	let box = await db.ChatBoxModel.findOne({ name });
	if (!box){
		box = new db.ChatBoxModel({ name, messages: [] });
		await box.save();
	}
	return box;
  },
  
  async createMessage(parent, { from, to, body }, { db, pubsub }, info){
	  if (!from || !to || !body){
		  throw new Error
          ("Invalid Message");
	  }
	  const name = makeName(from, to);
	  let box = await db.ChatBoxModel.findOne({ name });
	  if (!box){
		  throw new Error
          ("ChatBox does not exist: " + name);
	  }
	  let msg = new db.MessageModel({ name: from, body });
	  msg = await msg.save();
	  await db.ChatBoxModel.updateOne({ name }, { $push: { messages: msg } });
	  pubsub.publish(`message ${name}`, {
      message: {
        data: msg,
      },
    });
	  return msg;
  }

};

export { Mutation as default };
