document.addEventListener('DOMContentLoaded', function () {
    const bgMusic = document.getElementById('bg-music');
    const toggleButton = document.getElementById('toggle-music');

    // 从 sessionStorage 获取音乐状态
    let musicStatus = sessionStorage.getItem('bgMusicStatus') || 'off';

    // 检查用户的音乐偏好和播放位置
    let musicPosition = parseFloat(sessionStorage.getItem('bgMusicPosition')) || 0;

    if (musicStatus === 'on') {
        bgMusic.currentTime = musicPosition;
        bgMusic.play();
    }

    // 更新播放位置
    bgMusic.addEventListener('timeupdate', function () {
        sessionStorage.setItem('bgMusicPosition', bgMusic.currentTime);
    });

    // 播放/暂停音乐的按钮点击事件
    toggleButton.addEventListener('click', function () {
        if (bgMusic.paused) {
            bgMusic.play();
            sessionStorage.setItem('bgMusicStatus', 'on');
        } else {
            bgMusic.pause();
            sessionStorage.setItem('bgMusicStatus', 'off');
        }
    });
});