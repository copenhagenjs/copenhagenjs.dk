const { getEvents } = require("./events.js");
jest.mock("./events.js");
const { getSpeakers } = require("./speakers.js");

test("getSpeakers be defined", () => {
  expect(getSpeakers).toBeDefined();
});

test("getSpeakers be defined", () => {
  const events = [
    {
      title: "Hello CopenhagenJS",
      selfLink:
        "https://copenhagenjs.dk/archive/2011-07-21-hello-copenhagenjs/",
      markdown: "Welcome",
      date: new Date(),
      type: "update",
      location: "",
      presentations: [{ name: "Donald Duck", title: "Welcome to Disney" }]
    }
  ];
  getEvents.mockReturnValue(events);

  expect(getSpeakers()).toEqual([
    {
      selfLink:
        "https://copenhagenjs.dk/archive/2011-07-21-hello-copenhagenjs/",
      name: "Donald Duck",
      slug: "donald-duck",
      title: "Welcome to Disney"
    }
  ]);
});
