import bcrypt from "bcryptjs";

const saltRounds = 10;
const hashPasswd = (passwd) => {
	const hash = bcrypt.hashSync(passwd, saltRounds);
	return hash;
};

const verifyPasswd = (passwd, hashKey) => {
	return bcrypt.compareSync(passwd, hashKey);
}

const getUser = () => {
	return [localStorage.getItem("userID"), localStorage.getItem("userPasswd")];
}

export { hashPasswd, verifyPasswd, getUser };