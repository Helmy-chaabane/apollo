import React from "react";
import ErrorBar from "./utils/errorBar";
import { useQuery } from "@apollo/client";
import { GET_ERRORS } from "../gql/localStore";

function Notify() {
  const {
    data: { errors },
  } = useQuery(GET_ERRORS);

  return (
    <React.Fragment>
      <div className="notify">
        {errors &&
          errors.map((error, index) => <ErrorBar error={error} key={index} />)}
      </div>
    </React.Fragment>
  );
}

export default Notify;
