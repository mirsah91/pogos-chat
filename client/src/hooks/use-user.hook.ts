import React from "react";
import {UserContext, UserContextType} from "../context/user/user.context";

export const useUser = (): UserContextType => {
    const context = React.useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
