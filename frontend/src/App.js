import { Sidebar } from './components/Sidebar';
import { Feed } from './components/Feed';
import { Widgets } from './components/Widgets';
import './App.css';

export const App = () => (
    <div className="app">
        <Sidebar />
        <Feed />
        <Widgets />
    </div>
);
