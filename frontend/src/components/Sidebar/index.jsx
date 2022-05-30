import {
    BookmarkBorder as BookmarkBorderIcon,
    Home as HomeIcon,
    ListAlt as ListAltIcon,
    MailOutline as MailOutlineIcon,
    MoreHoriz as MoreHorizIcon,
    NotificationsNone as NotificationsNoneIcon,
    PermIdentity as PermIdentityIcon,
    Search as SearchIcon,
    Twitter as TwitterIcon,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { SidebarOption } from '../SidebarOption';
import './Sidebar.css';

export const Sidebar = () => (
    <div className="sidebar">
        <TwitterIcon className="sidebar__twitterIcon" />
        <SidebarOption Icon={HomeIcon} text="Home" active={true} />
        <SidebarOption Icon={SearchIcon} text="Explore" />
        <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
        <SidebarOption Icon={MailOutlineIcon} text="Messages" />
        <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
        <SidebarOption Icon={ListAltIcon} text="Lists" />
        <SidebarOption Icon={PermIdentityIcon} text="Profile" />
        <SidebarOption Icon={MoreHorizIcon} text="More" />
        <Button className="sidebar__tweet" fullWidth>
            Tweet
        </Button>
    </div>
);
