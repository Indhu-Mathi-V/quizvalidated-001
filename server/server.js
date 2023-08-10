const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/questionsData', (req, res) => {
  
   const questionsData = [
        {
          id: 1,
          question: 'What is the capital of France?',
          options: ['London', 'Paris', 'Rome'],
          answer: 'Paris',
        },
        {
          id: 2,
          question: 'Which planet is known as the Red Planet?',
          options: ['Venus', 'Mars', 'Jupiter'],
          answer: 'Mars',
        },
        {
          id: 3,
          question: 'Which is the largest ocean in the world?',
          options: ['Indian Ocean', 'Pacific Ocean', 'Atlantic Ocean'],
          answer: 'Pacific Ocean'
        }
      ]
    res.json(questionsData);

});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});