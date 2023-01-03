import pg from "pg";
const Pool = pg.Pool

export const supervisor_pool = new Pool( {
    user: 'ow_supervisor',
    host: 'localhost',
    password: 'Regenschirm?Pfff',
    database: 'overwatch',
    port: '5432'
})