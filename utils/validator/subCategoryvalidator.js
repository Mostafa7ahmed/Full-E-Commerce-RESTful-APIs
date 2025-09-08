const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validator");

exports.getSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid SubCategory id format'),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required")
    .isLength({ min: 2 })
    .withMessage("Too short SubCategory name")
    .isLength({ max: 32 })
    .withMessage("Too long SubCategory name"),
  check("category")
    .notEmpty()
    .withMessage("Category required")
    .isMongoId()
    .withMessage("Invalid Category id format"),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid SubCategory id format'),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid SubCategory id format'),
  validatorMiddleware,
];
// dty don`t repate yourself
