import { styled } from "styled-components";

const UserProfile = () => {
  return (
    <>
      <Wrapper>
        <div className="sectionOne">
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt=""
            />
          </div>
          <div>INDRA KUMAR R</div>
        </div>
        <div className="sectionTwo">456</div>
        <div className="sectionThree">789</div>
      </Wrapper>
    </>
  );
};

export default UserProfile;

let Wrapper = styled.div`
  width: 60%;
  height: 35rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: -0.2rem 0.2rem 0.15rem 0 violet;

  .sectionOne {
    width: 100%;
    grid-column: 1 / span 1;
    grid-row: 1 / span 3;
    background-color: red;
    overflow: hidden;
  }

  .sectionTwo {
    grid-column: 2 / span 2;
    grid-row: 1 / span 1;
    width: 100%;
    background-color: tomato;
  }

  .sectionThree {
    grid-column: 2 / span 2;
    grid-row: 2 / span 2;
    width: 100%;
    background-color: orange;
  }
`;
