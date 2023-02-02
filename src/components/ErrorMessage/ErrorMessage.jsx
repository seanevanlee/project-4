import React from "react";
import { Message } from "semantic-ui-react";

export default function ErrorMessage(props) {
  return <span className={"error"}>{props.error}</span>;
}
