import * as React from "react";
import * as ReactDOM from "react-dom";

import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer";
import {RoguelikeContainer} from "./containers/RoguelikeContainer";

let store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <RoguelikeContainer />
    </Provider>,
    document.getElementById('app')
);