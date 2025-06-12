
import LoginRegister from './Components/Assets/LoginRegister/LoginRegister'
import Header from './Components/Assets/Header'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path={''} index element={  
        <div>
      <main>
        <Header />
      </main> 
    </div> 
  } />
      <Route path={'/login'} element={
        <main>
        <Header />
          <div>
          <LoginRegister />
        </div>
        </main>
      }/>
      <Route path={'/'} element={
        <main>
          <Header />
          <div>
            <h1>Welcome to the Home Page</h1>
          </div>
        </main>
      }/>
    </Routes>
  )
  
}

export default App
