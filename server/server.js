const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

function formatDate(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${hours}:${minutes}:${seconds} | ${day}-${month}-${year}r.`;
}

io.on("connection", socket => {
  console.log("New user connected");

  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to the chat app",
    createdAt: formatDate(new Date())
  });

  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "New user connected",
    createdAt: formatDate(new Date())
  });

  socket.on("createMessage", message => {
    console.log("createMessage", message);
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: formatDate(new Date())
    });
    // socket.broadcast.emit("newMessage", {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: formatDate(new Date())
    // });
  });
  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is listen on port ${port}`);
});
