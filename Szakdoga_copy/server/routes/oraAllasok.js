import express from "express";
import { getOraAllasok, uploadOraAllas } from "../lib/oraAllasok.js";
import { Prisma } from "@prisma/client";

const router = express.Router();
//next -> továbbítja a kérést a következőhöz például ha hiba van akkor az erre elkészített részhez
router.use((req, res, next) => {
  // 401 Unauthorized
  if (!req.cookies?.user) {
    return res.status(401).json({ error: "Kérem jelentkezzen be!" });
  }
  next();
});

// Óra Állások
// GET
router.get("/", async (req, res) => {
  try {
    const { novekvo } = req.query;
    const oraAllasok = await getOraAllasok(novekvo);
    return res.status(200).json(oraAllasok);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Hiba történt a lekérdezés közben!" });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    const oraAllas = req.body;
    await uploadOraAllas(oraAllas);

    res.status(200).json({ message: "Sikeres feltöltés!" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Duplication error
      if (error.code === "P2002") {
        return res.status(400).json({
          error: "Hiba történt! Az adott napra már létezik bejegyzés!",
        });
      }
      return res
        .status(500)
        .json({ error: "Hiba történt a feltöltés közben! " });
    }
  }
});

export default router;
