import pg from "pg";
const Pool = pg.Pool

export const admin_pool = new Pool({
  user: 'ow_admin',
  host: 'database',
  password: 'thisIsOrder185!',
  database: 'overwatch',
  port: '5432'
})
