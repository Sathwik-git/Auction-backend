import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express();
const prisma = new PrismaClient();

app.post("/signup", (req, res) => {
  //get data from user
  //add data to db (password should be hashed)
});

app.post("/login", (req, res) => {
  //verify the data from db
  //password should be compare
  //return the token(jwt)
});

// Get all auction items
app.get('/items', getAllItems);

// Create a new auction item
app.post('/items', createItem); 

// Get all items of a specific user
app.get('/users/:userId/items', getUserItems);

// Create a new bid on an auction item
app.post('/items/:itemId/bids', createBid); 

// Get all bids for a specific item
app.get('/items/:itemId/bids', getItemBids); 


app.listen(3000);
