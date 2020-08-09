const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
var fs = require("fs"); // required for file serving

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

function imageValidate(url) {
  return url.match(/\.(jpeg|jpg|gif|png|svg)$/) != null;
}

app.use(cors());
app.use(router);

io.on("connect", socket => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    // fs.readFile(__dirname + "/chrome.png", function(err, data) {
    //   socket.emit("message", {
    //     user: "admin",
    //     message: data,
    //     type: "image"
    //   });

    // socket.emit("message", {
    //   user: "admin",
    //   message: `data:image/png;base64," ${data.toString("base64")}`,
    //   type: "image"
    // });
    // });

    socket.emit("message", {
      user: "admin",
      message: {
        text: `${user.name.charAt(0).toUpperCase() +
          user.name.slice(1)},  welcome to room ${user.room}.`,
        sendAt: new Date().toISOString(),
        type: "text"
      }
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      message: {
        text: `${user.name.charAt(0).toUpperCase() +
          user.name.slice(1)} has joined!`,
        sendAt: new Date().toISOString(),
        type: "text"
      }
    });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", {
      user: user.name,
      message: {
        text: message,
        sendAt: new Date().toISOString(),
        type: imageValidate(message) ? "image" : "text"
      }
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        message: {
          text: `${user.name} has left.`,
          sendAt: new Date().toISOString(),
          type: "text"
        }
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  });
});

server.listen(process.env.PORT || 5004, () =>
  console.log(`Server has started.`)
);
