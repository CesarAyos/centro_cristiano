const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const upload = multer({ dest: "uploads/" });
const { createClient } = require("@supabase/supabase-js");

// Inicializaciones
const app = express();
require("./lib/passport");

// Configuraciones
app.set("port", process.env.PORT || 2000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);
app.set("views engine", ".hbs");

// Conexión a Supabase
const supabaseUrl = 'https://wrdalmrnoeslzthwqnuo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyZGFsbXJub2VzbHp0aHdxbnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2NjA2NzQsImV4cCI6MjAyMjIzNjY3NH0.06458Qm3WYUFqscMrkk2MNOcPGXsqjAkbSsv1lZbjok';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'kLWQsZnYbRXeDF4u',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Variables globales
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  next();
});

// Rutas
app.use(require("./routes"));
app.use(require("./routes/authentication"));
app.use("/links", require("./routes/links"));

// Public
app.use(express.static(path.join(__dirname, "public")));

// Inicio del servidor
app.listen(app.get("port"), (err, res) => {
  console.log("server on port", app.get("port"));
});

// Establecer el motor de plantillas
app.set("view engine", ".hbs"); 

