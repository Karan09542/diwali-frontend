import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SignupComponent from "./SignupComponent/SignupComponent";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomeComponent />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />

        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
