import { createContext } from "react";

const AttendanceContext = createContext({
    Attendance: "",
    setAttendance: () => {}
  });

const attendanceDataProvider = AttendanceContext.Provider;
const attendanceDataConsumer = AttendanceContext.Consumer;

export { attendanceDataProvider, attendanceDataConsumer }
export default AttendanceContext