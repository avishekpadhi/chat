import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import ProtectedRoute from "./Route/ProtectedRoute";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";

function App() {
  return (
    <div className="App w-full">
      <Route path="/signup" component={SignUp} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/chat" component={ChatPage} exact />
    </div>
  );
}

export default App;
