
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ResultsDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const results = await db.results.create(
            {
                id: data.id || undefined,

        total_correct: data.total_correct
        ||
        null
            ,

        total_incorrect: data.total_incorrect
        ||
        null
            ,

        total_score: data.total_score
        ||
        null
            ,

        completed_at: data.completed_at
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return results;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const resultsData = data.map((item, index) => ({
                id: item.id || undefined,

                total_correct: item.total_correct
            ||
            null
            ,

                total_incorrect: item.total_incorrect
            ||
            null
            ,

                total_score: item.total_score
            ||
            null
            ,

                completed_at: item.completed_at
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const results = await db.results.bulkCreate(resultsData, { transaction });

        return results;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const results = await db.results.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.total_correct !== undefined) updatePayload.total_correct = data.total_correct;

        if (data.total_incorrect !== undefined) updatePayload.total_incorrect = data.total_incorrect;

        if (data.total_score !== undefined) updatePayload.total_score = data.total_score;

        if (data.completed_at !== undefined) updatePayload.completed_at = data.completed_at;

        updatePayload.updatedById = currentUser.id;

        await results.update(updatePayload, {transaction});

        return results;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const results = await db.results.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of results) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of results) {
                await record.destroy({transaction});
            }
        });

        return results;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const results = await db.results.findByPk(id, options);

        await results.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await results.destroy({
            transaction
        });

        return results;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const results = await db.results.findOne(
            { where },
            { transaction },
        );

        if (!results) {
            return results;
        }

        const output = results.get({plain: true});

        return output;
    }

    static async findAll(filter, options) {
        const limit = filter.limit || 0;
        let offset = 0;
        let where = {};
        const currentPage = +filter.page;

        const user = (options && options.currentUser) || null;

        offset = currentPage * limit;

        const orderBy = null;

        const transaction = (options && options.transaction) || undefined;

        let include = [];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

            if (filter.total_correctRange) {
                const [start, end] = filter.total_correctRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    total_correct: {
                    ...where.total_correct,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    total_correct: {
                    ...where.total_correct,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.total_incorrectRange) {
                const [start, end] = filter.total_incorrectRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    total_incorrect: {
                    ...where.total_incorrect,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    total_incorrect: {
                    ...where.total_incorrect,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.total_scoreRange) {
                const [start, end] = filter.total_scoreRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    total_score: {
                    ...where.total_score,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    total_score: {
                    ...where.total_score,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.completed_atRange) {
                const [start, end] = filter.completed_atRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    completed_at: {
                    ...where.completed_at,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    completed_at: {
                    ...where.completed_at,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
                };
            }

            if (filter.createdAtRange) {
                const [start, end] = filter.createdAtRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.gte]: start,
                        },
                    };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.lte]: end,
                        },
                    };
                }
            }
        }

        const queryOptions = {
            where,
            include,
            distinct: true,
            order: filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction: options?.transaction,
            logging: console.log
        };

        if (!options?.countOnly) {
            queryOptions.limit = limit ? Number(limit) : undefined;
            queryOptions.offset = offset ? Number(offset) : undefined;
        }

        try {
            const { rows, count } = await db.results.findAndCountAll(queryOptions);

            return {
                rows: options?.countOnly ? [] : rows,
                count: count
            };
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    static async findAllAutocomplete(query, limit, offset) {
        let where = {};

        if (query) {
            where = {
                [Op.or]: [
                    { ['id']: Utils.uuid(query) },
                    Utils.ilike(
                        'results',
                        'total_score',
                        query,
                    ),
                ],
            };
        }

        const records = await db.results.findAll({
            attributes: [ 'id', 'total_score' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['total_score', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.total_score,
        }));
    }

};

