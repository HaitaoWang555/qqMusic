export class Slider {
  constructor(options = {}) {
      this.el = options.el;
      this.slides = options.slides;
      this.interval = options.interval || 2000;
      this.index = 0;
      this.width = 0;//每张图片的大小的宽度
      this.touchX = 0; //触控开始的手指最初落点
      this.ready_moved = true; //判断每次滑动开始的标记变量
      this.render();
      this.bindEvent();
      this.start();
      this.onresize();
  }
  

   
  onresize(){
      let _this = this;
      window.addEventListener('resize',function(){
          _this.width = _this.el.clientWidth;
      })
  }
  
   
  render() {
      this.el.innerHTML = `<div class="qq-slider-wrap"></div>
      <p class="ui-slider-dots">
      <b class="active"></b>
      <b class=""></b>
      <b class=""></b>
      <b class=""></b>
      <b class=""></b>
      </p>`;
      this.dots = document.querySelector('.ui-slider-dots');
      this.wrap = this.el.firstElementChild;
      this.wrap.style.width = `${(this.slides.length + 1) * 100}%`;
      this.wrap.innerHTML = this.slides.map(slide => `<div class="qq-slider-item">
        <a href="${slide.link}">
          <img src="${slide.image}">
        </a>
    </div>`).join('');
      this.width = this.el.clientWidth
      let first = this.wrap.firstElementChild;
      this.wrap.insertAdjacentHTML('beforeend', this.domToString(first)); //无缝滚动拷贝第一个到到容器的最后一个
  }

  domToString (node) {  
      let tmpNode = document.createElement('div');
      tmpNode.appendChild(node.cloneNode(true)); 
      let str = tmpNode.innerHTML;
      tmpNode = node = null; // 解除引用，以便于垃圾回收  
      return str;  
  } 
   
  autoPlay() {
      this.timer = setInterval(this.next.bind(this), this.interval);
  }
  
  start() {
      this.autoPlay()
  }
  
  next() {
      //先判断在加
      if (this.index === this.slides.length) { //5
          this.index = 0;
          this.wrap.style.left = '0';
      }
      this.index += 1;
      this.animate(this.wrap,-this.width * this.index)
      this.setActiveDot();
  }

  animate(obj, target) {
      clearInterval(obj.timer);
      obj.timer = setInterval(function () {
          let leader = obj.offsetLeft;
          let step = (target - leader) / 2
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          leader = leader + step;
          obj.style.left = leader + 'px';
          if (leader === target) {
              clearInterval(obj.timer);
          }
      },30);
  }

  pre() {
      if (this.index === 0) {
          this.index = this.slides.length
          this.wrap.style.left = `-${this.index * this.width}px`;
      }
      this.index -= 1; 
      this.animate(this.wrap,-this.index * this.width)
      this.setActiveDot();
  }

  setActiveDot() {
      let len = this.dots.children.length;
      for (let i = 0; i <= len; i++) {
          let b = document.getElementsByTagName('b')[i];
          if (b) b.classList.remove('active');//判断 b 是否存在
          if (this.index === i) {
              if (b) b.classList.add('active');
          }
          if (this.index === 5) { //如果 index 等于5 那么将圆点变为第一个
              b = document.getElementsByTagName('b')[0]
              b.classList.add('active');
          }
      }
  }

  bindEvent() {
      this.wrap.addEventListener('touchstart', this.touchstart.bind(this));
      this.wrap.addEventListener('touchmove',this.touchmove.bind(this));
      this.wrap.addEventListener('touchend', this.touchend.bind(this));
  }

  touchstart(e) {
      clearInterval(this.timer);
      if (this.ready_moved) {
          let touch = e.targetTouches[0];
          this.touchX = touch.clientX;
          this.ready_moved = false;
      }
  }

  touchmove(e) {
      e.preventDefault();
      e.stopPropagation();
      clearInterval(this.timer);
      if (!this.ready_moved) {
          let move = e.changedTouches[0];
          let moveAt = move.clientX;
          let diff = moveAt - this.touchX;
          let offset = -this.index * this.width;//一张图片的偏移量
          if (diff > 0 && diff <= this.width && (offset + diff) < 0) { //向右移，并且 diff 要小于一张图片的宽度
              this.animate(this.wrap,offset + diff);
          } else if (diff < 0 && Math.abs(diff) <= this.width && (offset - Math.abs(diff)) > (-this.slides.length * this.width)) { //向左移,并且 diff 要小于一张图片的宽度
              this.animate(this.wrap,offset - Math.abs(diff))
          } else if ((offset + diff) > 0) { //当临界值在第一张向左移的时候
              if (this.index === 0) {
                  this.index = this.slides.length
                  this.wrap.style.left = `-${this.index * this.width}px`;
              }
              this.animate(this.wrap,-(this.index * this.width) + diff)
          } else if (offset - diff < this.width * this.slides.length) { //当最后一张向右移的时候
              if (this.index === this.slides.length) {
                  this.index = 0;
                  this.wrap.style.left = `-${this.index * this.width}px`;
              }
              this.animate(this.wrap,-(this.index * this.width) - diff);
          }
      }
  }

  touchend(e) {
      let _this = this;
      if (!_this.ready_moved) {
          clearInterval(_this.timer);
          let release = e.changedTouches[0];
          let releasedAt = release.clientX;
          let diff = releasedAt - _this.touchX;
          if (diff > (_this.width / 3)) { //当右移滑动距离大于图片宽度的一半时
              _this.pre();
              _this.autoPlay();
              _this.ready_moved = true;
          } else if (diff < -(_this.width / 3)) { //当左移滑动距离小于宽度的一半时（-400px < -360px）
              _this.next();
              _this.autoPlay();
              _this.ready_moved = true;
          } else { //回到原来的图片
              _this.animate(_this.wrap,-_this.index * _this.width);
              _this.autoPlay();
              _this.ready_moved = true;
          }
      }
  }
}

