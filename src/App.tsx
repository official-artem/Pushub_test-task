import { useCallback, useEffect, useState } from 'react';
import { deleteQuestion, getQuestions } from './api/questions';
import { Question } from './types/Question';
import './style.css';

function App() {
  const [randomElement, setRandomElement] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCorrectAnswer, setCorrectAnswer] = useState("bg-light")
  const [newQuestion, setNewQuestion] = useState(false)
  const [isUserAnswered, setUserAnswered] = useState(false)
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    const getResponse = async () => {
      const response = await getQuestions();

      setRandomElement(response)
      setNewQuestion(false);
      setUserAnswered(false)
      setAnswers([])
    }

    getResponse();
  },[newQuestion])

  console.log(newQuestion)

  const handleAddAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, type } = event.target
    
    switch (true) {
      case type === 'radio':
        setAnswers([value])
        break;

      case type === 'checkbox' && answers.includes(value):
        setAnswers((prev) => prev.filter(el => el !== value))
        break;

      default:
        setAnswers((prev) => [...prev, value])
    }
  }

  const handleClickAnswer = () => {
    if (randomElement) {
      const correctAnswer = randomElement?.answer.every(item => (
        answers.includes(item)
      ))
      const correctAnswe2 = answers.every(item => (
        randomElement?.answer.includes(item)
      ))

      setUserAnswered(true)

      switch (true) {
        case correctAnswer && correctAnswe2:
          setCorrectAnswer("bg-success");
          setAmount((prev) => prev + 2)
          break;

        default:
          setCorrectAnswer("bg-danger");
          setAmount((prev) => {
            const newAmount = prev - 3;

            if (newAmount < 0) {
              return 0;
            }

            return newAmount;
          });
      }
    }
  }

  const handleDeleteQuestion = useCallback(
      () => {
      if(randomElement) {
        return deleteQuestion(randomElement?._id);
      }
    }, []
  );

  const handleNewQuestion = () => {
    setCorrectAnswer("bg-light")
    setNewQuestion(true)
  }


  return (
    <div className="App">
      <div className="container">
        <div className={`rounded shadow rounded-4 p-5 game container-xl`}>
          {randomElement && (
            <>
              <h1 className="title pt-4">{randomElement.title}</h1>

              <h2 className="amount">Points: {amount}</h2>

              <div className="box">
              {randomElement.options.map(option => (
                <label 
                  style={{ margin: "1rem 0"}} 
                  key={option} 
                  className="radio"
                >
                  {randomElement.isMultiple 
                    ? <>
                    <input
                      style={{ margin: "0 1rem"}}
                      className={`form-check-input ${isUserAnswered ? `${randomElement.answer.includes(option) ? 'bg-success' : 'bg-danger'}` : ''}`}
                      type="checkbox" 
                      name="answer"
                      value={option}
                      onChange={handleAddAnswer}
                  />
                  {option}
                  </>
                  : <>
                    <input
                      style={{ margin: "0 1rem"}}
                      className={`form-check-input ${isUserAnswered ? `${randomElement.answer.includes(option) ? 'bg-success' : 'bg-danger'}` : ''}`}
                      type="radio" 
                      name="answer"
                      value={option}
                      onChange={handleAddAnswer}
                  />
                  {option}
                  </>
                    }
                </label>
              ))}
            </div>
            </>
            )}

            <div className='d-flex flex-column gap-3 align-items-center'>

              {!isUserAnswered 
              ? (
                <button 
                  disabled={!answers.length || isUserAnswered} 
                  className="btn button btn-primary"
                  onClick={handleClickAnswer} 
                >
                  Send
                </button>
              )
            : (
              <button
                onClick={handleNewQuestion} 
                className="button btn btn-primary"
              >
                Next question
              </button>
            )}
            
            

            <button onClick={handleDeleteQuestion} className="btn btn-warning w-25">Delete question</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default App
