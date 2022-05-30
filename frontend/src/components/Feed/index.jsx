import { useEffect, useState } from 'react';
import { TweetBox } from '../TweetBox';
import { Post } from '../Post';
import { parseJsonStream } from '../utils/parseJsonStream';
import './Feed.css';

export const Feed = () => {
    const [posts, setPosts] = useState([{}]);

    useEffect(() => {
        fetch('http://localhost:3001/api/posts', {
            keepalive: true,
        }).then(async response => {
            if (response.ok) {
                let jsonData = 0;
                for await (const post of parseJsonStream(response.body)) {
                    jsonData++;
                    setPosts(post);
                }
            }
        });
    }, []);

    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>
            <TweetBox />
            {posts.map(post => (
                <ul className="ul-container">
                    <Post
                        id={post.id}
                        displayName="Dr.Khalilov"
                        text={post.text}
                        avatar="./Shining.jpg"
                        image="lalal"
                        username="dr.khalilov"
                        verified={true}
                    />
                </ul>
            ))}
        </div>
    );
};
