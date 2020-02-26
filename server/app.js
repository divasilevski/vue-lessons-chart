const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const m = (name, text, id) => ({ name, text, id });
io.on("connection", socket => {
  console.log("IO Connected");

  socket.on("userJoined", (data, cb) => {
    if (!data.name || !data.room) return cb("Данные не корректны");

    socket.join(data.room);
    cb({ userId: socket.id });
    socket.emit("newMessage", m("admin", `Добро пожаловать ${data.name}`));
    socket.broadcast
      .to(data.room)
      .emit("newMessage", m("admin", `Пользователь ${data.name} зашёл.`));
  });

  socket.on("createMessage", data => {
    setTimeout(() => {
      socket.emit("newMessage", { text: data.text + " SERVER" });
    }, 500);
  });
});

module.exports = {
  app,
  server
};