const { District, StudioPost } = require("../models");
const excel = require("exceljs");
const downloadExcel = (req, res) => {
  //   let data = [
  //     n{
  //       id: 1,
  //       Name: "hiep",
  //       Prefix: 2,
  //       ProvinceId: 2,
  //       TenantId: 3,
  //     },
  //     {
  //       id: 4,
  //       Name: "hiep",
  //       Prefix: 2,
  //       ProvinceId: 2,
  //       TenantId: 3,
  //     },
  //     {
  //       id: 3,
  //       Name: "hiep",
  //       Prefix: 2,
  //       ProvinceId: 2,
  //       TenantId: 3,
  //     },
  //     {
  //       id: 2,
  //       Name: "hiep",
  //       Prefix: 2,
  //       ProvinceId: 2,
  //       TenantId: 3,
  //     },
  //   ];

  StudioPost.findAll().then((objs) => {
    let data = [];
    objs.forEach((obj) => {
      //   data.push({
      //     id: obj.id,
      //     Name: obj.Name,
      //     Prefix: obj.Prefix,
      //     ProvinceId: obj.ProvinceId,
      //     TenantId: obj.TenantId,
      //   });
      data.push(obj);
    });
    console.log(data);

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Districts");
    console.log(Object.keys(data[0].dataValues));
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

  //   console.log(Object.keys(data[0]));
  //   console.log(data);
  //   let workbook = new excel.Workbook();
  //   let worksheet = workbook.addWorksheet("Districts");
  //   console.log(Object.keys(data[0].dataValues));
  //   worksheet.columns = Object.keys(data[0]).map((obj) => {
  //     return { header: obj, key: obj, width: 15 };
  //   });

  //   // Add Array Rows
  //   worksheet.addRows(data);
  //   res.setHeader(
  //     "Content-Type",
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //   );
  //   res.setHeader("Content-Disposition", "attachment; filename=" + "data.xlsx");
  //   return workbook.xlsx.write(res).then(function () {
  //     res.status(200).end();
  //   });
};
const downloadExcelTest = (data, res) => {
  //   StudioPost.findAll().then((objs) => {
  //     let data = [];
  //     objs.forEach((obj) => {
  //       //   data.push({
  //       //     id: obj.id,
  //       //     Name: obj.Name,
  //       //     Prefix: obj.Prefix,
  //       //     ProvinceId: obj.ProvinceId,
  //       //     TenantId: obj.TenantId,
  //       //   });
  //       data.push(obj);
  //     });
  //     console.log(data);

  //     let workbook = new excel.Workbook();
  //     let worksheet = workbook.addWorksheet("Districts");
  //     console.log(Object.keys(data[0].dataValues));
  //     worksheet.columns = Object.keys(data[0].dataValues).map((obj) => {
  //       return { header: obj, key: obj, width: 15 };
  //     });

  //     // Add Array Rows
  //     worksheet.addRows(data);
  //     res.setHeader(
  //       "Content-Type",
  //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //     );
  //     res.setHeader("Content-Disposition", "attachment; filename=" + "data.xlsx");
  //     return workbook.xlsx.write(res).then(function () {
  //       res.status(200).end();
  //     });
  //   });

  console.log("ds-ad-sa-ds-a-dsa-d-sa", data);
  let workbook = new excel.Workbook();
  let worksheet = workbook.addWorksheet("Data");
  console.log(Object.keys(data[0]));
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
