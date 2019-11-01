import { events, searchEvents, filterEventStatus } from "./events.js";

test("events to be defined", () => {
  expect(events).toBeDefined();
});

test("searchEvents to be defined", () => {
  expect(searchEvents).toBeDefined();
});

test("filterEventStatus to be defined", () => {
  expect(filterEventStatus).toBeDefined();
});

test("filterEventStatus filter only upcoming events", () => {
  const UPCOMING = "UPCOMING";
  const events = [
    { date: (Date.now() - 3600 * 1000).toString(), title: "Past" },
    { date: (Date.now() + 3600 * 1000).toString(), title: "Upcoming" }
  ];
  expect(filterEventStatus(UPCOMING, events)).toEqual([events[1]]);
});

test("filterEventStatus filter only past events", () => {
  const PAST = "PAST";
  const events = [
    { date: (Date.now() - 3600 * 1000).toString(), title: "Past" },
    { date: (Date.now() + 3600 * 1000).toString(), title: "Upcoming" }
  ];
  expect(filterEventStatus(PAST, events)).toEqual([events[0]]);
});
