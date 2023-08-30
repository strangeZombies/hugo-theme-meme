// background.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.paugram.com/wallpaper/')
      .then(response => response.blob())
      .then(blobData => {
        const imageUrl = URL.createObjectURL(blobData);
        const backgroundImage = document.createElement('div');
        backgroundImage.classList.add('background-image');
        backgroundImage.style.position = 'fixed';
        backgroundImage.style.top = '0';
        backgroundImage.style.left = '0';
        backgroundImage.style.width = '100%';
        backgroundImage.style.height = '100%';
        backgroundImage.style.backgroundImage = `url(${imageUrl})`;
        backgroundImage.style.backgroundSize = 'cover';
        backgroundImage.style.backgroundRepeat = 'no-repeat';
        backgroundImage.style.backgroundPosition = 'right center';
        backgroundImage.style.opacity = '.3'; /* 调整透明度 */
        backgroundImage.style.zIndex = '-1'; // 设置 z-index
        document.body.appendChild(backgroundImage);
      })
      .catch(error => {
        console.error('Error fetching image from API:', error);
      });
  });