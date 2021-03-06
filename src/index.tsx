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

export interface ITrunkContext extends TrunkState, NavActions {}

export interface TrunkProps {
  navigation: new (props: any) => React.Component<any>;
  children: React.ReactNode;
}

export interface BranchProps<T> {
  component?:
    | React.ComponentType<ITrunkContext & T & any>
    | React.ComponentType<void>;
  render?: (props: any) => React.ReactNode;
}

const lengthCreator = (length: number): any[] => Array<number>(length).fill(0);

const Dot: React.FC<{
  isActive: boolean;
  onClick: () => void;
}> = props => {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" onClick={props.onClick}>
      <circle
        cx={20 / 2}
        cy={20 / 2}
        r={20 / 2 - 1}
        fill={props.isActive ? "#C4C4C4" : "none"}
        stroke="#C4C4C4"
        strokeWidth={2}
      />
    </svg>
  );
};

export const DefaultNavigation: React.FC<ITrunkContext> = props => (
  <nav data-testid="BRANCHES_DEFAULT_NAVIGATION" style={{ display: "flex" }}>
    <button
      onClick={props.goToPrevious}
      disabled={props.isBeginning}
      data-testid="BRANCHES_DEFAULT_PREVIOUS_BUTTON"
      style={{ flex: 1 }}
    >
      Go to Previous
    </button>
    <ul
      style={{
        flex: 3,
        listStyle: "none",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {lengthCreator(props.length).map((a: any, i: number) => (
        <li key={i} style={{ margin: 8 }}>
          <Dot
            isActive={i === props.position}
            onClick={() =>
              props.goDirectToPosition ? props.goDirectToPosition(i) : null
            }
          />
        </li>
      ))}
    </ul>
    <button
      onClick={props.goToNext}
      disabled={props.isEnd}
      data-testid="BRANCHES_DEFAULT_NEXT_BUTTON"
      style={{ flex: 1 }}
    >
      Go to Next
    </button>
  </nav>
);

const TrunkContext = React.createContext<ITrunkContext>({} as ITrunkContext);

export const nextPosition = (position: number, length: number) => {
  let currentPosition = position !== length ? position + 1 : length;
  let onlyOne = position === length;
  return {
    position: currentPosition,
    isBeginning: currentPosition === 0,
    isEnd: onlyOne || currentPosition === length - 1,
  };
};

export const goDirectToPosition = (state: TrunkState, position: number) => {
  let currentPosition =
    position === 0
      ? 0
      : position !== state.length
      ? position + 1
      : state.length;

  return {
    position,
    isBeginning: currentPosition === 0,
    isEnd: currentPosition === state.length,
  };
};

export const prevPosition = (position: number, length: number) => {
  let currentPosition =
    position === 0 ? 0 : position !== length ? position - 1 : 0;

  return {
    position: currentPosition,
    isBeginning: currentPosition === 0,
    isEnd: currentPosition === length - 1,
  };
};

/**
 * Route Management Provider
 */
export class Trunk extends React.Component<TrunkProps, TrunkState> {
  public readonly state = {
    position: 0,
    isEnd: false,
    isBeginning: true,
    length: React.Children.count(this.props.children),
  };

  public static defaultProps = {
    navigation: DefaultNavigation,
  };

  private goDirectToPosition = (position: number): void => {
    this.setState(state => goDirectToPosition(state, position));
  };

  private goToPrevious = (): void => {
    this.setState(state => prevPosition(state.position, state.length));
  };

  private goToNext = (): void => {
    this.setState(state => nextPosition(state.position, state.length));
  };

  public render(): JSX.Element {
    const { children, navigation: BranchNav } = this.props;
    return (
      <TrunkContext.Provider
        value={{
          ...this.state,
          goToPrevious: this.goToPrevious,
          goToNext: this.goToNext,
          goDirectToPosition: this.goDirectToPosition,
        }}
      >
        <TrunkContext.Consumer>
          {(context: ITrunkContext) => <BranchNav {...context} />}
        </TrunkContext.Consumer>
        {React.Children.map(
          children as React.ReactElement<any>,
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
/**
 * Route Target for Internal Routing
 */
export class Branch<T> extends React.Component<BranchProps<T>, {}> {
  public static contextType: React.Context<ITrunkContext> = TrunkContext;
  public render(): JSX.Element {
    const { component, render, children, ...props } = this.props;

    return (
      <>
        {component
          ? React.createElement(component, {
              ...(props as T),
              ...this.context,
            })
          : render
          ? render({ ...(props as T), ...this.context })
          : null}
      </>
    );
  }
}
