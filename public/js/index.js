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

socket.on("newLocationMessage", message => {
  const ul = document.getElementById("messages");
  const li = document.createElement("li");
  const anhor = document.createElement("a");
  const text = document.createTextNode("My current location");
  anhor.appendChild(text);
  anhor.setAttribute("target", "_blank");
  anhor.setAttribute("href", message.url);
  li.appendChild(anhor);
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
      () => {
        document.querySelector("[name='message']").value = "";
      }
    );
  },
  true
);

const locationBtn = document.getElementById("send-location");
locationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser.");
  }

  locationBtn.setAttribute("disabled", "disabled");
  locationBtn.innerHTML = "Sending location ...";

  navigator.geolocation.getCurrentPosition(
    position => {
      locationBtn.removeAttribute("disabled");
      locationBtn.innerHTML = "Send Location";
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    err => {
      locationBtn.removeAttribute("disabled");
      locationBtn.innerHTML = "Send Location";
      alert("Unable to fetch location");
    }
  );
});
