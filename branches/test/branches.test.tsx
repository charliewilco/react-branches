import * as React from "react";
import { render, fireEvent } from "react-testing-library";
import "jest-dom/extend-expect";
import { Branch, Trunk, prevPosition } from "../src";

const DummyComponent = () => <h1 data-testid="DUMMY_COMPONENT">Dummy Component</h1>;
const Second = () => <h1 data-testid="SECOND_COMPONENT">Dummy Component</h1>;

const { getByText, getByTestId } = render(
  <Trunk>
    <Branch component={DummyComponent} />
    <Branch component={Second} />
  </Trunk>
);

describe("Branches", () => {
  it("Renders", () => {
    expect(getByTestId("BRANCHES_DEFAULT_NAVIGATION")).toBeInTheDocument();
    expect(getByTestId("DUMMY_COMPONENT")).toBeInTheDocument();
  });

  it("Shifts content", () => {
    expect(getByTestId("BRANCHES_DEFAULT_PREVIOUS_BUTTON")).toBeDisabled();
    fireEvent.click(getByTestId("BRANCHES_DEFAULT_NEXT_BUTTON"));
    expect(getByTestId("SECOND_COMPONENT")).toBeInTheDocument();
    expect(getByTestId("BRANCHES_DEFAULT_NEXT_BUTTON")).toBeDisabled();
  });

  it("is at position", () => {
    const Previous = prevPosition({ position: 0, length: 4 });
    expect(Previous.isBeginning).toBeTruthy();
    expect(Previous.isEnd).toBeFalsy();
  });
});
