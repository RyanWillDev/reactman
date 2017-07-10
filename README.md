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
      phrase: '',
      numberOfGuesses: 0
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
