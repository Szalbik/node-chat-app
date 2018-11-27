const socket = io();

function scrollToBottom() {
  // Selectors
  const messages = document.getElementById("messages");
  const newMessage = messages.lastElementChild;
  const lastMessage =
    messages.childNodes[messages.children.length - 2] || newMessage;
  // Heights
  const clientHeight = messages.clientHeight;
  const scrollTop = messages.scrollTop;
  const scrollHeight = messages.scrollHeight;
  const newMessageHeight = newMessage.scrollHeight;
  const lastMessageHeight = lastMessage.scrollHeight;

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTo(0, scrollHeight);
  }
}

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("newMessage", message => {
  const formattedTime = moment(message.createdAt).format("h:mm a");

  const template = document.querySelector("#message-template").innerHTML;
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  const htmlObj = wrapper.firstElementChild;
  document.querySelector("#messages").appendChild(htmlObj);

  scrollToBottom();
});

socket.on("newLocationMessage", message => {
  const formattedTime = moment(message.createdAt).format("h:mm a");

  const template = document.querySelector("#location-message-template")
    .innerHTML;
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  const htmlObj = wrapper.firstElementChild;
  document.querySelector("#messages").appendChild(htmlObj);

  scrollToBottom();
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
