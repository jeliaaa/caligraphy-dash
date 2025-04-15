import { Route, Routes } from "react-router-dom"
import LoginForm from "./pages/SignIn"

function App() {
  return (
    <div className='w-full flex justify-center'>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  )
}

export default App
