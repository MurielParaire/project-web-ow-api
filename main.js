const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const Pool = require('pg').Pool
const cors = require('cors');
const bcrypt = require("bcrypt");

app.use(cors({
  origin: '*'
}));

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded( {
        extended: true
    })
)



const rounds = 10;

function getHash(password) {
  return bcrypt.hash(password, rounds); 
}

const pool = new Pool({
    user: '',
    host: '',
    password: '',
    database: '',
    port: ''
})

const murielpool = new Pool({
  user: '',
  host: '',
  password: '',
  database: '',
  port: ''
})

app.get('/characters/', (request, response) => {
    pool.query('SELECT * FROM character', (error, result) => {
        if (error) {
            throw error
        }
        response.status(200).json(result.rows)
    })
  })

app.get('/characters/:id', (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM character WHERE character.id_char = $1', [id.toString()], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
})

app.get('/characters/name/:name', (request, response) => {
  const name = request.params.name
  pool.query('SELECT * FROM character WHERE character.name = $1', [name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
})

app.post('/users/verify/', async (request, response) => {
  const req = request.body;
  let res = await verifyUser(req);
  response.status(200).json(res);
})

app.listen(port, () => {
    console.log(`App running on port http://localhost:${port}.`)
  })

  async function verifyUser(req) {
  try {
    let res = await pool.query("SELECT user_id FROM ow_user WHERE ow_user.username = $1", [req.username]);
    if (res.rowCount === 0) {
      return 0;
    }
    let querypw = await pool.query("SELECT password FROM ow_user WHERE user_id = $1", [res.rows[0].user_id]);
    let verify = await bcrypt.compare((req.password).toString(), querypw.rows[0].password);
    if (verify === false) {
      return 0;
    }
    let hash = await getHash((req.password).toString())
    while (hash.includes('/')){
      hash = await getHash((req.password).toString())
    }
    createHashUser(res.rows[0].user_id, hash);
    return hash
  }
  catch(error) {
    throw error
  }

}

async function createHashUser(id, hash) {
  murielpool.query('INSERT INTO user_hash (user_id, hash) VALUES ($1, $2)', [id, hash], (error, results) => {
    if (error) {
      throw error
    }
  })
  return hash;
}

async function getUser(id) {
  try {
    let res = await pool.query("SELECT username, firstname, lastname, email FROM ow_user WHERE ow_user.user_id = $1", [id]);
    return res.rows[0]
  }
  catch(error) {
    throw error
  }
  
}


app.get('/token/:token', async (request, response) => {
  const token = request.params.token;
  let id = await murielpool.query('SELECT user_id FROM user_hash WHERE hash = $1', [token]);
  if (id.rows.length > 0) {
    let user = await getUser(id.rows[0].user_id);
    response.status(200).json(user);
  }
  return 0;
})

app.get('/hero/event/:name', async (request, response) => {
  const name = request.params.name;
  let id = await pool.query('select name, type, event.description from event join character on event.character = character.id_char WHERE character.name = $1;', [name]);
  if (id.rows.length > 0) {
    response.status(200).json(id.rows);
  }
  return 0;
})

app.get('/events/', async (request, response) => {
  let events = await pool.query('select * from event;', []);
  if (events.rows.length > 0) {
    response.status(200).json(events.rows);
  }
  return 0;
})

app.get('/events/:id', async (request, response) => {
  const id = request.params.id;
  let events = await pool.query('select * from event where event_id = $1;', [id]);
  if (events.rows.length > 0) {
    response.status(200).json(events.rows);
  }
  return 0;
})

app.get('/events/type/:type', async (request, response) => {
  const type = request.params.type;
  let events = await pool.query('select * from event where type = $1;', [type]);
  if (events.rows.length > 0) {
    response.status(200).json(events.rows);
  }
  return 0;
})


//return 0 for error, 1 for public, 2 for admin
async function getUserRoles(id) {
  let role = await murielpool.query('select role from ow_user join user_role on ow_user.user_id = user_role.id_user join role on user_role.id_role = role.id where ow_user.user_id = $1 ;', [id]);
  if (role.rows.length > 0) {
    if (role.rows.length > 1) {
      let Userrole = [];
      role.rows.forEach(role => {
        if (getRole(role) > Userrole) {
          Userrole.getRole(role);
        } 
      });
    }
    return getRole(role.rows[0]);
  }
  return 0;
}

function getRole(role) {
  if (role === 'public') {
    return 1;
  }
  if (role === 'admin') {
    return 2;
  }
  return 0;
}


app.post('/users/history', async (request, response) => {
  const token = request.header('authorization');
  let id = await getUserId(token)
})

//create User

//admin can make user admin ? only for role supervisor ? 

//create new role too for supervisor ?
// what can new role do ? only group people ? 

// create new characters only for manager ?
// admin is all but supervisor is not manager is not admin


// for functions :
// checkRole => getUserRole
// checkAdmin 
// check manager
// check supervisor