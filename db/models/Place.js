import mongoose, { mongo } from "mongoose";

// destructure the Schema Object from mongoose
const { Schema } = mongoose;

// define the Schema (according to the input data we got from project)
const placeSchema = new Schema({
  id: { type: Number },
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  mapURL: { type: String, required: true },
  description: { type: String, required: true },
});

// define Place with Place if ecist already, otherwise PlacesSchema
const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
