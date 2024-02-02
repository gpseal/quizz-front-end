import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/authProvider";

import axios from "../api/axios";
import { AxiosError } from "axios";

const LOGIN_URL = "/auth/login";



const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const emailRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');

    const [success, setSuccess] = useState(false)

    useEffect(() => {
        emailRef.current?.focus();
    }, [])

    useEffect(() => {
        setErrMsg("");
    }, [email, password])

    const handleSubmit = async (event: { preventDefault: () => void }) => {
      event.preventDefault();

      try {
        const response = await axios.post(LOGIN_URL,
            JSON.stringify({email, password}),
            {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,

            }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.token;
            setAuth({accessToken})
            setEmail('');
            setPassword('');
            setSuccess(true);
      } catch (error) {
        const err = error as AxiosError
        if(!err.response) {
            setErrMsg ('No Server Response');
        }
        else {
            setErrMsg(err.response?.data.msg);
        }
      }
    };

  return (
    <>
      {success ? (<section>
        <h1>You have logged in!</h1>
        <br />
        <p>
            
        </p>
      </section>) : 
      (
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
          </p>
          <h1>Sign In</h1>

          <form className="auth-form-wrapper" onSubmit={handleSubmit}>
            <div className="reg-full">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <div className="reg-full">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>

            <div className="auth-form-footer">
              <button>Sign In</button>
            </div>
          </form>
          <div>
          <p>
            Don't have an account?<br />
            <span>
                <a href="/home">Sign Up</a>
            </span>
          </p>
          </div>
        </section>)
      }
    </>
  );
};

export default Login;
