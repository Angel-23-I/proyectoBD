import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";

import RegisterPage from "./pages/RegisterPage";
import  LoginPage  from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import TasksFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";

import { ProtectedRoute } from "./ProtectedRoute";
import { TaskProvider } from "./context/tasksContext";
import { Navbar } from "./components/Navbar";



function App() {
  return (
    <AuthProvider>
      <TaskProvider>
      <BrowserRouter>
      <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-task" element={<TasksFormPage/>} />
                <Route path="/tasks/:id" element={<TasksFormPage/>} />
                <Route path="/profile" element={<ProfilePage/>} />
              </Route>
            </Routes>
      </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
