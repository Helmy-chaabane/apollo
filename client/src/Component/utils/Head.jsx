import React from "react";
import { Header } from "semantic-ui-react";

function Head({ as, icon, content, color, dividing }) {
  return (
    <Header
      as={as}
      icon={icon}
      content={content}
      dividing={dividing}
      color={color}
      className="home_header"
    />
  );
}

export default Head;
