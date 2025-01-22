// Configura la fecha y hora del último stream (ajustado para UTC-5)
const lastStreamDate = new Date('2025-01-19T14:00:00Z'); // 9:00 AM UTC-5 es 14:00 UTC

// Función para actualizar el cronómetro
function updateTimer() {
  const now = new Date();
  const timeDiff = now - lastStreamDate; // Tiempo transcurrido en milisegundos
  
  const seconds = Math.floor(timeDiff / 1000) % 60;
  const minutes = Math.floor(timeDiff / 1000 / 60) % 60;
  const hours = Math.floor(timeDiff / 1000 / 60 / 60) % 24;
  const days = Math.floor(timeDiff / 1000 / 60 / 60 / 24);
  
  // Mostrar el tiempo transcurrido en el formato: X días X horas X minutos X segundos
  document.getElementById('how-long-since-stream').textContent = 
    `${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
}

// Llamar a la función para que se ejecute inicialmente
updateTimer();

// Actualizar cada segundo
setInterval(updateTimer, 1000);

// ID del canal de YouTube (reemplaza con el canal correcto)
const channelId = 'UCW5uhrG1eCBYditmhL0Ykjw'; // ID de canal de Elizabeth

// Tu API Key de YouTube (reemplaza con tu API Key)
const apiKey = 'AIzaSyDi0GszGzCL83zwe6jpzS46AWjj1RKP4JQ';  // Cambia 'YOUR_YOUTUBE_API_KEY' por tu clave API real

// URL de la API de YouTube para obtener los videos más recientes
const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet&type=video&maxResults=5`;

// Función para obtener un video aleatorio del canal
async function getRandomVideo() {
  try {
    const response = await fetch(apiUrl); // Realizamos la solicitud a la API de YouTube
    const data = await response.json();  // Convertimos la respuesta en JSON

    if (data.items && data.items.length > 0) {
      // Seleccionar un video aleatorio de los 5 videos más recientes
      const randomIndex = Math.floor(Math.random() * data.items.length);  // Seleccionamos un índice aleatorio
      const videoId = data.items[randomIndex].id.videoId;  // Extraemos el ID del video aleatorio

      // Generamos la URL del video
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

      // Actualizamos el enlace con la URL del video
      const randomStreamElement = document.getElementById('randomStream');
      randomStreamElement.href = videoUrl;  // Establecemos el href del enlace con la URL del video
      randomStreamElement.textContent = 'Random Elizabeth Stream';  // Cambiamos el texto del enlace

      // Depuración: mostrar la URL del video aleatorio en la consola
      console.log("Enlace del video aleatorio actualizado:", videoUrl);
    } else {
      console.error('No se encontraron videos en el canal.');
    }
  } catch (error) {
    console.error('Error al obtener video:', error);
  }
}

// Llamar a la función cuando la página se cargue
getRandomVideo();

// Asegúrate de que el enlace no recargue la página si el href no está configurado correctamente
document.getElementById('randomStream').addEventListener('click', function(event) {
  const link = this;

  // Si el href es '#' o vacío, evitamos que se recargue la página
  if (link.href === '#' || link.href === '') {
    event.preventDefault();
    console.log("El enlace aún no tiene una URL válida.");
  }
});