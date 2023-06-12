import styled from "styled-components";
import { StyledButton } from "./StyledButton.js";

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
`;

const SuccessMessage = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
  top: 40vh;
  border-radius: 99px;
  z-index: 99;
  width: 300px;
  height: 80px;
  background-color: white;
`;

export default function Form({ onSubmit, formName, defaultData }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data, event);
  }

  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        name="name"
        type="text"
        defaultValue={defaultData?.name}
        placeholder="John Doe"
      />
      <Label htmlFor="image-url">Image Url</Label>
      <Input
        id="image-url"
        name="image"
        type="text"
        defaultValue={defaultData?.image}
        placeholder="Only images from Unsplash.com are accepted"
      />
      <Label htmlFor="location">Location</Label>
      <Input
        id="location"
        name="location"
        type="text"
        defaultValue={defaultData?.location}
        placeholder="e.g. Berlin"
      />
      <Label htmlFor="map-url">Map Url</Label>
      <Input
        id="map-url"
        name="mapURL"
        type="text"
        defaultValue={defaultData?.mapURL}
        placeholder="Can be taken from Google Maps"
      />
      <Label htmlFor="description">Description</Label>
      <Textarea
        name="description"
        id="description"
        cols="30"
        rows="10"
        defaultValue={defaultData?.description}
        placeholder="A description of the location"
      ></Textarea>
      <MyStyledButton type="submit">
        {defaultData ? "Update place" : "Add place"}
      </MyStyledButton>
    </FormContainer>
  );
}
