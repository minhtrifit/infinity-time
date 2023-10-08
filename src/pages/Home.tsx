import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const Home = () => {
  const uid = useSelector<RootState, string>((state) => state.user.uid);

  const navigate = useNavigate();

  useEffect(() => {
    if (uid === "") navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  return <div>Home</div>;
};

export default Home;
