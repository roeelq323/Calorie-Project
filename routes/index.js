
var express = require('express');
var router = express.Router();
const Calorie  = require("../models/calorie.js");


router.post('/addcalories', async (req, res) => {
  try {
    const { user_id, year, month, day, description, category, amount } = req.body;
    const calorie = new Calorie({ user_id, year, month, day, description, category, amount });
    await calorie.save();
    res.status(201);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

router.get('/report', async (req, res) => {
    try {
      const { user_id, year, month } = req.query;
      const report = await Calorie.find({ user_id, year, month });
  
      // Group the report by category and exclude the category field
      const categorizedReport = {
        breakfast: [],
        lunch: [],
        dinner: [],
        other: []
      };
  
      report.forEach(item => {
        const { category, day, description, amount } = item;
        categorizedReport[category].push({ day, description, amount });
      });
  
      res.json(categorizedReport);
    } catch (err) {
      console.error(err);
      res.status(500);
    }
  });

router.get('/about', (req, res) => {
  const developers = [
    { firstname: 'Roee', lastname: 'Levi', id: 314621780, email: 'roeelq323@gmail.com' },
    { firstname: 'Gome', lastname: 'Ben Moshe', id: 456, email: 'jane@example.com' }
  ];
  res.json(developers);
});

module.exports = router;
