//Reading CSV file
const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (row) => {
        console.log(row);
    })
    .on('end', () => {
        console.log('CSV file successfully read');
    });


//Filtering CSV file by country name and write data to canada.txt
let isCanada = true;
fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (row) => {
        if (row.country === 'Canada') {
            if (isCanada) {
                const headers = Object.keys(row).join(',');
                fs.appendFileSync('canada.txt', headers + '\n');
                isCanada = false;
            }
            const csvRow = Object.values(row).join(',');
            fs.appendFileSync('canada.txt', csvRow + '\n');
        }
    })
    .on('end', () => {
        console.log('CSV file successfully filtered to Canada');
    });

//Filtering CSV file by country name and write data to usa.txt
let isUSA = true;
fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (row) => {
        if (row.country === 'United States') {
            if (isUSA) {
                const headers = Object.keys(row).join(',');
                fs.appendFileSync('usa.txt', headers + '\n');
                isUSA = false;
            }
            const csvRow = Object.values(row).join(',');
            fs.appendFileSync('usa.txt', csvRow + '\n');
        }
    })
    .on('end', () => {
        console.log('CSV file successfully filtered to USA');
    });
