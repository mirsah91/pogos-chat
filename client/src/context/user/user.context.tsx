import React from "react";

export type UserContextType = {
    user: string | null;
    setUser: React.Dispatch<React.SetStateAction<string | null>>;
};

export const UserContext = React.createContext<UserContextType | undefined>(undefined);
