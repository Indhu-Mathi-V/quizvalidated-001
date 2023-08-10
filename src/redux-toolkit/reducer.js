import { createSlice} from '@reduxjs/toolkit';

// create a slice it takes obj as argument it has the name and initialState and reducers as property
const questionSlice = createSlice({
    name:'question',
    initialState:{
        count: 0,
        questionsData: [
            {
              id: 1,
              question: 'What is the capital of France?',
              options: ['London', 'Paris', 'Rome'],
              answer: 'Paris',
            },
            {
              id: 2,
              question: 'Which planet is known as the Red Planet?',
              options: ['Venus', 'Mars', 'Jupiter'],
              answer: 'Mars',
            },
            {
              id: 3,
              question: 'Which is the largest ocean in the world?',
              options: ['Indian Ocean', 'Pacific Ocean', 'Atlantic Ocean'],
              answer: 'Pacific Ocean'
            }
          ],

          showResults: false,
          viewRes: false,
          quizScore: 0,
          


    },
    reducers:{
      increment: (state) => {
          state.count += 1
      },
      decrement: (state) => {
          state.count -= 1
      },

      showResults: (state) => {
        state.showResults = true;
      },
      viewRes: (state) => {
        state.viewRes = true;
      },

      quizScore: (state, action) => {
        state.quizScore = action.payload;
      },

  }
})


// export the actions from the slice
export const  { increment, decrement, showResults, viewRes,quizScore }  = questionSlice.actions;

// export the reducer from the slice
export default questionSlice.reducer;