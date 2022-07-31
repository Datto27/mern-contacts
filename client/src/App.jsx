import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import "./styles/global.css"
import PrivateRoute from "./routes/PrivateRoute";
import Register from "./pages/Register";
import Login from "./pages/Login"
import Home from "./pages/Home"
import { useEffect } from "react";

function App() {

  useEffect(() => {
    // აპლიკაციის პირველ ჩატვირთვაზე შემოწმდეს ტოკენის არსებობის შემთხვევაში არის თუ არა ის ვადაგასული
    // ვადის გასვლის შემთხვევაში წაიშალოს localStorage-დან
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute component={<Home />} />} />
        {/* default route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
