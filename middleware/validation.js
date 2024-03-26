// developers: 
// Roee Levi 314621780
// Gome Ben Moshe 315752691

const {body , validationResult } = require('express-validator');

// valdating all the fields in the addcaloire method
const calorieValidator = () => {
return [
  body('user_id', 'User ID Invalid!').not().isEmpty(),
  body('description', 'Description is Empty!').not().isEmpty(),
  body('category', 'Category must be: breakfast, lunch, dinner or other').isIn(['breakfast', 'lunch', 'dinner', 'other']),
  body('amount', 'The amount is empty or not a number').isFloat({ min: 0})
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

// checking if the entered date is valid
const checkDate = (day, month, year) => {
  const today = new Date()
  currYear = today.getFullYear();
  currMonth = today.getMonth() + 1;
  currDay = today.getDate();
  if((currYear == year && currMonth == month && currDay < day) || day < 1 || day > 31)
  {
    return false;
  }
  else if((currYear == year && currMonth < month) || month < 1 || month > 12)
  {
    return false;
  }
  else if(currYear < year || year < 1890)
  {
    return false;
  }
  return true;

}

module.exports = {calorieValidator , validate , checkDate};