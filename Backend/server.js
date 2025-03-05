import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from './app.js';
import {Server} from 'socket.io';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', socket => {
    console.log('a user connected');
    
    socket.on('event', data => { /* … */ });
    socket.on('disconnect', () => { /* … */ });
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});