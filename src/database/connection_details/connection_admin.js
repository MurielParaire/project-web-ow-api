import pg from "pg";
const Pool = pg.Pool

export const basic_admin_pool = new Pool({
  user: 'muriel_pg',
  host: 'localhost',
  password: 'IwannaSleep:cAndPlay56$!',
  database: 'overwatch',
  port: '5432'
})
