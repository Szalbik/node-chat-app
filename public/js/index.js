const socket = io();

socket.on("connect", () => {
  console.log("Connected to server");

  socket.emit("createMessage", {
    from: "Kasia",
    text: "Dzisiaj o 19:00."
  });
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("newMessage", message => {
  console.log("newMessage", message);
});
