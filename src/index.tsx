import * as React from "react";

export interface TrunkState {
  position: number,
  isEnd: boolean,
  isBeginning: boolean,
  length: number
}

export interface TrunkProps {
  navigation: React.ReactNode
}


const DefaultNavigation = ({
  goToPrevious,
  goToNext,
  goDirectToPosition,
  length,
  position,
  isBeginning,
  isEnd
}) => (
  <nav>
    <button onClick={goToPrevious} disabled={isBeginning}>
      Go to Previous
    </button>
    <ul>
      {Array(length)
        .fill()
        .map((a, i) => (
          <li key={i}>
            <svg
              width={20}
              height={20}
              active={i === position}
              onClick={() => goDirectToPosition && goDirectToPosition(i)}
            />
          </li>
        ))}
    </ul>
    <button onClick={goToNext} disabled={isEnd}>
      Go to Next
    </button>
  </nav>
);

const TrunkContext = React.createContext();

const nextPosition = ({ position, length, isEnd }) => {
  let currentPosition = position !== length ? position + 1 : length;
  return {
    position: currentPosition,
    isBeginning: currentPosition === 0,
    isEnd: currentPosition === length - 1
  };
};

const prevPosition = ({ position, length }) => {
  let currentPosition = position !== length ? position - 1 : 0;

  return {
    position: currentPosition,
    isBeginning: currentPosition === 0,
    isEnd: currentPosition === length - 1
  };
};



export class Trunk extends React.Component<TrunkProps, TrunkState> {
  state = {
    position: 0,
    isEnd: false,
    isBeginning: true,
    length: React.Children.count(this.props.children)
  };

  static defaultProps = {
    navigation: DefaultNavigation
  };

  goDirectToPosition = position => this.setState({ position });

  goToPrevious = () => this.setState(prevPosition);

  goToNext = () => this.setState(nextPosition);

  render() {
    const { children, navigation: BranchNav } = this.props;
    return (
      <TrunkContext.Provider
        value={{
          ...this.state,
          goToPrevious: this.goToPrevious,
          goToNext: this.goToNext,
          goDirectToPosition: this.goDirectToPosition
        }}
      >
        <TrunkContext.Consumer>
          {context => <BranchNav {...context} />}
        </TrunkContext.Consumer>
        {React.Children.map(
          children,
          (child, idx) =>
            // child.type.name === 'Branch' &&
            this.state.position === idx &&
            React.cloneElement(child, { ...this.state })
        )}
      </TrunkContext.Provider>
    );
  }
}

// TODO: throw invariant warning if using both Component + render().

export class Branch extends Component {
  render() {
    const { component: Cx, render, ...props } = this.props;

    return (
      <TrunkContext.Consumer>
        {context =>
          Cx ? <Cx {...props} {...context} /> : render({ ...props, ...context })
        }
      </TrunkContext.Consumer>
    );
  }
}
