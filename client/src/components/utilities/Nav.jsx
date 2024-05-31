import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = ({ props }) => {
  return (
    <NavBar>
      <div className="links">
        {props.map((item) => (
          <span key={item.value}>
            {typeof item.label === "string" ? (
              <NavLink to={`${item.value}`}>{item.label}</NavLink>
            ) : (
              item.label
            )}
          </span>
        ))}
      </div>
    </NavBar>
  );
};

export default Nav;

let NavBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;
