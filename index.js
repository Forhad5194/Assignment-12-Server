const express = require('express')
const app = express()
const cors = require('cors');

const port = process.env.PORT || 5000;

// middle wore 

app.use(cors())
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Real_Estate:FV8J5qb25VypCvGB@cluster0.3qpyfpo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    await client.connect();

    const realpropertie = client.db("Real_Estate").collection("propertie");

    const cardCollection = client.db("Real_Estate").collection("Card");
    const reviewCollection = client.db("Real_Estate").collection("review");
    const addcardCollection = client.db("Real_Estate").collection("addcard");
    const ratingCollection = client.db("Real_Estate").collection("rating");

    app.get('/propertie', async (req, res) => {
      const result = await realpropertie.find().toArray();
      res.send(result);
    })



    app.get('/addcard', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await addcardCollection.find(query).toArray();
      res.send(result);
    })

    app.post('/addcard', async (req, res) => {
      const addcarditem = req.body;
      const result = await addcardCollection.insertOne(addcarditem);
      res.send(result);
    })



    app.get('/rating', async (req, res) => {
      const email = req.query.email;
      const result = await ratingCollection.find().toArray();
      res.send(result);
    })



    app.post('/rating', async (req, res) => {
      const ratingItem = req.body;
      const result = await ratingCollection.insertOne(ratingItem);
      res.send(result);
    })








    app.get('/Card', async (req, res) => {
      const result = await cardCollection.find().toArray();
      res.send(result);
    })








    app.get('/review', async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);








app.get('/', (req, res) => {
  res.send('Welcome to the Assignment-12 server')

})

app.listen(port, () => {
  console.log(`Starting Assignment Server on port ${port}`);
})