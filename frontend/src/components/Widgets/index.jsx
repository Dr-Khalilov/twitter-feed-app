import {
    TwitterShareButton,
    TwitterTimelineEmbed,
    TwitterTweetEmbed,
} from 'react-twitter-embed';
import { Search } from '@mui/icons-material';
import './Widgets.css';

export const Widgets = () => (
    <div className="widgets">
        <div className="widgets__input">
            <Search className="widgets__searchIcon" />
            <input type="text" placeholder="Search Twitter" />
        </div>
        <div className="widgets__widgetContainer">
            <h2>What's happening?</h2>
            <TwitterTweetEmbed tweetId="1526926907090128898" />
            <TwitterTimelineEmbed
                sourceType="profile"
                options={{ height: 400 }}
            />
            <TwitterShareButton
                url="https://cv-umar-khalilov-100.herokuapp.com/"
                options={{ text: 'Backend Engineer' }}
            />
        </div>
    </div>
);