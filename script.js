const radius = 400; // Carousel radius
const autoRotate = true; // Auto rotate or not
const rotateSpeed = -60; // Rotation speed in seconds per 360 degrees
const imgWidth = 300; // Width of images (px)
const imgHeight = 400; // Height of images (px)
// const bgMusicURL = 'https://soundcloud.com/janavi-mate/happy-birthday-song-in-2?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'; // URL of background music
const bgMusicURL = 'imgs/happy-birthday.mp3'; // URL of background music
let newBgMusic; // Variable to hold the new background music
const newMusicURL = 'imgs/timro.mp3'; // URL of the new music file
let bgMusic; // Variable to hold the background music
let musicState = "ok";
// Initialize audio elements
function initializeMusic() {
  newBgMusic = new Audio(newMusicURL);
  newBgMusic.loop = true; // Loop the new music
  
  // Check localStorage to determine if music should be playing
  if (musicState === 'ok') {
    newBgMusic.play().catch(error => {
      console.error("Error playing new background music:", error);
      // Optionally, show a message to the user
    });
  } 
}

// Call initializeMusic on page load
window.onload = initializeMusic;

const bgMusicControls = false; // Show UI music control


// Initialize after 1000 milliseconds
setTimeout(init, 1000);

// DOM Elements
const odrag = document.getElementById('drag-container');
const ospin = document.getElementById('spin-container');
const aImg = ospin.getElementsByTagName('img');
const aVid = ospin.getElementsByTagName('video');
const aEle = [...aImg, ...aVid]; // Combine image and video arrays

// Setup carousel
ospin.style.width = `${imgWidth}px`;
ospin.style.height = `${imgHeight}px`;

const ground = document.getElementById('ground');
ground.style.width = `${radius * 3}px`;
ground.style.height = `${radius * 3}px`;

// Add this near the top of the file, after other DOM element selections
const birthdayVideoContainer = document.createElement('div');
birthdayVideoContainer.innerHTML = `
  <div class="birthday-container" style="display: none;">
    <div class="birthday-background"></div>
    <video id="birthday-video" autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: contain;">
      <source src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/birthday-cake-animated-icon-download-in-lottie-json-gif-static-svg-file-formats--happy-party-celebration-celebrating-pack-festival-days-icons-8714731.mp4" type="video/mp4">
    </video>
   
  </div>
`;
document.body.appendChild(birthdayVideoContainer);

const birthdayVideo = document.getElementById('birthday-video');
birthdayVideo.load(); // Start loading the video

function init(delayTime) {
  aEle.forEach((ele, i) => {
    ele.style.transform = `rotateY(${i * (360 / aEle.length)}deg) translateZ(${radius}px)`;
    ele.style.transition = `transform 1s`;
    ele.style.transitionDelay = `${delayTime || (aEle.length - i) / 4}s`;
  });

  // Call applyFrontImageEffect after a short delay to ensure images are positioned
  // setTimeout(applyFrontImageEffect, 1000);
}
// Add this function after the init function
function applyFrontImageEffect() {
  const images = ospin.getElementsByTagName('img');
  const totalImages = images.length;
  const frontIndex = Math.floor(totalImages / 5);

  images[frontIndex].classList.add('front-image-effect');

  setTimeout(() => {
    images[frontIndex].classList.remove('front-image-effect');
  }, 3000);
}

// Add this to ensure the effect is applied periodically
setInterval(applyFrontImageEffect, 1000); // Apply effect every 10 seconds

