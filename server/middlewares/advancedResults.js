const asyncHandler = require('../utils/asyncHandler');

const advancedResults = (model, populate) =>
	asyncHandler(async (req, res, next) => {
		let filters = {
			...req.query
		};

		let query;

		// Remove special fields from filters
		const removeFields = [
			'page',
			'limit',
			'select',
			'sort',
			'search',
			'from',
			'to'
		];
		let keys = Object.keys(filters);
		keys.map(key => {
			if (removeFields.includes(key)) {
				delete filters[key];
			}
		});

		let queryStr = JSON.stringify(filters);

		//create operators (gt,gte,lt...)
		queryStr = queryStr.replace(
			/\b(gt|gte|lt|lte|in|regex|options|or)\b/g,
			match => `$${match}`
		);

		// Start query with filter
		let specialFilter = [
			{
				...JSON.parse(queryStr)
			}
		];
		if (req.query.search || req.query.from || req.query.to) {
			const { search, from, to } = req.query;
			if (search) {
				specialFilter.push({
					$text: {
						$search: req.query.search
					}
				});
			}

			if (from && to) {
				specialFilter.push({
					$or: [
						{
							price: { $lte: to, $gte: from }
						},
						{
							discountPrice: { $lte: to, $gte: from }
						}
					]
				});
			} else if (from) {
				specialFilter.push({
					$or: [
						{
							price: { $gte: from }
						},
						{
							discountPrice: { $gte: from }
						}
					]
				});
			} else if (to) {
				specialFilter.push({
					$or: [
						{
							price: { $lte: to }
						},
						{
							discountPrice: { $lte: to }
						}
					]
				});
			}

			query = model.find({
				$and: [...specialFilter]
			});
		} else {
			query = model.find(JSON.parse(queryStr));
		}

		// Setting pagination
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let total = await model.countDocuments(JSON.parse(queryStr));
		let startIndex = (page - 1) * limit;
		let endIndex = page * limit;

		query = query.skip(startIndex).limit(limit);

		// If request specific fields
		if (req.query.select) {
			let select = req.query.select.split(',').join(' ');
			query = query.select(select);
		}

		//sort
		if (req.query.sort) {
			const sortBy = req.query.sort.split(',').join(' ');
			query = query.sort(sortBy);
		} else {
			query = query.sort('-createdAt');
		}

		// If needs to populate
		if (populate) {
			query = query.populate(populate);
		}

		results = await query;

		// Pagination info for the client
		let pagination = {};

		if (endIndex < total) {
			pagination.next = {
				page: page + 1,
				limit
			};
		}

		if (startIndex > 0) {
			pagination.prev = {
				page: page - 1,
				limit
			};
		}

		pagination.current = {
			page: page,
			limit
		};

		pagination.totalPages = Math.ceil(total / limit);

		res.advancedResults = {
			success: true,
			count: results.length,
			pagination,
			data: results
		};

		next();
	});

module.exports = advancedResults;
