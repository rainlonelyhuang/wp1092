const Point = {
  async users(parent, args, { db }, info) {
    return Promise.all(
    parent.users.map((mId) =>
      db.UserModel.findById(mId)),
    );
  },

  async id(parent, args, { db }, info) {
    //console.log("parent id =",parent._id)
    return parent._id;
  },

};

export { Point as default };