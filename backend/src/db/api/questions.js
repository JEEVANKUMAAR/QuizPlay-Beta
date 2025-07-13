
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class QuestionsDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const questions = await db.questions.create(
            {
                id: data.id || undefined,

        question_text: data.question_text
        ||
        null
            ,

        option_a: data.option_a
        ||
        null
            ,

        option_b: data.option_b
        ||
        null
            ,

        option_c: data.option_c
        ||
        null
            ,

        option_d: data.option_d
        ||
        null
            ,

        correct_ans: data.correct_ans
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return questions;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const questionsData = data.map((item, index) => ({
                id: item.id || undefined,

                question_text: item.question_text
            ||
            null
            ,

                option_a: item.option_a
            ||
            null
            ,

                option_b: item.option_b
            ||
            null
            ,

                option_c: item.option_c
            ||
            null
            ,

                option_d: item.option_d
            ||
            null
            ,

                correct_ans: item.correct_ans
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const questions = await db.questions.bulkCreate(questionsData, { transaction });

        return questions;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const questions = await db.questions.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.question_text !== undefined) updatePayload.question_text = data.question_text;

        if (data.option_a !== undefined) updatePayload.option_a = data.option_a;

        if (data.option_b !== undefined) updatePayload.option_b = data.option_b;

        if (data.option_c !== undefined) updatePayload.option_c = data.option_c;

        if (data.option_d !== undefined) updatePayload.option_d = data.option_d;

        if (data.correct_ans !== undefined) updatePayload.correct_ans = data.correct_ans;

        updatePayload.updatedById = currentUser.id;

        await questions.update(updatePayload, {transaction});

        return questions;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const questions = await db.questions.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of questions) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of questions) {
                await record.destroy({transaction});
            }
        });

        return questions;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const questions = await db.questions.findByPk(id, options);

        await questions.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await questions.destroy({
            transaction
        });

        return questions;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const questions = await db.questions.findOne(
            { where },
            { transaction },
        );

        if (!questions) {
            return questions;
        }

        const output = questions.get({plain: true});

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

                if (filter.question_text) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'questions',
                            'question_text',
                            filter.question_text,
                        ),
                    };
                }

                if (filter.option_a) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'questions',
                            'option_a',
                            filter.option_a,
                        ),
                    };
                }

                if (filter.option_b) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'questions',
                            'option_b',
                            filter.option_b,
                        ),
                    };
                }

                if (filter.option_c) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'questions',
                            'option_c',
                            filter.option_c,
                        ),
                    };
                }

                if (filter.option_d) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'questions',
                            'option_d',
                            filter.option_d,
                        ),
                    };
                }

                if (filter.correct_ans) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'questions',
                            'correct_ans',
                            filter.correct_ans,
                        ),
                    };
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
            const { rows, count } = await db.questions.findAndCountAll(queryOptions);

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
                        'questions',
                        'question_text',
                        query,
                    ),
                ],
            };
        }

        const records = await db.questions.findAll({
            attributes: [ 'id', 'question_text' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['question_text', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.question_text,
        }));
    }

};

