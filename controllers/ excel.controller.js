const { District, StudioPost } = require("../models");
const excel = require("exceljs");
const downloadExcel = () => {
  (data = [
    {
      id: 1,
      Name: "hiep",
      Prefix: 2,
      ProvinceId: 2,
      TenantId: 3,
    },
    {
      id: 1,
      Name: "hiep",
      Prefix: 2,
      ProvinceId: 2,
      TenantId: 3,
    },
  ]),
    "hiuep";
  return (req, res) => {
    console.log("dsa-d-sa-dsa-d-sa-ds-a-dsa");
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
    //     res.setHeader(
    //       "Content-Disposition",
    //       "attachment; filename=" + "data.xlsx"
    //     );
    //     return workbook.xlsx.write(res).then(function () {
    //       res.status(200).end();
    //     });
    //   });
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet(name);
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
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + `${name}.xlsx`
    );
    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  };
};
module.exports = {
  downloadExcel,
};
