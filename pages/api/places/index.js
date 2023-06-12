// --- import the Schema & Connection Function---
import Place from "/db/models/Place";
import dbConnect from "/db/connect";
import { useRouter } from "next/router";

export default async function handler(request, response) {
  // connect to DB
  await dbConnect();

  // --- Defining GET APIroute  ---
  if (request.method === "GET") {
    // Put all Places from DB into places with Place-Schema
    const places = await Place.find();

    // nothing loaded?
    if (!places) {
      return response.status(404).json({ error: "no request done" });
    }

    // successfully loaded?
    return response.status(200).json(places);
  }

  // --- Defining POST APIroute ---
  if (request.method === "POST") {
    try {
      // assign what form sent via request & build a place with Schema
      const placeData = request.body;
      const place = new Place(placeData);
      await place.save();

      return response.status(201).json({ status: "new place created" });
    } catch (error) {
      console.log("error: ", error);
      response.status(400).json({ error: error.message });
    }
  }
}
