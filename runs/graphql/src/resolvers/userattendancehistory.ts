import { getUserAttendanceRaw, Attendance } from "../models/attendance";

export const UserAttendanceHistory = async (
  parent,
  args
): Promise<Attendance[]> => {
  const userId: string = args.userId;
  const attendance = await getUserAttendanceRaw(userId);
  return attendance;
};
