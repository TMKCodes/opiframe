import { useNavigate } from "react-router-dom";

const Won = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>You won!</h1>
      <button onClick={() => navigate("/")}>Play again</button>
    </div>
  );
};

export default Won;