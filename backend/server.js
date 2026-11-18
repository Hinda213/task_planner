const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);

app.get("/test", async (req, res) => {
  res.send("Hello from the backend!");
});



const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
