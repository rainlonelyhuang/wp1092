const Point = {
  async users(parent, args, { db }, info) {
    return Promise.all(
    parent.users.map((mId) =>
      db.UserModel.findById(mId)),
    );
  },

};

export { Point as default };