import React from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    input: {
        borderRadius: '25px',
    },
});

interface Props {
    message: string;
    onMessageChange: (message: string) => void;
    onSend: () => void;
}

const ChatInput: React.FC<Props> = ({ message, onMessageChange, onSend }) => {
    const classes = useStyles();

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    }

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={10}>
                <TextField
                    className={classes.input}
                    fullWidth
                    multiline
                    maxRows={3}
                    value={message}
                    onChange={(e) => onMessageChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={2}>
                <Button onClick={onSend} variant="contained" color="primary" disabled={!message.trim()}>
                    Send
                </Button>
            </Grid>
        </Grid>
    );
}

export default ChatInput;
