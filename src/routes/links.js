const express = require("express");
const router = express.Router();
const Handlebars = require("handlebars");
const multer = require("multer");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
const { createClient } = require ('@supabase/supabase-js')

const supabase = createClient('https://wrdalmrnoeslzthwqnuo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyZGFsbXJub2VzbHp0aHdxbnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2NjA2NzQsImV4cCI6MjAyMjIzNjY3NH0.06458Qm3WYUFqscMrkk2MNOcPGXsqjAkbSsv1lZbjok')


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



router.get("/planilla", (req, res) => {
  res.render("links/planilla");
});

router.post("/planilla",  async (req, res) => {
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

  const { error } = await supabase
    .from('planilla')
    .insert([{
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
    }]);

  if (error) {
    console.log(error);
  } else {
    req.flash(
      "success",
      "El formulario a sido enviado con exito, alguna duda o modificacion, comunicarse con su Felipe lider , o sus Pastores"
    );
    res.redirect("/links/planilla");
  }
});

router.get("/",  async (req, res) => {
  const { data, error } = await supabase
    .from('planilla')
    .select('*');

  if (error) {
    console.log(error);
  } else {
    res.render("links/reportes", { planilla: data });
  }
});

router.get("/editplanilla/:id",  async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('planilla')
    .select('*')
    .eq('id', id);

  if (error) {
    console.log(error);
  } else {
    res.render("links/editplanilla", { planilla: data[0] });
  }
});

router.post("/edit/:id",  async (req, res) => {
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

  const { error } = await supabase
    .from('planilla')
    .update({
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
    })
    .eq('id', id);

  if (error) {
    console.log(error);
  } else {
    req.flash("success", "producto modificado");
    res.redirect("/links/");
  }
});


// bautizos

router.post("/bautizos", async (req, res) => {
  const {
    nombrelider,
    nombregrupo,
    nombres,
    apellidos,
    direccion,
    edad,
    telefono,
  } = req.body;

  const { data, error } = await supabase
    .from('bautizos')
    .insert([
      { 
        nombrelider,
        nombregrupo,
        nombres,
        apellidos,
        direccion,
        edad,
        telefono,
      },
    ]);

  if (error) {
    console.log(error);
    return;
  }

  req.flash(
    "success",
    "El formulario a sido enviado con exito, alguna duda o modificacion, comunicarse con su Felipe lider , o sus Pastores"
  );
  res.redirect("/links/bautizos");
});

router.get("/editbautizos/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('bautizos')
    .select('*')
    .eq('id', id);

  if (error) {
    console.log(error);
    return;
  }

  res.render("links/editbautizos", { bautizos: data[0] });
});

router.post("/editbautizos/:id", async (req, res) => {
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

  const { data, error } = await supabase
    .from('bautizos')
    .update({
      nombrelider,
      nombregrupo,
      nombres,
      apellidos,
      direccion,
      edad,
      telefono,
    })
    .eq('id', id);

  if (error) {
    console.log(error);
    return;
  }

  req.flash("success", "producto modificado");
  res.redirect("/links/");
});


// nuevos

router.post("/nuevos", async (req, res) => {
  const {
    nombrelidernuevo,
    nombregruponuevo,
    nombresnuevo,
    apellidosnuevo,
    direccionnuevo,
    edadnuevo,
    telefononuevo,
  } = req.body;

  const { error } = await supabase
    .from('nuevos')
    .insert([
      { 
        nombrelidernuevo,
        nombregruponuevo,
        nombresnuevo,
        apellidosnuevo,
        direccionnuevo,
        edadnuevo,
        telefononuevo,
      },
    ]);

  if (error) {
    console.log(error);
    return;
  }

  req.flash(
    "success",
    "El formulario a sido enviado con exito, alguna duda o modificacion, comunicarse con su Felipe lider , o sus Pastores"
  );
  res.redirect("/links/nuevos");
});

router.get("/editnuevos/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('nuevos')
    .select('*')
    .eq('id', id);

  if (error) {
    console.log(error);
    return;
  }

  res.render("links/editnuevos", { nuevos: data[0] });
});

router.post("/editnuevos/:id", async (req, res) => {
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

  const { error } = await supabase
    .from('nuevos')
    .update({ 
      nombrelidernuevo,
      nombregruponuevo,
      nombresnuevo,
      apellidosnuevo,
      direccionnuevo,
      edadnuevo,
      telefononuevo,
    })
    .eq('id', id);

  if (error) {
    console.log(error);
    return;
  }

  req.flash("success", "producto modificado");
  res.redirect("/links/");
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;

  await supabase
    .from('planilla')
    .delete()
    .eq('id', id);

  await supabase
    .from('nuevos')
    .delete()
    .eq('id', id);

  await supabase
    .from('bautizos')
    .delete()
    .eq('id', id);

  await supabase
    .from('eventos')
    .delete()
    .eq('id', id);

  res.redirect("/links/reportes");
});

router.get('/reportes', async (req, res) => {
  // Obtén los datos de la tabla 'planilla'
  const { data: dataPlanilla, error: errorPlanilla } = await supabase
    .from('planilla')
    .select('*')

  // Obtén los datos de la tabla 'bautizos'
  const { data: dataBautizos, error: errorBautizos } = await supabase
    .from('bautizos')
    .select('*')



  // Obtén los datos de la tabla 'nuevos'
  const { data: dataNuevos, error: errorNuevos } = await supabase
    .from('nuevos')
    .select('*')

  // Obtén los datos de la tabla 'eventos'
  const { data: dataEventos, error: errorEventos } = await supabase
    .from('eventos')
    .select('*')

  // Renderiza tu archivo '.hbs' pasando los datos obtenidos
  res.render("links/reportes", { 
    planilla: dataPlanilla, 
    bautizos: dataBautizos, 
    nuevos: dataNuevos, 
    eventos: dataEventos 
  });
});

router.get('/', (req, res) => {
  let user = req.session.user; 
  res.render('index', { user: user }); 
});

app.get('/logout', (req, res) => {
  req.session.destroy(); 
  res.redirect('/'); 
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



router.get("/reportes", async (req, res) => {
  res.render("links/reportes");
});

router.get("/bautizos", async (req, res) => {
  res.render("links/bautizos");
});


router.get("/nuevos", async (req, res) => {
  res.render("links/nuevos");
});

router.get("/editbautizos",  async (req, res) => {
  res.render("links/editbautizos");
});

router.get("/profile",  async (req, res) => {
  res.render("links/profile");
});

router.get("/signup",  async (req, res) => {
  res.render("links/signup");
});


router.get("/creareventos", async (req, res) => {
  res.render("links/creareventos");
});

router.post("/eventos", async (req, res) => {
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

  const { data, error } = await supabase
    .from('eventos')
    .insert([newLink]);

  if (error) {
    req.flash("error", error.message);
  } else {
    req.flash("success", "El evento a sido creado");
  }

  res.redirect("/links/creareventos");
});

// Ruta GET para eliminar un evento
router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('eventos')
    .delete()
    .match({ ID: id });

  if (error) {
    req.flash("error", error.message);
  }

  res.redirect("/links/eventos");
});





module.exports = router;
