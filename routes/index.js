// developers: 
// Roee Levi 314621780
// Gome Ben Moshe 315752691



var express = require('express');
var router = express.Router();
const Calorie  = require("../models/calorie.js");
const User  = require("../models/calorie.js");
const calorieValidator = require("../middleware/validation.js");



router.post('/addcalories',calorieValidator, async (req, res) => {
  const errors = calorieValidator(req);
  try {
    const { user_id, year, month, day, description, category, amount } = req.body;
    const user = User.find({user_id});
    if(user && errors.isEmpty())
    {
      const calorie = new Calorie({ user_id, year, month, day, description, category, amount });
      await calorie.save();
      res.status(201).send('Success');
    }
    else
    {
      res.status(500).json({errors: errors.array()});
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

router.get('/report', async (req, res) => {
    try {
      const { user_id, year, month } = req.query;
      // validating that all the parameters have been filled
      if(req.query[`user_id`] && req.query[`year`] && req.query[`month`] )
      {
        const report = await Calorie.find({ user_id, year, month });
        // Group the report by category and exclude the category field
        const categorizedReport = {
          breakfast: [],
          lunch: [],
          dinner: [],
          other: []
        };
      // getting the required info from the db
        report.forEach(item => {
          const { category, day, description, amount } = item;
          categorizedReport[category].push({ day, description, amount });
        });
      
        res.json(categorizedReport);
      }
      else //if one or more of the parameters are missing send an error
      {
        res.status(500).send('One of the parameters is missing!');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error');
    }
  });

  
router.get('/about', (req, res) => {
  const developers = [
    { firstname: 'Roee', lastname: 'Levi', id: 314621780, email: 'roeelq323@gmail.com' },
    { firstname: 'Gome', lastname: 'Ben Moshe', id: 315752691, email: 'gomebenmoshe@gmail.com' }
  ];
  res.json(developers);
});

module.exports = router;
