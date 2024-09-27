import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";
const app = express();
const prisma = new PrismaClient();
app.use(express.json());

app.post("/user/signup", async (req, res) => {
  const body = req.body;
  const hashedPassword = await bcrypt.hash(body.password, 5);
  
  try {
    const User = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
    });
    console.log(User);
    res.status(200).json("user signed in successfully");
  } catch {
    res.status(400).json("Something went wrong");
  }
});

app.post("user/login", (req, res) => {
  //verify the data from db
  //password should be compare
  //return the token(jwt)
});

// Get all auction items
//app.get("/items", getAllItems);

// Create a new auction item
//app.post("/items", createItem);

// Get all items of a specific user
//app.get("/users/:userId/items", getUserItems);

// Create a new bid on an auction item
//app.post("/items/:itemId/bids", createBid);

// Get all bids for a specific item
//app.get("/items/:itemId/bids", getItemBids);

app.listen(3000, () => {
  console.log(`port listening on 3000`);
});
