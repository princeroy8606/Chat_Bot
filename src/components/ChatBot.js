import React, { useState, useEffect } from "react";
import axios from "axios";
import sendIcon from "../assets/send-chat.png";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { IconButton, Stack, styled, TextField, Typography } from "@mui/material";
import { borderRadius, padding } from "@mui/system";
import chatbot from '../assets/chatbot.png'

const ChatBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    height: 'auto', maxHeight: 500, width: '100%', borderRadius: '0.25rem', overflowY: 'scroll',
    '&::-webkit-scrollbar': {
        width: 10
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'transpernet'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'black',
        borderRadius: 5

    }
}))

const MessageContainer = styled(Stack)(({ theme, data }) => ({
    borderRadius: '0.25rem',
    width: '95%',
    height: 'fit-content',
    margin: '0.5rem 0',
    flexDirection: 'row',
    justifyContent: `${Object.keys(data)[0] === 'ans' ? 'flex-start' : 'flex-end'}`,
}))

const Message = styled(Typography)(({ theme, data }) => ({
    padding: '0.8rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    background: `${Object.keys(data)[0] === 'ans' ? '#ccc' : '#eee'}`,
    borderRadius: `${Object.keys(data)[0] === 'ans' ? '0.5rem 0.5rem 0.5rem 0' : '0.5rem 0.5rem 0 0.5rem'}`,
}))

const ChatBot = () => {
    const [input, setInput] = useState("");
    const [answer, setAnswer] = useState("");
    const [chats, setChats] = useState([])
    //API...
    const endPoint = "https://en.wikipedia.org/w/api.php?";
    const params = {
        origin: "*",
        format: "json",
        action: "query",
        prop: "extracts",
        exchars: 210,
        exintro: true,
        explaintext: true,
        generator: "search",
        gsrlimit: 1,
    };

    //Submitting query
    const handleSendQuestion = async (e) => {
        e.preventDefault();
        if (input !== '') {
            setChats([...chats, { qp: input }])
            params.gsrsearch = input
            const { data } = await axios.get(endPoint, { params });
            setAnswer(data?.query?.pages)
        } else console.log('no query')
    };
    //
    useEffect(() => {
        if (answer !== '') setChats([...chats, { ans: Object.values(answer)[0]?.extract }])
        setInput('')
    }, [answer])

    return (
        <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 300, height: 660, backgroundColor: "#fe938c", borderRadius: '1rem' }}>
            <ChatBox>
                <div style={{
                    borderRadius: '0.25rem',
                    display: 'flex',
                    maxWidth: '100%',
                    height: 'fit-content',
                    margin: '0.5rem 0',
                    flexDirection: 'row',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                    }}>
                        <img src={chatbot} alt="bot-logo" style={{
                            width: '3rem',
                            height: '3rem',
                            padding: '.5rem',

                        }} />
                    </div>
                    <p style={{
                        padding: '0.5rem',
                        width: 'fit-content',
                        background: '#dfdc',
                        borderRadius: '0.5rem 0.5rem 0.5rem 0'
                    }}>
                        Hi,<br />
                        Want to know more about Programing
                        <br />
                        Ask Me what you Want
                    </p>
                </div>

                {(chats && chats?.length !== 0) && chats?.map(msg => (
                    <MessageContainer data={msg}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}
                        >
                            {
                                msg.ans && <img src={chatbot} alt="" style={{
                                    width: '3rem',
                                    height: '3rem',
                                    padding: '.5rem',

                                }} />
                            }
                            <Message data={msg}>{msg.qp || msg.ans}</Message>
                        </div>
                    </MessageContainer>
                ))}
            </ChatBox>

            <Stack flexDirection='row' justifyContent='space-between' columnGap='1rem'
                sx={{ background: '#d9aea1', padding: '.5rem 0rem 0rem .5rem', borderRadius: '1rem', marginBottom: '.5rem' }}>
                <TextField
                    sx={{ color: '#fff' }}
                    value={input}
                    fullWidth
                    placeholder=" Ask your douts"
                    onChange={(e) => setInput(e.target.value)}
                />
                <IconButton onClick={handleSendQuestion}>
                    <img src={sendIcon} alt="Send" style={{ height: '3rem', width: '3rem' }} />
                </IconButton>
            </Stack>
        </Container>
    );
};

export default ChatBot;