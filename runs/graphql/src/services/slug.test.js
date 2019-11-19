const { slugify } = require("./slug.js");

test("slugify be defined", () => {
  expect(slugify).toBeDefined();
});

test("slugify name", () => {
  expect(slugify("Kevin Simper")).toBe("kevin-simper");
});

test("slugify emoji", () => {
  expect(slugify("Kevin Simper ✅")).toBe("kevin-simper");
  expect(slugify("✅")).toBe("");
});

test("slugify name twice result in the same slug", () => {
  expect(slugify(slugify("Kevin Simper"))).toBe("kevin-simper");
});
