import { styled } from "styled-components";

const UserProfile = () => {
  return (
    <>
      <Wrapper>
        <div className="sectionOne">
          <div className="profileImage">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
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
  margin-top: 7.5rem;
  width: 60%;
  height: 35rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.25rem black;

  .sectionOne {
    width: 100%;
    grid-column: 1 / span 1;
    grid-row: 1 / span 3;
    background-color: red;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    .profileImage {
      background-color: lime;
      width: 100%;
      height: 50%;
      overflow: hidden;
      padding: 0.5rem;

      img {
        width: 100%;
        height: 100%;
      }
    }
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
