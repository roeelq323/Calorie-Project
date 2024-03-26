// developers: 
// Roee Levi 314621780
// Gome Ben Moshe 315752691



var express = require('express');
var router = express.Router();
const Calorie  = require("../models/calorie.js");
const User  = require("../models/user.js");
const {calorieValidator , validate , checkDate} = require("../middleware/validation.js");

// function and route for adding calories to the DB
router.post('/addcalories',calorieValidator(), validate , async (req, res) => {
  try { 
    //getting parameters from request body
    const user_id = req.body.user_id;
    const description = req.body.description;
    const category = req.body.category;
    const amount = req.body.amount;
    let year = req.body.year;
    let month = req.body.month;
    let day = req.body.day;
    // checking if the user exists in the db
    const user = await User.findOne({id: user_id});
    if(user) 
    {
      // adding the missing date parts according to the current date
      const today = new Date()
      if(!year)
      {
        year = today.getFullYear();
      }
      if(!month)
      {
        month = today.getMonth() + 1;
      }
      if(!day)
      {
        day = today.getDate();
      }
      if(checkDate(day,month,year)) // date validation
      {
        const calorie = new Calorie({ user_id, year, month, day, description, category, amount });
        await calorie.save();
        res.status(201).send('Success');
      }
      else // if date is not valid
      {
        res.status(500).send('Error Date is Not Valid!');
      }
    }
    else // if the user dosent exist
    {
      res.status(500).send('Error User Dosent Exist!');
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
