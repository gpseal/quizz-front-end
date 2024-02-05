import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type ContainerProps = {
    children: ReactNode;
}

type User = {
  username: string;
  token: string;
  role: string;
}

type AuthContextType = {
  auth: User;
  setAuth: Dispatch<SetStateAction<User>>;
} ;

const AuthContextState = {
  auth: { username: "", token: "", role: "" },
  setAuth: () => "",
};

const AuthContext = createContext<AuthContextType>(AuthContextState);

export const AuthProvider = (props: ContainerProps) => {

  const [auth, setAuth] = useState<User>({username:'', token:'', role:''});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext