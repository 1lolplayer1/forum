const express = require('express');
const app = express();
const port = 3000;

let commentsArray = [];

app.use(express.static('public'));
app.use(express.json());

app.get('/comments', (req, res) => {
  res.json(commentsArray);
});

app.post('/comments', (req, res) => {
  const { name, comment } = req.body;
  if (name && comment) {
    const newComment = { name, comment };
    commentsArray.unshift(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(400).json({ error: 'Invalid data' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
