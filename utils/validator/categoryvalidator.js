const {check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validator');


// const idValidator = param('id')
//   .isMongoId()
//   .withMessage("Invalid category Id");
// const updateCategoryValidator = [
//   idValidator,
//   validatorMiddleware,
// ];
exports.getCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('Category required')
    .isLength({ min: 3 })
    .withMessage('Too short category name')
    .isLength({ max: 32 })
    .withMessage('Too long category name'),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  validatorMiddleware,
];
// dty don`t repate yourself