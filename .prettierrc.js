module.exports = {
  /**
   * As a rule of thumb, it's bet not to depend on ASI (Automatic Semicolon Insertion)
   * And it's best to put semicolon of your own
   * There are plenty of JS code snippet, that can be written, that would simply crash without semicolon
   * It's also best to put semicolon to explicitly indicate that you want to end a line of code
   */
  semi: true,
  /**
   * Trailing comma in Prettier can be one of three values: none, es5, all
   * It's best to enable ES5 compatible trailing comma for objects and arrays
   * To ensure git diff are clean
   */
  trailingComma: "es5",
};
