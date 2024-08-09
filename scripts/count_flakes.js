/**
 * input data is MD table
| url | date |
| --- | --- |
| https://github.com/arranfw/report_flakey_test/actions/runs/10325270217/job/28586515833 | 2024-02-09 |
| https://github.com/arranfw/report_flakey_test/actions/runs/10325275189/job/28586531426 | 2024-04-09 |
| https://github.com/arranfw/report_flakey_test/actions/runs/10325275189/job/28586531426 | 2024-08-09 |
 */
(() => {
  var readline = require('readline');
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  const lines = [];
  rl.on('line', function (line) {
    lines.push(line);
  });
  rl.on('close', function () {
    const entries = lines.slice(2).map((entry) =>
      entry
        .split('|')
        .map((e) => e.trim())
        .filter(Boolean),
    ); // read md table to get urls and dates

    const aggregatedOccurrences = entries.reduce((acc, entry) => {
      const [_, date] = entry;
      acc[date] = acc[date] ? acc[date] + 1 : 1;
      return acc;
    }, {});

    // to CSV
    console.log('date,count');
    Object.entries(aggregatedOccurrences)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([date, occurrences]) => {
        console.log(`${date},${occurrences}`);
      });
  });
})();
