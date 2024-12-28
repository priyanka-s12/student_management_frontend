import { configureStore } from '@reduxjs/toolkit';
import studentsSlice from '../features/students/studentsSlice';
import teachersSlice from '../features/teachers/teachersSlice';

const store = configureStore({
  reducer: {
    students: studentsSlice,
    teachers: teachersSlice,
  },
});

export default store;
