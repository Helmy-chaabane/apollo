import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
function Loading() {
  return (
    <Dimmer active inverted>
      <Loader size="mini">Loading...</Loader>
    </Dimmer>
  );
}

export default Loading;
