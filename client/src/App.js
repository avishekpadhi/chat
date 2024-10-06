import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import ProtectedRoute from "./Route/ProtectedRoute";

function App() {
  return (
    <div className="App w-full">
      <Route path="/signup" component={SignUp} exact />
      <Route path="/login" component={Login} exact />
      <ProtectedRoute path="/chat" component={ChatPage} exact />
      {/* <Route path="*" exact>
        <Redirect to="/login" />
      </Route> */}
    </div>
  );
}

export default App;
