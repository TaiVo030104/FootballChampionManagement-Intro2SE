class APIFeatures {
  constructor(query, queryString) {
    this.query = query; // Sequelize Model
    this.queryString = queryString; // Query parameters
    this.queryOptions = {}; // Sequelize-specific query options
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    Object.keys(queryObj).forEach((key) => {
      if (/\b(gte|gt|lte|lt)\b/.test(queryObj[key])) {
        const [operator, value] = queryObj[key].split(":");
        queryObj[key] = { [`$${operator}`]: value };
      }
    });

    this.queryOptions.where = queryObj;
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort
        .split(",")
        .map((field) => [
          field.startsWith("-") ? field.slice(1) : field,
          field.startsWith("-") ? "DESC" : "ASC",
        ]);
      this.queryOptions.order = sortBy;
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      this.queryOptions.attributes = this.queryString.fields.split(",");
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;
    const offset = (page - 1) * limit;

    this.queryOptions.limit = limit;
    this.queryOptions.offset = offset;
    return this;
  }

  execute() {
    return this.query.findAll(this.queryOptions);
  }
}

module.exports = APIFeatures;
