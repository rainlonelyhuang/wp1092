const Query = {
  async statsCount(parent, { severity, locationKeywords }, { db }, info) {
	  try{
		  if(!severity) severity = 0;
		  const collections = db.people;
		  return locationKeywords.map((keyword) => {
			  return collections.filter((person) => {
				  return person.severity >= severity && person.location.description.includes(keyword);
			  }).length;
		  })
	  }
	  catch(e){
		  return null;
	  }
  },
};

export { Query as default };
