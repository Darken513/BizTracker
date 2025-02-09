const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routers/auth.router');
const summaryRouter = require('./routers/summary.router');
const restaurantRouter = require('./routers/restaurant.router');
const employeesRouter = require('./routers/employees.router');
const banknotesummaryRouter = require('./routers/banknotesummary.router');
const chargesRouter = require('./routers/charges.router');
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(__dirname+"/database.db"); //depends on the running app path
const db_utils = require('./services/database')
const port = process.env.PORT || 80;

const app = express();
app.use(express.static(__dirname+"/public"));
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/summary', summaryRouter);
app.use('/restaurant', restaurantRouter);
app.use('/employee', employeesRouter);
app.use('/banknotesummary', banknotesummaryRouter);
app.use('/charges', chargesRouter);
app.use((req, res) => {
  res.redirect('/');
});
async function init() {
  await db_utils.initDataBase(db);
  //await db_utils.createData(db)
}

init();
app.listen(port, () => {console.log(`Server started on port ${port}`);});
process.on('uncaughtException', (error) => {
  console.error('Error: ', error);
});