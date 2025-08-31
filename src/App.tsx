import { BrowserRouter, Route, Routes } from "react-router-dom";
import View from "./Pages/TaskManager/Pages/View";
import TaskLists from "./Pages/TaskManager/Pages/TaskLists";
import Login from "./auth/Pages/Login";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import SignupPage from "./auth/Pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<Login />}/>
          <Route element={<ProtectedRoutes />}>
            <Route path="/tasks" element={<TaskLists />} />
            <Route path="/tasks/:mode/:id" element={<View />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
