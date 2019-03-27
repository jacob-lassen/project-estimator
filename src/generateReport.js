const fs = require('fs');

function generateReport(tasks, reportName) {
    const estimates = tasks.map(generateEstimate);
    estimates.push(totalEstimate(estimates));
    const headers = 'name;mean;stddev;best;worst;nominal';
    const csvString = estimates.reduce(concatCsvString, headers);
    const reportPath = `./${reportName}.csv`;
    fs.writeFileSync(reportPath, csvString);
};

function generateEstimate(task) {
    const stddev = (task.nominal-task.best) / 6;
    const mean = (task.best+task.nominal+(4*task.nominal)) / 6
    return {
        name: task.name,
        best: task.best,
        worst: task.worst,
        nominal: task.nominal,
        stddev: stddev,
        mean: mean,
    };
};

function totalEstimate(estimates) {
    const aggregate = {
        best: 0,
        worst: 0,
        nominal: 0,
        mean: 0,
        varience: 0,
    }
    estimates.reduce(concatEstiamte, aggregate);
    return {
        name: 'Total',
        best: aggregate.best,
        worst: aggregate.worst,
        nominal: aggregate.nominal,
        stddev: Math.sqrt(aggregate.varience),
        mean: aggregate.mean,
    }
}

function concatEstiamte(total, estimate) {
    total.best = estimate.best + total.best;
    total.worst = estimate.worst + total.worst;
    total.nominal = estimate.nominal + total.nominal;
    total.mean = estimate.mean + total.mean;
    total.varience = Math.pow(estimate.nominal, 2) + total.varience;
    return total;
}

function concatCsvString(csvString, estimate) {
    const row = `${estimate.name};${estimate.mean.toFixed(2)};${estimate.stddev.toFixed(2)};${estimate.best.toFixed(2)};${estimate.worst.toFixed(2)};${estimate.nominal.toFixed(2)}`;
    return `${csvString}\n${row}`;
}

module.exports = generateReport;