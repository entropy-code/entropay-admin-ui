import React from "react";
import { TopToolbar, CreateButton } from "react-admin";
import BackButton from "../buttons/BackButton";
import CancelButton from "../buttons/CancelButton";
import { ConfigPermissions } from "../../types";

export const EntityViewActions = ({ entity }: { entity: string }) => {
  return (
    <TopToolbar sx={{ justifyContent: "space-between" }}>
      <div style={{ display: "flex" }}>
        <BackButton />
      </div>
      {HasPermissions(entity, "create") && <CreateButton />}
    </TopToolbar>
  );
};

export const EntityCreateEditActions = () => {
  return (
    <TopToolbar sx={{ justifyContent: "space-between" }}>
      <div style={{ display: "flex" }}>
        <CancelButton />
      </div>
    </TopToolbar>
  );
};

export const HasPermissions = (entity: string, action: string) => {
  const config = (JSON.parse(localStorage.getItem("config") || "{}") ||
    {}) as ConfigPermissions;
  const permissions = config.permissions || [];
  const getPermissions = (action: string) => {
    return permissions.some((element) => {
      if (element.entity === entity) {
        return element.actions.includes(action);
      }

      return false;
    });
  };
  return permissions && getPermissions(action);
};

export default EntityViewActions;
