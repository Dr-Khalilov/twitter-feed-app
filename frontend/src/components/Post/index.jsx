import {
    ChatBubbleOutline,
    FavoriteBorder,
    Publish,
    Repeat,
    VerifiedUser,
} from '@mui/icons-material';
import { Avatar } from '@mui/material';
import './Post.css';

export const Post = ({
    id,
    displayName,
    username,
    verified,
    text,
    image,
    avatar,
}) => (
    <li key={id} className="post">
        <div className="post__avatar">
            <Avatar src={avatar} />
        </div>
        <div className="post__body">
            <div className="post__headerSpecial">
                <div className="post__headerText">
                    <h3>
                        {displayName}&nbsp;
                        <span className="post__headerSpecial">
                            {verified && (
                                <VerifiedUser className="post__badge" />
                            )}
                            &nbsp; @ {username}
                        </span>
                    </h3>
                </div>
                <div className="post__headerDescription">
                    <p>{text}</p>
                </div>
            </div>
            <img src={image} alt="admin" />
            <div className="post__footer">
                <ChatBubbleOutline fontSize="small" />
                <Repeat fontSize="small" />
                <FavoriteBorder fontSize="small" />
                <Publish fontSize="small" />
            </div>
        </div>
    </li>
);
