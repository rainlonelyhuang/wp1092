const Subscription = {
  message: {
    async subscribe(parent, { name }, { db, pubsub }, info) {
      const box = await db.ChatBoxModel.findOne({ name });

      if (!box) {
        throw new Error('ChatBox not found');
      }

      return pubsub.asyncIterator(`message ${name}`);
    },
  },
};

export { Subscription as default };
