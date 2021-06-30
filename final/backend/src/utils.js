const checkUser = async (db, name) => {
	return await db.UserModel.findOne({ name });
};

const newUser = async (db, name) => {
	const user = new db.UserModel({ name });
	await user.save();
}

const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

export { checkUser, makeName, newUser };