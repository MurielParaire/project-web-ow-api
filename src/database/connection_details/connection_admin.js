import pg from "pg";
const Pool = pg.Pool

export const basic_admin_pool = new Pool({
  user: '',
  host: '',
  password: '',
  database: '',
  port: ''
})
