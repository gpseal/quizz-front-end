import "./App.css";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CreateQuiz from "./components/CreateQuiz";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
// import { AuthProvider } from "./context/authProvider.tsx";

const rolesAdmin: string[] = ["SUPER_ADMIN_USER", "ADMIN_USER"];
const rolesBasic: string[] = ["SUPER_ADMIN_USER", "ADMIN_USER", "BASIC_USER"];

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* private routes */}
        <Route element={<RequireAuth allowedRoles={rolesBasic} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={rolesAdmin} />}>
          <Route path="/create" element={<CreateQuiz />} />
        </Route>

        {/* default */}
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>
    </Routes>
  );
}

export default App;
