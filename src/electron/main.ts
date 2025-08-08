// src/electron/main.ts

import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev } from "./util.js"
import puppeteer from 'puppeteer-core';
import pie from 'puppeteer-in-electron';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

pie.initialize(app);

// 👇 STEP 1: Declare mainWindow here so it's accessible everywhere
let mainWindow: BrowserWindow | null = null;

async function login(cer: { username: string, password: string }, window: BrowserWindow) {
    console.log("pup running");
    const browser = await pie.connect(app, puppeteer);
    const page = await pie.getPage(browser, window);

    try {
        await page.goto("https://academia.srmist.edu.in/", { waitUntil: 'networkidle2' });

        console.log('Waiting for the login iframe to appear...');
        // 👇 The placeholder is now replaced with the correct ID
        const iframeHandle = await page.waitForSelector('#signinFrame');

        const frame = await iframeHandle?.contentFrame();
        if (!frame) {
            throw new Error('Could not get the iframe content frame.');
        }

        console.log('Iframe found! Waiting for login form inside the frame...');
        await frame.waitForSelector('#login_id', { visible: true, timeout: 15000 });

        console.log('Form found in frame! Typing username...');
        await frame.type("#login_id", cer.username);
        await frame.click("#nextbtn");
        
       
        await frame.waitForSelector('#password', { visible:true ,timeout: 15000});


        await frame.type("#password", cer.password );
        
        await frame.waitForSelector('#nextbtn' , {visible:true})
        await frame.click("#nextbtn");
        
        await page.waitForNavigation({ waitUntil: "networkidle2" });
        
        console.log("Login successful!");
       
        
        return { success: true, data: "Login successful!" };
        
    } catch (error) {
        console.error('Scraping failed:', error);
        return { success: false, error: 'Scraping failed. Check console for details.' };
    }
}

ipcMain.handle('login:start', async (event, cer) => {
    if (!mainWindow) {
        return { success: false, error: "Main window is not available." };
    }
    // Pass the mainWindow object to the login function
    const result = await login(cer, mainWindow);
    return result
});

app.on("ready", () => {
    // Assign the created window to the variable we declared outside
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123')
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
    }

    // Set mainWindow to null when it's closed to prevent memory leaks
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});