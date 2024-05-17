import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      HomePage
      <Link to={"/login"}>Login</Link>
    </>
  );
};

export default Home;
