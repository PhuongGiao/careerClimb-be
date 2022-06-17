exports.pick = (req) => {
  if (!req.query.limit || !req.query.page) {
    return { limit: 10, page: 1, lean: true };
  }
  const { page, limit, select } = req.query;
  const selectRex = select ? select.split(",").join(" ") : "";
  return { limit: +limit, page: +page, select: `${selectRex}`, lean: true };
};
