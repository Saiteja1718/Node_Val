const express = require('express');
const bodyParser = require('body-parser');
const {body, validationResult } = require('express-validator');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/form.html');
});

app.post('/submit', 
  // Validation rules
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('age').isInt({ min: 18, max: 99 }).withMessage('Age must be between 18 and 99')
  ], 
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('Form submitted successfully!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});