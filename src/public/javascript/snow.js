const container = document.querySelector('.snow-container'); 

const snowCount = 70; // Adjust for desired number of snowflakes

for (let i = 1; i <= snowCount; i++) {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snow');


  const xStart = `${Math.random() * 100}vw`;
  const xMid = `${Math.random() * 100}vw`;
  const xEnd = `${Math.random() * 100}vw`;
  const yMid = `${Math.random() * 100}vh`;
  const scale = Math.random();
  const opacity = Math.random();
  const duration = Math.random() * 20 + 10; 
  const delay = Math.random() * -30; 
  const midpointPercent = `${Math.random() * 70 + 20}%`;


  snowflake.style.setProperty('--x-start', xStart);
  snowflake.style.setProperty('--x-mid', xMid);
  snowflake.style.setProperty('--x-end', xEnd);
  snowflake.style.setProperty('--y-mid', yMid);
  snowflake.style.setProperty('--scale', scale);
  snowflake.style.opacity = opacity;
  snowflake.style.animationDuration = `${duration}s`;
  snowflake.style.animationDelay = `${delay}s`;
  snowflake.style.setProperty('--midpoint-percent', midpointPercent);

  container.appendChild(snowflake);
}