// script.js

// Mengambil elemen-elemen HTML
const videoPlayer = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const seekBar = document.getElementById('seekBar');
const muteBtn = document.getElementById('muteBtn');
const volumeBar = document.getElementById('volumeBar');
const speedBtn = document.getElementById('speedBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const fullScreenBtn = document.getElementById('fullScreenBtn');
const resolutionSelect = document.getElementById('resolutionSelect');


let videoList = ['video1_360p.mp4', 'video2_720p.mp4', 'video3.mp4']; // List video
let currentVideoIndex = 0; // Menyimpan indeks video yang sedang diputar
let currentSpeed = 1; // Kecepatan pemutaran video

// Fungsi untuk mengganti kecepatan video
speedBtn.addEventListener('click', function() {
    currentSpeed = currentSpeed === 1 ? 1.5 : (currentSpeed === 1.5 ? 2 : 1);
    videoPlayer.playbackRate = currentSpeed;
    speedBtn.textContent = `Speed: ${currentSpeed}x`;
});

// Fungsi untuk mengganti resolusi video
resolutionSelect.addEventListener('change', function() {
    const selectedResolution = resolutionSelect.value;
    videoPlayer.src = selectedResolution;  // Mengganti sumber video berdasarkan pilihan resolusi
    videoPlayer.load();                    // Memuat video yang baru
    videoPlayer.play();                    // Memulai pemutaran video
    playPauseBtn.textContent = 'Pause';
});


// Fungsi untuk berpindah ke video berikutnya
nextBtn.addEventListener('click', function() {
    currentVideoIndex = (currentVideoIndex + 1) % videoList.length; // Pindah ke video berikutnya
    changeVideo();
});

// Fungsi untuk kembali ke video sebelumnya
prevBtn.addEventListener('click', function() {
    currentVideoIndex = (currentVideoIndex - 1 + videoList.length) % videoList.length; // Pindah ke video sebelumnya
    changeVideo();
});

// Fungsi untuk memutar dan menjeda video
playPauseBtn.addEventListener('click', function() {
    if (videoPlayer.paused) {
        videoPlayer.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        videoPlayer.pause();
        playPauseBtn.textContent = 'Play';
    }
});

// Fungsi untuk memperbarui seekBar saat video diputar
videoPlayer.addEventListener('timeupdate', function() {
    const value = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    seekBar.value = value;
});

// Fungsi untuk mengubah posisi video sesuai seekBar
seekBar.addEventListener('input', function() {
    const seekTo = (seekBar.value / 100) * videoPlayer.duration;
    videoPlayer.currentTime = seekTo;
});

// Fungsi untuk mute dan unmute
muteBtn.addEventListener('click', function() {
    if (videoPlayer.muted) {
        videoPlayer.muted = false;
        muteBtn.textContent = 'Mute';
    } else {
        videoPlayer.muted = true;
        muteBtn.textContent = 'Unmute';
    }
});

// Fungsi untuk mengaktifkan atau menonaktifkan fullscreen
fullScreenBtn.addEventListener('click', function() {
    if (document.fullscreenElement) {
        // Keluar dari fullscreen
        document.exitFullscreen();
        fullScreenBtn.textContent = 'Full Screen';
    } else {
        // Masuk ke fullscreen
        videoPlayer.requestFullscreen().catch(err => console.log(err));
        fullScreenBtn.textContent = 'Exit Full Screen';
    }
});

// Fungsi untuk mengatur volume
volumeBar.addEventListener('input', function() {
    videoPlayer.volume = volumeBar.value / 100;
});
// Fungsi untuk mengganti video
function changeVideo() {
    videoPlayer.src = videoList[currentVideoIndex];
    videoPlayer.load();
    videoPlayer.play();
    playPauseBtn.textContent = 'Pause';
    seekBar.value = 0;
}

// Memulai video pertama
changeVideo();

