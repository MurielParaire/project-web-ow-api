import pg from "pg";
const Pool = pg.Pool

export const manager_pool = new Pool( {
    user: 'ow_manager',
    host: 'database',
    password: 'Weak!Obviously:c',
    database: 'overwatch',
    port: '5432'
})
