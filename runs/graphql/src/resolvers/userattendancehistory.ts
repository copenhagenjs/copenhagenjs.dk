import { getUserAttendanceRaw, Attendance } from "../models/attendance";

export const UserAttendanceHistory = async (
  parent,
  args,
  context
): Promise<Attendance[]> => {
  const userId: string = context.token.user_id;
  const attendance = await getUserAttendanceRaw(userId);
  return attendance;
};
