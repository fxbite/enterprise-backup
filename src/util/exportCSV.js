const {parse} = require('json2csv')
const moment = require('moment')

const exportCSV = (res, csvInfo) => {
    const csvHeader = parse([], {
      fields: csvInfo.header,
      quote: ''
    });
    const csvData = parse(csvInfo.data, {
      header: false,
      fields: csvInfo.header
    });
    const buffer = `${csvHeader}\n${csvData}`;
  
    //? Export csv
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${moment(Date.now()).format('YYYY-MM-DD HHmmss')}.csv`);
    res.send(buffer);
  };
  
module.exports = exportCSV