import React from "react";
import { Match } from "react-router";

import App from "./app";

export default (
    <div>
        <Match pattern="/" component={ App } />
    </div>
);
