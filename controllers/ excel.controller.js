const excel = require("exceljs");
const downloadExcel = (data, res) => {
  let workbook = new excel.Workbook();
  let worksheet = workbook.addWorksheet("Data");
  worksheet.columns = Object.keys(data[0].dataValues).map((obj) => {
    return { header: obj, key: obj, width: 15 };
  });

  // Add Array Rows
  worksheet.addRows(data);
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=" + "Data.xlsx");
  return workbook.xlsx.write(res).then(function () {
    res.status(200).end();
  });
};
module.exports = {
  downloadExcel,
};
