import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import GearIcon from "@rsuite/icons/legacy/Gear";
import PeopleGroup from "@rsuite/icons/legacy/PeopleGroup";
import DocPassIcon from "@rsuite/icons/DocPass";
import DetailIcon from "@rsuite/icons/Detail";
import CalendarIcon from "@rsuite/icons/Calendar";
import ExportIcon from "@rsuite/icons/Export";
import React from "react";
import "rsuite/dist/rsuite.min.css";

const icons = {
  dashboard: <DashboardIcon />,
  employees: <GroupIcon />,
  contracts: <DocPassIcon />,
  assignments: <DetailIcon />,
  clients: <PeopleGroup />,
  ptos: <CalendarIcon />,
  settings: <GearIcon />,
  reports: <ExportIcon />,
};

export const CustomMenu = () => {
  const config = JSON.parse(localStorage.getItem("config")) || {};
  return (
    <div style={{ width: 240 }}>
      <Sidenav appearance={ 'subtle' }>
        <Sidenav.Body>
          <Nav activeKey="1">
            {config.menu &&
              config.menu.map((item, index) => {
                return item.href && !item.submenu ? (
                  <Nav.Item
                    key={item.key}
                    eventKey={item.key}
                    icon={icons[item.icon]}
                    href={item.href}
                  >
                    {item.name}
                  </Nav.Item>
                ) : (
                  <Nav.Menu
                    key={item.key}
                    eventKey={item.key}
                    icon={icons[item.icon]}
                    title={item.name}
                  >
                    {item.submenu &&
                      item.submenu.map((submenu, submenuIndex) => {
                        return (
                          <Nav.Item
                            key={submenu.key}
                            eventKey={submenu.key}
                            href={submenu.href}
                          >
                            {submenu.name}
                          </Nav.Item>
                        );
                      })}
                  </Nav.Menu>
                );
              })}
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};
