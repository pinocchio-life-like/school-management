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
import CoursesGroup from "../AppCourse/CoursesGroup/CoursesGroup";
import FeesGroup from "../AppCourse/FeesCollection/FeesGroup/FeesGroup";
import CollectFees from "../AppCourse/FeesCollection/CollectFees/CollectFees";
import AddFee from "../AppCourse/FeesCollection/CollectFees/AddFee/AddFee";
import AdmissionTwo from "../AppCourse/StudentAdmission/Admission_2/AdmissionTwo";
import { Reports } from "../AppCourse/Reports/Reports";

const AppRoute = () => {
  return (
    <div>
      <Routes>
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
        <Route path="/coursesGroup" element={<CoursesGroup />} />
        <Route path="/feesGroup" element={<FeesGroup />} />
        <Route path="/collectFees" element={<CollectFees />} />
        <Route path="/addFee" element={<AddFee />} />
        <Route path="/admissionTwo" element={<AdmissionTwo />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  );
};

export default AppRoute;
