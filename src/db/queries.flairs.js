const Topic = require("./models").Topic;
const Flair = require("./models").Flair;

module.exports = {

//#1
  getAllFlairs(callback){
    return Flair.all()

//#2
    .then((flairs) => {
      callback(null, flairs);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getFlair(id, callback){
    return Flair.findById(id)
    .then((flair) => {
      callback(null, flair);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addFlair(newFlair, callback){
    return Flair.create({
      name: newFlair.name,
      color: newFlair.color,
      topicId: newFlair.topicId
    })
    .then((flair) => {
      callback(null, flair);
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteFlair(id, callback){
   return Flair.destroy({
     where: {id}
   })
   .then((flair) => {
     callback(null, flair);
   })
   .catch((err) => {
     callback(err);
   })
  },

 updateFlair(id, updatedFlair, callback){
  return Flair.findById(id)
  .then((flair) => {
    if(!flair){
      return callback("Flair not found");
    }

    flair.update(updatedFlair, {
      fields: Object.keys(updatedFlair)
    })
    .then(() => {
      callback(null, flair);
    })
    .catch((err) => {
      callback(err);
    });
  });
 }
}