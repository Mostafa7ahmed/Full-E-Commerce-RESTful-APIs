const {validationResult } = require('express-validator');

const validatorMiddleware = (req , res , next) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({messasge :errors.array()[0].msg});
    }
    next();

  } 

module.exports = validatorMiddleware; 