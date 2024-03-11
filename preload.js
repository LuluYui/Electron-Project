/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  fetchData: async () => {
    try {
      const data = await ipcRenderer.invoke('fetch-data');
      return data;
    } catch (error) {
      console.error('Error invoking remote method \'fetch-data\':', error);
      throw error;
    }
  }
});