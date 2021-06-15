const Mutation = {
  async insertPeople(parent, { data }, { db }, info) {
	  try{
		  const collections = db.people;
		  data.map((insert) => {
			  let index =  collections.findIndex((person) => {
				  return person.ssn === insert.ssn;
			  });
			  // console.log(index);
			  if (index >= 0){
				  collections.splice(index, 1, insert);
			  }
			  else{
				  collections.push(insert);
			  }
		  });
		  return true;
	  }
	  catch(e){
		  console.log(e);
		  return false;
	  }
  },
};

export { Mutation as default };
