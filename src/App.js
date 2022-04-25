import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home/Home';
import AuthProvider from './context/AuthProvider';
import Register from './loginRegister/Register';
import Login from './loginRegister/Login';
import PrivateRoute from './Redirects/PrivateRoute';
import DashboardMain from './components/Dashboard/DashboardMain/DashboardMain';
import UserList from './components/Dashboard/UserList/UserList';
import ProductList from './components/Dashboard/ProductList/ProductList';
import AddProduct from './components/Dashboard/AddProduct/AddProduct';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><DashboardMain /></PrivateRoute>}>
              <Route path="/dashboard" element={<UserList />} />
              <Route path="/dashboard/bookinglist" element={<ProductList />} />
              <Route path="/dashboard/addProduct" element={<AddProduct />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
