import * as React from "react";

const { ipcRenderer } = window.require('electron');

export function useFileSave(callback: () => void, dependencies: any[] = []) {
    React.useEffect(() => {
        ipcRenderer.on('saveFile', callback);
        return () => {
            console.log('removed listener for', callback);
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
