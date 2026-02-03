// Define five cards. Each card can have one or more paragraph strings.
const cards = [
  {
    title: 'To My Dearest Gaelle,',
    image: 'images/part1.jpg',
    paragraphs: [
      "Every single day, I catch myself pausing for a moment, overwhelmed by the same thought: how impossibly lucky I am. Not just lucky in a small, ordinary way, but lucky on a scale that feels almost unreal. Among trillions and trillions of stars scattered across an endless universe, across billions of years where everything could have gone differently, I get to be alive now. And even more unbelievably, I get to share this life with you."
    ],
    actionLabel: 'Continue your Story'
  },
  {
    title: 'An Unbelievable Chance',
    image: 'images/part2.jpg',
    paragraphs: [
      "When I really think about it, it feels unfathomable. The timing, the coincidences, the paths we both walked before finding each other. So many moments could have changed everything, yet somehow they all aligned just enough for me to meet you, to know you, to love you. It feels like the universe whispered “here” and handed me the rarest gift it could offer — YOU."
    ],
    actionLabel: 'Continue your Story'
  },
  {
    title: 'A Miracle',
    image: 'images/part3.jpg',
    paragraphs: [
      "And here I am, living what feels like an impossible miracle, getting the chance to learn your heart, your mind, your laughter, your silences. Every day I discover something new about you, and every day I fall a little deeper, realizing that loving you isn’t something I choose once it’s something my soul chooses again and again and again without hesitation."
    ],
    actionLabel: 'Continue your Story'
  },
  {
    title: 'Forever and Always',
    image: 'images/part4.jpg',
    paragraphs: [
      "I love you so much, Gaelle. More than distance, more than time, more than all the space the universe could ever stretch itself into. It’s a love that feels bigger than words, quieter than promises, and stronger than anything I’ve ever known. And if there’s one thing I’m certain of, it’s this: I can’t wait to spend all the time in the world every moment, every lifetime sharing that love with you, growing in it, and choosing you over and over again."
    ],
    actionLabel: 'Continue your Story'
  },
  {
    title: 'From My Heart to Yours',
    image: 'images/part5.jpg',
    paragraphs: [
      "My dearest every thought of you turns ordinary moments into something golden. Tonight I wanted to tell you, slowly, how much you mean to me. I remember the way your laughter fills the quiet rooms and the way your hand feels like home. Those little things make me fall for you again and again. You are my favorite place to go when my mind searches for peace. Your smile is a light that keeps me going on the grayest days. If I could wrap all my feelings into one day, it would still be too small. But here is a string of words stitched from my heart to yours."
    ],
    actionLabel: 'Continue your Story'
  },
  {
    title: 'A Special Invitation',
    image: 'images/part6.jpg',
    paragraphs: [
      " Will you let me keep loving you, learning you, and making you smile for every Valentine and every ordinary day after? Click the button below when you're ready to see a little invitation I wrote just for you."
    ],
    actionLabel: 'Open Your Invitation'
  }
];

const cardEl = document.querySelector('.card');
const titleEl = document.querySelector('.title');
const messageEl = document.getElementById('message');
const cursorEl = document.getElementById('cursor');
const cta = document.getElementById('cta');
const actionBtn = document.getElementById('actionBtn');

let current = 0;

function wait(ms){return new Promise(r=>setTimeout(r,ms))}

async function typeText(text, speed=30){
  for(let i=0;i<text.length;i++){
    messageEl.textContent += text[i];
    await wait(speed + Math.random()*20);
  }
}

async function playCard(index){
  const card = cards[index];
  // set title
  titleEl.textContent = card.title;
  // update hero banner image (if exists)
  const heroBanner = document.getElementById('heroBanner');
  if(heroBanner){
    const img = card.image || 'images/hero.jpg';
    heroBanner.style.background = `linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01)), url('${img}') center / cover no-repeat`;
  }
  // reset message and show cursor
  messageEl.textContent = '';
  cursorEl.classList.remove('hidden');
  cta.classList.add('hidden');

  // type paragraphs sequentially
  for(let i=0;i<card.paragraphs.length;i++){
    await typeText(card.paragraphs[i]);
    if(i < card.paragraphs.length - 1){
      messageEl.textContent += '\n\n';
      await wait(600);
    }
  }

  // show CTA after a short pause
  await wait(420);
  cursorEl.classList.add('hidden');
  actionBtn.textContent = card.actionLabel;
  cta.classList.remove('hidden');
}

function transitionTo(nextIndex){
  // simple fade out/in
  cardEl.classList.add('fade-out');
  setTimeout(async ()=>{
    cardEl.classList.remove('fade-out');
    cardEl.classList.add('fade-in');
    current = nextIndex;
    await playCard(current);
    setTimeout(()=>cardEl.classList.remove('fade-in'), 360);
  }, 280);
}

actionBtn.addEventListener('click', ()=>{
  if(current < cards.length - 1){
    transitionTo(current + 1);
  } else {
    window.location.href = 'invite.html';
  }
});

// start
document.addEventListener('DOMContentLoaded', ()=>{
  playCard(0);
  spawnFloatingElements();
});

/*
To customize: edit the `cards` array above. Each card has `title`, `paragraphs` (array), and `actionLabel`.
*/

function spawnFloatingElements(){
  const container = document.getElementById('bg');
  if(!container) return;

  const starSvg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23FFD966' d='M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.402 8.168L12 18.896 4.664 23.166l1.402-8.168L.132 9.211l8.2-1.193z'/></svg>";
  const roseSvg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23FF6B8A' d='M12 2c-3 0-5 2-5 5 0 4 5 7 5 7s5-3 5-7c0-3-2-5-5-5zm0 2a3 3 0 110 6 3 3 0 010-6z'/></svg>";

  const items = 18;
  for(let i=0;i<items;i++){
    const el = document.createElement('span');
    el.className = 'float-item';
    const isStar = Math.random() < 0.45;
    const svg = isStar ? starSvg : roseSvg;
    const encoded = encodeURIComponent(svg);
    el.style.backgroundImage = `url("data:image/svg+xml;utf8,${encoded}")`;

    const size = Math.floor(18 + Math.random()*42); // 18-60px
    el.style.width = size + 'px';
    el.style.height = size + 'px';

    const left = Math.random()*100;
    el.style.left = left + '%';

    const duration = 12 + Math.random()*20; // 12s - 32s
    el.style.animationDuration = duration + 's';

    // stagger starting positions by negative delay
    const delay = -Math.random()*duration;
    el.style.animationDelay = delay + 's';

    // slight opacity variety
    el.style.opacity = (0.6 + Math.random()*0.45).toString();

    container.appendChild(el);
  }
}
