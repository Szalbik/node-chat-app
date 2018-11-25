const socket = io();

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("newMessage", message => {
  console.log("newMessage", message);
  const ul = document.getElementById("messages");
  const li = document.createElement("li");
  const text = document.createTextNode(`${message.from}: ${message.text}`);
  li.appendChild(text);
  ul.appendChild(li);
});

document.getElementById("message-form").addEventListener(
  "submit",
  e => {
    e.preventDefault();
    socket.emit(
      "createMessage",
      {
        from: "User",
        text: document.querySelector("[name='message']").value
      },
      () => {}
    );
  },
  true
);
