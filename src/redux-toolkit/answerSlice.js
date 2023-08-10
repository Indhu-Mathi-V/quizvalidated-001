
import { createSlice} from '@reduxjs/toolkit';

const answersSlice = createSlice({
    name :'answers',
    initialState:{
      count: 0,
      userAnswer: {},
      finish: false,
      buttonVisible: true,
    },
  
    reducers: {
      inc: (state) => {
        state.count += 1
      },
      dec: (state) => {
        state.count -= 1
      },
      userAnswer: (state, action) => {
        state.userAnswer = action.payload;
      },

      finish: (state) => {
        state.finish = true
      },

      buttonVisible: (state) => {
        state.buttonVisible = false
      }
  
    }
  })

  export const {inc, dec,userAnswer,finish,buttonVisible} = answersSlice.actions;

  export default answersSlice.reducer;