import * as React from "react";
import { Trunk, Branch } from "../src";
import { render } from "react-dom";

const Step: React.SFC<{ step: number }> = ({ step }) => <h1>Step #{step}</h1>;

const App = () => (
  <Trunk>
    <Branch component={Step} step={1} />
    <Branch component={Step} step={2} />
    <Branch component={Step} step={3} />
    <Branch component={Step} step={4} />
    <Branch component={Step} step={5} />
  </Trunk>
);

render(<App />, document.getElementById("root"));
