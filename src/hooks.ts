import * as React from "react";

const { ipcRenderer } = window.require('electron');

export function useFileSave(callback: () => void, dependencies: any[] = []) {
    React.useEffect(() => {
        ipcRenderer.on('saveFile', callback);
        return () => {
            ipcRenderer.removeListener('saveFile', callback);
        }
    }, dependencies);
};

export function useFileSaveAs(callback: () => void, dependencies: any[] = []) {
    React.useEffect(() => {
        ipcRenderer.on('saveFileAs', callback);
        return () => {
            ipcRenderer.removeListener('saveFileAs', callback);
        }
    });
}

export function useSearch<T>(
    list: T[],
    searchFields: (keyof T)[]
): [T[], string, React.Dispatch<React.SetStateAction<string>>] {
    const [searchText, setSearchText] = React.useState('');

    const searchResult = React.useMemo(() => {
        return list.filter((item) => (
            searchFields.some((f) => (
                (item[f] as any).toLowerCase?.().includes(searchText.toLowerCase()))
            )
        ));
    }, [searchText, list]);

    return [searchResult, searchText, setSearchText];
}
