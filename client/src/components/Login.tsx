import React, { useState } from 'react';
import {Button, TextField, Container, Typography, Snackbar, CircularProgress} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

interface Props {
    onLogin: (username: string) => void;
    onChatJoin: (chatName: string) => void;
}

const Login: React.FC<Props> = ({ onLogin, onChatJoin }) => {
    const [stage, setStage] = useState(1);
    const [username, setUsername] = useState('');
    const [chatName, setChatName] = useState('');
    const [error, setError] = useState<{ username?: string; chatName?: string }>({});
    const [openError, setOpenError] = React.useState(false);
    const [alert, setAlert] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUsernameSubmit = async () => {
        try {
            if (username.trim()) {
                setLoading(true);
                await onLogin(username);
                setStage(2);
                setError({});
                setLoading(false);
            } else {
                setError({ username: 'Username is required.' });
            }
        } catch (error: any) {
            setAlert(error.response.data.message)
            setOpenError(true);
            setLoading(false);
        }

    };

    const handleChatNameSubmit = async () => {
        try {
            if (chatName.trim()) {
                setLoading(true);
                await onChatJoin(chatName);
                setLoading(false);
            } else {
                setError({ chatName: 'Main room name is required.' });
            }
        } catch (error: any) {
            setAlert(error.response.data.message)
            setOpenError(true);
            setLoading(false);
        }
    };


    return (
        <Container component="main" maxWidth="xs">
            <Snackbar open={openError} autoHideDuration={6000} onClose={() => setOpenError(false)}>
                <Alert
                    elevation={6}
                    variant="filled"
                    severity="error"
                    onClose={() => setOpenError(false)}
                >
                    {alert}
                </Alert>
            </Snackbar>
            <Typography variant="h5">{stage === 1 ? 'Sign Up' : 'Enter Chat Name'}</Typography>
            {stage === 1 ? (
                <>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        helperText={error.username}
                        error={!!error.username}
                        disabled={loading}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleUsernameSubmit}
                        disabled={loading}
                        endIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        Next
                    </Button>
                </>
            ) : (
                <>
                    <Typography variant="body1">Welcome, {username}! Choose a chat room:</Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Main Room Name"
                        value={chatName}
                        onChange={(e) => setChatName(e.target.value)}
                        helperText={error.chatName}
                        error={!!error.chatName}
                        disabled={loading}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleChatNameSubmit}
                        endIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        Join
                    </Button>
                </>
            )}
        </Container>
    );
};

export default Login;
