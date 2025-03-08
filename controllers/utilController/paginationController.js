const getPaginatedData = async (Model, query, conditions, order, include) => {
  try {
    const { page = 1, limit = 3 } = query;

    const options = {
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      where: conditions,
      order,
      include,
    };
    const data = await Model.findAll(options);
    const dataCount = await Model.count({ where: conditions });

    return {
      currentPage: page,
      data,
      dataCount,
      totalPages: Math.ceil(dataCount / limit),
    };
  } catch (err) {
    return { error: err.message };
  }
};

export { getPaginatedData };
