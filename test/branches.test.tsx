import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Branch, Trunk, prevPosition, nextPosition } from "../src";

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
  it("Renders Content", () => {
    const { getByTestId } = render(<App />);

    expect(getByTestId("BRANCHES_DEFAULT_NAVIGATION")).toBeInTheDocument();
    expect(getByTestId("DUMMY_COMPONENT")).toBeInTheDocument();
  });

  it("Shifts Content", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("BRANCHES_DEFAULT_PREVIOUS_BUTTON")).toBeDisabled();
    fireEvent.click(getByTestId("BRANCHES_DEFAULT_NEXT_BUTTON"));
    expect(getByTestId("SECOND_COMPONENT")).toBeInTheDocument();
    expect(getByTestId("BRANCHES_DEFAULT_NEXT_BUTTON")).toBeDisabled();
  });

  it("Positioning Utils", () => {
    const Previous = prevPosition(0, 4);
    expect(Previous.isBeginning).toBeTruthy();
    expect(Previous.isEnd).toBeFalsy();

    const Next = nextPosition(4, 4);
    expect(Next.isBeginning).toBeFalsy();
    expect(Next.isEnd).toBeTruthy();
  });
});
