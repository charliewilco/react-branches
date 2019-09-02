import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Branch, Trunk, prevPosition } from "../src";

const DummyComponent = () => (
  <h1 data-testid="DUMMY_COMPONENT">Dummy Component</h1>
);
const Second = () => <h1 data-testid="SECOND_COMPONENT">Dummy Component</h1>;

function App(): JSX.Element {
  return (
    <Trunk>
      <Branch component={DummyComponent} />
      <Branch component={Second} />
    </Trunk>
  );
}

describe("Branches", () => {
  it("Renders", () => {
    const { getByTestId } = render(<App />);

    expect(getByTestId("BRANCHES_DEFAULT_NAVIGATION")).toBeInTheDocument();
    expect(getByTestId("DUMMY_COMPONENT")).toBeInTheDocument();
  });

  it("Shifts content", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("BRANCHES_DEFAULT_PREVIOUS_BUTTON")).toBeDisabled();
    fireEvent.click(getByTestId("BRANCHES_DEFAULT_NEXT_BUTTON"));
    expect(getByTestId("SECOND_COMPONENT")).toBeInTheDocument();
    expect(getByTestId("BRANCHES_DEFAULT_NEXT_BUTTON")).toBeDisabled();
  });

  it("is at position", () => {
    const Previous = prevPosition(0, 4);
    expect(Previous.isBeginning).toBeTruthy();
    expect(Previous.isEnd).toBeFalsy();
  });
});
