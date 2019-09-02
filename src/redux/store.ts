// <reference path="../types/redux.d.ts" />
import { Store, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer, { RootState } from "./rootReducer";
import { doLogin,  } from "./login/sagasLogin";
import { all } from "redux-saga/effects";
import { doRegistration } from "./registration/sagasRegistration";
import { admin } from "./admin/sagasAdmin";
import { booksStore } from "./books/sagasBooks";
import { profileChanges } from "./login/sagasProfile";
import { addBookToCart } from "./login/sagasAddBook";
import { removeBookFromCart } from "./login/sagasRemoveBook";

export default function configureStore(
  initialState?: RootState
): Store<RootState> {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  const composeEnhancers = composeWithDevTools({});

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, initialState!, enhancer);

  if (module.hot) {
    module.hot.accept("./rootReducer", () => {
      const nextRootReducer = require("./rootReducer").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  sagaMiddleware.run(function*() {
    yield all([doLogin(), doRegistration(), admin(), booksStore(), profileChanges(), addBookToCart(), removeBookFromCart()]);
  });

  return store;
}
