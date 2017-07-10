# ReactMan

## To start the application
* `cd` into the directory and run
* `npm install` then
* `npm start`

## Each commit on this branch is a working version of the app.
## If you get stuck just use git to checkout the next step.

## ReactMan

_In the beginning_,

There was the index.html file. When you open this file you will notice there is only a single `div` with an id of root.
React uses this `div` as the place to inject your application.

You can see React at work in the index.js in the src directory. First we must import React to use translate the JSX into html.
ReactDOM is used to render your view to the page.
Then, this line `ReactDOM.render(<App />, document.getElementById('root'));` finds our root div and renders the App
component there.

## React Components
Before we can figure out what our App component does we need to know how components in React work.
Components can come in two different shapes. One way to define a React component is with a JavaScript class.

```javascript
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameInProgress: false,
    };
  }

  componentWillMount() {
    // Runs when React is preparing component to be placed on the DOM
    // Can be used for setting up configuration that your component might need
    // EG: connecting to a DB
  }

  componentDidMount() {
    // Runs when your component has been "mounted" to the DOM
    // Commonly used to make AJAX calls for data that your component may need
  }

  componentWillReceiveProps(newProps) {
    // Called when the props passed to your component have changed.
    // Used to update this.state when new props arrive
  }


  shouldComponentUpdate(nextProps, nextState) {
    // Called when the this.state or props have changed
    // By default React re-renders your component every time the component
    // receives new props or this.state changes

    // shouldComponentUpdate can be used to compare the props your component
    // actually cares about and return a boolean telling React if it should re-render
    // By default this method returns true

    // This method is mostly used for performance optimizations.
  }

  componentWillUpdate() {
    // Called if the component should update (shouldComponentUpdate returned true)
    // but before it is re-rendered.
  }

  componentDidUpdate() {
    // Called after the component has been re-rendered
    // Can be used to update the DOM in response to the new state of the component.
  }

  componentWillUnmount() {
    // Called before React removes your component from the DOM.
    // Commonly used to clean up any event listeners your component has registered.
  }


  render() {
    // Must return some JSX, ReactClass representing the DOM elements
    // or null if your component will not be rendering any elements
    // that make up your component
    // You can think of this as your components template

    // React calls this method every time your component receives new props
    // or updates this.state with this.setState() unless your
    // shouldComponentUpdate method returns false

    return (
      <h1>Let's make a hangman game</h1>
    );
  }
}
```

Let's breakdown the component above. To start we extend the class exposed in React.Component.
This is going to give us our built in [LifeCycle methods](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle).
The only method you must define is the render method. The other LifeCycle methods will be "inherited" from React.Component.

The other way to define a component in React is what is called a "Stateless Functional component".
That is a function that returns JSX.

```javascript
const myComponent = props => (
  <h1>Let's make a hangman game</h1>
);
```

As you can see this function above does not make use of the props that are passed in.
I just wanted to show that they can receive props like any other component.

When you declare your components using a pure function you do not have access to the LifeCycle methods.
These components are typically used when a component only needs to take in props and return JSX that is based on the props.

Now that we know a little about React components we can understand what our App component is doing.

## Let's get started

To begin we are going to set up the state our App component and create a "Start Game" button.

When using React you set your components initial state in the constructor of your class.
To start the App component state is going to consist of a single boolean to keep track of whether or not
there is a game in progress.

This is what our components initial state will look like.
Throughout the lifetime of the application will will manipulate this state with `setState`, which our components will
inherit from `React.Component`.

```javascript
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gameInProgress: false,
    };
  }
}
```

Now that we have the Apps internal state let's make a button to start the game.

## Our first component

Due to the simplicity of the "Start Game" button we will make a stateless functional component.
It will look something like this.

```javascript
export const Btn = ({ style, clickHandler, buttonText }) => (
  <button style={style} onClick={clickHandler}>{buttonText}</button>
);
```
The component above is defined as a simple function. We use ES6 destructuring to get the style, clickHandler, and buttonText
values from the props object that is passed to our function. We use those values to fill out our button component.
This allows our button to be reused in multiple places such as a pause or quit button.

