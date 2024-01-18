const fs = require('fs').promises;
const path = require('path');

let folders = [];

async function getDirNames() {
    const names = await fs.readdir(__dirname);

    for (const name of names) {
        const stats = await fs.stat(name);

        if (stats.isDirectory()) {
            folders.push(name);
        }
    }
}

async function changeFiles() {

    for (const folder of folders) {

        try {

            const filePathAnswers = path.join(__dirname, folder, 'answers.txt');
            const filePathQuestions = path.join(__dirname, folder, 'questions.txt');

            await fs.rename(filePathAnswers, filePathQuestions)

        }
        catch (err) {
            if (err.code === 'ENOENT') {
                console.log('File does not exist.');
            } else {
                console.error('Error checking file existence:', err);
                throw err;
            }
        }
    }
}

getDirNames()
    .then(() => {
        changeFiles()
    })