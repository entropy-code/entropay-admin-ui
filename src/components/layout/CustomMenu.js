import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import GearIcon from '@rsuite/icons/legacy/Gear';
import PeopleGroup from '@rsuite/icons/legacy/PeopleGroup';
import React from 'react'
import 'rsuite/dist/rsuite.min.css';

// TODO read from BE

const menu = [
  {
    name: 'Dashboard',
    href: '/#/',
    icon: <DashboardIcon />,
    key: 1
  },
  {
    name: 'Employees',
    href: '/#/employees',
    icon: <GroupIcon />,
    key: 2
  },
  {
    name: 'Clients',
    href: '/#/clients',
    icon: <PeopleGroup />,
    key: 3
  },
  {
    name: 'Settings',
    icon: <GearIcon />,
    key: 4,
    childs: [
      {
        name: 'Companies',
        href: '/#/companies',
        key: 4.1
      },
      {
        name: 'Projects',
        href: '/#/projects',
        key: 4.2
      },
      {
        name: 'Project types',
        href: '/#/project-types',
        key: 4.3
      },
      {
        name: 'Roles',
        href: '/#/roles',
        key: 4.4
      },
      {
        name: 'Seniorities',
        href: '/#/seniorities',
        key: 4.5
      },
      {
        name: 'Tenants',
        href: '/#/tenants',
        key: 4.6
      },
    ]
  }

];

export const CustomMenu = () => (
  <div style={{ width: 240 }}>
    <Sidenav>
      <Sidenav.Body>
        <Nav activeKey="1">
        {menu && menu.map((item, index) => {
            return (
              item.href && !item.child 
              ? <Nav.Item key={item.key} eventKey={item.key} icon={item.icon} href={item.href}>{item.name}</Nav.Item>
              : <Nav.Menu eventKey={item.key} icon={item.icon} title={item.name}>
                {item.childs && item.childs.map((submenu, submenuIndex) => {
                  return (
                    <Nav.Item key={submenu.key} eventKey={submenu.key} href={submenu.href}>{submenu.name}</Nav.Item>
                  )})}
                </Nav.Menu>
            )})}
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  </div>
);
