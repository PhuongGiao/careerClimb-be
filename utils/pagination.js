const Pagination = async (Model, page, limit, where) => {
  let total = await Model.count();
  if (+limit <= 0 || isNaN(+limit) || +limit >= 20) {
    limit = 1;
  }
  if (+page <= 0 || isNaN(+page)) {
    page = 1;
  }
  let totalPages = Math.ceil(total / limit);
  let skip = (+page - 1) * +limit;
  if (totalPages < +page) {
    page = 1;
  }

  const List = await Model.findAll({
    limit: +limit,
    offset: skip,
    ...where,
  });
  // if (where) {
  //   total = await Model.count({
  //     limit: +limit,
  //     offset: skip,
  //     ...where,
  //   });
  //   totalPages = Math.ceil(total / limit);
  // }

  return {
    success: true,
    pagination: {
      totalPages,
      limit: +limit,
      total,
      currentPage: +page,
      hasNextPage: page <= totalPages - 1,
    },
    data: List,
  };
};
module.exports = Pagination;
