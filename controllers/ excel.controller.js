const { District, StudioPost } = require("../models");
const excel = require("exceljs");
const downloadExcel = (req, res) => {
  StudioPost.findAll().then((objs) => {
    let data = [];
    objs.forEach((obj) => {
      data.push(obj);
    });
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Districts");
    worksheet.columns = Object.keys(data[0].dataValues).map((obj) => {
      return { header: obj, key: obj, width: 15 };
    });

    // Add Array Rows
    worksheet.addRows(data);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=" + "data.xlsx");
    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
};
const downloadExcelTest = (data, res) => {
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
  downloadExcelTest,
};
