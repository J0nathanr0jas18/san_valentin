let noButtonState = 0;
const FINAL_STATE = 16;

// Mostrar el gif inicial
document.getElementById('gifContainer').style.display = 'block';

// Asegura scroll normal al inicio
document.documentElement.style.overflow = '';
document.body.style.overflow = '';

const bgMusic = document.getElementById('bgMusic');
let musicStarted = false;

function startMusic() {
  if (musicStarted) return;
  musicStarted = true;

  // intenta reproducir
  bgMusic.volume = 0.6; // ajusta volumen (0.0 a 1.0)
  bgMusic.play().catch(() => {
    // si falla, no hacemos nada; normalmente ya funciona con el primer click
  });
}

// ✅ Primer click en cualquier parte inicia música
document.addEventListener('click', startMusic, { once: true });

function hideAllGifs() {
  const ids = [
    'gifContainer',
    'happyGifContainer',
    'happyGifContainer2',
    'happyGifContainer3',
    'happyGifContainer4',
    'sadGifContainer',
    'sadGifContainer1',
    'sadGifContainer2',
  ];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

function showHappySequence() {
  hideAllGifs();

  // Fondo verde (en tu CSS está blanco, pero lo dejo por si cambias luego)
  document.body.classList.add('bg-green');

  // Mensaje
  const msg = document.getElementById('messageContainer');
  msg.style.display = 'block';
  msg.innerHTML = '¡SÍÍÍ! Sabía que ibas a decir que sí 😍❤️';

  // Muestra primer gif feliz
  document.getElementById('happyGifContainer').style.display = 'block';

  // Secuencia
  setTimeout(() => {
    document.getElementById('happyGifContainer').style.display = 'none';
    document.getElementById('happyGifContainer2').style.display = 'block';
  }, 1000);

  setTimeout(() => {
    document.getElementById('happyGifContainer2').style.display = 'none';
    document.getElementById('happyGifContainer3').style.display = 'block';
  }, 2000);

  setTimeout(() => {
    document.getElementById('happyGifContainer3').style.display = 'none';
    document.getElementById('happyGifContainer4').style.display = 'block';
  }, 3000);
}

function makeYesFullscreen() {
  const siBtn = document.getElementById('siBtn');
  const noBtn = document.getElementById('noBtn');
  const question = document.getElementById('question');
  const message = document.getElementById('messageContainer');

  // Activa modo final
  document.body.classList.add('yes-fullscreen');

  // Oculta texto y gifs
  if (question) question.style.display = 'none';
  if (message) message.style.display = 'none';
  hideAllGifs();

  // Oculta NO totalmente
  if (noBtn) {
    noBtn.style.display = 'none';
    noBtn.style.visibility = 'hidden';
    noBtn.style.pointerEvents = 'none';
  }

  // Sí en fullscreen
  siBtn.style.display = 'flex';
  siBtn.style.position = 'fixed';
  siBtn.style.inset = '0';
  siBtn.style.width = '100vw';
  siBtn.style.height = '100vh';
  siBtn.style.zIndex = '99999';
  siBtn.style.borderRadius = '0';
  siBtn.style.margin = '0';
  siBtn.style.padding = '0';
  siBtn.style.fontSize = 'clamp(48px, 10vw, 140px)';
  siBtn.style.alignItems = 'center';
  siBtn.style.justifyContent = 'center';
  siBtn.innerHTML = 'SÍ ❤️';

  // Bloquea scroll SOLO al final
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

function exitYesFullscreen() {
  // Quita modo final
  document.body.classList.remove('yes-fullscreen');

  // Restaura scroll normal
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';

  // Restaura estilos del botón Sí a “normal” (por si vuelves a usarlo)
  const siBtn = document.getElementById('siBtn');
  siBtn.style.position = '';
  siBtn.style.inset = '';
  siBtn.style.width = '';
  siBtn.style.height = '';
  siBtn.style.zIndex = '';
  siBtn.style.borderRadius = '';
  siBtn.style.margin = '';
  siBtn.style.padding = '10px 20px';
  siBtn.style.display = '';
  siBtn.style.alignItems = '';
  siBtn.style.justifyContent = '';
  siBtn.style.fontSize = '';
  siBtn.innerHTML = 'Sí';
}

document.getElementById('siBtn').addEventListener('click', function () {
  const isFinalMode = document.body.classList.contains('yes-fullscreen');

  // Si estás en modo final, al click pasas al final feliz
  if (isFinalMode) {
    exitYesFullscreen();

    // Oculta botones
    document.getElementById('siBtn').style.display = 'none';
    document.getElementById('noBtn').style.display = 'none';

    // Muestra secuencia feliz
    showHappySequence();
    return;
  }

  // Comportamiento normal (cuando no está fullscreen)
  document.getElementById('question').style.display = 'none';
  document.getElementById('siBtn').style.display = 'none';
  document.getElementById('noBtn').style.display = 'none';

  showHappySequence();
});

document.getElementById('noBtn').addEventListener('click', function () {
  if (noButtonState > FINAL_STATE) return;

  switch (noButtonState) {
    case 0:
      hideAllGifs();
      document.getElementById('sadGifContainer').style.display = 'block';

      this.innerHTML = '¿No? 😳 ¿Estás segura, mi amor?';
      this.style.backgroundColor = '#F1330A';

      document.getElementById('siBtn').style.fontSize = '40px';
      document.getElementById('siBtn').style.padding = '20px 40px';

      noButtonState++;
      break;

    case 1:
      this.innerHTML = 'Amor… mírame bien: ¿segurísima? 🥺';
      this.style.backgroundColor = '#F1330A';
      hideAllGifs();
      document.getElementById('sadGifContainer2').style.display = 'block';

      document.getElementById('siBtn').style.fontSize = '50px';
      document.getElementById('siBtn').style.padding = '30px 50px';

      noButtonState++;
      break;

    case 2:
      this.innerHTML = 'No me hagas esto 😭 ¿de verdad de verdad?';
      this.style.backgroundColor = '#F1330A';
      hideAllGifs();
      document.getElementById('sadGifContainer1').style.display = 'block';

      document.getElementById('siBtn').style.fontSize = '60px';
      document.getElementById('siBtn').style.padding = '40px 60px';

      noButtonState++;
      break;

    case 3:
      this.innerHTML = 'Ok… última oportunidad: ¿sí o no? 😔';
      this.style.backgroundColor = '#F1330A';

      document.getElementById('siBtn').style.fontSize = '70px';
      document.getElementById('siBtn').style.padding = '50px 70px';

      noButtonState++;
      break;

    case 4:
      this.innerHTML = 'Di que sí, por fa… me haces feliz 😩❤️';
      this.style.backgroundColor = '#F1330A';

      document.getElementById('siBtn').style.fontSize = '80px';
      document.getElementById('siBtn').style.padding = '60px 80px';

      noButtonState++;
      break;

    case 5:
      this.innerHTML = 'Piénsalo tantito… solo tantito 😌';
      this.style.backgroundColor = '#F1330A';

      document.getElementById('siBtn').style.fontSize = '90px';
      document.getElementById('siBtn').style.padding = '70px 90px';

      noButtonState++;
      break;

    case 6:
      this.innerHTML = 'Si dices que no, me pongo triste en serio 😢';
      this.style.backgroundColor = '#F1330A';

      document.getElementById('siBtn').style.fontSize = '100px';
      document.getElementById('siBtn').style.padding = '80px 100px';

      noButtonState++;
      break;

    case 7:
      this.innerHTML = 'Me vas a dejar con el corazón chiquito 🥲';
      this.style.backgroundColor = '#F1330A';

      document.getElementById('siBtn').style.fontSize = '120px';
      document.getElementById('siBtn').style.padding = '90px 120px';

      noButtonState++;
      break;

    case 8:
      this.innerHTML = 'Amor… me estoy poniendo MUY triste 😭';
      this.style.backgroundColor = '#F1330A';

      document.getElementById('siBtn').style.fontSize = '140px';
      document.getElementById('siBtn').style.padding = '100px 140px';

      noButtonState++;
      break;

    case 9:
      this.innerHTML = 'Ya casi lloro, no seas así conmigo 😞';
      this.style.backgroundColor = '#F1330A';

      document.getElementById('siBtn').style.fontSize = '160px';
      document.getElementById('siBtn').style.padding = '110px 160px';

      noButtonState++;
      break;

    case 10:
      this.innerHTML = 'Ok… ya, prometo dejar de insistir… (creo) 😔';
      this.style.backgroundColor = '#F1330A';

      document.getElementById('siBtn').style.fontSize = '180px';
      document.getElementById('siBtn').style.padding = '120px 180px';

      noButtonState++;
      break;

    case 11:
      this.innerHTML = 'Jajaja mentira 😭 POR FAVOR DI QUE SÍ ❤️';
      this.style.backgroundColor = '#F1330A';

      document.getElementById('siBtn').style.fontSize = '200px';
      document.getElementById('siBtn').style.padding = '130px 200px';

      noButtonState++;
      break;

    case 12:
      this.innerHTML = 'Me estoy muriendo de tristezaaa 😫';
      this.style.backgroundColor = '#F1330A';

      document.getElementById('siBtn').style.fontSize = '220px';
      document.getElementById('siBtn').style.padding = '140px 220px';

      noButtonState++;
      break;

    case 13:
      this.innerHTML = 'Me estás rompiendo el corazoncito 💔🥺';
      this.style.backgroundColor = '#F1330A';

      document.getElementById('siBtn').style.fontSize = '240px';
      document.getElementById('siBtn').style.padding = '150px 240px';

      noButtonState++;
      break;

    case 14:
      this.innerHTML = 'Ok ok… ya entendí… (pero di que sí 😭)';
      this.style.backgroundColor = '#F1330A';

      document.getElementById('siBtn').style.fontSize = '260px';
      document.getElementById('siBtn').style.padding = '160px 260px';

      noButtonState++;
      break;

    case 15:
      this.innerHTML = 'Andaaaa mi amor… SÍÍÍÍÍÍÍ 😩❤️';
      this.style.backgroundColor = '#F1330A';

      document.getElementById('siBtn').style.fontSize = '280px';
      document.getElementById('siBtn').style.padding = '170px 280px';

      noButtonState++;
      break;

    case 16:
      makeYesFullscreen();
      noButtonState++; // 17
      break;

    default:
      break;
  }
});
