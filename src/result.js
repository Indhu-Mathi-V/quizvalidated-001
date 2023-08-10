
import './result.scss';
import {useSelector,useDispatch} from 'react-redux';
import {inc, dec, finish,buttonVisible} from './redux-toolkit/answerSlice';

// create a Result component
const Result =  () =>{
  
  
   const currentQuestion = useSelector((state) => state.answers.count);
   const userAnswer = useSelector((state) => state.answers.userAnswer);
   const quit = useSelector((state) => state.answers.finish);
   const button = useSelector((state) => state.answers.buttonVisible);
   const dispatch = useDispatch();
  

   // create a renderResult function to display the question obj 
    const renderResult = () =>{
      // assign the currentQuestion value to the question
        const question = userAnswer[currentQuestion];
      
        const selected = userAnswer[currentQuestion];

      // assign the user selected value in the Answer for the currentQuestion 
        const Answer = selected?.isSelected;
        
      // assign the isCorrectAnswer to the Answer value only the answer keyword is relevant to that
        const isCorrectAnswer = Answer === question?.answer;
    
      return(
            <>
        {/* Render the result data */}
        {!quit ? (
          <div className="res-main">
            <div className="res-container">
            <h3 className="head">Quiz Result</h3>
            <div>
              <h4>{question?.id}. {question?.question}</h4>
              <ul>
                {question?.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <label style={{ color: question.answer === option ? 'green' : Answer === option ? 'red' : 'black' }}>
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <p className="answer">
              Your Answer: <span style={{ color: isCorrectAnswer ? 'lime' : 'red' }}>{Answer}</span>
            </p>
          </div>

          </div>
            
        ):(
            <h1>Thanks for participating the quizz.......</h1>
        )}  
            </>
        )
    }

   // calling the renderResult() in the main parent result component 
    return (
        <>
        <div>
          {renderResult()}
          <div className="btn-container">
            {button && (

            <div className="btn">
        {currentQuestion > 0 && <div type="button" onClick={() => dispatch(dec())} className="prev">PREVIEW</div>}
             {
                 currentQuestion === userAnswer.length - 1 ? (             
                     <div onClick={() => {dispatch(finish()); dispatch(buttonVisible());}} className="finish">FINISH QUIZZ</div>
                 ) : (
                     <div onClick={() => dispatch(inc())} className="next">NEXT</div>
                 )
             }  
            </div>              
            )
            }
          </div>
        </div>  
    
        </>
    
    )

}



export default Result;