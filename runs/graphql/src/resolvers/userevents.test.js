jest.mock("../models/attendance");
import { getUserAttendance } from "../models/attendance";
import { UserEvents } from "./userevents";

test("UserEvents defined", () => {
  expect(UserEvents).toBeDefined();
});

test("UserEvents should find events based on UserId", () => {
  const events = UserEvents();
  expect(getUserAttendance).toBeCalled();
  expect(events).toEqual([]);
});
