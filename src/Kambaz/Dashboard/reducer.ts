import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: enrollments,
};

const modulesSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload: { courseId, userId } }) => {
      state.enrollments = [...state.enrollments,
      {
        _id: uuidv4(),
        user: userId,
        course: courseId,
      }]
    },
    unenroll: (state, { payload: { courseId, userId } }) => {
      state.enrollments = state.enrollments.filter(e => e.user !== userId && e.course !== courseId);
    }
  },
});

export const { enroll, unenroll } =
  modulesSlice.actions;
export default modulesSlice.reducer;