function applyTransform(obj) {
  // Constrain the angle of camera (between 0 and 180)
  tY = Math.max(0, Math.min(tY, 180));
  obj.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`;
}

function playSpin(yes) {
  ospin.style.animationPlayState = yes ? 'running' : 'paused';
}

// Auto spin
if (autoRotate) {
  const animationName = rotateSpeed > 0 ? 'spin' : 'spinRevert';
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

// Add background music
const musicContainer = document.getElementById('music-container');

if (bgMusicURL) {
  musicContainer.innerHTML = `
    <audio id="bg-music" src="${bgMusicURL}" ${bgMusicControls ? 'controls' : ''} preload="auto" loop>
      <p>If you are reading this, it is because your browser does not support the audio element.</p>
    </audio>
  `;
  bgMusic = document.getElementById('bg-music');
}

let sX, sY, nX, nY, desX = 0, desY = 0, tX = 0, tY = 10;
let isMusicPlayed = false;

// Event handlers
document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  sX = e.clientX;
  sY = e.clientY;

  this.onpointermove = function (e) {
    nX = e.clientX;
    nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTransform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function () {
    odrag.timer = setInterval(() => {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTransform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };
};

document.onmousewheel = function (e) {
  const d = (e.wheelDelta / 20) || -e.detail;
  radius += d;
  init(1);
};

// Birthday Message
const wishButton = document.getElementById('wish-button');
const carousel = document.getElementById('drag-container');
const birthdayMessage = document.createElement('div');
let isWishDisplayed = false;

birthdayMessage.style.cssText = `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: 46px; // Increased font size
  font-weight: 900;
  color: #fff;
  display: none;
`;

document.body.appendChild(birthdayMessage);


const wishes = [
  " ",
  "HI Vaishnavi !",
  // "It's the best day of the year 😄😄",
  "The best day of the year is finally here 😄😄",
  "May all your dreams come true 🌠🤞",
  "Wishing you all the joy and happiness in the WORLD ! ",
  "Heres to Another year of amazing you! ",
  "Celebrate and have fun!",
  "You deserve the world 🌍",
  "You're awesome !",
  "Happy Birthday🎉"
];

let wishIndex = 0;


function showNextWish() {
  console.log(`Current wish index: ${wishIndex}`); // Debug log

  if (wishIndex < wishes.length) {
    birthdayMessage.innerHTML = '';

    const wishText = document.createElement('span');
    wishText.className = 'typewriter';
    wishText.style.whiteSpace = 'pre-wrap';
    wishText.style.width = wishIndex === wishes.length - 1 ? '100vw' : '80vw'; // Increase width for last wish
    wishText.style.fontSize = '46px';

    birthdayMessage.appendChild(wishText);

    const sentences = wishes[wishIndex].split(/(?<=[.!?])\s+/);
    let sentenceIndex = 0;

    function typeSentence() {
      if (wishIndex === 8) {
        wishText.style.whiteSpace = 'nowrap';
        // showToast(`It's wish index ${wishIndex}`);
        // wishText.style.opacity = '0';

      }
      if (sentenceIndex < sentences.length) {
        let charIndex = 0;
        const sentence = sentences[sentenceIndex];

        const typeInterval = setInterval(() => {
          if (charIndex < sentence.length) {
            wishText.innerHTML += sentence[charIndex];
            charIndex++;
          } else {
            clearInterval(typeInterval);
            sentenceIndex++;
            setTimeout(typeSentence, 500);
          }
        }, 100);
      } else {
        console.log(`Finished typing wish index: ${wishIndex}`); // Debug log

        // Show toast for index 3
        if (wishIndex === 9) {
          // showToast(`It's wish index ${wishIndex}`);
          wishText.style.width = '100vw'; // Ensure full width for last wish
        }


        wishIndex++;

        // Schedule next wish or final message
        if (wishIndex < wishes.length) {
          setTimeout(showNextWish, 500); // Show next wish after 3 seconds
        } else {
          setTimeout(showFinalBirthdayMessage, 4000); // Show final message after 3 seconds
        }
      }
    }

    // Split long wishes into two lines
    if (wishes[wishIndex].length > 28) {
      const midIndex = Math.floor(wishes[wishIndex].length / 2);
      const firstPart = wishes[wishIndex].slice(0, midIndex).trim();
      const secondPart = wishes[wishIndex].slice(midIndex).trim();
      wishes[wishIndex] = `${firstPart}\n${secondPart}`;
    }

    typeSentence();
  }
}

