const express = require("express");
const cors = require("cors");
require('dotenv').config();

// PORT
const PORT = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Bike warehouse running", PORT);
});

app.listen(PORT, () => {
    console.log("Bike warehouse is running", PORT);
})