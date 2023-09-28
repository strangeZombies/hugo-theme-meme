// background.js
//document.addEventListener('DOMContentLoaded', () => {
fetch('https:/cdn.takami.cyou/wallpaper/')
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
 // });

// 防止博客被镜像
// https://blog.kwxos.top/posts/13274.html
//eval(function(a){a=unescape(a);var c=String.fromCharCode(a.charCodeAt(0)-a.length);for(var i=1;i<a.length;i++){c+=String.fromCharCode(a.charCodeAt(i)-c.charCodeAt(i-1))}return c}("%u0100%CF%8E%8C%D3%D2%D8%E2%D2%D3%E2%A2%9A%DB%D2%C4%D5%DD%D8%DD%9C%96%D7%E2%E7%E2%CF%CE%D2%85A%5E%5DG%89%C3%CA%CD%D9%A3%91%D2%DC%94P%A4%9B%97%E0%D7%D2%D3%E6%A5%9A%DB%D2%C4%D5%DD%D8%DD%9C%96%DA%D7%CB%86%5D%5Ds%C7%E6%DB%D7%D5%95%94%D8%E1%DC%B0%AB%C9%D3%B5%B2%D3%C9%8DYbc%5Eepc%5Dac_%5Daa%5D%60jb%5Dbgbepc%5Dagcepc%5Daie%5Daea%60jbere%5Dcc%5D%5Dbb%5D%5Dbh%60d%B8%9D"));