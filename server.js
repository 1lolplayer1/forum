const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

const port = 3000;
let commentsArray = [];

app.use(express.static(path.join(__dirname, 'main')));
app.use(express.json());

io.on('connection', (socket) => {
  console.log('A user connected');

  // Emit the stored comments to the connected client on page load
  socket.emit('comments', commentsArray);

  socket.on('comment', (data) => {
    const { name, comment } = data;
    if (name && comment) {
      const newComment = { id: generateUniqueId(), name, comment };
      commentsArray.unshift(newComment);
      io.emit('comment', newComment); // Emit the comment to all connected clients
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

http.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}
