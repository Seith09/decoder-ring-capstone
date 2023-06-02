// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const polybiusModule = (function () {
  // you can add any code you want within this function scope
  const polybiusSquare = {
    a: "11",
    b: "21",
    c: "31",
    d: "41",
    e: "51",
    f: "12",
    g: "22",
    h: "32",
    i: "42",
    j: "42",
    k: "52",
    l: "13",
    m: "23",
    n: "33",
    o: "43",
    p: "53",
    q: "14",
    r: "24",
    s: "34",
    t: "44",
    u: "54",
    v: "15",
    w: "25",
    x: "35",
    y: "45",
    z: "55",
  };

  const polybiusSquareArray = Object.entries(polybiusSquare).map(
    ([letter, number]) => ({
      letter,
      number,
    })
  );

  function createWordBank(input) {
    // create an array to store the words to be decoded
    const wordBank = [];
    // create a temporary array to store and push between spaces
    let currentArray = [];
    // iterate through the input and stop if there is a whitespace
    for (let i = 0; i < input.length; i++) {
      if (input[i] === " ") {
        //push the temporary array and empty it for the next word
        wordBank.push(currentArray.join(""));
        currentArray = [];
      } else {
        //insert the interating character into its array
        currentArray.push(input[i]);
      }
    }

    // add the last word if the input doesn't end with a whitespace
    if (currentArray.length > 0) {
      wordBank.push(currentArray.join(""));
    }
    return wordBank;
  }

  function convertToDoubleDigits(input) {
    // seperate the words into seperate arrays
    const seperateWords = createWordBank(input);

    // create an array to temporarily store the double-digit codes that represent a letter.
    const digitsToBeDecoded = [];
    // iterate through the array and start decoding
    seperateWords.forEach((word) => {
      // pair the numbers by two
      const wordSeperated = word.match(/.{1,2}| /g);
      digitsToBeDecoded.push(wordSeperated);
    });
    return digitsToBeDecoded;
  }

  function polybius(input, encode = true) {
    if (encode) {
      // store the input into an array so each word can be iterated.
      const encodedMessage = input
        // convert to lowercase
        .toLowerCase()
        // seperate each letter into their individual indexes.
        .split("")
        // store the spaces and convert each letter to its corresponding polybius number value.
        .map((letter) => {
          if (letter === " ") {
            return letter;
          }
          return polybiusSquare[letter];
        })
        .join("");

      return encodedMessage;
    } else {
      // return false if length of the input is not even without including the spaces.
      const encodedStringWithoutSpaces = input.replace(/\s/g, "");
      const isEvenLength = encodedStringWithoutSpaces.length % 2 === 0;
      if (!isEvenLength) {
        return false;
      }
      const wordBank = [];
      let newWord = [];
      const doubleDigits = convertToDoubleDigits(input);

      // nested for loop to access each index within the 2D array.
      for (let i = 0; i < doubleDigits.length; i++) {
        for (let j = 0; j < doubleDigits[i].length; j++) {
          for (let letter in polybiusSquare) {
            // create variables to compare the value of the current iterated polybius value and the input value encoded number.
            let value = polybiusSquare[letter];
            let currentDoubleDigitLetter = doubleDigits[i][j];
            // push the letter into the new array if they match.
            if (value === currentDoubleDigitLetter) {
              newWord.push(letter);
            }
          }
        }
        let finishedWord = newWord.join("");
        wordBank.push(finishedWord);
        newWord = [];
      }
      let finalMessage = wordBank.join(" ");
      return finalMessage;
    }
  }

  return {
    polybius,
  };
})();

module.exports = { polybius: polybiusModule.polybius };
