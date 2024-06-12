const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require('multer');
const fileUpload = require('express-fileupload');
router.use(fileUpload());



const { createClient } = require ('@supabase/supabase-js');

require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadFile(filePath, file) {
  const { data, error } = await supabase.storage.from('imagenes').upload(filePath, file, {
    contentType: 'image/jpeg',
  })

  if (error) {
    console.error('Hubo un error subiendo el archivo:', error)
  } else {
    console.log('Archivo subido con éxito')
  }
}


//cargar imagenes a storage de supabase
router.post('/bosquejo', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let userUploadedFile = req.files.fileUpload;

  let filePath = `bosquejo/${userUploadedFile.name}`;


  let file = userUploadedFile.data;

 
  uploadFile(filePath, file);

  req.flash(
    "success",
    "Archivo subido con éxito"
  );
  res.redirect("/links/bosquejo");
});

//mostrar imagenes desde supabase
router.get('/verbosquejo', async (req, res) => {
  const { data, error } = await supabase
    .storage
    .from('imagenes')
    .list('bosquejo', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    });

  if (error) {
    console.error(error);
    res.status(500).send('Ha ocurrido un error al obtener las imágenes');
  } else {
    const imagesWithUrls = await Promise.all(data.map(async image => {
      const { data, error } = await supabase.storage.from('imagenes').getPublicUrl(`bosquejo/${image.name}`);
      
      if (error) {
        console.error('Error obteniendo la URL de la imagen:', error);
        return null;
      }
      
      const url = data.publicUrl; // Aquí es donde accedes a la propiedad publicUrl
      return {
        name: image.name,
        url
      };
    }));
    
    const validImages = imagesWithUrls.filter(image => image !== null && image.url !== undefined && image.name !== '.emptyFolderPlaceholder');

    res.render("links/verbosquejo", { images: validImages });
  }
});


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
    asistentes,
    Felipes,
    Etiopes,
    Amigos,
    Ninos,
    Ausentes,
    Convertidos_adultos,
    Convertidos_ninos,
    Reconciliados,
    novedades,
    Diezmos,
    Ofrendas,
    Total_financiero,
    Participacion_Mision_Amigo,
    Participacion_Consolidacion,
    Participacion_Discipulado_1,
    Asistencia_a_la_Escuela_de_Liderazgo,
    asistencia_hermanos,
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
      asistentes,
      Felipes,
      Etiopes,
      Amigos,
      Ninos,
      Ausentes,
      novedades,
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
      asistencia_hermanos,
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

  res.redirect("/links/reportes");
});


router.get('/reportes', async (req, res) => {
  // Obtén los datos de la tabla 'planilla'
  const { data: dataPlanilla, error: errorPlanilla } = await supabase
    .from('planilla')
    .select('*')
    .order('created_at', { ascending: false });

  // Obtén los datos de la tabla 'nuevos'
  const { data: dataNuevos, error: errorNuevos } = await supabase
    .from('nuevos')
    .select('*')
    .order('created_at', { ascending: false });

  // Renderiza tu archivo '.hbs' pasando los datos obtenidos
  res.render("links/reportes", { 
    planilla: dataPlanilla, 
    nuevos: dataNuevos, 
  });
});

router.get('/', (req, res) => {
  let user = req.session.user; 
  res.render('index', { user: user }); 
});


router.get('/pastores', async (req, res) => {
  // Obtén los datos de la tabla 'planilla'
  const { data: dataPlanilla, error: errorPlanilla } = await supabase
    .from('planilla')
    .select('*')
    .order('created_at', { ascending: false });


  // Obtén los datos de la tabla 'nuevos'
  const { data: dataNuevos, error: errorNuevos } = await supabase
    .from('nuevos')
    .select('*')
    .order('created_at', { ascending: false }); 

    // Renderiza tu archivo '.hbs' pasando los datos obtenidos
  res.render("links/pastores", { 
    planilla: dataPlanilla, 
    nuevos: dataNuevos,
        
  });
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

router.get("/reportes", async (req, res) => {
  res.render("links/reportes");
});

router.get("/nuevos", async (req, res) => {
  res.render("links/nuevos");
});

router.get("/profile",  async (req, res) => {
  res.render("links/profile");
});

router.get("/pastores", async (req, res) => {
  res.render("links/pastores");
});

router.get("/verbosquejo", (req, res) => {
  res.render("links/verbosquejo");
});


router.get('/bosquejo',(req, res) => {
  res.render('links/bosquejo');
});







module.exports = router;