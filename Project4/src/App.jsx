
import LoginRegister from './Components/Assets/LoginRegister/LoginRegister'
import Header from './Components/Assets/Header'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route index element={  
        <div>
      <main>
        <Header />
      </main> 
    </div> 
  } />
      <Route path={'/login'} element={
          <div>
          <LoginRegister />
        </div>
      }/>
    </Routes>
  )
  
}

export default App
