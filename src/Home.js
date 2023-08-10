import { useState } from "react";
import Quiz1 from "./quiz";
import './Home.scss'

const Home = () =>{
    const [starttest, setStartTest] = useState(false);

    const handleStartQuizz = () => {
        setStartTest(true);
    }


    return(
        <>
        {!starttest ? (
            <div className="main">
                <div className="container">

                <h1 className="head">WELCOME TO THE QUIZZ APP</h1>
                <div className="btn-main">

                <div className="btn-container">

                <div onClick={handleStartQuizz} className="btn">start test</div>
                </div>
                </div>
                </div>
            </div>
            
            
        ) : (
            <Quiz1/>
        )}
        </>
    )
}

export default Home;