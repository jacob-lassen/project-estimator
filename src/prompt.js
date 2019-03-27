const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function prompt(question) {
    if (!question.endsWith('\n')) {
        question = `${question}\n`;
    }
    return new Promise((resolve, reject) => {
        rl.question(question, resolve);
    });
}

process.on('exit', () => {
    rl.close();
});

module.exports = prompt;