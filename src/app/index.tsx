import React from "react";

import { App } from "./app.component";

export default () => {
  return (
    <App.Container>{(props) => <App.Component {...props} />}</App.Container>
  );
};
