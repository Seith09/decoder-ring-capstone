const expect = require("chai").expect;
const { polybius } = require("../src/polybius");

describe("polybius", () => {
  describe("encoding", () => {
    it("should encode the input string to Polybius cipher", () => {
      const expected = "3251131343 2543241341";
      const encoded = polybius("hello world");
      expect(encoded).to.equal(expected);
    });

    it("should handle uppercase letters", () => {
      const expected = "3251131343 2543241341";
      const encoded = polybius("HELLO WORLD");
      expect(encoded).to.equal(expected);
    });

    it("should preserve spaces", () => {
      const expected = "3251131343   2543241341";
      const encoded = polybius("hello   world");
      expect(encoded).to.equal(expected);
    });

    it("should encode the letter 'i' and 'j' to the same code", () => {
      const expected = "4242";
      const encoded = polybius("ij");
      expect(encoded).to.equal(expected);
    });
  });

  describe("decoding", () => {
    it("should decode the Polybius cipher to the original string", () => {
      const expected = "hello world";
      const decoded = polybius("3251131343 2543241341", false);
      expect(decoded).to.equal(expected);
    });

    it("should handle uppercase letters", () => {
      const expected = "hello world";
      const decoded = polybius("3251131343 2543241341", false);
      expect(decoded).to.equal(expected);
    });

    it("should decode the code for 'i' and 'j' to both 'i' and 'j'", () => {
      const expected = "ijij";
      const decoded = polybius("4242", false);
      expect(decoded).to.equal(expected);
    });

    it("should return false if the input length (without spaces) is odd", () => {
      const decoded = polybius("3251131343 254324134", false);
      expect(decoded).to.equal(false);
    });
  });
});
