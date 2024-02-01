import { useRef, useState, useEffect } from "react";

const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [errMsg, setErrMsg] = useState<string>();

    useEffect(() => {
        emailRef.current?.focus();
    }, [])

    useEffect(() => {
        setErrMsg("");
    }, [email, password])

    const handleSubmit = async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      setEmail('');
      setPassword('');
    };

  return (
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
    </section>
  );
};

export default Login;
