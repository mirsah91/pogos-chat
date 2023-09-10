import {Container, makeStyles} from '@material-ui/core';
import React from "react";
import Main from "./components/Main";
import {UserProvider} from "./context/user/user-provider.hook";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
    padding: '2rem',
  },
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
      <UserProvider>
        <Container maxWidth="sm" className={classes.root}>
          <Main />
        </Container>
      </UserProvider>
  );
}

export default App;
