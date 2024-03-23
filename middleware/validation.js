// developers: 
// Roee Levi 314621780
// Gome Ben Moshe 315752691

const {body , validationResult } = require('express-validator');

// valdating all the fields in the addcaloire method
const calorieValidator = () => {
return [
  body('user_id', 'User ID Invalid!').not().isEmpty(),
  body('year', 'year Invalid!').isInt({ min: 1850, max: 2024 }),
  body('month', 'user id is Empty!').isInt({ min: 1, max: 12 }),
  body('day', 'Day Invalid!').isInt({ min: 1, max: 31 }),
  body('description', 'Description is Empty!').not().isEmpty(),
  body('category', 'Category must be: breakfast, lunch, dinner or other').isIn(['breakfast', 'lunch', 'dinner', 'other']),
  body('amount', 'The minimum password length is 6 characters').isFloat({ min: 0})
]};
// sending an error json with all the fields which are invalid
const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors,
    })
  };

module.exports = {calorieValidator , validate};