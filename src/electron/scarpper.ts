import { BrowserWindow,app } from "electron";
import pie from "puppeteer-in-electron";
import puppeteer from "puppeteer-core";

const main = async () => {

    await pie.initialize(app);
    const browser = await pie.connect(app, puppeteer);


    const window = new BrowserWindow();

    const url = ""

    await window.loadURL(url)

};





main ();