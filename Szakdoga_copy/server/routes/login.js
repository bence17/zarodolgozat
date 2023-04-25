import express from "express";
import { prisma } from "../lib/prismaClient.js";
import dotenv from "dotenv";
dotenv.config(); // To access environment variables that are in .env

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, pwd } = req.body;

  if (!username || !pwd) {
    return res
      .status(400)
      .json({ error: "Hiányzó felhasználónév vagy jelszó!" });
  }

  try {
    const user = await prisma.users.findFirst({
      where: {
        OR: [
          {
            username: username,
          },
          {
            email: username,
          },
        ],
        pwd: pwd,
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Helytelen felhasználónév vagy jelszó!" });
    }

    if (req.cookies?.user) {
      return res.status(400).json({ error: "Jelenleg be van jelentkezve!" });
    }

    const userCookie = { name: user.username, email: user.email };
    res
      .status(200)
      .cookie("user", userCookie, {
        maxAge: process.env.COOKIE_EXPIRES * 1000,
        httpOnly: false,
        sameSite: "none",
      })
      .json({
        message: "Sikeres bejelentkezés!",
        username: user.username,
      });
  } catch (error) {
    res.status(500).json({ error: "Hiba történt bejelentkezés közben!" });
    console.log(error);
  }
});

export default router;
