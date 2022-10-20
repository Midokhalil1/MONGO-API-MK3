import { ObjectId } from "mongodb";
import dbConnect from "./dbConnect.js";

export async function getAllFurniture(req, res) {
  const db = dbConnect();

  const collection = await db
    .collection("furniture")
    .find()
    .toArray()

    .catch((err) => {
      res.status(500).send(err);
      return;
    });

  res.send(collection);
}

export async function addNewFurniture(req, res) {
  // connect to database
  // get new furniture
  // get new furniture from the body of the request
  // put this new furniture into our furniture collection in our db
  // catch errors and send with status 500
  // return response with 201 all bueno
  const { Brand, Name, Type } = req.body;
  const addNewFurniture = { Brand, Name, Type };

  const db = dbConnect();
  await db
    .collection("furniture")
    .insertOne(addNewFurniture)
    .catch((err) => {
      res.status(500).send(err);
      return;
    });

  res.status(201).send({ message: "furniture added" });
}

export async function updateFurniture(req, res) {
  const { furnitureId } = req.params;
  const db = dbConnect();
  await db
    .collection("furniture")
    .findOneAndUpdate({ _id: new ObjectId(furnitureId) }, { $set: req.body })
    .catch((err) => {
      res.status(500).send(err);
      return;
    });
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  res.status(202).send({ message: "Updated furniture " });
  res.send(collection);
}
console.log("testing");
console.log("testing2");
