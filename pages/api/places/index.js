// --- import the Schema & Connection Function---
import Place from "/db/models/Place";
import dbConnect from "/db/connect";

export default async function handler(request, response) {
  // connect to DB
  await dbConnect();

  //Defining GET APIroute
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
}
