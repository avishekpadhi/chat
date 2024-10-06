const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const express = require("express");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const chatRouter = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoutes");

const cors = require("cors");

const app = express();
app.use(cors());
dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

const PORT = process.env.PORT;
console.log(PORT);
const server = app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`.yellow.bold);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3001",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`connected to socket.io`);

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room", room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});
