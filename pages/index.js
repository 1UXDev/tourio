import styled from "styled-components";
import Card from "../components/Card.js";
import useSWR from "swr";
import Link from "next/link.js";
import { StyledLink } from "../components/StyledLink.js";

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-left: 0;
`;

const ListItem = styled.li`
  position: relative;
  width: 100%;
  animation-duration: 1s;
  animation-name: animate-fade;
  animation-fill-mode: backwards;
  animation-delay: 0.3s;

  @keyframes animate-fade {
    0% {
      opacity: 0;
      transform: scale(0.8, 0.8);
      filter: blur(3px);
    }
    100% {
      opacity: 1;
      transform: scale(1, 1);
      filter: blur(0px);
    }
  }
`;
const FixedLink = styled(StyledLink)`
  position: fixed;
  bottom: 50px;
  right: 50px;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.08);
  transition: 0.2s ease-in;

  &:hover {
    box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.16);
  }
`;
export default function Home() {
  const { data } = useSWR("/api/places", { fallbackData: [] });

  return (
    <>
      <List role="list">
        {data.map((place) => {
          return (
            <ListItem key={place._id}>
              <Card
                name={place.name}
                image={place.image}
                location={place.location}
                id={place._id}
              />
            </ListItem>
          );
        })}
      </List>
      <Link href="/create" passHref legacyBehavior>
        <FixedLink>+ place</FixedLink>
      </Link>
    </>
  );
}
