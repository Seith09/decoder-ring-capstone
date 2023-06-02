const expect = require("chai").expect;
const { substitution } = require("../src/substitution");

describe("substitution", () => {
  describe("encoding", () => {
    it("should encode the input string using the given alphabet", () => {
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "rmwwl ilhwq";
      const encoded = substitution("hello world", alphabet);
      expect(encoded).to.equal(expected);
    });

    it("should handle punctuation and special characters", () => {
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "jrm tpuys ohlif clb kpand lzmh jrm wxve qlg.";
      const encoded = substitution(
        "The quick brown fox jumps over the lazy dog.",
        alphabet
      );
      expect(encoded).to.equal(expected);
    });
  });

  describe("decoding", () => {
    it("should decode the input string using the given alphabet", () => {
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "hello world";
      const decoded = substitution("rmwwl ilhwq", alphabet, false);
      expect(decoded).to.equal(expected);
    });

    it("should handle punctuation and special characters", () => {
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "the quick brown fox jumps over the lazy dog.";
      const decoded = substitution(
        "Jrm tpuys ohlif clb kpand lzmh jrm wxve qlg.",
        alphabet,
        false
      );
      expect(decoded).to.equal(expected);
    });
  });

  describe("invalid alphabet", () => {
    it("should return false if the alphabet is invalid", () => {
      const alphabet = "xoyqmcgrukswaflnthdjpzibevx";
      const encoded = substitution("Hello, World!", alphabet);
      expect(encoded).to.be.false;
    });
  });
});
