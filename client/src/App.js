import { Route } from "react-router-dom/cjs/react-router-dom.min";
import ChatPage from "./Pages/ChatPage";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import ProtectedRoute from "./Route/ProtectedRoute";

function App() {
  return (
    <div className="App w-full">
      <Route path="/signup" component={SignUp} exact />
      <Route path="/login" component={Login} exact />
      <ProtectedRoute path="/chat" component={ChatPage} exact />
    </div>
  );
}

export default App;
