import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signupInput } from "./type";

dotenv.config();
const app = express();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

app.use(express.json());

app.post("/user/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const result = signupInput.safeParse({ username, email, password });
  if (!result.success) {
    res.json({ msg: result.error.errors });
  } else {
    try {
      const hashedPassword = await bcrypt.hash(password, 5);
      const User = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
        },
      });
      console.log(User);
      res.status(200).json("user signed up successfully");
    } catch {
      res.status(400).json("Something went wrong");
    }
  }
});

app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(403).json({ msg: "User doesn't exists" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign(
        {
          id: user.userId,
        },
        JWT_SECRET
      );
      res.status(200).json({ token: token });
      return;
    } else {
      res.status(403).json({ msg: "wrong credentials" });
    }
  } catch {
    res.status(500).json({ msg: "Something went wrong" });
  }
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
