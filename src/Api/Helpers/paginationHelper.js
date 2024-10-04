
module.exports = {
    paginate: (model, page = 1, limit = 10) => {
      const offset = (page - 1) * limit;
      return {
        limit,
        offset,
        paginateData: (data) => ({
          data,
          currentPage: page,
          totalItems: model.length,
          totalPages: Math.ceil(model.length / limit),
        }),
      };
    },
  };
  const paginationHelper = require('./paginationHelper');

  app.get('/items', async (req, res) => {
    const { page, limit } = req.query;
    const paginated = paginationHelper.paginate(items, page, limit);
    const results = items.slice(paginated.offset, paginated.offset + paginated.limit);
  
    res.json(paginated.paginateData(results));
  });
    