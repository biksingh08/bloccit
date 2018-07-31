const Advertisement = require("./models").Advertisement;

module.exports = {

//#1
  getAllAdvertisements(callback){
    return Advertisement.all()

//#2
    .then((topics) => {
      callback(null, topics);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getAdvertisement(id, callback){
    return Advertisement.findById(id)
    .then((advertisement) => {
      callback(null, advertisement);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addTopic(newAdvertisement, callback){
    return Advertisement.create({
      title: newAdvertisement.title,
      description: newAdvertisement.description
    })
    .then((Advertisement) => {
      callback(null, Advertisement);
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteAdvertisement(id, callback){
   return Advertisement.destroy({
     where: {id}
   })
   .then((advertisement) => {
     callback(null, advertisement);
   })
   .catch((err) => {
     callback(err);
   })
  },

 updateAdvertisement(id, updatedAd, callback){
  return Advertisement.findById(id)
  .then((advertisement) => {
    if(!advertisement){
      return callback("Advertisement not found");
    }

    advertisement.update(updatedAd, {
      fields: Object.keys(updatedAd)
    })
    .then(() => {
      callback(null, advertisement);
    })
    .catch((err) => {
      callback(err);
    });
  });
 }
}
