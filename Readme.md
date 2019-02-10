# React Branches

[![Build Status](https://travis-ci.com/charliewilco/react-branches.svg?branch=master)](https://travis-ci.com/charliewilco/react-branches)

Headless Component for tabbed or stepped UI components. Requires React 16.3+

## Install

```
yarn add react-branches
```

## Usage

```jsx
import React, { Component } from "react";
import { Trunk, Branch } from "react-branches";

const Step = ({ length }) => (
  <div>
    <h1>Step {length} in the Process</h1>
  </div>
);

export const TabbedNavigation = ({ position, goDirectToPosition }) => (
  <nav>
    <button onClick={() => goDirectToPosition(0)}>stop</button>
    <button onClick={() => goDirectToPosition(1)}>stop</button>
    <button onClick={() => goDirectToPosition(2)}>stop</button>
  </nav>
);

export default class Wizard extends Component {
  render() {
    return (
      <Trunk navigation={TabbedNavigation}>
        <Branch component={Step} />
        <Branch component={Step} />
        <Branch component={Step} />
      </Trunk>
    );
  }
}
```

## Components

### Trunk

`<Trunk />` is the root, it only renders `<Branches />`

#### Props

| Name         | Type              | Default             | Description |
| ------------ | ----------------- | ------------------- | ----------- |
| `navigation` | `React.Component` | `DefaultNavigation` |             |
| `children`   | `React.ReactNode` | `null`              |             |

### Branch

`<Branch />`

#### Props

| Name        | Type              | Default             | Description |
| ----------- | ----------------- | ------------------- | ----------- |
| `component` | `React.Component` | `DefaultNavigation` |             |
| `children`  | `React.ReactNode` | `null`              |             |
| `render`    | `React.ReactNode` | `null`              |             |
