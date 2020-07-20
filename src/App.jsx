import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Router, Route, Switch } from "react-router-dom";

import configureStore from "./redux/store";
import { routes } from "./routes";
import { HISTORY } from "./helpers/constants";

const App = () => {
  const { store, persistor } = configureStore;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={HISTORY}>
          <Suspense fallback={<routes.fallBack />}>
            <Switch>
              <Route exact path="/" component={routes.DemoView} />
            </Switch>
          </Suspense>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
