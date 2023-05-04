import React from "react";
import { Route, Routes } from "react-router-dom";
import AssignCourseToClass from "../AppCourse/TestPages/AssignCourseToClass";
import AssignTeacherToCourse from "../AppCourse/AssignTeacher/AssignTeacherToCourse";
import CourseBreakDown from "../AppCourse/CourseBreakDown/CourseBreakDown";
import CourseGroup from "../AppCourse/CourseGroup/CourseGroup";
import CourseList from "../AppCourse/TestPages/CourseList";
import CourseOffer from "../AppCourse/CourseOffer/CourseOffer";
import EditCourse from "../AppCourse/TestPages/EditCourse";
import AddCourse from "../AppCourse/TestPages/AddCourse";
import TeacherList from "../AppCourse/TeacherList/TeacherList";
import StudentAdmission from "../AppCourse/StudentAdmission/StudentAdmission";
import StudentDetail from "../AppCourse/StudentDetails/StudentDetail";
import StudentsList from "../AppCourse/StudentsList/StudentsList";
import FeesGroup from "../AppCourse/FeesCollection/FeesGroup/FeesGroup";
import CollectFees from "../AppCourse/FeesCollection/CollectFees/CollectFees";
import AddFee from "../AppCourse/FeesCollection/CollectFees/AddFee/AddFee";
import AdmissionTwo from "../AppCourse/StudentAdmission/Admission_2/AdmissionTwo";
import { Reports } from "../AppCourse/Reports/Reports";
import ClassList from "../AppCourse/Class/ClassList";
import AdmitForYear from "../AppCourse/AdmitForYear/AdmitForYear";
import StudentsAttendance from "../AppCourse/StudentsAttendance/StudentsAttendance";
import AdmissionReport from "../AppCourse/Reports/AdmissionReport/AdmissionReport";
import ClassAndSectionReport from "../AppCourse/Reports/ClassAndSectionReport/ClassAndSectionReport";
import StudentAttendanceReport from "../AppCourse/Reports/StudentAttendanceReport/StudentAttendanceReport";
import StudentGenderRatioReport from "../AppCourse/Reports/StudentGenderRatioReport/StudentGenderRatioReport";
import StudentHistory from "../AppCourse/Reports/StudentHistory/StudentHistory";
import StudentAttendanceReportTwo from "../AppCourse/Reports/StudentAttendanceReportTwo/StudentAttendanceReportTwo";
import StudentMark from "../AppCourse/StudentMark/StudentMark";
import StudentMarkReport from "../AppCourse/Reports/StudentMarkReport/StudentMarkReport";

const AppRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/classList" element={<ClassList />} />
        <Route path="/courseList" element={<CourseList />} />
        <Route path="/assignCourseToClass" element={<AssignCourseToClass />} />
        <Route path="/addCourse" element={<AddCourse />} />
        <Route path="/editCourse" element={<EditCourse />} />
        <Route path="/assignTeacher" element={<AssignTeacherToCourse />} />
        <Route path="/courseBreakDown" element={<CourseBreakDown />} />
        <Route path="/courseOffer" element={<CourseOffer />} />
        <Route path="/courseGroup" element={<CourseGroup />} />
        <Route path="/teacherList" element={<TeacherList />} />
        <Route path="/studentAdmission" element={<StudentAdmission />} />
        <Route path="/studentDetail" element={<StudentDetail />} />
        <Route path="/studentsList" element={<StudentsList />} />
        <Route path="/studentsAttendance" element={<StudentsAttendance />} />
        <Route path="/studentsMark" element={<StudentMark />} />
        <Route path="/feesGroup" element={<FeesGroup />} />
        <Route path="/collectFees" element={<CollectFees />} />
        <Route path="/addFee" element={<AddFee />} />
        <Route path="/studentRegistration" element={<AdmissionTwo />} />
        <Route path="/admitForYear" element={<AdmitForYear />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/admissionReport" element={<AdmissionReport />} />
        <Route path="/studentHistoryReport" element={<StudentHistory />} />
        <Route path="/studentMarkReport" element={<StudentMarkReport />} />
        <Route
          path="/genderRatioReport"
          element={<StudentGenderRatioReport />}
        />
        <Route
          path="/classAndSectionReport"
          element={<ClassAndSectionReport />}
        />
        {/* <Route
          path="/studentAttendanceReport"
          element={<StudentAttendanceReport />}
        /> */}
        <Route
          path="/studentAttendanceReport"
          element={<StudentAttendanceReportTwo />}
        />
        <Route
          path="/studentGenderRatioReport"
          element={<StudentGenderRatioReport />}
        />
      </Routes>
    </div>
  );
};

export default AppRoute;
