import pg from "pg";
const Pool = pg.Pool

export const public_pool = new Pool( {
    user: '',
    host: '',
    password: '',
    database: '',
    port: ''
})