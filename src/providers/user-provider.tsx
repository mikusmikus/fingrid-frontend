import { createContext, useContext } from 'react';

type User = {
  email: string;
  role: string;
  id: number;
};

type UserContextProps = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({
  children,
  user,
  isLoading,
  setUser,
}: {
  children: React.ReactNode;
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
}) => {
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
