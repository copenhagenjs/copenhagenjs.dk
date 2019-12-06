jest.mock("../models/attendance");
import { getUserAttendanceRaw } from "../models/attendance";
import { UserAttendanceHistory } from "./userattendancehistory";
const mockedGetUserAttendance = getUserAttendanceRaw as jest.MockedFunction<
  typeof getUserAttendanceRaw
>;

test("UserEvents defined", () => {
  expect(UserAttendanceHistory).toBeDefined();
});

test("UserEvents should find events based on UserId", async () => {
  mockedGetUserAttendance.mockResolvedValue([]);
  const attendance = await UserAttendanceHistory({}, { userId: "123" });
  expect(getUserAttendanceRaw).toBeCalled();
  expect(attendance).toEqual([]);
});
