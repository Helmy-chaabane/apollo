import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER, MUTATION_LOGOUT } from "../gql/localStore";
function NavMenu() {
  const [current, setCurrent] = useState(window.location.pathname.substr(1));
  const [logoutUser] = useMutation(MUTATION_LOGOUT);

  const logout = () => {
    localStorage.removeItem("token");
    logoutUser();
    setCurrent("login");
  };

  const {
    data: { isLoggedIn },
  } = useQuery(GET_USER);

  return (
    <Menu pointing secondary size="huge" color="red">
      <Menu.Item
        as={Link}
        to="/"
        name="Home"
        active={current === ""}
        onClick={() => setCurrent("")}
      />

      <Menu.Menu position="right">
        {isLoggedIn && (
          <Menu.Item
            as={Link}
            to="/login"
            name="Logout"
            onClick={() => logout()}
          />
        )}
        {!isLoggedIn && (
          <React.Fragment>
            <Menu.Item
              as={Link}
              to="/register"
              name="register"
              active={current === "register"}
              onClick={() => setCurrent("register")}
            />
            <Menu.Item
              as={Link}
              to="/login"
              name="login"
              active={current === "login"}
              onClick={() => setCurrent("login")}
            />
          </React.Fragment>
        )}
      </Menu.Menu>
    </Menu>
  );
}

export default NavMenu;
