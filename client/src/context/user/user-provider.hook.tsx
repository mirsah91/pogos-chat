import React, {ReactNode} from "react";
import { UserContext } from "./user.context";

type MyComponentProps = {
    children: ReactNode;
};

export const UserProvider = ({ children }: MyComponentProps) => {
    const [user, setUser] = React.useState<string | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
