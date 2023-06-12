import Link from "next/link.js";
import styled from "styled-components";
import { useRouter } from "next/router";
import Form from "../components/Form.js";
import { MyStyledLink } from "../components/MyStyledLink.js";
import useSWR from "swr";

export default function CreatePlacePage() {
  const router = useRouter();
  const places = useSWR("/api/places");

  async function addPlace(place, event) {
    // define the response to be sent
    const response = await fetch("/api/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    });
    console.log("Place added", place);

    if (response.ok) {
      await response.json();
      places.mutate();
      event.target.reset();
      router.push("/");
    } else {
      console.error(response.status);
    }
  }

  return (
    <>
      <Link href="/" passHref legacyBehavior>
        <MyStyledLink>← back</MyStyledLink>
      </Link>
      <h2 id="add-place">Add Place</h2>

      <Form onSubmit={addPlace} formName={"add-place"} />
    </>
  );
}
