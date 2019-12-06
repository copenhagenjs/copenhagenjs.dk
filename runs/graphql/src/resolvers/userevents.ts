import { getUserAttendance } from "../models/attendance";

export const UserEvents = userId => {
  const attendance = getUserAttendance(userId);
  return [];
};
