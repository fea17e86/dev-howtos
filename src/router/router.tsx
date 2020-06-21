import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { AppRoute } from "./routes";

export namespace Router {
  export function Component({ children }: { children: JSX.Element }) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path={AppRoute.template}>{children}</Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
