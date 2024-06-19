let arr = [
  {
    songName: "Dope Shope",
    url: "./songs/dopeShope.mp3",
    img: "images/dopeshope.jpg",
  },
  {
    songName: "Saat Samundar Paar",
    url: "./songs/saatsamundar.mp3",
    img: "images/saatsamundar.jpg",
  },
  {
    songName: "Jale",
    url: "./songs/jale.mp3",
    img: "images/jale.jpg",
  },
  {
    songName: "Jee Ni Lagda ",
    url: "./songs/jeenilagda.mp3",
    img: "images/jeenilagda.jpg",
  },
  {
    songName: "Bheed Mein Tanhayi Mein",
    url: "./songs/bheed.mp3",
    img: "images/bheed.jpg",
  },
];

let audio = new Audio();
let songsContainer = document.querySelector("#All-song");
let imgPoster=document.querySelector("#left");
let backward=document.querySelector("#backward");
let forward=document.querySelector("#forward");
let play=document.querySelector("#play");
let selectedSong = 0;

function mainfunction() {
  let cards = "";
  arr.forEach((elem, index) => {
    cards += `<div class="cards" id=${index}>
            <div class="insidecard" >
                <img src=${elem.img} alt="">
                <h2>${elem.songName}</h2>
               
            </div>
        </div>`;
  });
  audio.src = arr[selectedSong].url;
  imgPoster.style.backgroundImage=`url(${arr[selectedSong].img})`;
  songsContainer.innerHTML = cards;
}

mainfunction();
songsContainer.addEventListener("click", function (event) {
  const clickedCard = event.target.closest(".cards");
  if (clickedCard) {
    selectedSong = clickedCard.id;
    play.innerHTML = '<i class="ri-pause-fill"></i>';
   flag=true;
    mainfunction();
    audio.play();
   
  }
});

let flag = false; 

play.addEventListener("click", () => {
    if (!flag) {
        play.innerHTML = '<i class="ri-pause-fill"></i>';
        audio.play();
        flag = true;
    } else {
        play.innerHTML = '<i class="ri-play-fill"></i>';
        audio.pause();
        flag = false;
    }
});

forward.addEventListener("click", function() {
    if (selectedSong < arr.length - 1) {
        selectedSong++;
        mainfunction();
        audio.play(); 
        backward.style.opacity = 1;
        if(flag==false){
            play.innerHTML = '<i class="ri-pause-fill"></i>';
            flag=true;
        }
        if (selectedSong === arr.length - 1) {
            forward.style.opacity = 0.1; 
        }
    }
});

backward.addEventListener("click", function() {
    if (selectedSong > 0) {
        selectedSong--;
        mainfunction();
        audio.play(); 
        forward.style.opacity = 1;
        if(flag==false){
            play.innerHTML = '<i class="ri-pause-fill"></i>';
            flag=true;
        }
        if (selectedSong === 0) {
            backward.style.opacity = 0.1; 
        }
    }
});
let progressBar = document.getElementById("progress-bar");

// Update progress bar width based on current playback time
audio.addEventListener("timeupdate", function() {
    let currentTime = audio.currentTime;
    let duration = audio.duration;
    let progressWidth = (currentTime / duration) * 10;
    progressBar.style.width = progressWidth + "%";
});

