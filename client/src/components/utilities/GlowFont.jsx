import styled from "styled-components";

const GlowFont = ({ text, font, custom }) => {
  return (
    <>
      <CustomLink font={font}>
        {text}
        <CustomBorder className="custom_border" custom={custom}></CustomBorder>
      </CustomLink>
    </>
  );
};

export default GlowFont;

let CustomLink = styled.div`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
  font-size: ${(props) => props.font}rem;
  text-align: justify;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-image: linear-gradient(
    to right,
    #7953cd 20%,
    #00affa 30%,
    #0190cd 70%,
    #764ada 80%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-size: 500% auto;
  animation: textShine 3s ease-in-out infinite alternate;

  @keyframes textShine {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`;

let CustomBorder = styled.div`
  width: 50%;
  padding: ${(props) => props.custom}rem 0;
  background-image: linear-gradient(
    to right,
    #7953cd 20%,
    #00affa 30%,
    #0190cd 70%,
    #764ada 80%
  );
  border-radius: 0.25rem;
  background-size: 500% auto;
  animation: textShine 3s ease-in-out infinite alternate;

  @keyframes textShine {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`;
