import React from "react";
import Head from "./Head";

function Containers({ as, children, icon, content, color, dividing }) {
  return (
    <div className="home">
      <Head
        as={as}
        icon={icon}
        content={content}
        color={color}
        dividing={dividing}
      />
      {children}
    </div>
  );
}

export default Containers;
