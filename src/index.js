const prompt = require('./prompt');
const generateReport = require('./generateReport');

const tasks = [];

async function promptAction() {
    const question = `\
What do you want?
(1) - add task
(2) - generate report
(3) - exit`;
    const response = await prompt(question);
    const action = parseInt(response);
    switch(action) {
        case 1:
            await addTask();
            return promptAction()
        case 2:
            const reportName = await prompt('what should i call the report?');
            await generateReport(tasks, reportName);
            return promptAction();
        case 3:
            console.log('Goodbye');
            process.exit(0);
            break;
        default:
            return promptAction();
    }
}

async function addTask() {
    const name = await prompt(`Whats the task name?`);
    const best = await prompt(`Whats the best case?`);
    const worst = await prompt(`Whats the worst case?`);
    const nominal = await prompt(`Whats the nominal case?`);
    const task = {
        name: name,
        best: parseInt(best),
        worst: parseInt(worst),
        nominal: parseInt(nominal),
    }
    tasks.push(task);
}

promptAction();