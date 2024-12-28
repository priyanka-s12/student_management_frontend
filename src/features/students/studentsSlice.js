import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//these are action types
//get
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async () => {
    const response = await axios.get(
      'https://student-management-backend-ivory.vercel.app/students'
    );
    // console.log(response);
    return response.data;
  }
);

//post
export const addStudentAsync = createAsyncThunk(
  'students/addStudentAsync',
  async (newStudent) => {
    const response = await axios.post(
      'https://student-management-backend-ivory.vercel.app/students',
      newStudent
    );
    console.log(response);
    return response.data;
  }
);

//update
export const updateStudentAsync = createAsyncThunk(
  'students/updateStudentAsync',
  async (studentToUpdate) => {
    const response = await axios.put(
      `https://student-management-backend-ivory.vercel.app/students/${studentToUpdate._id}`,
      studentToUpdate
    );
    console.log(response);
    return response.data;
  }
);

//delete
export const deleteStudentAsync = createAsyncThunk(
  'students/deleteStudentAsync',
  async (studentid) => {
    console.log(studentid);
    const response = await axios.delete(
      `https://student-management-backend-ivory.vercel.app/students/${studentid}`
    );
    console.log(response);
    return response.data;
  }
);

const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    students: [],
    status: 'idle',
    error: null,
    filter: 'All',
    sortBy: 'name',
    schoolStats: {
      totalStudents: 0,
      averageAttendance: 0,
      averageMarks: 0,
      topStudent: '',
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    updateSchoolStats: (state, action) => {
      // state.schoolStats = { ...state.schoolStats, ...action.payload };
      //gives Cannot read properties of null (reading 'name') error so access it individually as you need
      console.log(action.payload);
      state.schoolStats.totalStudents = action.payload.totalStudents;
      state.schoolStats.averageAttendance = action.payload.averageAttendance;
      state.schoolStats.averageMarks = action.payload.averageMarks;
      state.schoolStats.topStudent = action.payload.topStudent;
    },
    setTopStudent: (state, action) => {
      console.log(action.payload);
      state.schoolStats.topStudent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.status = 'success';
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    });

    builder.addCase(addStudentAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(addStudentAsync.fulfilled, (state, action) => {
      state.status = 'success';
      state.students.push(action.payload);
    });
    builder.addCase(addStudentAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    });

    builder.addCase(updateStudentAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateStudentAsync.fulfilled, (state, action) => {
      const index = state.students.findIndex(
        (student) => student._id === action.payload._id
      );
      console.log(index);
      if (index !== -1) {
        state.status = 'success';
        state.students[index] = action.payload;
      }
    });
    builder.addCase(updateStudentAsync.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    });

    builder.addCase(deleteStudentAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteStudentAsync.fulfilled, (state, action) => {
      state.status = 'success';
      console.log(action.payload);
      state.students = state.students.filter(
        (student) => student._id !== action.payload
      );
    });
    builder.addCase(deleteStudentAsync.rejected, (state, action) => {
      state.status = 'error';
      console.log(action.error);
      state.error = action.error.message;
    });
  },
});

export const { setFilter, setSortBy, updateSchoolStats, setTopStudent } =
  studentsSlice.actions;
export default studentsSlice.reducer;
