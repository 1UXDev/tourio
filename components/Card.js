import Link from "next/link.js";
import styled from "styled-components";
import { StyledImage } from "./StyledImage.js";

const Article = styled.article`
  border-radius: 0.6rem;
  background-color: white;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.12);
  padding-bottom: 12px;

  & > div > img {
    transform: scale(1);
    transition: transform 0.2s ease-in-out;
  }

  &:hover > div > img {
    transform: scale(1.1);
    transition: transform 0.6s ease-in-out;
  }

  &:hover {
    box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.18);
    transition: box-shadow 0.5s ease-in-out;
  }

  & p {
    padding-left: 12px;
    color: grey;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  min-height: 10rem;
  height: 40vh;
  overflow: hidden;
`;

const Anchor = styled.a`
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

const Figcaption = styled.h3`
  padding-left: 12px;
  margin-block-end: unset;
  color: rgb(66, 135, 245);
`;

export default function Card({ name, image, location, id }) {
  return (
    <Article>
      <ImageContainer>
        <StyledImage
          src={image}
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt=""
        />
      </ImageContainer>
      <Figcaption>{name}</Figcaption>
      <p>📍 {location}</p>
      <Link href={`places/${id}`} passHref legacyBehavior>
        <Anchor>
          <ScreenReaderOnly>More Info</ScreenReaderOnly>
        </Anchor>
      </Link>
    </Article>
  );
}
