class RomanNumerals {
  // Concha
  // María
  // Andrea
  convert(number) {
    let romanNumbers = {
      1: "I",
      5: "V",
      10: "X",
      50: "L",
      100: "C",
      500: "D",
      1000: "M",
    };
    for (const decimal of Object.keys(romanNumbers).reverse()) {
      if (number >= decimal) {
        return romanNumbers[decimal] + this.convert(number - decimal);
      }
    }

    return "";
  }
}
module.exports.RomanNumerals = RomanNumerals;
