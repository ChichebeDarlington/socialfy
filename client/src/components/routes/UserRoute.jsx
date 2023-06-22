import { useEffect, useState } from "react";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";
import { useStateContext } from "../../components/context/AppContext";
import { useNavigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);
  const { state } = useStateContext();

  useEffect(() => {
    if (state && state.token) getCurrentUser();
  }, [state && state.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/user/current-user`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (data.ok) {
        setOk(true);
      } else {
        navigate("/login");
      }
    } catch (err) {
      navigate("/login");
    }
  };

  state === null &&
    setTimeout(() => {
      getCurrentUser();
    }, 1000);

  return !ok ? (
    <SyncOutlined
      spin
      className="d-flex justify-content-center display-1 text-primary p-5"
    />
  ) : (
    <> {children}</>
  );
};

export default UserRoute;
