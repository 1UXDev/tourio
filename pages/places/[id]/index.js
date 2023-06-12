import Link from "next/link";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import styled from "styled-components";
import { StyledLink } from "../../../components/StyledLink.js";
import { StyledButton } from "../../../components/StyledButton.js";
import { StyledImage } from "../../../components/StyledImage.js";
import { MyStyledLink } from "../../../components/MyStyledLink.js";

const ImageContainer = styled.div`
  position: relative;
  height: 60vh;
  top: -6px;
`;

const ButtonContainer = styled.section`
  display: flex;
  margin: 0px auto;
  max-width: 400px;
  justify-content: space-between;
  gap: 1rem;
  padding: 12px 0px;
  position: relative;
  top: -20px;

  & > * {
    width: 30vw;
    min-width: 100px;
    text-align: center;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.12);
  }
`;

const StyledLocationLink = styled(StyledLink)`
  text-align: center;
  background-color: white;
  border: 1px solid black;
  font-size: 0.8em;
`;

const Description = styled.div`
  background-color: white;
  padding: 0px 12px 24px 12px;
  position: relative;
  top: -18px;

  & > h2 {
    color: rgb(66, 135, 245);
  }
`;

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  async function deletePlace() {
    const confirmed = confirm("Are you sure you want to delete this item?");

    !confirmed
      ? console.log("not deleted")
      : await fetch(`/api/places/${id}`, {
          method: "DELETE",
        });
    router.push("/");
  }

  return (
    <>
      <Link href={"/"} passHref legacyBehavior>
        <MyStyledLink justifySelf="start">← back</MyStyledLink>
      </Link>
      <ImageContainer>
        <StyledImage
          src={place.image}
          priority
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt=""
        />
      </ImageContainer>
      <Description>
        <h2>
          {place.name}, {place.location}
        </h2>
        <p>{place.description}</p>
        <Link href={place.mapURL} passHref legacyBehavior>
          <StyledLocationLink>Location on Google Maps</StyledLocationLink>
        </Link>
      </Description>

      <ButtonContainer>
        <Link href={`/places/${id}/edit`} passHref legacyBehavior>
          <StyledLink>Edit</StyledLink>
        </Link>
        <StyledButton onClick={deletePlace} type="button" variant="delete">
          Delete
        </StyledButton>
      </ButtonContainer>
    </>
  );
}
