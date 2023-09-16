import express from "express";
import mongo from "mongodb";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const url = "mongodb+srv://aleks:aleks@cluster0.gmcgovz.mongodb.net//?retryWrites=true&w=majority";

const app = express();
const port = 9000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

(async () => {
  try {
    const client = await mongo.MongoClient.connect(url);
    console.log('Connected successfully to MongoDB server');
    const db = client.db('Masterbase');


    app.post('/register',async(req,res)=>{
      const newUser = {
        Username: req.body.username,
        Email:req.body.email,
        Password: bcrypt.hashSync(req.body.password, 10),
        Image: req.body.image,
      }
      let check= await db.collection("Users").find({Email:newUser.Email}).count()
      if(check > 0){
        console.log("Korisnik postoji")
      }
      else {
        let result= await db.collection("Users").insertOne(newUser)
        console.log("Rezultat",result)
        res.json(result)}
    })


    app.post('/login',async(req,res)=>{
      try {
        const user = await db.collection("Users").findOne({ Email: req.body.email });
      
        if (!user) {
          return res.json({
            error: 'User not found!'
          });
        }
      
        if (!bcrypt.compareSync(req.body.password, user.Password)) {
          return res.json({
            error: 'Invalid password!'
          });
        }
      
        const token = jwt.sign({ userId: user._id }, 'key', {
          algorithm: 'HS512',
          expiresIn: '1 week',
          });
        return res.json({
          title: 'Login Success!',
          token: token,
          userData: user
        });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
          error: 'An error occurred during login.'
        });
      }
  })

app.get("/user", async (req, res) => {
  try {
    const token = req.headers.token;
      // Verify the JWT token
    jwt.verify(token, 'key', async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 'Unauthorized!'
        });
      }

      console.log("Decoded:", decoded);

      const user = await db.collection("Users").findOne({ _id: new mongo.ObjectId(decoded.userId) });

      if (!user) {
        return res.status(404).json({
          error: "User not found!"
        });
      }

      console.log("User fetched!");

      res.status(200).json({
        user: {
          username: user.Username,
          email: user.Email,
          id: user._id
        }
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});


app.post("/newPost",async(req,res)=>{
  console.log("Received Post data!")
  let data = req.body
  let result = await db.collection("Posts").insertOne(data)
  res.json(result)
})

app.post("/newComment",async(req,res)=>{
  console.log("Received comment data!")
  let comment = req.body
  console.log(comment)
  let result = await db.collection("Comments").insertOne(comment)
  res.json(result)
})


app.get("/GetComments/:id",async(req,res)=>{
  let id = req.params.id
  let result = await db.collection("Comments").find({postId:id}).toArray();
  res.json(result)
})


app.get("/getPosts", async (req, res) => {
  let cursor = await db.collection("Posts").find().sort({ Date: -1 })
  let results = await cursor.toArray();
  res.json(results)
})


app.get("/getPost/:id", async (req, res) => {
  let id = req.params.id
  let data = await db.collection("Posts").findOne({_id:new mongo.ObjectId(id)})
  res.json(data)
})


    app.listen(port, () => console.log(`Listening on port ˛${port}!`));
  } catch (err) {
    console.log('Error occurred while connecting to MongoDB:', err);
  }
})();