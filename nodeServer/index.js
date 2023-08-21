//node server which will handle socket io connections
var io = require('socket.io')(3000);

const users ={};

io.on('connection' , socket=>{
    //If any new user joins , let other users connected to ther server know!
    socket.on('new-user-joined', name=>{
        //console.log("new user  joined" , name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });
    
    //If sommeone sends a message , broadcast it to other people
    socket.on('send' , message=>{
        socket.broadcast.emit('recieve',{message : message , name: users[socket.id]}) 
    });
    // If someonr leaves the chat , let others know!
    //the name disconnect is default name send and newusername are custom
    socket.on('disconnect' , message=>{
        socket.broadcast.emit('left', users[socket.id]) 
        delete users[socket.id];
    });
})
