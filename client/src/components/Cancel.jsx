import { useNavigate } from "react-router-dom";

const Cance = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <button onClick={navigate("/")}>Go to home page</button>
        <button>Cancel</button>
      </div>
    </div>
  );
};

export default Cance;
