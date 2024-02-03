import { useContext } from "react";
import AuthContext from "../context/authProvider";

const Home = () => {
const authTest = useContext(AuthContext);

  console.log(authTest.auth);
  return (
  
  <div>
    <button onClick={()=>console.log(authTest.auth)}>click me</button>
    Home
    </div>
  )
};

export default Home;
