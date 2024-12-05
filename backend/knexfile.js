module.exports = {
	client: 'postgresql',
	connection: {
		database: 'tasks',
		user:     'daniel',
		password: 'postgres'
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}
};