const substitutionModule = (function () {
  function hasDuplicateCharacters(alphabet) {
    for (let i = 0; i < alphabet.length; i++) {
      for (let j = i + 1; j < alphabet.length; j++) {
        if (alphabet[i] === alphabet[j]) {
          return true;
        }
      }
    }
    return false;
  }

  function isValidAlphabet(alphabet) {
    if (
      typeof alphabet !== "string" ||
      alphabet.length !== 26 ||
      hasDuplicateCharacters(alphabet)
    ) {
      return false;
    }
    return true;
  }

  function substitution(input, alphabet, encode = true) {
    // convert input to lowercase
    const lowercaseInput = input.toLowerCase();

    // check if given alphabet is valid
    if (!isValidAlphabet(alphabet)) {
      return false;
    }

    let result = "";

    // store code alphabet and real alphabet in difference variables.
    const substitutionAlphabet = alphabet.toLowerCase();
    const standardAlphabet = "abcdefghijklmnopqrstuvwxyz";

    // Determine the source and target alphabets based on encoding or decoding
    const sourceAlphabet = encode ? standardAlphabet : substitutionAlphabet;
    const targetAlphabet = encode ? substitutionAlphabet : standardAlphabet;

    // iterate through each character in the input
    for (let i = 0; i < lowercaseInput.length; i++) {
      const char = lowercaseInput[i];

      // preserve white spaces
      if (char === " ") {
        result += " ";
        continue;
      }

      // find the index of the character in the source alphabet
      const sourceIndex = sourceAlphabet.indexOf(char);

      // if the character is not found in the source alphabet, add it to the result as is
      if (sourceIndex === -1) {
        result += char;
      } else {
        // convert the character to the target alphabet
        const mutateChar = targetAlphabet[sourceIndex];

        // add the coded character to the result
        result += mutateChar;
      }
    }

    return result;
  }

  return {
    substitution,
  };
})();

module.exports = { substitution: substitutionModule.substitution };
