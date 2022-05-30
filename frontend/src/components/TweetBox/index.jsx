import { useState } from 'react';
import { Avatar, Button } from '@mui/material';
import './TweetBox.css';

export const TweetBox = () => {
    const [tweetMessage, setTweetMessage] = useState('');

    const sendTweet = event => {
        event.preventDefault();
        fetch('http://localhost:3001/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ text: tweetMessage }),
            keepalive: true,
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="tweetBox">
            <form>
                <div className="tweetBox__input">
                    <Avatar src="./Shining.jpg" />
                    <input
                        value={tweetMessage}
                        onChange={event =>
                            setTweetMessage(event.target.value.trim())
                        }
                        type="text"
                        placeholder="What's happening?"
                    />
                </div>
                <Button
                    onClick={sendTweet}
                    type="submit"
                    className="tweetBox__button"
                >
                    Tweet
                </Button>
            </form>
        </div>
    );
};
