import { useRef, useState, useEffect } from "react";
import useAuth from '../hooks/useAuth'

import axios from "../api/axios";
import { AxiosError } from "axios";

import { Link, useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = "/auth/login";



const Login = () => {

    const auth = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // console.log(auth)

    const emailRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');

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
            const loginData = response?.data;
            if (loginData) {
                delete loginData.msg
                console.log(loginData)
                auth.setAuth(loginData);
            }
            setEmail('');
            setPassword('');
            navigate(from, {replace: true});

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
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
          </p>

          <form className="auth-form-wrapper" onSubmit={handleSubmit}>
            <h1>Sign In</h1>
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
              Don't have an account?
              <br />
              <span>
                <Link to="/register">Sign Up</Link>
              </span>
            </p>
          </div>
        </section>
  );
};

export default Login;
