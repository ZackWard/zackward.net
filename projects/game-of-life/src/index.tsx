import * as React from "react";
import * as ReactDOM from "react-dom";

import { GameOfLife } from "./components/GameOfLife";

ReactDOM.render(
    <GameOfLife cols={75} rows={75} />,
    document.getElementById('app')
);