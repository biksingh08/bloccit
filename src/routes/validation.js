function  handleValidation(req, res, next, method, validation) {
      if(req.method === method) {
        req.checkParams("topicId", "must be valid").notEmpty().isInt();
        validation();
      }
      const errors = req.validationErrors();
      if (errors) {
        req.flash("error", errors);
        return res.redirect(303, req.headers.referer)
      } else {
        return next();
      }
}

function  handleValidationForTopics(req, res, next, method, validation) {
      if(req.method === method) {
        validation();
      }
      const errors = req.validationErrors();
      if (errors) {
        req.flash("error", errors);
        return res.redirect(303, req.headers.referer)
      } else {
        return next();
      }
}

function handleValidateUsers(req, res, next, method, validation) {
      if(req.method === "POST") {
        validation();
      }
      const errors = req.validationErrors();

      if (errors) {
        req.flash("error", errors);
        return res.redirect(req.headers.referer);
      } else {
        return next();
      }
}

module.exports = {
  validatePosts(req, res, next) {
    return handleValidation(req, res, next, 'POST', () => {
      req.checkBody("title", "must be at least 2 characters in length").isLength({min: 2});
      req.checkBody("body", "must be at least 10 characters in length").isLength({min: 10});
    });
  },
  validateTopics(req, res, next){
    return handleValidationForTopics(req, res, next, 'POST', () => {
      req.checkBody("title", "must be at least 5 characters in length").isLength({min: 5});
      req.checkBody("description", "must be at least 10 characters in length").isLength({min: 10});
    });
  },
  validateFlairs(req, res, next){
    return handleValidation(req, res, next, 'POST', () => {
      req.checkBody("name", "must be at least 2 characters in length").isLength({min: 2});
      req.checkBody("color", "must be at least 3 characters in length").isLength({min: 3});
    });
  },
  validateUsers(req, res, next){
    return handleValidateUsers(req, res, next, 'POST', () => {
      req.checkBody("email", "must be valid").isEmail();
      req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6})
      req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
    });
  }
}
