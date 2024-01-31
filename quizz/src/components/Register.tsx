
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios'
import { AxiosError } from "axios";

//name inputs must be 2-50 characters, alpha characters only
const NAME_REGEX = /^[a-zA-Z]{2,50}$/;

//username must be 3-23 characters, starting with upper or lower letter, can contain letters, digits, hyphens, underscores
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

//email must be in correct format
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

//password must be 8-24 characters, requires lowercase, uppercase, digit, special character
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = '/auth/register';

const Register = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    const [first_name, setFirst_name] = useState("");
    const [validFirst_name, setValidFirst_name] = useState(false);
    const [first_nameFocus, setFirst_nameFocus] = useState(false);

    const [last_name, setLast_name] = useState("");
    const [validLast_name, setValidLast_name] = useState(false);
    const [last_nameFocus, setLast_nameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);
    
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current?.focus();
    }, [])

    useEffect(() => {
      //checking for valid username, set valid 'validName' appropriately
      const userNameCheck = USER_REGEX.test(username);
      const first_nameCheck = NAME_REGEX.test(first_name);
      const last_nameCheck = NAME_REGEX.test(last_name);
      const email_check = EMAIL_REGEX.test(email);
      setValidUsername(userNameCheck);
      setValidFirst_name(first_nameCheck);
      setValidLast_name(last_nameCheck);
      setValidEmail(email_check);
    }, [last_name, first_name, username, email])

    useEffect(() => {
        //checking for valid password, and if it matches the confirmation password
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = password === matchPassword;
        setValidMatch(match);
    }, [password, matchPassword])

    useEffect(() => {
        // reset errMsg as user is adjusting their entries
        console.log(errMsg)
        setErrMsg('');
    }, [first_name, username, password, matchPassword])

    const handleSubmit = async (
      event: { preventDefault: () => void; }
    ) => {
      event.preventDefault();

      // double check validity of inputs (incase of hack)
      const v1 = USER_REGEX.test(username);
      const v2 = PWD_REGEX.test(password);
      if (!v1 || !v2) {
        setErrMsg("Invalid entry");
        return;
      }

      const payload = JSON.stringify({
        first_name,
        last_name,
        email,
        username,
        password,
        matchPassword
      });

      console.log(payload)

      try {
        console.log("first")
        const response = await axios.post(
          REGISTER_URL,
          JSON.stringify({
            first_name,
            last_name,
            email,
            username,
            password,
            matchPassword,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response.data);
        setSuccess(true);
      } catch (error) {
        const err = error as AxiosError
        console.log(error)
        // Try to refine this
        if (!err?.response) {
          setErrMsg('No Server Response')

          // check that this is valid
        } else if (err.response?.status === 409) {
          setErrMsg('Username Taken');
        } else {
          setErrMsg('Registration Failed')
        }

      }

      
    };

    return (
      <>
        {success ? (
          <section>
            <h1>Success!</h1>
            <p>
              <a href="#">Sign In</a>
            </p>
          </section>
        ) : (
          <section>
            <p
              // ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              // aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Register</h1>

            <form onSubmit={handleSubmit} className="reg-form-wrapper">
              <div className="reg-half">
                <label htmlFor="first_name">
                  First Name:
                  <span className={validFirst_name ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={
                      validFirst_name || !first_name ? "hide" : "invalid"
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setFirst_name(e.target.value)}
                  required
                  aria-invalid={validFirst_name ? "false" : "true"}
                  aria-describedby="first_nameNote"
                  onFocus={() => setFirst_nameFocus(true)}
                  onBlur={() => setFirst_nameFocus(false)}
                />
                <p
                  id="first_nameNote"
                  className={
                    first_nameFocus && first_name && !validFirst_name
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  2 to 50 characters.
                  <br />
                  Must contain alpha characters only.
                </p>
              </div>

              <div className="reg-half">
                <label htmlFor="last_name">
                  Last Name:
                  <span className={validLast_name ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={
                      validLast_name || !last_name ? "hide" : "invalid"
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="text"
                  id="last_name"
                  autoComplete="off"
                  onChange={(e) => setLast_name(e.target.value)}
                  required
                  aria-invalid={validLast_name ? "false" : "true"}
                  aria-describedby="last_nameNote"
                  onFocus={() => setLast_nameFocus(true)}
                  onBlur={() => setLast_nameFocus(false)}
                />
                <p
                  id="last_nameNote"
                  className={
                    last_nameFocus && last_name && !validLast_name
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  2 to 50 characters.
                  <br />
                  Must contain alpha characters only.
                </p>
              </div>

              <div className="reg-full">
                <label htmlFor="username">
                  Username:
                  <span className={validUsername ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={validUsername || !username ? "hide" : "invalid"}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="text"
                  id="username"
                  // ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  aria-invalid={validUsername ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setUsernameFocus(true)}
                  onBlur={() => setUsernameFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    usernameFocus && username && !validUsername
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </div>

              <div className="reg-full">
                <label htmlFor="email">
                  Email:
                  <span className={validEmail ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validEmail || !email ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  // ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p
                  id="emailnote"
                  className={
                    emailFocus && email && !validEmail
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must include @ symbol
                  <br />
                  Must contain a domain name with at least one dot
                  <br />
                  Must be 3 - 320 characters.
                </p>
              </div>

              <div className="reg-full">
                <label htmlFor="password">
                  Password:
                  <span className={validPassword ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={validPassword || !password ? "hide" : "invalid"}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-invalid={validUsername ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    matchFocus && !validPassword ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
              </div>

              <div className="reg-full">
                <label htmlFor="confirm_pwd">
                  Confirm Password:
                  <span
                    className={validMatch && matchPassword ? "valid" : "hide"}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={
                      validMatch || !matchPassword ? "hide" : "invalid"
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <input
                  type="password"
                  id="confrim_pwd"
                  onChange={(e) => setMatchPassword(e.target.value)}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    passwordFocus && !validPassword
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match the first password input field.
                </p>
              </div>

              <div className="reg-footer">
                <button
                  disabled={
                    !validUsername || !validPassword || !validMatch
                      ? true
                      : false
                  }
                >
                  Sign Up
                </button>
                <p>
                  Already registered?:
                  <br />
                  <a href="#">Sign In</a>
                </p>
              </div>
            </form>
          </section>
        )}
      </>
    );
}

export default Register

