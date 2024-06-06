import Fuse, { FuseOptionKey } from "fuse.js";

import { useMemo } from "react";

export const useTextFilter = <ListItem>({
  list,
  keys,
  filterValue,
}: {
  list: ListItem[];
  keys: FuseOptionKey<ListItem>[];
  filterValue: string;
}) => {
  const fuse = useMemo(
    () =>
      new Fuse(list, {
        keys,
      }),
    [keys, list]
  );

  const filteredList = useMemo(
    () =>
      filterValue ? fuse.search(filterValue).map(({ item }) => item) : list,
    [fuse, list, filterValue]
  );

  return filteredList;
};

export default useTextFilter;
