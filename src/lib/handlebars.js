const { createClient } = require('@supabase/supabase-js');
const { format } = require('timeago.js');
const fetch = require('node-fetch');
const handlebars = require('handlebars');

// Asigna fetch a global para que pueda ser utilizado por @supabase/supabase-js
global.fetch = fetch;

// Crea un cliente de Supabase para interactuar con tu base de datos
const supabase = createClient('https://wrdalmrnoeslzthwqnuo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyZGFsbXJub2VzbHp0aHdxbnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2NjA2NzQsImV4cCI6MjAyMjIzNjY3NH0.06458Qm3WYUFqscMrkk2MNOcPGXsqjAkbSsv1lZbjok');

// Función para convertir la marca de tiempo de Supabase a formato 'time ago'
const timeago = (timestamp) => {
  // Crea un objeto Date a partir de la marca de tiempo de Supabase
  const date = new Date(timestamp);

  // Convierte la fecha a la zona horaria local
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

  // Formatea la fecha local a 'time ago'
  return format(localDate);
};

// Registra el helper 'timeago' en Handlebars
handlebars.registerHelper('timeago', timeago);

// Función asíncrona para obtener algunos datos de Supabase
async function fetchData() {
  // Lista de tablas
  const tables = ['planilla', 'nuevos', 'bautizos'];

  for (let table of tables) {
    const { data, error } = await supabase
      .from(table)
      .select('created_at');

    if (error) {
      console.error(`Error obteniendo datos de la tabla ${table}:`, error);
    } else {
      // Convierte la marca de tiempo de cada fila a formato 'time ago'
      data.forEach(row => {
        console.log(`Tabla: ${table}, Fecha: ${timeago(row.created_at)}`);
      });
    }
  }
}

// Llama a la función fetchData
fetchData();
