import {Calendar} from "../src/google/calendar";
import {Drive} from "../src/google/drive";
import {MyFbStorage} from "../src/google/myFb/myFbStorage";

async function calendarMain() {
    const calendar = await Calendar.getCalendarEvents();
    console.log(calendar);
}

async function storageMain() {
    const storage = MyFbStorage.loadStorage();
    const size = 1080;
    const object = storage.getFile("events/12-11-2021-spark/events/IMG_1042.jpg")
    await storage.resizeImgObjFromFb(object);
    const temp = await storage.listDir(`events/12-11-2021-spark/events/thumb@${size}`);
    console.log(temp);
}

async function storageDrive() {
    const drive = Drive.loadDrive();
    console.log("Getting Files from Drive");
    const response = await drive.listFiles();
    console.log("Finish Getting Files from Drive")
    for (let i = 0; i < response.length; i++) {
        console.log(i);
        await drive.resizeImgObj(response[i]);
    }
    console.log("done")
}

// My hack to keep the process alive:
storageDrive().then(() => {
    console.log("Main")
});
