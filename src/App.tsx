import { Route, Routes } from "react-router-dom"
import LoginForm from "./pages/SignIn"
import Main from "./pages/Main"

function App() {
  return (
    <div className='w-full flex justify-center'>
      <Routes>
        <Route index path="/app" element={<Main />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/renovation/:track" element={<LoginForm />} />
      </Routes>
    </div>
  )
}

export default App
