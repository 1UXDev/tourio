import Link from "next/link";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import styled from "styled-components";
import { StyledLink } from "../../../components/StyledLink.js";
import { StyledButton } from "../../../components/StyledButton.js";
import { StyledImage } from "../../../components/StyledImage.js";
import { MyStyledLink } from "../../../components/MyStyledLink.js";
import Map from "../../../components/Map/Map.js";

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
    padding: 12px;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.12);
  }

  & *:hover {
    box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.18);
  }
`;

const StyledLocationLink = styled(StyledLink)`
  text-align: center;
  background-color: white;
  border: 1px solid black;
  font-size: 0.8em;
  transition: 0.15s ease-in-out;

  &:hover {
    background-color: rgb(66, 135, 245);
    color: white;
    border: 1px solid rgb(66, 135, 245);
  }
`;

const Description = styled.div`
  background-color: white;
  padding: 0px 12px 24px 12px;
  position: relative;
  top: -18px;

  & > h2 {
    color: rgb(66, 135, 245);
    margin-block-start: unset;
  }

  & a {
    text-decoration: none;
    text-transform: uppercase;
    float: right;
  }

  & span {
    position: relative;
    top: -36px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    padding: 3px 12px;
    color: grey;
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

  function CoordFromMap(url) {
    const regex = url.includes("https://www.google.com/maps")
      ? /@([0-9\.]+),([0-9\.]+),([0-9z]+)/
      : url.includes("https://www.bing.com/maps")
      ? // I asked ChatGPT for the RegEx's, since my solution did not work :)
        /cp=(\d+\.\d+)%7E(\d+\.\d+)/
      : url.includes("https://www.openstreetmap.")
      ? // I asked ChatGPT for the RegEx's, since my solution did not work :)
        /\/(\d+\.\d+)\/(\d+\.\d+)$/
      : false;

    if (regex) {
      const match = url.match(regex);

      if (match && match.length >= 2) {
        const latitude = parseFloat(match[1]);
        const longitude = parseFloat(match[2]);
        return [latitude, longitude];
      }
    }

    return false;
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
        <span>📍 {place.location}</span>
        <h2>{place.name}</h2>
        <p>{place.description}</p>
        <StyledLocationLink
          href={place.mapURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Location on Maps
        </StyledLocationLink>
      </Description>

      {!CoordFromMap(place.mapURL) ? null : (
        // This Map below is a customization from the leaflet StarterCode provided by https://github.com/colbyfayock/next-leaflet-starter
        <Map
          className="map"
          width="800"
          height="400"
          center={CoordFromMap(place.mapURL)}
          zoom={12}
          id="map"
        >
          {({ TileLayer, Marker, Popup }) => (
            <>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={CoordFromMap(place.mapURL)}>
                <Popup>
                  For more info you can use
                  <br />
                  <a
                    href={place.mapURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    the external Map
                  </a>
                  .
                </Popup>
              </Marker>
            </>
          )}
        </Map>
      )}
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