function showToast(message) {
  console.log(`Showing toast: ${message}`); // Debug log
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 1000;
  `;
  document.body.appendChild(toast);

  // Remove toast after 3 seconds
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 0);
}

function showFinalBirthdayMessage() {
  birthdayMessage.innerHTML = '';
  birthdayMessage.appendChild(birthdayVideoContainer.firstElementChild);

  const birthdayContainer = birthdayMessage.querySelector('.birthday-container');
  birthdayContainer.style.display = 'flex';
  birthdayContainer.style.flexDirection = 'column';
  birthdayContainer.style.height = 'auto';

  const nameElement = document.createElement('h1');
  nameElement.className = 'birthday-name glow-on-hover';
  nameElement.innerHTML = '<span class="name-highlight"Vaishnavi</span><span class="name-highlight-2"</span>';
  nameElement.style.cssText = `
    width: auto;
    min-width: 220px;
    height: auto;
    min-height: 120px;
    border-bottom: 2px solid #fff;
    outline: none;
    background: #111;
    cursor: default;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px auto;
    font-size: 96px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-family: 'Pacifico', cursive;
    user-select: none;
    pointer-events: none;
    color: rgb(249, 249, 249);
      font-family: "Nerko One", cursive;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
  font-variation-settings:
    "wdth" 105.8;
  `;

  birthdayContainer.insertBefore(nameElement, birthdayContainer.firstChild);
  birthdayContainer.insertBefore(nameElement, birthdayVideo.nextSibling);

  const glowEffect = document.createElement('div');
  glowEffect.style.cssText = `
    content: '';
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    bottom: -2px;
    left: -2px;
    right: -2px;
    // height: 4px;
    height: 20px;
    background-size: 1000%;
    z-index: -1;
    // filter: blur(5px);
     filter: blur(1px);
    //  width: calc(100% + 6px);
    // height: calc(100% + 6px);
    animation: glowing 20s linear infinite;
    opacity: 1;
    // transition: opacity .3s ease-in-out;
    // border-radius: 30px;
        transition: opacity .2s ease-in-out;
    border-radius: 60px;
    
  `;
  nameElement.appendChild(glowEffect);
  const style = document.createElement('style');
  style.textContent += `
    @keyframes glowing {
      0% { background-position: 0 0; }
      50% { background-position: 400% 0; }
      100% { background-position: 0 0; }
    }
    .name-highlight {
      background: linear-gradient(45deg, #ff00ff, #00ffff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: colorChange 5s infinite alternate;
    }
    .name-highlight-2 {
      background: linear-gradient(45deg, #00ffff, #ffff00);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: colorChange 5s infinite alternate-reverse;
    }
    @keyframes colorChange {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
    
    .birthday-name {
      pointer-events: none;
    }
    
    .birthday-name span {
      pointer-events: none;
    }
  `;
  clearInterval(wishInterval);

  setTimeout(() => {
    bgMusic.currentTime = 0; // Restart background music
    bgMusic.play().catch(error => console.error("Error playing background music:", error));
  }, 1000); // Restart music 1 second before showing video

  setTimeout(() => {
    birthdayVideo.play().catch(error => console.error("Error playing video:", error));
  }, 1000); // Delay playing video by 1 second

  birthdayMessage.style.display = 'block';
}

const style = document.createElement('style');
style.textContent = `
  body {
    background: linear-gradient(to bottom, #000000, #1a1a1a);
    min-height: 100vh;
    height:100vh;
    margin: 0;
    padding: 0;
  }

  .birthday-container {
    position: relative;
    width: 900px;
    height: 900px;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 20px #ff00ff, 0 0 30px #00ffff, 0 0 40px #ffff00;
  }

  .birthday-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    filter: blur(3px);
  }

    .birthday-container h1 {
      position: relative;
      font-size: 36px;
      margin-top: 20px;
      text-align: center;
      color: #fff;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

  @keyframes glowing {
    from {
      box-shadow: 0 0 20px #ff00ff, 0 0 30px #00ffff, 0 0 40px #ffff00;
    }
    to {
      box-shadow: 0 0 30px #ff00ff, 0 0 40px #00ffff, 0 0 50px #ffff00;
    }
  }

  .front-image-effect {
    -webkit-box-shadow: 0 0 25px #fffd;
    box-shadow: 0 0 55px rgba(255, 255, 255, 0.947) !important;

  }
`;
document.head.appendChild(style);

wishButton.addEventListener('click', () => {
  if (bgMusicURL) {
    newBgMusic.pause();
    bgMusic.loop = true; // Loop the background music
  } else {
    newBgMusic.pause();
  }
  document.body.removeChild(wishButton);
  if (!isWishDisplayed) {
    carousel.style.display = 'none';
    birthdayMessage.style.display = 'block';
    wishIndex = 0; // Reset wish index
    showNextWish();
    isWishDisplayed = true;
    wishButton.textContent = 'Back';

    if (!isMusicPlayed) {
      if (bgMusic) {
        bgMusic.play().catch(err => {
          console.error('Failed to play the music:', err);
        });
      }
      isMusicPlayed = true;
    }
  } else {
    carousel.style.display = 'block';
    birthdayMessage.style.display = 'none';
    isWishDisplayed = false;
    wishButton.textContent = 'Make a Wish';
    wishIndex = 0; // Reset wish index when going back
  }
});

