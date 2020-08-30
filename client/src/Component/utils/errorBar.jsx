import React, { useState, useEffect } from "react";
import { Transition } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { MUTATION_DELETE_ERRORS } from "../../gql/localStore";

function ErrorBar({ error }) {
  const [deleteError] = useMutation(MUTATION_DELETE_ERRORS);
  const [visible, setVisible] = useState(true);
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    async function waiting() {
      await sleep(4200);
      setVisible(false);
      deleteError();
    }
    waiting();
    return () => clearTimeout(4200);
  }, [deleteError]);

  return (
    <Transition animation="fade left" duration={1000} visible={visible}>
      <div className="trans">{error.message}</div>
    </Transition>
  );
}

export default ErrorBar;
