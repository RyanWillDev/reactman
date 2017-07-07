// A higher order function used fo checking if the user's guess matches
// char in any of the objs in our phraseMap

// This function takes a guess and returns a function that accepts our charObj
// Finally, it returns whether the guess matches the char.
const charMatchesGuess = (guess) => ({ char }) => char.toLowerCase() === guess.toLowerCase();

/*
In order to call this.setState on the HangmanGame component we need to
a reference to that object.

The function exported here expects to be called with an component like PhraseUtils(HangmanGame).
It will return an object with the diffPhraseMap method bound to the component.
This allows diffPhraseMap to call the components this.setState method.
*/
export default {
    generatePhraseMap(phrase) {
      /*
      Take a phrase like 'My Cool phrase'
      and turn it into an array of objects that look like
      [{ char: 'M', guessed: false}, { char: 'y', guessed: false }, { char: ' ', guessed: true }]

      This simplifies displaying the letter once it is guessed.
      */
      return phrase.split('')
        .map(char => {
          if (char !== ' ') {
            return {
              guessed: false,
              char
            };
          }

          return {
            guessed: true,
            char
          };
      });
    },

    diffPhraseMap(state, guess) {
      let newState; // Create a variable to hold the new state we will generate with this function.

      // Loop through the phraseMap and see if any chars match the user's guess
      if (!state.phraseMap.some(charMatchesGuess(guess))) {
        // If user didn't guess correctly update the incorrectGuesses with that guess
        newState = {...state, incorrectGuesses: [ ...state.incorrectGuesses, guess ] }; // newState = incorrectGuesses w/ update guess and the rest of state
      } else {
        // If the user did guess correctly
        // Iterate the phraseMap
        newState = {
          ...state,
          phraseMap: state.phraseMap.map((obj) => {
          // If the char was not already guessed
          // and the char is the same as the letter the user guessed
          // set guessed to true so we can display the char
            if (!obj.guessed
                && obj.char.toLowerCase() === guess.toLowerCase()) {
              obj.guessed = true;
            }
            // return the updated obj or the original if we didn't update it.
            return obj;
          })
        }; // newState = phraseMap with guessed updated and the rest of state
      }

    return newState; // return newState so we can pass it to this.setState
  }
}
