// --- import the Schema & Connection Function---
import Place from "/db/models/Place";
import dbConnect from "/db/connect";

export default async function handler(request, response) {
  // Connect to DB and get Slug/ID
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    console.log("waiting for ID");
  }

  // --- Defining GET APIroute ---
  if (request.method === "GET") {
    // Assign the place with corresponding id to place
    const place = await Place.findById(id);

    // nothing loaded?
    if (!place) {
      return response.status(404).json({ error: "nothing found :(" });
    }

    // successfully loaded?
    return response.status(200).json(place);
  }

  // --- Defining PATCH APIroute ---
  if (request.method === "PATCH") {
    // Update the corresponding item
    const placeUpdate = await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });

    return response.status(200).json(placeUpdate);
  }

  // --- Defining DELETE APIroute ---
  if (request.method === "DELETE") {
    // Delete the corresponding item
    const placeDelete = await Place.findByIdAndDelete(id);

    response.status(200).json(placeDelete);
  }
}
