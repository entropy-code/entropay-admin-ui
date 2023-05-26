import React, { PropsWithChildren } from "react";
import { useListContext, Datagrid, DatagridProps } from "react-admin";

import { IContract } from "../../types";

interface FilteredDatagridProps {
  dataGridProps?: DatagridProps;
  filterFn: (data: IContract) => boolean;
}

export const FilteredDatagrid = ({
  children,
  filterFn,
  dataGridProps = {},
}: PropsWithChildren<FilteredDatagridProps>) => {
  const { data, isLoading } = useListContext<IContract>();
  if (isLoading) {
    return null;
  }
  return (
    <Datagrid data={data.filter(filterFn)} {...dataGridProps}>
      {children}
    </Datagrid>
  );
};
