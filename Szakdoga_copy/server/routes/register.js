import express from "express";
import { prisma } from "../lib/prismaClient.js";
import { Prisma } from "@prisma/client";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, email, pwd } = req.body;

  if (!username || !email || !pwd) {
    return res
      .status(400)
      .json({ error: "Hiányzó felhasználónév, email vagy jelszó!" });
  }

  await prisma.users
    .create({
      data: {
        username,
        email,
        pwd,
      },
    })
    .then(() =>
      res.status(200).json({ message: "Sikeres regisztráció!", username })
    )
    .catch((error) => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Duplication error
        if (error.code === "P2002" && typeof error.meta?.target === "string") {
          const emailConstraint = error.meta.target.includes("email");
          const errorMsg = `A(z) ${
            emailConstraint ? "email cím" : "felhasználó"
          } már létezik!`;

          res.status(400).json({
            error: errorMsg,
          });
        }
      }
    });
});

export default router;
