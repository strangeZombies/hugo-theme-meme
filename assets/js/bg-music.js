document.addEventListener('DOMContentLoaded', function () {
    const bgMusic = document.getElementById('bg-music');
    const toggleButton = document.getElementById('toggle-music');
    const progressBar = document.getElementById('progress-bar');

    // 定义歌曲列表，每首歌包含路径
    const songs = [
        'https://music.163.com/song/media/outer/url?id=2013748811.mp3',
        'https://music.163.com/song/media/outer/url?id=202369.mp3',
        // 添加更多歌曲...
    ];

    // 从 sessionStorage 获取音乐状态
    const musicStatus = sessionStorage.getItem('bgMusicStatus') || 'off';

    // 获取当前歌曲索引，如果没有则默认为 0
    let currentSongIndex = parseInt(sessionStorage.getItem('currentSongIndex')) || 0;

    // 获取下一首歌曲索引，如果没有则默认为下一首
    let nextSongIndex = parseInt(sessionStorage.getItem('nextSongIndex')) || (currentSongIndex + 1) % songs.length;

    // 检查用户的音乐偏好
    if (musicStatus === 'on') {
        playCurrentSong();
    }

    // 播放/暂停音乐的按钮点击事件
    toggleButton.addEventListener('click', function () {
        if (bgMusic.paused) {
            playCurrentSong();
        } else {
            pauseCurrentSong();
        }
    });

    // 页面卸载前保存当前歌曲的进度和下一首歌曲的索引
    window.addEventListener('beforeunload', function () {
        sessionStorage.setItem('bgMusicPosition', bgMusic.currentTime);
        sessionStorage.setItem('nextSongIndex', nextSongIndex);
        sessionStorage.setItem('currentSongIndex', currentSongIndex);
    });

    // 当歌曲时间更新时，检测是否接近结束，手动切换到下一首歌曲
    bgMusic.addEventListener('timeupdate', function () {
        const currentTime = bgMusic.currentTime;
        const duration = bgMusic.duration;

        // 如果歌曲已经播放了大部分，切换到下一首歌曲
        if (duration - currentTime < 2) {
            playNextSong();
        }
        // 更新进度条宽度
        const progressPercentage = (currentTime / duration) * 100;
        progressBar.style.width = progressPercentage + '%';
    });

    function playCurrentSong() {
        const song = songs[currentSongIndex];
        if (song) {
            bgMusic.src = song;
            bgMusic.currentTime = parseFloat(sessionStorage.getItem('bgMusicPosition')) || 0;
            bgMusic.play();
            sessionStorage.setItem('bgMusicStatus', 'on');
        }
    }

    function pauseCurrentSong() {
        bgMusic.pause();
        sessionStorage.setItem('bgMusicStatus', 'off');
        sessionStorage.setItem('bgMusicPosition', bgMusic.currentTime);
    }

    function playNextSong() {
        currentSongIndex = nextSongIndex;
        sessionStorage.setItem('bgMusicPosition', 0);
        // 播放下一首歌曲
        playCurrentSong();
        // 更新下一首歌曲索引
        nextSongIndex = (nextSongIndex + 1) % songs.length;
        sessionStorage.setItem('nextSongIndex', nextSongIndex);
    }
});
