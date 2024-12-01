import { env } from '$env/dynamic/private';
import pg from 'pg';

// Configure PostgreSQL connection
const pool = new pg.Pool({
	host: env.POSTGRES_HOST,
	port: parseInt(env.POSTGRES_PORT || '5432'),
	database: env.POSTGRES_DATABASE,
	user: env.POSTGRES_USER,
	password: env.POSTGRES_PASSWORD,
	ssl: env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : false
});

class DatabaseWorker {
	/**
	 *
	 * @param {string} email
	 * @param {string} password_hash
	 * @param {string | null | undefined} full_name
	 */
	async createUser(email, password_hash, full_name = null) {
		const query = `
		INSERT INTO users (email, password_hash, full_name)
		VALUES ($1, $2, $3)
		RETURNING id, email
	`;

		try {
			const result = await pool.query(query, [email, password_hash, full_name]);
			return result.rows[0];
		} catch (error) {
			if (error.code === '23505') {
				// Unique violation
				throw new Error('Email already registered');
			}
			throw new Error(`Failed to create user: ${error.message}`);
		}
	}

	/**
	 * @param {string} userId
	 * @param {string} oauth_provider
	 * @param {string} oauth_id
	 */
	async updateOAuthInfo(userId, oauth_provider, oauth_id) {
		const query = `
            UPDATE users
            SET oauth_provider = $1,
                oauth_id = $2,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING id, email
        `;

		try {
			const result = await pool.query(query, [oauth_provider, oauth_id, userId]);
			return result.rows[0];
		} catch (error) {
			throw new Error(`Failed to update OAuth info: ${error.message}`);
		}
	}

	/**
	 * @param {string} email
	 * @param {string} password_hash
	 */
	async updatePassword(email, password_hash) {
		const query = `
            UPDATE users
            SET password_hash = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE email = $2
            RETURNING id
        `;

		try {
			const result = await pool.query(query, [password_hash, email]);
			return result.rows[0];
		} catch (error) {
			throw new Error(`Failed to update password: ${error.message}`);
		}
	}

	/**
	 * @param {string} email
	 * @param {string | null | undefined} full_name
	 * @param {string | null | undefined} oauth_provider
	 * @param {string | null | undefined} oauth_id
	 */
	async insertUserRecord(email, full_name, oauth_provider, oauth_id) {
		const query = `
            INSERT INTO users (email, full_name, oauth_provider, oauth_id)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (email) DO UPDATE
            SET updated_at = CURRENT_TIMESTAMP
            RETURNING id
        `;

		try {
			const result = await pool.query(query, [email, full_name, oauth_provider, oauth_id]);
			return result.rows[0].id;
		} catch (error) {
			throw new Error(`Sign in error: ${error.message}`);
		}
	}

	/**
	 * @param {string} email
	 */
	async getUserRecord(email) {
		const query = `SELECT * FROM users WHERE email = $1`;
		const result = await pool.query(query, [email]);
		return result.rows[0];
	}

	/**
	 * Close the database connection pool
	 */
	async close() {
		await pool.end();
	}
}

export const databaseWorker = new DatabaseWorker();
