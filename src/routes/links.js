const express = require("express");
const router = express.Router();
const Handlebars = require("handlebars");
const multer = require("multer");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/planilla", (req, res) => {
  res.render("links/planilla");
});

router.post("/planilla", isLoggedIn, async (req, res) => {
  const {
    PASTOR_SUPERVISOR,
    COORDINADOR_DPTO,
    SUPERVISOR_DE_RED,
    FELIPE_DE_RED,
    FELIPE_LIDER,
    Asistencia_vea,
    Felipes,
    Etiopes,
    Amigos,
    Ninos,
    Ausentes,
    Convertidos_adultos,
    Convertidos_ninos,
    Reconciliados,
    Diezmos,
    Ofrendas,
    Total_financiero,
    Participacion_Mision_Amigo,
    Participacion_Consolidacion,
    Participacion_Discipulado_1,
    Asistencia_a_la_Escuela_de_Liderazgo,
    Asistencia_de_Amigos,
    Asistencia_de_Ninos,
  } = req.body;

  const newLink = {
    PASTOR_SUPERVISOR,
    COORDINADOR_DPTO,
    SUPERVISOR_DE_RED,
    FELIPE_DE_RED,
    FELIPE_LIDER,
    Asistencia_vea,
    Felipes,
    Etiopes,
    Amigos,
    Ninos,
    Ausentes,
    Convertidos_adultos,
    Convertidos_ninos,
    Reconciliados,
    Diezmos,
    Ofrendas,
    Total_financiero,
    Participacion_Mision_Amigo,
    Participacion_Consolidacion,
    Participacion_Discipulado_1,
    Asistencia_a_la_Escuela_de_Liderazgo,
    Asistencia_de_Amigos,
    Asistencia_de_Ninos,
  };

  await pool.query("INSERT INTO planilla set ?", [newLink]);
  req.flash(
    "success",
    "El formulario a sido enviado con exito, alguna duda o modificacion, comunicarse con su Felipe lider , o sus Pastores"
  );
  res.redirect("/links/planilla");
});

router.get("/", isLoggedIn, async (req, res) => {
  const planilla = await pool.query("SELECT * FROM planilla");
  res.render("links/reportes", { planilla });
});


router.get("/editplanilla/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const planilla = await pool.query("SELECT * FROM planilla WHERE id = ?", [id]);
  res.render("links/editplanilla", { planilla: planilla[0] });
});

router.post("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const {
    nombre_grupo,
    lider,
    anfrition,
    ofrenda,
    direccion,
    felipes,
    asistentes,
    niños,
    ausentes,
    novedades,
    fecha,
    area,
    acompañamiento,
  } = req.body;
  const newLink = {
    nombre_grupo,
    lider,
    anfrition,
    ofrenda,
    direccion,
    felipes,
    asistentes,
    niños,
    ausentes,
    novedades,
    fecha,
    area,
    acompañamiento,
  };
  await pool.query("UPDATE planilla set ? WHERE id ", [newLink, id]);
  req - flash("success", "producto modificado");
  res.redirect("/links/");
});

// bautizos

router.post("/bautizos", isLoggedIn, async (req, res) => {
  const {
    nombrelider,
    nombregrupo,
    nombres,
    apellidos,
    direccion,
    edad,
    telefono,
  } = req.body;

  const newLink = {
    nombrelider,
    nombregrupo,
    nombres,
    apellidos,
    direccion,
    edad,
    telefono,
  };

  await pool.query("INSERT INTO bautizos set ?", [newLink]);
  req.flash(
    "success",
    "El formulario a sido enviado con exito, alguna duda o modificacion, comunicarse con su Felipe lider , o sus Pastores"
  );
  res.redirect("/links/bautizos");
});

router.get("/editbautizos/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const bautizos = await pool.query("SELECT * FROM bautizos WHERE id = ?", [id]);
  res.render("links/editbautizos", { bautizos: bautizos[0] });
});



router.post("/editbautizos/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const {
    nombrelider,
    nombregrupo,
    nombres,
    apellidos,
    direccion,
    edad,
    telefono,
  } = req.body;
  const newLink = {
    nombrelider,
    nombregrupo,
    nombres,
    apellidos,
    direccion,
    edad,
    telefono,
  };
  await pool.query("UPDATE bautizos set ? WHERE id = ?", [newLink, id]);
  req.flash("success", "producto modificado");
  res.redirect("/links/");
});



