import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
import './App.css'
import CircleInfo from './components/icons/CircleInfo'
import PaperPlaneIcon from './components/icons/PaperPlaneIcon'
import RotateLeftIcon from './components/icons/RotateLeftIcon'

interface Attempt {
  guess: string
  cows: number
  bulls: number
}
function App() {
  const attempts = useRef<Attempt[]>([])
  const secretNumber = useRef('')
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState({
    show: false,
    text: '',
    variant: '',
  })

  function isMobile() {
    return window.innerWidth <= 768
  }

  function generateSecretNumber() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let secret = ''
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length)
      secret += numbers[randomIndex]
      numbers.splice(randomIndex, 1)
    }
    return secret
  }

  function hasDuplicates(value: string) {
    const digits = value.split('')
    return digits.some(
      (digit: string, index: number) => digits.indexOf(digit) !== index
    )
  }

  function validateInput(e: ChangeEvent<HTMLInputElement>) {
    const inputElement = e.target as HTMLInputElement
    const currentValue = inputElement.value
    const validValue = currentValue.replace(/[^1-9]/g, '')

    if (currentValue !== validValue) {
      inputElement.value = validValue
      inputElement.setCustomValidity(
        'Please enter a 4-digit number with digits from 1 to 9 (inclusive)'
      )
    } else if (hasDuplicates(currentValue)) {
      inputElement.setCustomValidity('No duplicate digits allowed')
    } else {
      inputElement.setCustomValidity('')
      setGuess(() => inputElement.value)
    }
  }

  function calculateBullsAndCows(guess: string) {
    let bulls = 0
    let cows = 0

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === secretNumber.current[i]) {
        bulls++
      }
      if (secretNumber.current.includes(guess[i])) {
        cows++
      }
    }

    return { bulls, cows }
  }

  function submitGuess(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (attempts.current.length < 10) {
      const { bulls, cows } = calculateBullsAndCows(guess)
      attempts.current.push({
        guess: guess,
        cows,
        bulls,
      })

      if (bulls === 4) {
        setMessage(() => {
          return {
            show: true,
            text: `You won! The secret number is ${secretNumber}.`,
            variant: 'success',
          }
        })
      } else if (attempts.current.length === 10) {
        setMessage(() => {
          return {
            show: true,
            text: `Game over. The secret number was ${secretNumber}.`,
            variant: 'danger',
          }
        })
      }
    }

    setGuess(() => '')
  }

  function resetGame() {
    attempts.current = []
    secretNumber.current = generateSecretNumber()
    setMessage(() => {
      return {
        show: false,
        text: '',
        variant: '',
      }
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    secretNumber.current = generateSecretNumber()
  }, [])

  return (
    <div className='container-sm'>
      <div className='row justify-content-md-center'>
        <div className='col col-sm-6 col-md-6 col-lg-4 col-xl-3'>
          <h1 className='text-center my-2'>Guess the 4-digit number</h1>
          <p className='text-center d-none d-sm-block'>
            Try to guess the secret 4-digit number with unique digits from 1 to
            9.
            <br />
            You have 10 attempts.
          </p>
          <table className='table table-responsive table-striped table-hover'>
            <thead>
              <tr>
                <th scope='col' className='guess-column'>
                  Guess
                </th>
                <th scope='col' className='goods-column'>
                  <span className='d-flex align-items-center popper'>
                    <span className='me-1'>Goods</span>
                    <CircleInfo />
                    <span className='poppertext'>
                      Number of digits in the guess that <br />
                      are in the secret number but <br />
                      in a different position.
                    </span>
                  </span>
                </th>
                <th scope='col' className='corrects-column'>
                  <span className='d-flex align-items-center popper'>
                    <span className='me-1'>Corrects</span>
                    <CircleInfo />
                    <span className='poppertext'>
                      Number of digits in the guess that <br />
                      are in the correct position.
                    </span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {Array(10).map((_, index) => {
                return (
                  <tr key={index} className='table-row'>
                    <td>
                      {attempts.current[index]?.guess ? (
                        <span className='fade-in fade-out'>
                          {attempts.current[index]?.guess}
                        </span>
                      ) : null}
                    </td>
                    <td>
                      {attempts.current[index]?.cows !== undefined ? (
                        <span className='fade-in fade-out'>
                          {attempts.current[index]?.cows}
                        </span>
                      ) : null}
                    </td>
                    <td>
                      {attempts.current[index]?.bulls !== undefined ? (
                        <span className='fade-in fade-out'>
                          {attempts.current[index]?.bulls}
                        </span>
                      ) : null}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {message.show ? null : (
            <form onSubmit={submitGuess} className='form-inline d-flex'>
              <div className='input-group'>
                <input
                  value={guess}
                  type='text'
                  pattern='^(?!.*(.).*\1)[1-9]{1,4}$'
                  maxLength={4}
                  placeholder='Enter your guess'
                  required
                  className='form-control'
                  disabled={attempts.current.length === 10 || message.show}
                  readOnly={isMobile()}
                  onChange={validateInput}
                />
                <button
                  disabled={guess.length < 4}
                  type='submit'
                  className='btn btn-primary ml-2'
                >
                  <PaperPlaneIcon />
                </button>
              </div>
            </form>
          )}
          {message.show ? (
            <div
              className={['alert mt-3', `alert-${message.variant}`].join(' ')}
            >
              {message.text}
              <button
                onClick={resetGame}
                className='btn btn-sm btn-outline-secondary ml-2'
              ></button>
            </div>
          ) : (
            <div className='text-center my-4'>
              <button
                onClick={resetGame}
                className='btn btn-sm btn-outline-secondary ml-2'
              >
                <RotateLeftIcon className='me-1' />
                Reset
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
