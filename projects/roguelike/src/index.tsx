import * as React from "react";
import * as ReactDOM from "react-dom";

import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer";
import {Roguelike} from "./components/Roguelike";

let store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <Roguelike />
    </Provider>,
    document.getElementById('app')
);