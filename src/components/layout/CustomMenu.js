import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import GearIcon from '@rsuite/icons/legacy/Gear';
import PeopleGroup from '@rsuite/icons/legacy/PeopleGroup';
import React from 'react';
import { usePermissions } from 'react-admin';
import 'rsuite/dist/rsuite.min.css';

const icons = 
  {
    dashboard: <DashboardIcon />,
    employees: <GroupIcon />,
    clients: <PeopleGroup />,
    settings: <GearIcon />
  }

export const CustomMenu = () => {
  const { isLoading, configuration } = usePermissions();
  // For any reason i caanot get the config from usePermissions(), so
  // i'm reading from local storage
  const config = JSON.parse(localStorage.getItem('config')) || {}
    return (
    <div style={{ width: 240 }}>
      <Sidenav>
        <Sidenav.Body>
          <Nav activeKey="1">
          {config.menu && config.menu.map((item, index) => {
              return (
                item.href && !item.submenu 
                ? <Nav.Item key={item.key} eventKey={item.key} icon={icons[item.icon]} href={item.href}>{item.name}</Nav.Item>
                : <Nav.Menu eventKey={item.key} icon={icons[item.icon]} title={item.name}>
                  {item.submenu && item.submenu.map((submenu, submenuIndex) => {
                    return (
                      <Nav.Item key={submenu.key} eventKey={submenu.key} href={submenu.href}>{submenu.name}</Nav.Item>
                    )})}
                  </Nav.Menu>
              )})}
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  )
};
