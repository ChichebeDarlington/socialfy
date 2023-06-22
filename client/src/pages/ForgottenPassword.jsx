import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Button } from "antd";
import ForgottenPasswordForm from "../components/forms/ForgottenPasswordForm";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../components/context/AppContext";

const ForgottenPassword = () => {
  const [email, setEmail] = useState("mazi@gmail.com");
  const [newPassword, setNewPassword] = useState("secret1234");
  const [secret, setSecret] = useState("red");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const { state } = useStateContext();
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.patch(
        "http://localhost:8000/api/user/forgotten-password",
        {
          email,
          newPassword,
          secret,
        }
      );

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
      if (data.success) {
        setEmail("");
        setNewPassword("");
        setSecret("");
        setLoading(false);
        setOk(true);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (state && state.token) return <></>;

  return (
    <div className="container-fluid">
      <div className="row py-5 bg-secondary text-light">
        <div className="col text-center">
          <h1 className="text-light">Forgot password</h1>
        </div>
      </div>

      {/* form */}
      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <ForgottenPasswordForm
            email={email}
            setEmail={setEmail}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            secret={secret}
            setSecret={setSecret}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <Modal
            title="Congratulations!"
            open={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>Congrats. Now you can login with your new password.</p>
            <Link to="/login" className="btn btn-sm btn-primary">
              Login
            </Link>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ForgottenPassword;
