const express = require('express'); 
const cors = require('cors'); 
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASS

const uri = `mongodb+srv://${userName}:${password}@cluster0.ythezyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //await client.connect();
    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
    const spotCollection = client.db("DB_spot").collection("spot");


    app.post('/product', async (req, res) => {
      const newProduct = req.body;
      console.log(newProduct);
      const result = await spotCollection.insertOne(newProduct);
      res.send(result)
    })

    app.get('/product', async (req, res) => {
      const courser = spotCollection.find();
      const result = await courser.toArray();
      res.send(result)
    })

    app.get('/sport/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await spotCollection.findOne(query);
      res.send(result);
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");


  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
      res.send('Welcome to the server!');
})


app.listen(port, () => {
      console.log(`listening on ${port}`);
})