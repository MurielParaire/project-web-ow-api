import pg from "pg";
const Pool = pg.Pool

export const manager_pool = new Pool( {
    user: '',
    host: '',
    password: '',
    database: '',
    port: ''
})