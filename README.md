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

### Adding State

Now we need some state in the Gameboard component to keep track of the phrase we are trying to guess.

```javascript
export default class Gameboard extends React.Component {
  constructor() {
    super();

    this.state = {
      phrase: ''
    };
  }

  render() {
    return (
      <h1>Game in progress</h1>
    );
  }
}
```

Next, we will need to create a component that will be rendered when we do not have a phrase.
This component will give the user the ability to set the phrase that will be stored in the Gameboard.

Let's go ahead and create a PhraseModal.jsx file. This component will need to provide an input for the user
to enter their phrase, a button to toggle the visibility of the phrase, and finally, a button to submit the the phrase.

To start we will outline the component and give it some initial state.

```javascript
export default class PhraseModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      phrase: ''
    };

  }

  render() {
    return (
      <div>
        <h1>Enter a phrase</h1>
      </div>
    );
  }
}
```

Let's import the PhraseModal component and change the Gameboard's render method to return it.

```javascript
export default class Gameboard extends React.Component {
  constructor() {
    super();

    this.state = {
      phrase: ''
    };
  }

  render() {
    return (
      <PhraseModal />
    );
  }
}
```


The phrase modal currently only renders a `div` and and `h1`. Its internal state consists of the phrase the user will
enter in the input and a boolean to determine if that phrase should be visible or not.
So, we need to add an input to the render function.

