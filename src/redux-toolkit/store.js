import {configureStore, combineReducers} from '@reduxjs/toolkit';

import questionReducer from './reducer';

import answersReducer from './answerSlice';

const rootReducer = combineReducers({
    question: questionReducer,
    answers: answersReducer,
  });
  

const store = configureStore({
    reducer:
        rootReducer,
    
})


export default store;