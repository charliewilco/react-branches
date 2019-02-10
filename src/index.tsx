import * as React from "react";

export interface TrunkState {
  position: number;
  isEnd: boolean;
  isBeginning: boolean;
  length: number;
}

export interface NavActions {
  goDirectToPosition: (position: number) => void;
  goToPrevious: () => void;
  goToNext: () => void;
}

export interface TrunkContext extends TrunkState, NavActions {}

export interface TrunkProps {
  navigation: new (props: any) => React.Component<any>;
}

export interface BranchProps {
  component?:
    | React.ComponentType<TrunkContext & any>
    | React.StatelessComponent<TrunkContext & any>;
  render?: (props: any) => React.ReactNode;
}

const lengthCreator = (length: number): any[] => Array<number>(length).fill(0);

export const DefaultNavigation: React.FC<TrunkContext> = props => (
  <nav data-testid="BRANCHES_DEFAULT_NAVIGATION">
    <button
      onClick={props.goToPrevious}
      disabled={props.isBeginning}
      data-testid="BRANCHES_DEFAULT_PREVIOUS_BUTTON">
      Go to Previous
    </button>
    <ul>
      {lengthCreator(length).map((a: any, i: number) => (
        <li key={i}>
          <svg
            width={20}
            height={20}
            fill={i === props.position ? " " : " "}
            onClick={() => props.goDirectToPosition && props.goDirectToPosition(i)}
          />
        </li>
      ))}
    </ul>
    <button
      onClick={props.goToNext}
      disabled={props.isEnd}
      data-testid="BRANCHES_DEFAULT_NEXT_BUTTON">
      Go to Next
    </button>
  </nav>
);

const TrunkContext = React.createContext({});

export const nextPosition = ({ position, length, isEnd }: Partial<TrunkState>) => {
  let currentPosition = position !== length ? position + 1 : length;
  let onlyOne = position === length;
  return {
    position: currentPosition,
    isBeginning: currentPosition === 0,
    isEnd: onlyOne || currentPosition === length - 1
  };
};

export const prevPosition = ({ position, length }: Partial<TrunkState>) => {
  let currentPosition = position !== length ? position - 1 : 0;

  return {
    position: currentPosition,
    isBeginning: currentPosition === 0,
    isEnd: currentPosition === length - 1
  };
};

export class Trunk extends React.Component<TrunkProps, TrunkState> {
  public readonly state = {
    position: 0,
    isEnd: false,
    isBeginning: true,
    length: React.Children.count(this.props.children)
  };

  public static defaultProps = {
    navigation: DefaultNavigation
  };

  private goDirectToPosition = (position: number): void => {
    this.setState({ position });
  };

  private goToPrevious = (): void => {
    this.setState(prevPosition);
  };

  private goToNext = (): void => {
    this.setState(nextPosition);
  };

  public render(): JSX.Element {
    const { children, navigation: BranchNav } = this.props;
    return (
      <TrunkContext.Provider
        value={{
          ...this.state,
          goToPrevious: this.goToPrevious,
          goToNext: this.goToNext,
          goDirectToPosition: this.goDirectToPosition
        }}>
        <TrunkContext.Consumer>
          {(context: TrunkContext) => <BranchNav {...context} />}
        </TrunkContext.Consumer>
        {React.Children.map(
          children,
          (child: React.ReactElement<any>, idx: number) =>
            // child.type.name === 'Branch' &&
            this.state.position === idx &&
            React.cloneElement(child, { ...this.state })
        )}
      </TrunkContext.Provider>
    );
  }
}

// TODO: throw invariant warning if using both Component + render().

export class Branch<T> extends React.Component<BranchProps & T, {}> {
  public render(): JSX.Element {
    const { component: Cx, render, ...props } = this.props as BranchProps;

    return (
      <TrunkContext.Consumer>
        {(context: TrunkContext) =>
          Cx ? <Cx {...props} {...context} /> : render({ ...props, ...context })
        }
      </TrunkContext.Consumer>
    );
  }
}
