import './App.css'
import CircleInfo from './components/icons/CircleInfo'

function App() {
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
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
