import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

type ContainerProps = {
    children: ReactNode;
}

type AuthContextType = {
  auth: string;
  setAuth: Dispatch<SetStateAction<string>>;
};

const AuthContextState = {
    auth: '',
    setAuth: () => ''
}

const AuthContext = createContext<AuthContextType>(AuthContextState);

export const AuthProvider = (props: ContainerProps) => {

  const [auth, setAuth] = useState<string>('');

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext