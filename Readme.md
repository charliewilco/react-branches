# React Branches

[![Build Status](https://travis-ci.com/charliewilco/react-branches.svg?branch=master)](https://travis-ci.com/charliewilco/react-branches)

Headless Component for tabbed or stepped UI components. Requires React 16.3+

## Install

```
yarn add react-branches
```

### Usage

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
    <button active={position === 0} onClick={() => goDirectToPosition(0)}>
      stop
    </button>
    <button active={position === 1} onClick={() => goDirectToPosition(1)}>
      stop
    </button>
    <button active={position === 2} onClick={() => goDirectToPosition(2)}>
      stop
    </button>
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

Props:

- navigation
- children
- default position ?

### Branch

`<Branch />`

Props:

- component
- render
- props