```javascript
export default class PhraseModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      phrase: ''
    };

  }

  render() {
    return (
      <div>
        <h1>Enter a phrase</h1>
        <input type="password" />
      </div>
    );
  }
}
```
We set the input type to password to hide the phrase from prying eyes. Now, we need to implement a function to update
the phrase in our components state. But first, I will need to introduce the idea of [Controlled Components](https://facebook.github.io/react/docs/forms.html)

### Controlled Components

In React the component's state is supposed to be the single source of truth for all state in that component.
HTML form elements hold their own state IE: What the user has entered in the input.
This puts HTML form elements at odds with React. Controlled components are the solution to this problem.

In the case of our input, we will set an onChange callback function on the input which will update `this.state.phrase`.
The input's `value` property will be set to whatever is in `this.state.phrase`.
This keeps the value in the input and in `this.state.phrase` in sync at all times.
Let's see how this will look.


```javascript
export default class PhraseModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      phrase: ''
    };

  }

  updatePhrase = (event) => {
    this.setState({ phrase: event.target.value });
  }

  render() {
    return (
      <div>
        <h1>Enter a phrase</h1>
        <input onChange={this.updatePhrase} value={this.state.phrase} type="password" />
      </div>
    );
  }
}
```

Now that we are in control of our input, let's add the toggle visibility button. This button will need to toggle the type
of the input from password to text to allow the user to see what they are typing.

First, let's add the function we will use to accomplish this.

```javascript
export default class PhraseModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      phrase: ''
    };

  }

  updatePhrase = (event) => {
    this.setState({ phrase: event.target.value });
  }

  togglePhraseVisibility = () => {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    return (
      <div>
        <h1>Enter a phrase</h1>
        <input onChange={this.updatePhrase} value={this.state.phrase} type="password" />
      </div>
    );
  }
}
```

The togglePhraseVisibility function is pretty straight forward. We are using `this.state.visible` to keep track of
whether or not the phrase should be visible. So, we just set it to the opposite of whatever it is when the function is
called.

If we import the `Btn` component we created earlier, we can easily add the toggle visibility button. Once the visibility
is being toggled, we can change the type attribute on the input to change from `password` to `text` depending on `this.state.visible`.


```javascript
export default class PhraseModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      phrase: ''
    };

  }

  updatePhrase = (event) => {
    this.setState({ phrase: event.target.value });
  }

  togglePhraseVisibility = () => {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    return (
      <div>
        <h1>Enter a phrase</h1>
        <input onChange={this.updatePhrase} value={this.state.phrase} type={this.state.visible ? 'text' : 'password' } />
        <Btn clickHandler={this.togglePhraseVisibility} buttonText={this.state.visible ? 'Hide Phrase' : 'Show Phrase'} />
      </div>
    );
  }
}
```

As you can see we are now using `this.state.visible` determine the type of the input and the button is updating that value.
As an added bonus the text of the toggle button will also change depending on whether the phrase is visible or not.

The last thing we need the PhraseModal to do is tell the Gameboard component what the user has set as their phrase when
a submit button is clicked. Since React **does not** have two way data binding. We will need to pass a callback function
from Gameboard to PhraseModal that will tell Gameboard to update the user's phrase.

Back in the Gameboard component let's add the setPhrase Method.
We will then need to pass the callback to PhraseModal as a prop.

```javascript
export default class Gameboard extends React.Component {
  constructor() {
    super();

    this.state = {
      phrase: ''
    };
  }

  setPhrase = (phrase) => {
    this.setState({ phrase })
  }

  render() {
    return (
      <PhraseModal setPhrase={this.setPhrase} />
    );
  }
}
```

Now that PhraseModal has the callback it needs to update Gameboard's phrase, we will need to implement a button to call it.
We will add another `Btn` and have it call setPhrase when clicked.

```javascript
export default class PhraseModal extends React.Component {
  constructor(props) {
    super();

    this.state = {
      visible: false,
      phrase: ''
    };

  }

  togglePhraseVisibility = () => {
    this.setState({ visible: !this.state.visible });
  }

  updatePhrase = (event) => {
    this.setState({ phrase: event.target.value });
  }

  render() {
    return (
      <div>
        <h1>Enter a phrase</h1>
        <input onChange={this.updatePhrase} value={this.state.phrase} type={this.state.visible ? 'text' : 'password' } />
        <Btn clickHandler={this.togglePhraseVisibility} buttonText={this.state.visible ? 'Hide Phrase' : 'Show Phrase'} />
        <Btn clickHandler={() => { this.props.setPhrase(this.state.phrase) }} buttonText="Submit Phrase" />
      </div>
    );
  }
}
```

The function that is passed to `Btn`'s clickHandler will call the function passed by Gameboard with the phrase the user
has entered.

## HangmanGame

Now that we have a way to enter a phrase we are ready to start the HangmanGame component and build the actual game.

Let's start by creating a Hangman.jsx file and importing it into the Gameboard component.

```javascript
export default class HangmanGame extends React.Component {
  render() {
    return (
      <h1>I am the HangmanGame</h1>
    );
  }
}
```

For now we are just rendering a placeholder `h1` so we can see our component render.

We want the Hangman component to be rendered once the user has entered a phrase.
So, lets change Gamboard's render method to conditionally render either the PhraseModal or the HangmanGame component
depending on whether or not we have a phrase or not.
We will use another ternary to accomplish this.

```javascript
render() {
  return (
    <div>
      {
        this.state.phrase.length ? <HangmanGame />
        : <PhraseModal setPhrase={this.setPhrase} />
      }
    </div>
  );
}
```

Next we will add a way to display the phrase as a series of empty slots. We will need to pass the phrase as a prop from
Gameboard to HangmanGame.

```javascript
render() {
  return (
    <div>
      {
        this.state.phrase.length ? <HangmanGame phrase={this.state.phrase}/>
        : <PhraseModal setPhrase={this.setPhrase} />
      }
    </div>
  );
}
```

Now that we have access to the phrase in Hangman game let's change HangmanGame's render function to return a list of letters.

```javascript
render() {
  return (
    <ul>
      {
        this.props.phrase.split('')
        .map((letter, i) => (
            <li key={i}>{letter}</li>
          )
        )
      }
    </ul>
  );
}
```

At first glance it may seem like a lot is going on here, but let's break it down.

First, we are returning an unordered list. Inside that we are taking the string passed in as `this.props.phrase` and
turning it into an array with `split()`. Next, we iterate over the letters in the the array with `map()`.
From map we return some JSX that represents a list item with the letter and the index as a key.

It is recommended to pass a key to anything that is created using some sort of iteration.
This is a property that the internal diffing algorithm, [Reconciliation](https://facebook.github.io/react/docs/reconciliation.html),
uses to help distinguish which element has changed.

This will form the foundation of the slots for our phrase.

## PhraseSlots

Let's change the HangmanGame to render the phrase in a way that looks more like what we are used to when playing hangman.

This step of the workshop is going to rely on some files that are added on Step 1.
The phrase-slots.css file will style our PhraseSlots for us, and the phraseUtils.js file has some pre-built utility functions
to make working with our phrase a little easier.

To begin, we are going to add a constructor method to our HangmanGame component which will set some state using a function
from phraseUtils.js.

In order to use `this.props` inside the constructor method we will need to pass our props to the super call.

Once we have done that, we can use the PhraseUtils to parse our phrase and set it as HangmanGame's state.
To get phraseUtils we will need to add `import PhraseUtils from './phraseUtils';` to HangmanGame.
Let's also go ahead and add an array to keep track of the missed guesses.

```javascript
export default class HangmanGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      incorrectGuesses: [],
      phraseMap: PhraseUtils.generatePhraseMap(this.props.phrase)
    };
  }

  render() {
   return (
     <ul>
       {
         this.props.phrase.split('')
         .map((letter, index) => (
           <li key={index}>{letter}</li>
         ))
       }
     </ul>
   );
  }
}
```

Next, add a PhraseSlot.jsx file to the src directory. We do not need any state for this component so we will go ahead
and make a functional component. This component will take in the phraseMap we have generated in HangmanGame
and return an `li` that will show the letter only if it is guessed.

We will also need the phrase-slots.css to style the `li` PhraseSlot returns.
We will just need to apply the correct class name to the `li` depending on whether it is a space or a letter.

**Note:** When adding a class to a JSX element you must use className instead of class.
This is because class is a reserved keyword in JavaScript.

```javascript
import React from 'react';

import './phrase-slots.css';

export const PhraseSlot = props => {
  let className = 'phrase-slot';

  if (props.charObj.char === ' ') {
    className += ' space';
  } else {
    className += ' char';
  }

  return (
    <li className={className}>{props.charObj.guessed ? props.charObj.char : '' }</li>
  );
}
```

Now that we have our PhraseSlot component we need to use it in HangmanGame.
We will need to update HangmanGame's render function to map the `this.state.phraseMap` and return a PhraseSlot for each
item in that array.
We will also add a little bit of styling to the `ul` to make it display horizontally instead of vertically.

**Remember:** to add the key to the PhraseSlot to help React figure out which PhraseSlot has changed when it re-renders
the list.


```javascript
render() {
  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
    {
      this.state.phraseMap.map((obj, i) => (<PhraseSlot key={i} charObj={obj} />))
    }
  </ul>
}
```

Lastly, we will add a temporary keypress listener to make guesses.
We will eventually replace this with a list of buttons to click so we can have more control over the types of guesses users can make.

In our HangmanGame component we will add an updateGame method to call on each keypress.
This method will use another PhraseUtils function to figure out what has changed and return the new state which we will
set with `this.setState`.
We will also add a span to view our incorrect guesses until the actual hangman has been created.

Update the HangmanGame component to look like this.

```javascript
export default class HangmanGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      incorrectGuesses: [],
      phraseMap: PhraseUtils.generatePhraseMap(this.props.phrase)
    };

    document.onkeypress = (e) => this.updateGame(e.key);
  }

  updateGame(guess) {
    this.setState(PhraseUtils.diffPhraseMap(this.state, guess));
  }

  render() {
    return (
      <div>
         <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {
          this.state.phraseMap.map((obj, i) => (<PhraseSlot key={i} charObj={obj} />))
        }
        </ul>

        <span>{this.state.incorrectGuesses.join(' ')}</span>
      </div>
    );
  }
}
```

## Letter buttons

Now we are going to add a list containing a button for each letter of the Alphabet so we can have more control over the user's
input in our application. To save you from having to write out the Alphabet, I have included a file called alphabet.js
that contains an array of the Alphabet.

We will need to pass our updateGame function from HangmanGame to AlphaBtns to allow our button clicks to make guesses.
Since we are now passing it to another component and using `this.setState` we will need to remember to make a slight
modification to retain the correct `this` context.

We will also need to change what we pass to the diffPhraseMap method.
We will need to get the innerHTML of whichever button is clicked (the target).
This will contain the letter the user is trying to guess.

updateGame should be changed to this:

```javascript
updateGame = (event) => {
  this.setState(PhraseUtils.diffPhraseMap(this.state, event.target.innerHTML));
}
```

Let's create a file called AlphaBtns.jsx and inside we will create our list of buttons.
We will need to import React, our Btn component, and the alphabet array.
Once we have the array we will loop through it and return a Btn for each letter.

We will use a technique called event propagation to avoid having to set a callback on each individual button.
Instead, we will define a click handler on the the list and let it capture the events of it's children.
This click handler will be responsible for calling updateGame as well as disabling the button that was clicked.


Our finished AlphaBtns component:

```
import React from 'react';

import { Btn } from './Btn';

import alphabet from './alphabet';


export const AlphaBtns = props => {
  return (
    <ul onClick={event => { props.updateGame(event); event.target.disabled = true; }}>
      {
        alphabet.map((letter, i) => ( <Btn key={i} buttonText={letter} /> ))
      }
    </ul>
  );
};
```

We are now ready to import our button list into HangmanGame to render it.
After you have imported AlphaBtns, update HangmanGame's render function to look like this:

```javascript
render() {
  return (
    <div>
       <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {
        this.state.phraseMap.map((charObj, i) => (<PhraseSlot key={i} charObj={charObj} />))
      }
      </ul>

      <AlphaBtns updateGame={this.updateGame} />

      <span>{this.state.incorrectGuesses.join(' ')}</span>
    </div>

  );
}
```

Finally, we will delete the keyPress handler from HangmanGame's constructor as it is no longer needed.
