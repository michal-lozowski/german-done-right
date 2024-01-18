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

            const filePathQuestions = path.join(__dirname, folder, 'questions.txt');
            const filePathAnswers = path.join(__dirname, folder, 'answers.txt');
            const ChangedfilePathQuestions = path.join(__dirname, folder, 'questionsOld.txt');
            const ChangedfilePathAnswers = path.join(__dirname, folder, 'answersOld.txt');

            const questions = await fs.readFile(filePathQuestions, 'utf8')
            let questionsText = questions

            const answers = await fs.readFile(filePathAnswers, 'utf8')
            const answersLines = answers.split("\r\n")

            let counter = 0
            let i = 0
            while (true) {
                if (questionsText[i] !== "_" && questionsText[i - 1] === "_") {
                    let firstPart = questionsText.substring(0, i)
                    let secondPart = questionsText.substring(i, questionsText.length)
                    questionsText = firstPart + "(" + answersLines[counter] + ")" + secondPart
                    counter++
                }
                i++
                if (i === questionsText.length - 1) break
            }

            await fs.rename(filePathQuestions, ChangedfilePathQuestions)
            await fs.rename(filePathAnswers, ChangedfilePathAnswers)

            await fs.writeFile(filePathAnswers, questionsText)

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