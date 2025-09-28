    const { Pool } = require('pg');

    // Create a new instance of a connection pool.
    // This instance is what knows how to send queries.
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    // Export the instance so other files can use it.
    module.exports = pool;
    

