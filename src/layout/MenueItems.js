import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
// import { ReactSVG } from 'react-svg';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
// import { NavTitle } from './style';
// import versions from '../demoData/changelog.json';

const { SubMenu } = Menu;

// function MenuItems({ darkMode, toggleCollapsed, topMenu, events }) {
function MenuItems({ darkMode, toggleCollapsed, topMenu }) {
  
  const { path } = useRouteMatch();
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');
  // const { onRtlChange, onLtrChange, modeChangeDark, modeChangeLight, modeChangeTopNav, modeChangeSideNav } = events;
  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/contact/list`}>
              <FeatherIcon icon="user-plus" />
            </NavLink>
          )
        }
        key="contact"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/contact/list`}>
          Contact
        </NavLink>
      </Menu.Item>

      <SubMenu key="project" icon={!topMenu && <FeatherIcon icon="target" />} title="Orders">
        <Menu.Item key="view">
          <NavLink onClick={toggleCollapsed} to={`${path}/orders/all-orders`}>
            All Orders
          </NavLink>
        </Menu.Item>
        <Menu.Item key="views">
          <NavLink onClick={toggleCollapsed} to={`${path}/orders/create-orders`}>
            Create Order
          </NavLink>
        </Menu.Item>
      </SubMenu>

      {/* {!topMenu && <NavTitle className="sidebar-nav-title">CRUD</NavTitle>} */}

      {/* <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/settings`}>
              <FeatherIcon icon="settings" />
            </NavLink>
          )
        }
        key="settings"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/settings`}>
          Settings
        </NavLink>
      </Menu.Item> */}
    </Menu>
  );
}

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
  // events: propTypes.object,
};

export default MenuItems;