import * as React from "react";
import * as ReactDOM from "react-dom";

import { GameOfLife } from "./components/GameOfLife";

ReactDOM.render(
    <GameOfLife cols={30} rows={30} />,
    document.getElementById('app')
);