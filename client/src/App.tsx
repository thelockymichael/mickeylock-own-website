import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import styled from "styled-components";
import routes from "./config/routes";

// const Wrapper = styled.div`
//   display: flex;

//   justify-content: space-around;
//   max-width: 100%;
//   background: #a0c5e8;
// `;

const App: React.FC<{}> = () => {
  // TODO
  // Router
  // Switch
  return (
    <div>
      <Router>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props: RouteComponentProps<any>) => (
                  <route.component
                    name={route.name}
                    {...props}
                    {...route.props}
                  />
                )}
              />
            );
          })}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
