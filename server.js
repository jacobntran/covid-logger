const express = require('express');
const http = require('http');
const socket = require('socket.io');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socket(server);
const PORT = process.env.PORT || 3001;

connectDB();

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('join room', (event) => {
    socket.join(event);
    socket.on('new message', (msg) => {
      io.to(event).emit('new message', msg);
    });
    socket.on('add user', (attending) => {
      io.to(event).emit('add user', attending);
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(express.json());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/events', require('./routes/api/events'));
app.use('/api/auth', require('./routes/api/auth'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

server.listen(PORT, () => {
  console.log(`Server is runnning on PORT ${PORT}`);
});
