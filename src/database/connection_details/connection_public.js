import pg from "pg";
const Pool = pg.Pool

export const public_pool = new Pool( {
    user: 'public_user',
    host: 'database',
    password: 'MONAenemy56',
    database: 'overwatch',
    port: '5432'
})
