import bcrypt from "bcryptjs";

const saltRounds = 10;
const hashPasswd = (passwd) => {
	const hash = bcrypt.hashSync(passwd, saltRounds);
	return hash;
};

const verifyPasswd = (passwd, hashKey) => {
	return bcrypt.compareSync(passwd, hashKey);
}

export { hashPasswd, verifyPasswd };