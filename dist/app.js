!function(e){function t(i){if(n[i])return n[i].exports;var s=n[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.RECOMMEND_URL="https://qq-music-api.now.sh",t.TOPLIST_URL="https://qq-music-api.now.sh/top",t.SEARCH_URL="https://qq-music-api.now.sh/search",t.LYRICS_URL="https://qq-music-api.now.sh/lyrics"},function(e,t,n){"use strict";function i(e){e||(document.querySelectorAll(".loading_box").style.display="none",document.querySelectorAll(".tab-contents").style.display="block")}Object.defineProperty(t,"__esModule",{value:!0}),t.loading=i},function(e,t,n){"use strict";function i(e){return"http://isure.stream.qqmusic.qq.com/C100"+e+".m4a?fromtag=32"}function s(e){return a.LYRICS_URL+"?id="+e}function r(e){return"https://y.gtimg.cn/music/photo_new/T002R150x150M000"+e+".jpg"}function o(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return a.SEARCH_URL+"?keyword="+e+"&page="+t}Object.defineProperty(t,"__esModule",{value:!0}),t.songUrl=i,t.lyricsUrl=s,t.albumCoverUrl=r,t.searchUrl=o;var a=n(0)},function(e,t,n){"use strict";function i(e){function t(e){var t=e.getBoundingClientRect(),n=t.top,i=t.left,s=t.right,r=t.bottom,o=document.documentElement.clientWidth,a=document.documentElement.clientHeight;return(n>0&&n<a||r>0&&r<a)&&(i>0&&i<o||s>0&&s<o)}function n(e,t){var n=new Image;n.src=e.dataset.src,n.onload=function(){e.src=n.src,e.classList.remove("lazyload"),"function"==typeof t&&t()}}var i=e?[].slice.call(e):document.querySelectorAll(".lazyload");if("IntersectionObserver"in window){var s=new IntersectionObserver(function(e){e.forEach(function(e){e.intersectionRatio>0&&n(e.target,function(){s.unobserve(e.target)})})},{threshold:.01});i.forEach(function(e){return s.observe(e)})}else{var r=function(e,t){var n=void 0,i=void 0;return function s(){var r=Date.now(),o=r-n;!n||o>=t?(e(),n=r):o<t&&(clearTimeout(i),i=setTimeout(s,t-o))}}(function(){if(0===i.length)return window.removeEventListener("scroll",r);i=i.filter(function(e){return e.classList.contains("lazyload")}),i.forEach(function(e){return t(e)&&n(e)})},300);window.addEventListener("scroll",r),window.dispatchEvent(new Event("scroll"))}}Object.defineProperty(t,"__esModule",{value:!0}),t.lazyload=i},function(e,t,n){"use strict";function i(){var e=location.hash;if(/^#player\?.+/.test(e)){var t=e.slice(e.indexOf("?")+1).match(/(\w+)=([^&]+)/g),n=t&&t.reduce(function(e,t){var n=t.split("=");return e[n[0]]=decodeURIComponent(n[1]),e},{});l.play(n)}else l.hide()}n(5),n(1);var s=n(6),r=n(7),o=n(8),a=n(10),l=(new s.Search(document.querySelector("#search-view")),new a.MusicPlayer(document.querySelector("#player")));new r.TopList(document.querySelector("#rank-view")).launch(),new o.Recommend(document.querySelector("#rec-view")).launch();document.querySelector(".show-player").addEventListener("click",function(){l.show()}),i(),addEventListener("hashchange",i)},function(e,t,n){"use strict";document.addEventListener("click",function(e){var t=e.target;if("tab"===t.dataset.role){[].forEach.call(t.parentElement.children,function(e){e.classList.remove("active")}),t.classList.add("active");var n=document.querySelector(t.dataset.view);n&&([].forEach.call(n.parentElement.children,function(e){e.style.display="none"}),n.style.display="block"),window.dispatchEvent(new Event("scroll"))}})},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Search=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=(n(0),n(2));t.Search=function(){function e(t){i(this,e),this.$el=t,this.$input=this.$el.querySelector("#search"),this.$input.addEventListener("keyup",this.onKeyUp.bind(this)),this.$songs=this.$el.querySelector(".song-list"),this.page=1,this.songs={},this.keyword="",this.perpage=20,this.nomore=!1,this.fetching=!1,this.onscroll=this.onScroll.bind(this)}return s(e,[{key:"onKeyUp",value:function(e){var t=e.target.value.trim();if(!t)return this.reset();13===e.keyCode&&(this.search(t),window.addEventListener("scroll",this.onscroll))}},{key:"onScroll",value:function(e){if(this.nomore)return window.removeEventListener("scroll",this.onscroll);pageYOffset+document.documentElement.clientHeight>document.body.scrollHeight-50&&this.search(this.keyword,this.page+1)}},{key:"reset",value:function(){this.page=1,this.songs={},this.keyword="",this.nomore=!1,this.$songs.innerHTML=""}},{key:"search",value:function(e,t){var n=this;this.keyword===e&&this.songs[t||this.page]||this.nomore||this.fetching||(this.keyword!==e&&this.reset(),this.keyword=e,this.loading(),fetch((0,r.searchUrl)(this.keyword,t||this.page)).then(function(e){return e.json()}).then(function(e){return n.page=e.data.song.curpage,n.songs[n.page]=e.data.song.list,n.nomore="no results"===e.message,e.data.song.list}).then(function(e){return n.append(e)}).then(function(){return n.done()}).catch(function(){return n.fetching=!1}))}},{key:"append",value:function(e){console.log(e);var t=e.map(function(e){var t=e.singer.map(function(e){return e.name}).join(" ");return'\n        <a class="song-item" \n           href="#player?artist='+t+"&songid="+e.songid+"&songname="+e.songname+"&albummid="+e.albummid+"&songmid="+e.songmid+"&duration="+e.interval+'">\n          <i class="icon icon-music"></i>\n          <div class="song-name ellipsis">'+e.songname+'</div>\n          <div class="song-artist ellipsis">'+t+"</div>\n        </a>"}).join("");this.$songs.insertAdjacentHTML("beforeend",t)}},{key:"loading",value:function(){this.fetching=!0,this.$el.querySelector(".search-loading").classList.add("show")}},{key:"done",value:function(){this.fetching=!1,this.nomore?(this.$el.querySelector(".loading-icon").style.display="none",this.$el.querySelector(".loading-text").style.display="none",this.$el.querySelector(".loading-done").style.display="block",this.$el.querySelector(".search-loading").classList.add("show")):this.$el.querySelector(".search-loading").classList.remove("show")}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.TopList=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(3),o=n(0),a=n(1);t.TopList=function(){function e(t){i(this,e),this.$el=t}return s(e,[{key:"launch",value:function(){var e=this,t=void 0;return fetch(o.TOPLIST_URL).then(function(e){return e.json()}).then(function(t){return e.list=t.data.topList}).then(function(){return e.render()}),t=!1,(0,a.loading)(t),this}},{key:"render",value:function(){var e=this;this.$el.querySelector("#rank-view .toplist").innerHTML=this.list.map(function(t){return'<li class="top-item">\n         <div class="top-item-media">\n           <a href="#">\n             <img class="lazyload" data-src="'+t.picUrl+'">\n           </a>\n         </div>\n         <div class="top-item-info">\n           <h3 class="top-item-title ellipsis">'+t.topTitle+'</h3>\n           <ul class="top-item-list">'+e.songlist(t.songList)+"</ul>\n         </div>\n       </li>"}).join(""),(0,r.lazyload)(document.querySelectorAll("#rank-view .toplist .lazyload"))}},{key:"songlist",value:function(e){return e.map(function(e,t){return'<li class="top-item-song">\n         <i class="song-index">'+(t+1)+'</i>\n         <span class="song-name">'+e.songname+"</span>- "+e.singername+"\n       </li>"}).join("")}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.Recommend=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(9),o=n(3),a=n(0);t.Recommend=function(){function e(t){i(this,e),this.$el=t}return s(e,[{key:"launch",value:function(){var e=this;return fetch(a.RECOMMEND_URL).then(function(e){return e.json()}).then(function(t){return e.json=t}).then(function(){return e.render()}),this}},{key:"render",value:function(){this.renderSlider(this.json.data.slider),this.renderRadios(this.json.data.radioList),this.renderPlayLists(this.json.data.songList),(0,o.lazyload)()}},{key:"renderSlider",value:function(e){this.slider=new r.Slider({el:this.$el.querySelector("#slider"),slides:e.map(function(e){return{link:e.linkUrl,image:e.picUrl}})})}},{key:"renderRadios",value:function(e){this.$el.querySelector(".radios .list").innerHTML=e.map(function(e){return'<div class="list-item">\n         <div class="list-media">\n           <img class="lazyload" data-src="'+e.picUrl+'">\n           <span class="icon icon-play"></span>\n         </div>\n         <div class="list-detail">\n           <h3 class="list-title">'+e.Ftitle+"</h3>\n         </div>\n       </div>"}).join("")}},{key:"renderPlayLists",value:function(e){this.$el.querySelector(".playlists .list").innerHTML=e.map(function(e){return'<div class="list-item">\n         <div class="list-media">\n           <img class="lazyload" data-src="'+e.picUrl+'">\n           <span class="icon icon-play"></span>\n         </div>\n         <div class="list-detail">\n           <h3 class="list-title">'+e.songListDesc+'</h3>\n           <div class="list-text"></div>\n         </div>\n       </div>'}).join("")}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();t.Slider=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e),this.$el=t.el,this.slides=t.slides,this.interval=t.interval||3e3,this.index=0,this.render(),this.start()}return s(e,[{key:"render",value:function(){this.$el.innerHTML='<div class="qq-slider-wrap"></div>',this.$wrap=this.$el.firstElementChild,this.$wrap.style.width=100*this.slides.length+"%",this.$wrap.innerHTML=this.slides.map(function(e){return'<div class="qq-slider-item">\n            <a href="'+e.link+'">\n              <img src="'+e.image+'">\n            </a>\n        </div>'}).join("")}},{key:"start",value:function(){setInterval(this.next.bind(this),this.interval)}},{key:"next",value:function(){if(this.index+=1,this.index===this.slides.length)return this.$wrap.style.transform="translate(0)",void(this.index=0);var e="-"+100*this.index/this.slides.length+"%";this.$wrap.style.transform="translate("+e+")"}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.MusicPlayer=void 0;var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(11),o=n(12),a=n(2);t.MusicPlayer=function(){function e(t){i(this,e),this.$el=t,this.$el.addEventListener("click",this),this.$audio=this.createAudio(),this.lyrics=new o.LyricsPlayer(this.$el.querySelector(".player-lyrics"),this.$audio),this.progress=new r.ProgressBar(this.$el.querySelector(".progress")),this.fetching=!1}return s(e,[{key:"createAudio",value:function(){var e=this,t=document.createElement("audio");return t.id="player-"+Math.floor(100*Math.random())+"-"+ +new Date,t.addEventListener("ended",function(){e.$audio.play(),e.lyrics.restart(),e.progress.restart()}),document.body.appendChild(t),t}},{key:"handleEvent",value:function(e){var t=e.target;switch(!0){case t.matches(".icon-play"):this.onPlay(e);break;case t.matches(".icon-pause"):this.onPause(e);break;case t.matches(".icon-list"):this.hide()}}},{key:"onPlay",value:function(e){this.fetching||(this.$audio.play(),this.lyrics.start(),this.progress.start(),e.target.classList.add("icon-pause"),e.target.classList.remove("icon-play"))}},{key:"onPause",value:function(e){this.$audio.pause(),this.lyrics.pause(),this.progress.pause(),e.target.classList.add("icon-play"),e.target.classList.remove("icon-pause")}},{key:"play",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(t){this.$el.querySelector(".song-name").innerText=t.songname,this.$el.querySelector(".song-artist").innerText=t.artist,this.progress.reset(t.duration);var n=(0,a.albumCoverUrl)(t.albummid);this.$el.querySelector(".album-cover").src=n,this.$el.querySelector(".player-background").style.backgroundImage="url("+n+")",t.songid&&(this.songid!==t.songid&&(this.$el.querySelector(".icon-action").className="icon-action icon-play"),console.log(t),this.songmid=t.songmid,this.songid=t.songid,this.$audio.src=(0,a.songUrl)(this.songmid),this.fetching=!0,fetch((0,a.lyricsUrl)(this.songid)).then(function(e){return e.json()}).then(function(e){return e.lyric}).then(function(t){return e.lyrics.reset(t)}).catch(function(){}).then(function(){return e.fetching=!1})),this.show()}}},{key:"show",value:function(){this.$el.classList.add("show"),document.body.classList.add("noscroll")}},{key:"hide",value:function(){this.$el.classList.remove("show"),document.body.classList.remove("noscroll")}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();t.ProgressBar=function(){function e(t,n,s){i(this,e),this.$el=t,this.elapsed=0,this.duration=n||0,this.progress=0,this.render(),this.$progress=this.$el.querySelector(".progress-bar-progress"),this.$elapsed=this.$el.querySelector(".progress-elapsed"),this.$duration=this.$el.querySelector(".progress-duration"),this.$elapsed.innerText=this.formatTime(this.elapsed),this.$duration.innerText=this.formatTime(this.duration),s&&this.start()}return s(e,[{key:"start",value:function(){this.pause(),this.intervalId=setInterval(this.update.bind(this),50)}},{key:"pause",value:function(){clearInterval(this.intervalId)}},{key:"update",value:function(){this.elapsed+=.05,this.elapsed>=this.duration&&this.reset(),this.progress=this.elapsed/this.duration,this.$progress.style.transform="translate("+(100*this.progress-100)+"%)",this.$elapsed.innerText=this.formatTime(this.elapsed)}},{key:"reset",value:function(e){this.pause(),this.elapsed=0,this.progress=0,this.$progress.style.transform="translate(-100%)",this.$elapsed.innerText=this.formatTime(this.elapsed),e&&(this.duration=+e,this.$duration.innerText=this.formatTime(this.duration))}},{key:"restart",value:function(){this.reset(),this.start()}},{key:"render",value:function(){this.$el.innerHTML='\n      <div class="progress-time progress-elapsed"></div>\n        <div class="progress-bar">\n          <div class="progress-bar-progress"></div>\n        </div>\n      <div class="progress-time progress-duration"></div>\n    '}},{key:"formatTime",value:function(e){var t=Math.floor(e/60),n=Math.floor(e%60);return t<10&&(t="0"+t),n<10&&(n="0"+n),t+":"+n}}]),e}()},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();(t.LyricsPlayer=function(){function e(t,n){i(this,e),this.$el=t,this.$el.innerHTML='<div class="player-lyrics-lines"></div>',this.$lines=this.$el.querySelector(".player-lyrics-lines"),this.$audio=n,this.text="",this.index=0,this.lyrics=[],this.elapsed=0,this.reset(this.text)}return s(e,[{key:"start",value:function(){this.pause(),this.intervalId=setInterval(this.update.bind(this),1e3)}},{key:"pause",value:function(){clearInterval(this.intervalId)}},{key:"update",value:function(){if(this.elapsed=Math.round(this.$audio?this.$audio.currentTime:this.elapsed+1),this.index!==this.lyrics.length-1){for(var e=this.index+1;e<this.lyrics.length;e++){var t=this.getSeconds(this.lyrics[e]);if(this.elapsed===t&&(!this.lyrics[e+1]||this.elapsed<this.getSeconds(this.lyrics[e+1]))){this.$lines.children[this.index].classList.remove("active"),this.$lines.children[e].classList.add("active"),this.index=e;break}}if(this.index>2){var n=-(this.index-2)*this.LINE_HEIGHT;this.$lines.style.transform="translateY("+n+"px)"}}}},{key:"render",value:function(){var e=this.lyrics.map(function(e){return'\n      <div class="player-lyrics-line">'+e.slice(10)+"</div>\n    "}).join("");this.$lines.innerHTML=e}},{key:"reset",value:function(e){this.pause(),this.index=0,this.elapsed=0,this.$lines.style.transform="translateY(0)";var t=this.$lines.querySelector(".active");t&&t.classList.remove("active"),e&&(this.text=this.formatText(e)||"",this.lyrics=this.text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm)||[],this.lyrics.length&&this.render()),this.lyrics.length&&this.$lines.children[this.index].classList.add("active")}},{key:"restart",value:function(){this.reset(),this.start()}},{key:"getSeconds",value:function(e){return+e.replace(/^\[(\d{2}):(\d{2}).*/,function(e,t,n){return 60*+t+ +n})}},{key:"formatText",value:function(e){var t=document.createElement("div");return t.innerHTML=e,t.innerText}}]),e}()).prototype.LINE_HEIGHT=42}]);