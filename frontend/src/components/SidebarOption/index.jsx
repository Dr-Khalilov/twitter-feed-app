import './SidebarOption.css';

export const SidebarOption = ({ text, Icon, active }) => (
  <div className={`sidebarOption ${active && 'sidebarOption--active'}`}>
    <Icon />
    <h2>{text}</h2>
  </div>
);