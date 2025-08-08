// In electron/preload.ts

import { contextBridge, ipcRenderer } from 'electron';

// This interface defines the API you're exposing.
// It's a great practice to export it, so you can share it with your renderer process.
export interface IElectronAPI {
  login: (credentials: { username: string; password: string }) => Promise<{
    success: boolean;
    data?: string; // Optional property
    error?: string; // Optional property
  }>;
}

// Define the actual API object
const api: IElectronAPI = {
  login: (credentials) => ipcRenderer.invoke('login:start', credentials),
};

// Securely expose the API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', api);