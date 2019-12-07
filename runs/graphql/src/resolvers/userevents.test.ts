jest.mock("../models/attendance");
import {
  getUserAttendanceRaw,
  AttendanceStatus,
  Attendance
} from "../models/attendance";
import { UserEvents } from "./userevents";
const mockedGetUserAttendance = getUserAttendanceRaw as jest.MockedFunction<
  typeof getUserAttendanceRaw
>;

test("UserEvents defined", () => {
  expect(UserEvents).toBeDefined();
});

test("UserEvent should call attendance", async () => {
  const attendanceHistory: Attendance[] = [
    {
      userId: "123",
      status: AttendanceStatus.GOING,
      timestamp: new Date().toString(),
      eventSlug: "first"
    }
  ];
  mockedGetUserAttendance.mockResolvedValue(attendanceHistory);
  const allEvents = [{ slug: "first" }, { slug: "second" }];
  const events = await UserEvents({}, {}, { token: { user_id: "123" } });
  expect(getUserAttendanceRaw).toBeCalled();
  expect(events).toEqual(allEvents[0]);
});
