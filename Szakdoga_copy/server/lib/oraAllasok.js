import { prisma } from "./prismaClient.js";

//összes adat lekérés
const oraAllasok = async (novekvo) => {
  const data = await prisma.oraAllasok.findMany({
    orderBy: {
      datum: novekvo ? "asc" : "desc",
    },
  });
  return data;
};

const getOraAllasok = async (novekvo) => {
  const data = await oraAllasok(novekvo);
  return data;
};
//adat feltöltés
const uploadOraAllas = async (oraAllas) => {
  await prisma.oraAllasok.create({
    data: {
      villany: oraAllas.villany,
      gaz: oraAllas.gaz,
      viz: oraAllas.viz,
      datum: new Date(oraAllas.datum),
    },
  });
};

export { getOraAllasok, uploadOraAllas };
