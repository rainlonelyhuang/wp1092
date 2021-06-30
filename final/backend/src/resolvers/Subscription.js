const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

const Subscription = {
  message: {
    async subscribe(parent, { name1, name2 }, { db, pubsub }, info) {
      if (!name1 || !name2) { 
        throw new Error("Missing name for subscription");
      }

      const chatBoxName = makeName(name1, name2);
      const chatBox = await db.ChatBoxModel.findOne({name: chatBoxName});
      if (!chatBox) { 
        throw new Error(`ChatBox does not exist for subscription: ${chatBoxId}`);
      }
      return pubsub.asyncIterator(`chatBox ${chatBoxName}`);
    }
  },
//   comment: {
//     subscribe(parent, { postId }, { db, pubsub }, info) {
//       const post = db.posts.find(
//         (post) => post.id === postId && post.published,
//       );
// 
//       if (!post) {
//         throw new Error('Post not found');
//       }
// 
//       return pubsub.asyncIterator(`comment ${postId}`);
//     },
//   },
//   post: {
//     subscribe(parent, args, { pubsub }, info) {
//       return pubsub.asyncIterator('post');
//     },
//   },
};

export { Subscription as default };
