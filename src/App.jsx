import Employees from "./pages/AdminDashboard";
import Users from "./pages/Users";
import SimpleLoginPage from "./pages/SimpleLoginPage";
import "./App.css";

function App() {
  return (
    <>
      {/* Single component view - for testing */}
      <SimpleLoginPage/>
      <Employees />
      <Users />
    </>
  );
}

export default App;