import React, { useState, useEffect } from "react";
import axios from "axios";
import sendIcon from "../assets/send-chat.png";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { IconButton, Stack, styled, TextField, Typography } from "@mui/material";
import { borderRadius } from "@mui/system";

const ChatBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    height: 'auto', maxHeight: 500, width: '100%', borderRadius: '0.25rem', overflowY: 'scroll'
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
    width: 'fit-content',
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

    useEffect(() => {
        if (answer !== '') setChats([...chats, { ans: Object.values(answer)[0]?.extract }])
        setInput('')
    }, [answer])

    return (
        <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 600, height: 660, backgroundColor: "primary.light", borderRadius: '0.38rem', padding: '1rem' }}>
            <ChatBox>

                <div style={{
                    borderRadius: '0.25rem',
                    display: 'flex',
                    width: '100%',
                    height: 'fit-content',
                    margin: '0.5rem 0',
                    flexDirection: 'row',
                    // justifyContent: 'flex-start'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end'
                    }}>
                        <img src="" alt="bot-logo" />
                    </div>
                    <p style={{
                        padding: '0.5rem',
                        width: 'fit-content',
                        background: '#dfdc',
                        borderRadius: '0.5rem 0.5rem 0.5rem 0'
                    }}>
                        Want to know more about Programing <br />
                        <br />
                        Ask Me what you Want
                    </p>
                </div>

                {(chats && chats?.length !== 0) && chats?.map(msg => (
                    <MessageContainer data={msg}>
                        <Message data={msg}>{msg.qp || msg.ans}</Message>
                    </MessageContainer>
                ))}
            </ChatBox>

            <Stack flexDirection='row' justifyContent='space-between' columnGap='1rem'>
                <TextField
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