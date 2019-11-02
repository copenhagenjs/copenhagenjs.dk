const { getEvents } = require("./events.js");
jest.mock("./events.js");
const { getSpeakers, getSpeakerProfiles } = require("./speakers.js");

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
  getEvents.mockReturnValueOnce(events);

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

test("getSpeakerProfiles be defined", () => {
  expect(getSpeakerProfiles).toBeDefined();
});

test("getSpeakerProfiles should return profiles with presentations", () => {
  const events = [
    {
      title: "Hello CopenhagenJS",
      selfLink:
        "https://copenhagenjs.dk/archive/2011-07-21-hello-copenhagenjs/",
      markdown: "Welcome",
      date: new Date(),
      type: "update",
      location: "",
      presentations: [
        { name: "Donald Duck", title: "Welcome to Disney" },
        { name: "Goofy Goof", title: "React.js in Disneyland" }
      ]
    }
  ];
  getEvents.mockReturnValueOnce(events);
  const profiles = getSpeakerProfiles();
  expect(profiles).toEqual([
    {
      name: "Donald Duck",
      presentations: [
        {
          title: "Welcome to Disney",
          selfLink: events[0].selfLink
        }
      ]
    },
    {
      name: "Goofy Goof",
      presentations: [
        {
          title: "React.js in Disneyland",
          selfLink: events[0].selfLink
        }
      ]
    }
  ]);
});
