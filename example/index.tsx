import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Trunk, Branch } from "../src";

interface IStepProps {
  step: number;
}

const Step: React.FC<IStepProps> = ({ step }) => (
  <div className="Step">
    <h1>Step #{step}</h1>
  </div>
);

const Demo = () => (
  <Trunk>
    <Branch<IStepProps> component={Step} step={1} />
    <Branch<IStepProps> component={Step} step={2} />
    <Branch<IStepProps> component={Step} step={3} />
    <Branch<IStepProps> component={Step} step={4} />
    <Branch<IStepProps> component={Step} step={5} />
  </Trunk>
);

ReactDOM.render(<Demo />, document.getElementById("root"));
