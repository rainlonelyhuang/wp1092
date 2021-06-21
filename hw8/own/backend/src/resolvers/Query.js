const Query = {
  async chatBox(parent, { name }, { db }, info) {
    return await db.ChatBoxModel.findOne({ name });
  },
  async message(parent, { id }, { db }, info) {
    return await db.MessageModel.findOne({ _id: id });
  },
  async user(parent, { name }, { db }, info) {
    return await db.UserModel.findOne({ name });
  },
};

export { Query as default };
