const expect = require("expect");

const { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    const from = "Admin";
    const text = "Welcome to the chat app";
    const message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, text });
  });
});

describe("generateLocationMessage", () => {
  it("should generate correct location object", () => {
    const from = "Admin";
    const latitude = 15;
    const longitude = 19;
    const url = `https://www.google.com/maps?q=15,19`;
    const message = generateLocationMessage(from, latitude, longitude);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, url });
  });
});
