import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GradingIcon from "@mui/icons-material/Grading";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import {
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2Root,
  TreeItem2GroupTransition,
} from "@mui/x-tree-view/TreeItem2";
import { unstable_useTreeItem2 as useTreeItem } from "@mui/x-tree-view/useTreeItem2";
import { TreeItem2Provider } from "@mui/x-tree-view/TreeItem2Provider";
import { TreeItem2Icon } from "@mui/x-tree-view/TreeItem2Icon";

import { ConfigMenu } from "../../types/config";
import { MenuProps } from "react-admin";

const icons: Record<string, React.ElementType> = {
  dashboard: DashboardIcon,
  employees: GroupsIcon,
  settings: SettingsIcon,
  clients: PeopleAltIcon,
  contracts: GradingIcon,
  assignments: AssignmentIcon,
  ptos: CalendarMonthIcon,
  reports: AssessmentIcon,
  overtimes: MoreTimeIcon,
};

const CustomTreeItemRoot = styled(TreeItem2Root)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  marginBottom: theme.spacing(0.3),
  color: theme.palette.text.secondary,
  borderRadius: theme.spacing(2),
  paddingRight: theme.spacing(1),
  fontWeight: theme.typography.fontWeightMedium,
  "&.expanded": {
    fontWeight: theme.typography.fontWeightRegular,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&.focused, &.selected, &.selected.focused": {
    backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
    color: "var(--tree-view-color)",
  },
}));

const CustomTreeItemIconContainer = styled(TreeItem2IconContainer)(
  ({ theme }) => ({
    marginRight: theme.spacing(1),
  })
);

const CustomTreeItemGroupTransition = styled(TreeItem2GroupTransition)(
  ({ theme }) => ({
    marginLeft: 0,
    [`& .content`]: {
      paddingLeft: theme.spacing(2),
    },
  })
);

const CustomTreeItem = forwardRef(function CustomTreeItem<
  T extends {
    id?: string | undefined;
    itemId: string;
    label: string;
    disabled?: boolean;
    children?: React.ReactNode;
    bgColor?: string;
    color?: string;
    labelIcon?: React.ElementType;
    labelInfo?: React.ReactNode;
    colorForDarkMode?: string;
    bgColorForDarkMode?: string;
    sx?: React.CSSProperties;
  },
>(props: T, ref?: React.Ref<HTMLLIElement> | undefined) {
  const theme = useTheme();
  const {
    id,
    itemId,
    label,
    disabled,
    children,
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    colorForDarkMode,
    bgColorForDarkMode,
    ...other
  } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
  } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });

  const style = {
    "--tree-view-color":
      theme.palette.mode !== "dark" ? color : colorForDarkMode,
    "--tree-view-bg-color":
      theme.palette.mode !== "dark" ? bgColor : bgColorForDarkMode,
  };

  return (
    <TreeItem2Provider itemId={itemId}>
      <CustomTreeItemRoot {...getRootProps({ ...other, style })}>
        <CustomTreeItemContent
          {...getContentProps({
            className: clsx("content", {
              expanded: status.expanded,
              selected: status.selected,
              focused: status.focused,
            }),
          })}
        >
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              alignItems: "center",
              p: 1.1,
              pr: 12,
            }}
          >
            <Box component={LabelIcon} color="inherit" sx={{ mr: 1.5 }} />
            <Typography
              {...getLabelProps({
                sx: { display: "flex", fontWeight: "inherit", flexGrow: 1 },
              })}
            />
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </Box>
          <CustomTreeItemIconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </CustomTreeItemIconContainer>
        </CustomTreeItemContent>
        {children && (
          <CustomTreeItemGroupTransition {...getGroupTransitionProps()} />
        )}
      </CustomTreeItemRoot>
    </TreeItem2Provider>
  );
});

export const CustomMenu: React.ComponentType<
  MenuProps & {
    children: React.ReactNode;
  }
> = () => {
  const config = (JSON.parse(localStorage.getItem("config") || "{}") ||
    {}) as ConfigMenu;

  return (
    <SimpleTreeView
      slots={{
        expandIcon: ArrowRightIcon,
        collapseIcon: ArrowDropDownIcon,
      }}
      sx={{
        width: 250,
      }}
    >
      {config.menu &&
        config.menu.map((item, index) => {
          return item.href && !item.submenu ? (
            <Link to={item.href.slice(2)} style={{ textDecoration: "none" }}>
              <CustomTreeItem
                key={index}
                itemId={`id-${index}-${item.name}`}
                label={item.name}
                labelIcon={icons[item.icon]}
                sx={{ display: "flex", padding: "0", margin: "0" }}
              />
            </Link>
          ) : (
            <CustomTreeItem
              key={index}
              itemId={`id-${index}`}
              label={item.name}
              labelIcon={icons[item.icon]}
            >
              {item.submenu &&
                item.submenu.map((submenu, submenuIndex) => {
                  return (
                    <Link
                      to={submenu.href.slice(2)}
                      style={{ textDecoration: "none" }}
                    >
                      <CustomTreeItem
                        key={submenuIndex}
                        itemId={`submenu-id-${submenuIndex}-${submenu.name}`}
                        label={submenu.name}
                        labelIcon={icons[submenu.icon]}
                      />
                    </Link>
                  );
                })}
            </CustomTreeItem>
          );
        })}
    </SimpleTreeView>
  );
};
