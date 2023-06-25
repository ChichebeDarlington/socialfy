import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AuthForm from "../components/forms/AuthForms";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("mazi@gmail.com");
  const [password, setPassword] = useState("secret123");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(name, email, password, secret);
      setLoading(true);
      const { data } = await axios.post(
        `http://localhost:8000/api/user/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("auth", JSON.stringify(data));
      navigate("/user/dashboard");
    } catch (error) {
      toast.error(error.response.data);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 text-light  bg-secondary text-light">
        <div className="col text-center">
          <h1>Login</h1>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <AuthForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            page="login"
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="text-center">
            Not yet registered? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col text-center">
          <Link to="/forgot-password" className="text-danger">
            Forgot password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
