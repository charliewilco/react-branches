import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Trunk, Branch } from "@charliewilco/branches";

const Step: React.FC<{ step: number }> = ({ step }) => (
  <div className="Step">
    <h1>Step #{step}</h1>
  </div>
);

const Demo = () => (
  <Trunk>
    <Branch component={Step} step={1} />
    <Branch component={Step} step={2} />
    <Branch component={Step} step={3} />
    <Branch component={Step} step={4} />
    <Branch component={Step} step={5} />
  </Trunk>
);

ReactDOM.render(
  <div className="App">
    <Demo />
  </div>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
