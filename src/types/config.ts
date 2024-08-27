export type ConfigPermissions = {
  permissions: {
    entity: string;
    actions: string[];
  }[];
};

export type ConfigMenu = {
  menu: {
    name: string;
    icon: string;
    href?: string;
    submenu?: { name: string; icon: string; href: string }[];
  }[];
};
