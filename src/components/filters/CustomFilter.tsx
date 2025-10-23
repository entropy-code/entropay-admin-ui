import * as React from "react";
import { AutocompleteInput, useGetList } from "react-admin";

interface CustomFilterProps {
  source: string;
  reference: string;
  label: string;
  defaultValue?: boolean;
}

const filterStyles = {
  "& .MuiInputBase-root": {
    height: "40px",
  },
};

const CustomFilter: React.FC<CustomFilterProps> = ({ source, reference, label, defaultValue }) => {
  const [allOptions, setAllOptions] = React.useState<Array<{id: string; name: string}>>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  
  // Fetch data incrementally from the specified reference table
  const { data: dataItems, isLoading, error } = useGetList(reference, {
    pagination: { 
      page: currentPage, 
      perPage: 50  // Smaller chunks for better performance
    },
    sort: { field: 'name', order: 'ASC' },
  });
  
  // Accumulate data as it loads
  React.useEffect(() => {
    if (dataItems && dataItems.length > 0) {
      setAllOptions(prev => {
        const existing = new Set(prev.map(c => c.id));
        const newOptions = dataItems
          .filter(c => !existing.has(c.id))
          .map(item => ({
            id: item.id,
            name: item.name
          }));
        return [...prev, ...newOptions];
      });

      // Check if there are more pages
      if (dataItems.length < 50) {
        setHasMore(false);
      } else if (currentPage === 1) {
        // Auto-load next few pages for better UX
        setCurrentPage(2);
      }
    }
  }, [dataItems, currentPage]);

  // Load more data when user scrolls/searches
  const loadMoreData = React.useCallback(() => {
    if (hasMore && !isLoading) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasMore, isLoading]);

  return (
    <AutocompleteInput
      label={label}
      source={source}
      choices={allOptions}
      optionText="name"
      optionValue="name"
      sx={filterStyles}
      disabled={isLoading && currentPage === 1}
      noOptionsText={
        isLoading && allOptions.length === 0
          ? "Loading options..." 
          : allOptions.length === 0 
            ? "No options found"
            : "No more options found"
      }
      // Load more when user scrolls to bottom
      ListboxProps={{
        onScroll: (event) => {
          const listbox = event.currentTarget;
          if (listbox.scrollTop + listbox.clientHeight >= listbox.scrollHeight - 10) {
            loadMoreData();
          }
        }
      }}
      loading={isLoading}
    />
  );
};

export default CustomFilter;