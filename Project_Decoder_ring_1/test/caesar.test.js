const expect = require("chai").expect;
const { caesar } = require("../src/caesar");

describe("caesar", () => {
  it("should encode the input string with the given shift value", () => {
    const input = "Hello World";
    const expected = "khoor zruog";
    const encoded = caesar(input, 3);
    expect(encoded).to.equal(expected);
  });

  it("should decode the input string with the given shift value", () => {
    const input = "Khoor Zruog";
    const expected = "hello world";
    const decoded = caesar(input, 3, false);
    expect(decoded).to.equal(expected);
  });

  it("should handle special characters and whitespace", () => {
    const input = "Hello, World!";
    const expected = "mjqqt, btwqi!";
    const encoded = caesar(input, 5);
    expect(encoded).to.equal(expected);
  });

  it("should return false if the shift value is invalid", () => {
    const input = "Hello World";
    const shift = 30;
    const encoded = caesar(input, shift);
    expect(encoded).to.equal(false);
  });
});
