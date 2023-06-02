const caesarModule = (function () {
  //create an alphabet array to iterate through.
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  function convertInputIntoNumberArray(input) {
    // new array to pass on new value to next helper funciton.
    let inputArray = [];
    for (let char of input) {
      // convert all characters to lower case.
      const lowercaseChar = char.toLowerCase();
      // if/else block is created to push both letters and special characters & white space into the new array.
      if (alphabet.includes(lowercaseChar)) {
        const index = alphabet.indexOf(lowercaseChar);
        inputArray.push(index);
      } else {
        inputArray.push(char);
      }
    }
    return inputArray;
  }

  function codeOrDecodeMessage(array, shift, encode = true) {
    //new array to pass on new value to next helper funciton.
    let codedMessage = [];
    for (let item of array) {
      //if block created to ignore special characters and white space when performing the shift.
      if (typeof item === "string") {
        codedMessage.push(item);
      } else {
        //I needed a lot of help on this section. I created a newIndex variable to store the new number value of the new position
        let shiftedIndex;
        let alphabetLength = alphabet.length;
        let newIndex;
        if (encode) {
          //assigning the shift value to newIndex and adding % alphabetLength incase the number is greater than 26.
          newIndex = (item + shift) % alphabetLength;
          //newIndex gets reassigned to shiftedIndex, but whether or not newIndex = 0 or a negative number, shiftesIndex performs a wrap around the alphabet by assigning its value to the sum of newIndex variable and alphabetlength.
          shiftedIndex = newIndex >= 0 ? newIndex : alphabetLength + newIndex;
        } else {
          newIndex = (item - shift) % alphabetLength;
          shiftedIndex = newIndex >= 0 ? newIndex : alphabetLength + newIndex;
        }
        codedMessage.push(alphabet[shiftedIndex]);
      }
    }
    return codedMessage;
  }

  function caesar(input, shift, encode = true) {
    //guard clause checking for a correct input for shift.
    if (!shift || shift > 25 || shift < -25) {
      return false;
    }

    let inputToNumbers = convertInputIntoNumberArray(input);
    let codeMessage = codeOrDecodeMessage(inputToNumbers, shift, encode);
    let finalMessage = codeMessage.join("");

    return finalMessage;
  }

  return {
    caesar,
  };
})();

module.exports = { caesar: caesarModule.caesar };