// nuevos

router.post("/nuevos", isLoggedIn, async (req, res) => {
  const {
    nombrelidernuevo,
    nombregruponuevo,
    nombresnuevo,
    apellidosnuevo,
    direccionnuevo,
    edadnuevo,
    telefononuevo,
  } = req.body;

  const newLink = {
    nombrelidernuevo,
    nombregruponuevo,
    nombresnuevo,
    apellidosnuevo,
    direccionnuevo,
    edadnuevo,
    telefononuevo,
  };

  await pool.query("INSERT INTO nuevos set ?", [newLink]);
  req.flash(
    "success",
    "El formulario a sido enviado con exito, alguna duda o modificacion, comunicarse con su Felipe lider , o sus Pastores"
  );
  res.redirect("/links/nuevos");
});

router.get("/editnuevos/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const nuevos = await pool.query("SELECT * FROM nuevos WHERE id = ?", [id]);
  res.render("links/editnuevos", { nuevos: nuevos[0] });
});

router.post("/editnuevos/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const {
    nombrelidernuevo,
    nombregruponuevo,
    nombresnuevo,
    apellidosnuevo,
    direccionnuevo,
    edadnuevo,
    telefononuevo,
  } = req.body;
  const newLink = {
    nombrelidernuevo,
    nombregruponuevo,
    nombresnuevo,
    apellidosnuevo,
    direccionnuevo,
    edadnuevo,
    telefononuevo,
  };
  await pool.query("UPDATE nuevos set ? WHERE id ", [newLink, id]);
  req - flash("success", "producto modificado");
  res.redirect("/links/");
});

router.get("/delete/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;

  await pool.query(`DELETE FROM planilla WHERE ID = ?`, [id]);
    await pool.query(`DELETE FROM nuevos WHERE ID = ?`, [id]);
    await pool.query(`DELETE FROM bautizos WHERE ID = ?`, [id]);
    await pool.query(`DELETE FROM eventos WHERE ID = ?`, [id]);
  

  res.redirect("/links/reportes");
});




router.get("/reportes", isLoggedIn, async (req, res) => {
  try {
    const planilla = await pool.query("SELECT * FROM planilla");
    const bautizos = await pool.query("SELECT * FROM bautizos");
    const nuevos = await pool.query("SELECT * FROM nuevos");
    const eventos = await pool.query("SELECT * FROM eventos");

    res.render("links/reportes", { planilla, bautizos, nuevos, eventos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error al obtener los datos");
  }
});

// rutas

router.get("/Ubicanos", async (req, res) => {
  res.render("links/Ubicanos");
});

router.get("/adn", async (req, res) => {
  res.render("links/adn");
});

router.get("/fundadores", async (req, res) => {
  res.render("links/fundadores");
});

router.get("/misiones", async (req, res) => {
  res.render("links/misiones");
});

router.get("/donaciones", async (req, res) => {
  res.render("links/donaciones");
});

router.get("/eventos", async (req, res) => {
  res.render("links/eventos");
});

router.get("/profile",isLoggedIn, async (req, res) => {
  res.render("links/profile");
});

router.get("/reportes",isLoggedIn, async (req, res) => {
  res.render("links/reportes");
});

router.get("/bautizos",isLoggedIn, async (req, res) => {
  res.render("links/bautizos");
});


router.get("/nuevos",isLoggedIn, async (req, res) => {
  res.render("links/nuevos");
});

router.get("/editbautizos", isLoggedIn, async (req, res) => {
  res.render("links/editbautizos");
});


router.get("/creareventos",isLoggedIn, async (req, res) => {
  res.render("links/creareventos");
});

router.post("/eventos", isLoggedIn, async (req, res) => {
  const {
    Dia,
    descripcion,
    Fecha,
    Hora
  } = req.body;

  const newLink = {
    Dia,
    descripcion,
    Fecha,
    Hora
    
  };

  await pool.query("INSERT INTO eventos set ?", [newLink]);
  req.flash(
    "success",
    "El evento a sido creado"
  );
  res.redirect("/links/creareventos");
});


router.get("/delete/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;

    await pool.query(`DELETE FROM eventos WHERE ID = ?`, [id]);
  

  res.redirect("/links/eventos");
});




module.exports = router;
