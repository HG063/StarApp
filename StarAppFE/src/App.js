// npm install
// npm install react-bootstrap bootstrap@5.1.3
// npm install react-router-dom
// npm install axios
// npm i react-paginate
// npm i sweetalert
// npm install cypress
// npm start
// npm run cypress
// npm test
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { UserAdmin } from "./pages/UserAdmin";
import { AllowanceDashboard } from "./pages/AllowanceDashboard";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import "./css/index.css";
import UserProfile from "./pages/UserProfile/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Upload from "./pages/Upload";
import RestrictedRoute from "./components/RestrictedRoute";
import NotAuthorized from "./pages/NotAuthorized";
import UploadProtected from "./components/UploadProtected";
import AllowanceProtected from "./components/AllowanceProtected";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route path="/Requestaccess" element={<Register />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/About" element={<About></About>}></Route>
          <Route path="/Contact" element={<Contact></Contact>}></Route>
          <Route path="/Policy" element={<Policy></Policy>}></Route>
          {/* protected */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/UserProfile" element={<UserProfile />}></Route>
            <Route path="/NotAuthorized" element={<NotAuthorized />}></Route>

            {/*Admin restricted*/}
            <Route path="/" element={<RestrictedRoute />}>
              <Route path="/UserAdmin" element={<UserAdmin />}></Route>
            </Route>

            {/*Upoload dev restricted */}
            <Route path="/" element={<UploadProtected />}>
              <Route path="/Upload" element={<Upload />}></Route>
            </Route>

            {/*Allowance restricted */}
            <Route path="/" element={<AllowanceProtected />}>
              <Route
                path="/AllowanceDashboard"
                element={<AllowanceDashboard />}
              ></Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
