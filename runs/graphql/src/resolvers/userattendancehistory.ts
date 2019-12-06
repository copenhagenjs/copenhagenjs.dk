import { getUserAttendance, Attendance } from "../models/attendance";

export const UserAttendanceHistory = async (
  userId: string
): Promise<Attendance[]> => {
  const attendance = await getUserAttendance(userId);
  if (attendance.size > 0) {
    const data = attendance.docs
      .map(d => d.data())
      .filter((x): x is Attendance => x !== undefined);
    return data;
  } else {
    return [];
  }
};
