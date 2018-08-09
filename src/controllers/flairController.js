const flairQueries = require("../db/queries.flairs.js");

module.exports = {
  index(req, res, next){
//#2
      flairQueries.getAllFlares((err, flairs) => {

//#3
        if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("flairs/index", {flairs});
        }
      })
   },

   new(req, res, next){
     res.render("flairs/new");
   },

   create(req, res, next){
    let newFlair = {
      name: req.body.name,
      color: req.body.color,
      topicId: req.params.topicId
    };
    flairQueries.addFlair(newFlair, (err, flair) => {
      if(err){
        res.redirect(500, "/flairs/new");
      } else {
        res.redirect(303, `/flairs/${flair.id}`);
      }
    });
  },

  show(req, res, next){
  //#1
    flairQueries.getFlair(req.params.id, (err, flair) => {
  //#2
      if(err || flair == null){
        res.redirect(404, "/");
      } else {
        res.render("flairs/show", {flair});
      }
    });
  },

  destroy(req, res, next){
    flairQueries.deleteFlair(req.params.id, (err, flair) => {
      if(err){
        res.redirect(500, `/flairs/${flair.id}`)
      } else {
        res.redirect(303, "/flairs")
      }
    });
  },

  edit(req, res, next){
    flairQueries.getFlair(req.params.id, (err, flair) => {
      if(err || advertisement == null){
        res.redirect(404, "/");
      } else {
        res.render("flairs/edit", {flair});
      }
    });
  },

  update(req, res, next){
  //#1
    flairQueries.updateFlair(req.params.id, req.body, (err, flair) => {
  //#2
      if(err || flair == null){
        res.redirect(404, `/flairs/${req.params.id}/edit`);
      } else {
        res.redirect(`/flairs/${flair.id}`);
      }
    });
 },

 edit(req, res, next){
  flairQueries.getFlair(req.params.id, (err, flair) => {
    if(err || flair == null){
      res.redirect(404, "/");
    } else {
      res.render("flairs/edit", {flair});
    }
  });
 }
}
