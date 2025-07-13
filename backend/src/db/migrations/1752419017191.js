module.exports = {
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async up(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {

                    await queryInterface.createTable('users', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.createTable('questions', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.createTable('quizzes', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.createTable('results', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.createTable('roles', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.createTable('permissions', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.createTable('parties', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                          unique: true, 
                        },
                    }, { transaction });

                    await queryInterface.addColumn(
                      'users',
                      'firstName',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'lastName',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'phoneNumber',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'email',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'disabled',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,

                            defaultValue: false,
                            allowNull: false,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'password',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'emailVerified',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,

                            defaultValue: false,
                            allowNull: false,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'emailVerificationToken',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'emailVerificationTokenExpiresAt',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'passwordResetToken',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'passwordResetTokenExpiresAt',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'provider',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'questions',
                      'question_text',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'questions',
                      'option_a',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'questions',
                      'option_b',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'questions',
                      'option_c',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'questions',
                      'option_d',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'questions',
                      'correct_ans',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'quizzes',
                      'title',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'quizzes',
                      'instructorId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'users',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'results',
                      'candidateId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'users',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'results',
                      'quizId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'quizzes',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'results',
                      'total_correct',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'results',
                      'total_incorrect',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'results',
                      'total_score',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'results',
                      'completed_at',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'permissions',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'roles',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'roles',
                      'role_customization',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'app_roleId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'roles',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'parties',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'roles',
                      'globalAccess',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,

                            defaultValue: false,
                            allowNull: false,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'users',
                      'partiesId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'parties',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'questions',
                      'partiesId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'parties',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'quizzes',
                      'partiesId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'parties',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'results',
                      'partiesId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'parties',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async down(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {

                    await queryInterface.removeColumn(
                        'results',
                        'partiesId',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'quizzes',
                        'partiesId',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'questions',
                        'partiesId',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'partiesId',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'roles',
                        'globalAccess',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'parties',
                        'name',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'app_roleId',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'roles',
                        'role_customization',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'roles',
                        'name',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'permissions',
                        'name',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'results',
                        'completed_at',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'results',
                        'total_score',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'results',
                        'total_incorrect',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'results',
                        'total_correct',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'results',
                        'quizId',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'results',
                        'candidateId',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'quizzes',
                        'instructorId',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'quizzes',
                        'title',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'questions',
                        'correct_ans',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'questions',
                        'option_d',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'questions',
                        'option_c',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'questions',
                        'option_b',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'questions',
                        'option_a',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'questions',
                        'question_text',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'provider',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'passwordResetTokenExpiresAt',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'passwordResetToken',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'emailVerificationTokenExpiresAt',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'emailVerificationToken',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'emailVerified',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'password',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'disabled',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'email',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'phoneNumber',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'lastName',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'users',
                        'firstName',
                        { transaction }
                    );

                    await queryInterface.dropTable('parties', { transaction });

                    await queryInterface.dropTable('permissions', { transaction });

                    await queryInterface.dropTable('roles', { transaction });

                    await queryInterface.dropTable('results', { transaction });

                    await queryInterface.dropTable('quizzes', { transaction });

                    await queryInterface.dropTable('questions', { transaction });

                    await queryInterface.dropTable('users', { transaction });

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
