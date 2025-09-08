const {check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validator');


// const idValidator = param('id')
//   .isMongoId()
//   .withMessage("Invalid brand Id");
// const updateCategoryValidator = [
//   idValidator,
//   validatorMiddleware,
// ];
exports.getBrandsValidator = [
  check('id').isMongoId().withMessage('Invalid brand id format'),
  validatorMiddleware,
];

exports.createBrandsValidator = [
  check('name')
    .notEmpty()
    .withMessage('Brands required')
    .isLength({ min: 3 })
    .withMessage('Too short brand name')
    .isLength({ max: 32 })
    .withMessage('Too long brand name'),
  validatorMiddleware,
];

exports.updateBrandsValidator = [
  check('id').isMongoId().withMessage('Invalid brand id format'),
  validatorMiddleware,
];

exports.deleteBrandsValidator = [
  check('id').isMongoId().withMessage('Invalid brand id format'),
  validatorMiddleware,
];
// dty don`t repate yourself