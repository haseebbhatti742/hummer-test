//libraries
const express = require("express");
const app1 = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const cors = require('cors');
var passport = require('passport');

//settings
app1.use(cookieParser("secret"));
app1.use(flash());
app1.use(bodyParser.urlencoded({extended: true }));
app1.use(cors());
app1.use(bodyParser.json());
app1.use(express.static("assets"));
app1.set("views", "./views");
app1.set("view engine", "jade"); // both keywords

//session management
app1.use(session({
    saveUninitialized: false,
    resave: true,
    secret: "ssshhhhh",
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);
app1.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

app1.use(passport.initialize());
app1.use(passport.session());

//db connection
// var conn = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "hummer_test",
// });

var conn = mysql.createPool({
  host: "localhost",
  user: "hummjyxk_hummer",
  password: "hummergrw@123",
  database: "hummjyxk_hummer_db",
});

var conn; 
conn.getConnection(function (err, con) {
  if (err) {
    console.log("DB Error!");
  } else {
    console.log("DB Connected!");
  }
});

//defining routes
const loginRoute = require("./routes/admin/login");
const homeRoute = require("./routes/admin/home");
const gatePassRoute = require("./routes/admin/gate_pass");
const cashVoucherRoute = require("./routes/admin/cash_voucher");
const advanceCashVoucherRoute = require("./routes/admin/advance_cash_voucher");
const ledgerRoute = require("./routes/admin/ledger");
const reportsRoute = require("./routes/admin/reports");
const partyRoute = require("./routes/admin/party");
const errorRoute = require("./routes/admin/error");

app1.use("/test", loginRoute);
app1.use("/test/home", homeRoute);
app1.use("/test/gate_pass", gatePassRoute);
app1.use("/test/cash_voucher", cashVoucherRoute);
app1.use("/test/advance_cash_voucher", advanceCashVoucherRoute);
app1.use("/test/ledger", ledgerRoute);
app1.use("/test/reports", reportsRoute);
app1.use("/test/party", partyRoute);
app1.use("/test/error", errorRoute);

app1.use("/test/logout", function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/test");
  });
});

module.exports.app = app1;
module.exports.conn = conn;
