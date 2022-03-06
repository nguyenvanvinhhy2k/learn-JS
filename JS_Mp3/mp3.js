const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $(".playlist");
const heading = $("header h2");
const cdThumb = $(".cd-thumb ");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const ramdomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  songs: [
    {
      name: "Bước Qua Nhau",
      singer: "Vũ",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/BuocQuaNhau-Vu-7120388.mp3?st=I9W59X1Odyi9QRGTehWfHg&e=1638708688",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/11/19/6/d/9/1/1637317177185.jpg",
    },
    {
      name: "Sau này liệu chúng ta",
      singer: "T.R.I",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1010/ChungTaSauNay-TRI-6929586.mp3?st=l56Wr1fLE9fMnFehhpo5xg&e=1638782875",
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg",
    },
    {
      name: "Dịu dàng là ngày em đến",
      singer: "Erik",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1021/DiuDangEmDen-ERIKNinjaZ-7078877.mp3?st=QmjyqbnGv3jClPKm4oA1YQ&e=1638782938",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/08/30/2/1/a/e/1630307726211.jpg",
    },
    {
      name: "Độ tộc 2",
      singer: "Độ mixi",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/DoToc2-MasewDoMixiPhucDuPhao-7064730.mp3?st=ehahZN3-iX9xYdBFgDgGcg&e=1638782785",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/08/10/b/2/e/0/1628579601228.jpg",
    },
    {
      name: "Có hẹn với thanh xuân",
      singer: "Monstar",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/cohenvoithanhxuan-MONSTAR-7050201.mp3?st=PjrrnZ2dZ3ffA6R7dRrppQ&e=1638783161",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/07/16/f/4/9/8/1626425507034.jpg",
    },

    {
      name: "Muộn rồi mà sao còn",
      singer: "Sơn tùng M-TP",
      path: "https://c1-ex-swe.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=tD-Ln6qGqkdH659AeuHsjQ&e=1638782546",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/04/29/9/1/f/8/1619691182261.jpg",
    },
    {
      name: "Thức giấc",
      singer: "Dalab",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1018/ThucGiac-DaLAB-7048212.mp3?st=1LcQhTisk8WrOQuzK4p86Q&e=1638782708",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/07/14/8/c/f/9/1626231010810.jpg",
    },
    {
      name: "Chúng ta sau này",
      singer: "T.R.I",
      path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1010/ChungTaSauNay-TRI-6929586.mp3?st=l56Wr1fLE9fMnFehhpo5xg&e=1638782875",
      image:
        "https://avatar-nct.nixcdn.com/song/2021/01/27/5/2/2/b/1611738358661.jpg",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
             <div class="song ${
               index === this.currentIndex ? "active" : ""
             }" data-index="${index}">
                  <div class="thumb"
                      style="background-image: url('${song.image}')">
                  </div>
                  <div class="body">
                      <h3 class="title">${song.name}</h3>
                      <p class="author">${song.singer}</p>
                  </div>
                  <div class="option">
                      <i class="fas fa-ellipsis-h"></i>
                  </div>
              </div>
          `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  handleEvent: function () {
    const _this = this;
    const cdwidth = cd.offsetWidth;
    // Xu li CD quay / dung
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 giay
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

    // Xu li phong to / thu nho CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdwidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdwidth;
    };
    // Xu li khi click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song duoc play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // Khi tien do bai hat thay doi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Khi next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    // Khi prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
    };

    // Xu li ramdomBtn
    ramdomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      ramdomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xu li lap lai 1 song
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Xu li khi tua song
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Xu li next song khi audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lang nghe click vao playlist
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || e.target.closest(".option")) {
        // Xu li khi click vao song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }
        // Xu li khi click vao song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },

  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 150);
  },

  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url(' ${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  start: function () {
    // Dinh nghia cac thuoc tinh cho object
    this.defineProperties("");

    // Lang nghe va xu li cac su kien
    this.handleEvent();

    //Tai thong tin bai hat dau tien vao UI khi chay ung dung
    this.loadCurrentSong();

    // Render
    this.render();
  },
};

app.start();
