const { slugify } = require("./slug.js");

test("slugify be defined", () => {
  expect(slugify).toBeDefined();
});

test("slugify name", () => {
  expect(slugify("Kevin Simper")).toBe("kevin-simper");
});
