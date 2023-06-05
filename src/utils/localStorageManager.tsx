

export const CleanFilters = ( resource: string ) => {
localStorage.removeItem("RaStore." + resource + ".listParams");
}