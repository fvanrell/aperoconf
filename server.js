let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('new-player', (message) => {
        io.emit('new-player', message)
    });

    socket.on('new-game', (game) => {
        io.emit('new-game', game)
    });
    
    socket.on('start-game', (started) => {
        io.emit('start-game', started)
    });
    
    socket.on('set-deck', (deck) => {
        io.emit('set-deck', deck)
    });
    
    socket.on('set-round', (round) => {
        io.emit('set-round', round)
    });
    
    socket.on('close-dialog', (bool) => {
        io.emit('close-dialog', bool)
    });
    
    socket.on('end-first-part', (bool) => {
        io.emit('end-first-part', bool)
    });

    socket.on('set-current-answer', ([value, round, player, deck]) => {
        io.emit('set-current-answer', [value, round, player, deck])
    });
    
    socket.on('return-card', ([index, bool]) => {
        io.emit('return-card', [index, bool])
    });
    
    socket.on('return-player-card', ([playerIdx, index, bool]) => {
        io.emit('return-player-card', [playerIdx, index, bool])
    });
    
    socket.on('restart', (bool) => {
        io.emit('restart', bool)
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});