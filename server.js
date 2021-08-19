const express = require("express");
const User = require("./models/User");
var path = require("path");
require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/connectDB");
const app = express();
app.use(express.json());
connectDB();

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "html", "index.html"));
});

//GET :  RETURN ALL USERS
app.get("/users/get", async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (error) {
    res.send("fetch all data error (get)");
  }
});

// get user by id
// app.get("/users/get/:id", async (req, res) => {
//   try {
//     let user = await User.findById(req.params.id);
//     res.send(user);
//   } catch (error) {
//     res.send("get error (get)");
//   }
// });

// POST :  ADD A NEW USER TO THE DATABASE
app.post("/users/add", async (req, res) => {
  const { Name, Email, Adresse } = req.body;
  const newUser = new User({
    Name,
    Email,
    Adresse,
  });
  try {
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    alert("add error (post)");
  }
});

//EDIT A USER BY ID
app.put("/users/update/:id", async (req, res) => {
  try {
    let editedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.send(editedUser);
  } catch (error) {
    res.send("update user error (put)");
  }
});
//DELETE : REMOVE A USER BY ID
app.delete("/users/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("user successfully deleted");
  } catch (error) {
    res.send("delete error (delete)");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) =>
  err
    ? console.log(err)
    : console.log(`server is running on http://localhost:${PORT}`)
);

// pls above 8/10 :3 Thanks :)
