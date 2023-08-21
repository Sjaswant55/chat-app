const socket = io('http://localhost:3000');

//Get DOM variables in respective JS variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

//audio that will play on recieving messsage
var audio = new Audio(`ring.mp3`);


// function which will append event info to the container
const append =(message , position)=>{
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if(position == 'left'){
    audio.play();
  }
}

//Ask , new user for name and let the server know
const name =  prompt("Enter your name to join");
socket.emit('new-user-joined', name);

//If a new user joins , recieve his/her name from the server
socket.on('user-joined' , name=>{
  append(`${name} , joined the chat` , 'right');
})

//If server sends a message recieves it  
socket.on('recieve' , data=>{
    append(`${data.name} : ${data.message} ` , 'left');
  })

  // If user leaves the chat , append the info to the container
  socket.on('left' , name=>{
    append(`${name} ,  left the chat ` , 'right');
  })

//If the form is submitted send server the message 
form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}` , 'right');
    socket.emit('send' , message);
    messageInput.value ="";
})