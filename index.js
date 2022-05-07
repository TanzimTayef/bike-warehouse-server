const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// PORT
const PORT = process.env.PORT || 8080;

const app = express();

// middleware                     
app.use(cors());
app.use(express.json());

// connect with mongodb
const uri = `mongodb+srv://bikeWarehouse:9mAqKodBszeswj4H@cluster0.vdf6i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const stockCollection = client.db("bikeWarehouse").collection("stocks");

    // load all data
    app.get("/stocks", async (req, res) => {
      const query = {};
      const cursor = stockCollection.find(query);
      const stocks = await cursor.toArray();
      res.send(stocks);
    });

    // POST (add data)
    app.post("/stocks", async (req, res) => {
      const newStock = req.body;
      const result = await stockCollection.insertOne(newStock);
      res.send(result);
    });

    // single item  
    app.get("/stocks/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const stock = await stockCollection.findOne(query);
      res.send(stock);
    });

    // to add
    app.post("/stocks", async (req, res) => {
      const newStocks = req.body;
      const result = stockCollection.insertOne(newStocks)
      req.send(result)
    })




  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Bike warehouse running");
});

// server running
app.listen(PORT, () => {
  console.log("Bike warehouse is running", PORT);
});
