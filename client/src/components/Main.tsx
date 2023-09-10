import {Container, Typography, makeStyles, LinearProgress} from '@material-ui/core';
import React, {useEffect, useState} from "react";
import ChatRoom from "./ChatRoom";
import ChatInput from "./ChatInput";
import Login from "./Login";
import {apiRequest} from "../common/api.utils";
import {io, Socket} from 'socket.io-client';
import {useUser} from "../hooks/use-user.hook";
import {Message} from "../common/common.types";

const useStyles = makeStyles({
    root: {
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        justifyContent: 'center',
        backgroundColor: '#f7f7f7',
        padding: '2rem',
    },
});

const Main: React.FC = () => {
    const { user, setUser } = useUser();
    const [internalUser, setInternalUser] = useState("");
    const [chatId, setChatId] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState<Socket | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (username: string) => {
        await apiRequest({
            url: '/auth',
            method: 'POST',
            data: { username },
        });
        setInternalUser(username);
        const socket = io('http://localhost:3000/', {
            auth: {
                username
            }
        });

        socket.on('connect', () => {
            setSocket(socket);
        })
    };

    const handleChatJoin = async (chatName: string) => {
        setUser(internalUser);
        socket?.emit('joinChat', chatName);
        setChatId(chatName);
    }

    const sendMessage = () => {
        socket?.emit("sendMessage", JSON.stringify({
            chatId,
            from: user,
            text: message,
            createdAt: new Date().toISOString()
        }))
        setMessages([...messages, {
            from: 'Me',
            text: message,
            chatId,
            createdAt: new Date().toISOString()
        }])
        setMessage('');
    }

    const classes = useStyles();

    useEffect(() => {
        if (socket) {
            socket.on('newMessage', (data) => {
                const message = JSON.parse(data);

                const messageCopy = {...message};
                if (messageCopy.from === user) {
                    messageCopy.from = 'Me';
                }

                setMessages([...messages, messageCopy]);
            })
        }
    }, [socket, messages])

    useEffect(() => {
        if (chatId && !messages.length) {
            const getPreviousMessages = async () => {
                setLoading(true);
                let response = await apiRequest({
                    url: `/chat/${chatId}`,
                    method: 'GET',
                });
                setLoading(false);

                const modifiedMessages = response.messages.map((message: Message) => {
                    const messageCopy = {...message};
                    if (messageCopy.from === user) {
                        messageCopy.from = 'Me';
                    }

                    return messageCopy;
                })

                setMessages(modifiedMessages);
            }

            getPreviousMessages();
        }
    }, [chatId])

    return (
        <Container maxWidth="sm" className={classes.root}>
            {user ? (
                <div>
                    <Typography variant="h4" gutterBottom align='center'>Welcome to chat {chatId}</Typography>
                    {loading ? <LinearProgress /> : null }
                    <ChatRoom messages={messages} />
                    <ChatInput message={message} onMessageChange={setMessage} onSend={sendMessage} />
                </div>
            ) : (
                <Login onLogin={handleLogin} onChatJoin={handleChatJoin} />
            )}
        </Container>
    );
}

export default Main;
