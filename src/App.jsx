// import axios from 'axios';
// import React, { useState, useEffect } from 'react';


// const App = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios('https://the-trivia-api.com/v2/questions')
//       .then((response) => {
//         setData(response.data);
//         console.log(setData)

//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));

//     [array[i], array[j]] = [array[j], array[i]];
//   }
  
//   return array;
// }



//   return (

// <>
//  <div>
  
// </div> 
// </>

//   )
// }

// export default App



import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [question, setQuestion] = useState([]);
  const [questionState , setQuestionState] = useState(0)

  const checkedInput = useRef([]);
  useEffect(() => {
    axios("https://the-trivia-api.com/v2/questions")
      .then((res) => {
        // console.log(res.data)
        setQuestion(res.data);
      }).catch((err) => {
        console.log(err);
      })
  }, [])

  

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
    
    return array;
  }

  function nextQuestion (index){
    const checkedButton = checkedInput.current.find(input => input.checked);
    if (checkedButton) {
      const selectedValue = checkedButton.value;
      console.log("Selected answer:", selectedValue);

    }
    questionState < question.length - 1 ? setQuestionState(questionState + 1) : alert("Question Ended")
  }


  return (
    < >
    <div className='m-2'> 
      <h1 className='text-center text-2xl mb-5'>Quiz App</h1>
      {question.length > 0 ?
      <div className='flex justify-center items-center flex-col w-2/6'>
       <div>
        <h1 className='mb-5'>Q{questionState + 1}: {question[questionState].question.text}</h1>
        <ul>
          {shuffleArray([...question[questionState].incorrectAnswers , question[questionState].correctAnswer]).map((item , index)=>{
            return <li key={index}>
            <input type="radio" name='choice' id={item} value={item} ref={el => (checkedInput.current[index] = el)}/>
            <label htmlFor={item}>{item}</label>
          </li>
          
          })}
        </ul>
        <button onClick={()=> nextQuestion()} className='p-3 mx-3 mt-5 bg-slate-950 text-violet-100 rounded-lg	 '>Next</button>
      </div></div>  : <h1>Loading...</h1>}
      </div>
    </>
  )
}

export default App


    
  