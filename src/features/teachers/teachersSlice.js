import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async () => {
    const response = await axios.get(
      'https://student-management-backend-ivory.vercel.app/teachers'
    );
    // console.log(response);
    return response.data;
  }
);

export const addTeacherAsync = createAsyncThunk(
  'teachers/addTeacherAsync',
  async (newTeacher) => {
    const response = await axios.post(
      'https://student-management-backend-ivory.vercel.app/teachers',
      newTeacher
    );
    console.log(response);
    return response.data;
  }
);

export const updateTeacherAsync = createAsyncThunk(
  'teachers/updateTeacherAsync',
  async (teacherToUpdate) => {
    const response = await axios.post(
      `https://student-management-backend-ivory.vercel.app/teachers/${teacherToUpdate._id}`,
      teacherToUpdate
    );
    console.log(response);
    return response.data;
  }
);

export const deleteTeacherAsync = createAsyncThunk(
  'teachers/deleteTeacherAsync',
  async (teacherId) => {
    console.log(teacherId);
    const response = await axios.delete(
      `https://student-management-backend-ivory.vercel.app/teachers/${teacherId}`
    );
    console.log(response);
    return response.data;
  }
);

const teachersSlice = createSlice({
  name: 'teachers',
  initialState: {
    teachers: [],
    status: 'idle',
    error: null,
    teacherStats: {
      totalTeachers: 0,
      averageAge: 0,
      averageExperience: 0,
    },
  },
  reducers: {
    updateTeacherStats: (state, action) => {
      console.log(action.payload);
      state.teacherStats.totalTeachers = action.payload.totalTeachers;
      state.teacherStats.averageAge = action.payload.averageAge;
      state.teacherStats.averageExperience = action.payload.averageExperience;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeachers.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      state.status = 'success';
      state.teachers = action.payload;
    });
    builder.addCase(fetchTeachers.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(addTeacherAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addTeacherAsync.fulfilled, (state, action) => {
      state.status = 'success';
      state.teachers.push(action.payload);
    });
    builder.addCase(addTeacherAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(updateTeacherAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateTeacherAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      state.teachers = state.teachers.map((teacher) =>
        teacher._id === action.payload._id ? action.payload : teacher
      );
    });
    builder.addCase(updateTeacherAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });

    builder.addCase(deleteTeacherAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteTeacherAsync.fulfilled, (state, action) => {
      state.status = 'success';
      console.log(action.payload);
      state.teachers = state.teachers.filter(
        (teacher) => teacher._id !== action.payload
      );
    });
    builder.addCase(deleteTeacherAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    });
  },
});

export const { updateTeacherStats } = teachersSlice.actions;
export default teachersSlice.reducer;
