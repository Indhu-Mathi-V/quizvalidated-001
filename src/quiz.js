import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Result from './result';
import './quiz.scss';
import {AiOutlineFieldTime} from 'react-icons/ai';
import {useDispatch,useSelector} from 'react-redux'
import {increment,decrement,showResults,viewRes,quizScore,} from './redux-toolkit/reducer';
import {userAnswer} from './redux-toolkit/answerSlice';
import sendDataToBackend from './api';

const Quiz1 = () => {

  const[questionsData , setQuestionsData]  = useState([])
  const [score, setScore] = useState(null);
  // const questionsData = useSelector((state) => state.question.questionsData);
  const currentQuestion = useSelector((state) => state.question.count);
  const show = useSelector((state) => state.question.showResults);
  const view = useSelector((state) => state.question.viewRes);
  const Score = useSelector((state) => state.question.quizScore);
  const dispatch = useDispatch();

  
//   useEffect(() => {
//     // Make a GET request to the backend server
//     axios.get('http://localhost:8000/api/questionsData')
//         .then(response => {
//           setQuestionsData(response.data);
//         })
//         .catch(error => {
//             console.error('Error fetching array data:', error);
//         });
// }, []);



const userResponses = [
  // User's responses here
];


useEffect(() => {
  // Fetch data from the backend API
  fetch('http://localhost:8000/api/questionsData')
    .then(response => response.json())
    .then(data => setQuestionsData(data))
    .catch(error => console.error('Error fetching data:', error));
}, []);




  const [userData, setUserData] = useState([]);
  useEffect(() =>{
    setUserData( questionsData?.map((question) => ({ ...question, isSelected: 'not selected' }))
   )
  }, [questionsData])
  
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  
  const handleOptionChange = (event) => {
    // event.preventDefault();
    // console.log(questionsData);
    console.log(userData);
    const updatedUserData = [...userData];
    updatedUserData[currentQuestion].isSelected = event.target.value;
    setUserData(updatedUserData);
    console.log("handleoption change");
  };


  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    // calculateScore();
    dispatch(showResults());
  };

  // const calculateScore = () => {
  //   let score = 0;
  //   userData.forEach((question) => {
  //     if (question.isSelected === question.answer) {
  //       score++;
  //     }
  //   });
  //   dispatch(quizScore(score));    
  // };

  useEffect(() => {
    let interval;

    if (timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      handleSubmit(); // Automatically submit when time runs out
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeRemaining]);

  let divisor_for_minutes = timeRemaining % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);
  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  const handleSendData = async () => {
    try {
      const response = await sendDataToBackend(userData);
      console.log('Data sent successfully:', response);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const validate = () => {
    fetch('http://localhost:8000/api/useranswer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userData })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Received data:', data);
      const receivedScore = data.score;
      console.log('Received score:', receivedScore);
      setScore(receivedScore); // Update the score state with the received score
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };

  return (

    <>
    {!view ? (
      <div>
      
      {!show ? (
        <form onSubmit={handleSubmit}>
          <div className='ques-main'>
            <div className='ques-container'>
            <h1 className='head'>RPA QUIZZ COMPETITION</h1>
            
            <h4 className='time'><AiOutlineFieldTime/>  {minutes} : {seconds} sec</h4>
          <h4>{questionsData[currentQuestion]?.id} . {questionsData[currentQuestion]?.question}</h4>
          {questionsData[currentQuestion]?.options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`q${currentQuestion}-${index}`}
                name={`q${currentQuestion}`}
                value={option}
                checked={userData[currentQuestion]?.isSelected === option}
                onChange={handleOptionChange}
              />
              <label htmlFor={`q${currentQuestion}-${index}`}>{option}</label>
            </div>
          ))}
            </div>
          </div>
          
          <br />
          <div className="btn-container">
            <div className='btn'>

          {currentQuestion > 0 && <div type="button" onClick={() => dispatch(decrement())} className='prev'>Previous</div>}
          {currentQuestion < questionsData.length - 1 && <div type="button" onClick={() => dispatch(increment())} className='next'>Next</div>}
          {currentQuestion === questionsData.length - 1 && <div type="submit" className='submit' onClick={() => {dispatch(userAnswer(userData));handleSubmit(); handleSendData();validate();}}>Submit</div>}
            </div>
          </div>
          
          
        </form>
      ) : (
        <div className='score-main'>
          <div className='score-container'>

          <h1>Congratuluations you completed your test</h1>
          <h3 className='score'>You Scored: {score} Out of {questionsData.length} questions</h3>
          <div className='btn-container'>
            <div className='btn'>
              <div onClick={() => dispatch(viewRes())} className='show'>SHOW RESLUT</div>

            </div>

          </div>
          </div>
        </div>

      )
      }
      
    </div>
    ) : (
      <div>
      {viewRes && (<Result/>)}
    </div>
    )}
    </>
    
  );
  
};

export default Quiz1;