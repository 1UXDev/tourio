// --- import the Schema & Connection Function---
import Place from "/db/models/Place";
import dbConnect from "/db/connect";

export default async function handler(request, response) {
  // Connect to DB and get Slug/ID
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
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
}