Now that we have defined our button component we need to import it into the App component to use it.

First we need to import the component into app using a named import. Add the following code after the existing imports
App.js. `import { Btn } from './Btn'`

To render the new component add it to App's render function.

```javascript
render() {
  return (
    <Btn buttonText="Start Game" />
  );
}
```

When writing React components the JSX tags are self closing unless they have nested components.

```javascript
render() {
  return (
    <ParentComponent>
      <ChildComponent />
    </ParentComponent>
  );
}
```

Now that we have our `Btn` rendering let's add some functionality. When this button is clicked we want it to start
a new game. Let's add a method to app to change its internal gameInProgress state.

## Setting State

The powerhouse React method is `this.setState`. This is the method used to change your components internal state.
Because `setState` is inherited from React.Component it lives on the component instance.

When we want to change a piece of state we pass an object with the updated values to `this.setState` and it
will take care of updating your components state.

```javascript
class App extends Component {
  constructor() {
    super();

    this.state = {
      gameInProgress: false,
    };
  }

  startGame() {
    this.setState({ gameInProgress: true });

  }

  render() {
    return (
      <Btn buttonText="Start Game" onClick={this.startGame}/>
    );
  }
}
```

The code above appears looks correct, but we have an issue.
If you are following along try clicking on the button.
You should see an error of Cannot read property 'setState' of null error appear.


Welcome to the first roadblock of React.

## Maintaining `this` context

In order to use `this.setState` inside our callbacks we need to make sure the `this` context inside our method
always points to our component.

There are a few ways to handle this all with some tradeoffs. Here we will look at three different approaches.

### Binding `this` in the render method.

Perhaps the oldest and simplest solution to this problem is to bind this in the render method.
That is change what is above to this.

```javascript
render() {
  return (
    <Btn buttonText="Start Game" onClick={this.startGame.bind(this)}/>
  );
}
```

The bind method on functions returns a new function that has its `this` context permanently bound to the object you
pass as the first argument to `.bind()`.

This approach works, but because we are binding the function in the render function a new function will be created
each time the App components render function is called. This probably wouldn't cause an issue here, but if you were
doing this for every list item in a list you could see performance issues.

### Binding `this` in the constructor

Due to the potential performance issues with the previous solution we can instead bind our function in the constructor.

```javascript
class App extends Component {
  constructor() {
    super();

    this.state = {
      gameInProgress: false,
    };

    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.setState({ gameInProgress: true });
  }

  render() {
    return (
      <Btn buttonText="Start Game" onClick={this.startGame}/>
    );
  }
}
```

This prevents the performance issues, but adds some boilerplate and another thing to remember to do with each callback.

### Binding `this` with Class Property Arrow functions.

```javascript
class App extends Component {
  constructor() {
    super();

    this.state = {
      gameInProgress: false,
    };
  }

  startGame = () => {
    this.setState({ gameInProgress: true });
  }

  render() {
    return (
      <Btn buttonText="Start Game" onClick={this.startGame}/>
    );
  }
}
```

This method relies on Babel and uses the transform-class-properties or stage-2 plugin to work.
Here we define the method using the arrow function which implicitly binds `this` for us.
This is the way we will define our callbacks going forward.

## Our Gameboard Layout

So far, we have a button that changes our state to signify we have started a game.
Now we need to make a component to render once the game has started.

```javascript
class Gameboard extends React.Component {
 render() {
   return (
     <h1>Game in progress</h1>
   );
 }
}
```

For now we will just put a placeholder element inside our Gameboard component and wire up the App component to render it
once we start a new game.

### Conditional rendering

When using React you conditionally render components with with plain ol' JavaScript in your render function.
Let's update the App's render function to take advantage of this.

```javascript
render() {
  return (
    <div>
      {
        this.state.gameInProgress ? <Gameboard /> :
        <Btn style={startGameBtnStyle} buttonText="Start Game" clickHandler={this.startGame} />
      }
    </div>
  );
}
```

Here we added a ternary to check for the value of `this.state.gameInProgress`.
When this is evaluated it will render the Gameboard if true and the start game button if false.
