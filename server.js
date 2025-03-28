const io = require("socket.io")(4000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  pingInterval: 10000,
  pingTimeout: 5000,
});

const users = {};

io.on('connection', (socket) => {
  console.log("User connected!", socket.id);

  // Store userId and socketId when user connects
  socket.on('registerUser', (userId) => {
    users[userId] = socket.id;

    console.log(`User registered: ${userId}: ${socket.id}`);
  });

  // Handle notifying a specific user
  socket.on("notifyUser", (userId, message) => {
    const socketId = users[userId];
    if (socketId) {
      io.to(socketId).emit("notifyUser", message);
    }

  });


  // Handle disconnecting user
  socket.on('disconnect', () => {
    // Remove user from users object
    for (const [userId, socketId] of Object.entries(users)) {
      if (socketId === socket.id) {
        delete users[userId];
        console.log(`User disconnected: ${userId}`);
        break;
      }
    }
  });
});

console.log("Socket.IO server running on port 4000");
