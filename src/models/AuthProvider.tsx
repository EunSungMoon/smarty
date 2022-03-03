import { createContext, useContext, ReactNode, useState } from "react";

type authContextType = {
  user: boolean;
  login: () => void;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  user: false,
  login: () => { },
  logout: () => { },
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<boolean>(false);
  let token = `Token ${localStorage.getItem('token')}`

  const login = () => {
    setUser(true);
  };

  const logout = () => {
    setUser(false);
    console.log('test')
    localStorage.removeItem('token')
    document.location.href = '/'
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <>
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    </>
  );
}