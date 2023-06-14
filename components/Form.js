import styled from "styled-components";
import { StyledButton } from "./StyledButton.js";
import api from "../db/unsplash.js";
import { useState } from "react";

const FormContainer = styled.form`
  display: grid;
  padding: 12px;

  & :nth-child(even) {
    margin-bottom: 1.5rem;
  }

  & :nth-child(odd) {
    margin-bottom: 0.4rem;
    color: rgb(66, 135, 245);
  }

  & :last-child {
    color: white;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid grey;
  border-radius: 0.5rem;
`;

const Textarea = styled.textarea`
  font-family: inherit;
  border: 1px solid grey;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const MyStyledButton = styled(StyledButton)`
  width: 30vw;
  min-width: 150px;
  max-width: 200px;
  text-align: center;
  background-color: rgb(66, 135, 245);
  color: white;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.12);

  &:disabled {
    background: grey;

    &::before {
      content: "Please check the image-url you provided. If in doubt, replace it with another from Unsplash.com";
      display: inline-block;
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
  }
`;

// --- Never used, no time to implement :(
// const SuccessMessage = styled.div`
//   position: fixed;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   justify-self: center;
//   top: 40vh;
//   border-radius: 99px;
//   z-index: 99;
//   width: 300px;
//   height: 80px;
//   background-color: white;
// `;

const DynamicImageContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 12px;
  margin-bottom: -40px;

  & * {
    max-width: 30%;
    object-fit: cover;
  }

  & > p {
    width: unset;
    color: unset;
  }

  & .selected {
    border-bottom: 5px solid rgb(66, 135, 245);
  }
`;

export default function Form({ onSubmit, formName, defaultData }) {
  const [unsplashImage, SetUnsplashImage] = useState([]);
  const [imageSearch, SetImageSearch] = useState();
  let selectedImage = null;
  const formImageURLField = document.getElementById("image-url");
  const submitButton = document.querySelector(`[type="submit"]`);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data, event);
  }

  // --- This is all still a bit experimental, have to clean the code at some point
  async function onNameChange(event) {
    // console.log(event.target.value);
    SetImageSearch(event.target.value);

    const image = await api.search(imageSearch);
    SetUnsplashImage(image);
  }

  // if the user input image-url is not in the unsplash pattern, deactivate submit-button (& thus submit-event)
  async function onURLChange() {
    if (
      !formImageURLField ||
      formImageURLField !==
        "^https://images.unsplash.com/photo-[a-zA-Z0-9_-]+?[a-zA-Z0-9_-]+$"
    ) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  }

  function onSelectImage(image) {
    //console.log(formImageURLField.value);
    formImageURLField.value = image.urls.regular;

    if (selectedImage) {
      selectedImage.classList.remove("selected");
    }

    const currentImage = document.getElementById(image.id);
    currentImage.classList.add("selected");

    selectedImage = currentImage;
  }

  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        name="name"
        type="text"
        defaultValue={defaultData?.name}
        placeholder="Your Favorite Spot"
        onChange={onNameChange}
        required
      />
      <Label htmlFor="image-url">Image Url from Unsplash.com</Label>
      <Input
        id="image-url"
        name="image"
        type="url"
        defaultValue={defaultData?.image}
        placeholder="Select one or paste your own from Unsplash.com"
        //regEx created with ChatGPT
        pattern="^https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9_-]+\?[a-zA-Z0-9_-]+$"
        onChange={onURLChange}
        required
      />
      <DynamicImageContainer>
        {!unsplashImage || unsplashImage.length < 1 ? (
          <p>Type a Loction-Name into the name-field above</p>
        ) : (
          unsplashImage.map((image) => {
            //console.log(image);
            return (
              <img
                id={image.id}
                src={image.urls.small}
                key={image.id}
                onClick={() => onSelectImage(image)}
              ></img>
            );
          })
        )}
        <div></div>
      </DynamicImageContainer>
      <div className="spacer"></div>
      <Label htmlFor="location">Location</Label>
      <Input
        id="location"
        name="location"
        type="text"
        defaultValue={defaultData?.location}
        placeholder="e.g. Berlin"
        required
      />
      <Label htmlFor="map-url">Map Url</Label>
      <Input
        id="map-url"
        name="mapURL"
        type="url"
        defaultValue={defaultData?.mapURL}
        placeholder="Can be taken from Google Maps"
        required
      />
      <Label htmlFor="description">Description</Label>
      <Textarea
        name="description"
        id="description"
        cols="30"
        rows="10"
        defaultValue={defaultData?.description}
        placeholder="A description of the location"
        required
      ></Textarea>
      <MyStyledButton type="submit">
        {defaultData ? "Update place" : "Add place"}
      </MyStyledButton>
    </FormContainer>
  );
}
