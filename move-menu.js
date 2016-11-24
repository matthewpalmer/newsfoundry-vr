AFRAME.registerComponent('move-menu', {
  schema: {
    on: {type: 'string'}
  },

  animateToPos: function(box, pos) {
    var anim = document.createElement('a-animation');
    anim.setAttribute('attribute', 'position');
    // -5 1 -2.5
    anim.setAttribute('to', pos);
    anim.setAttribute('dur', '700');
    anim.setAttribute('easing', 'ease-in-out-cubic');

    var anim2 = document.createElement('a-animation');
    anim2.setAttribute('attribute', 'scale');
    anim2.setAttribute('to', '1 1 1');
    anim2.setAttribute('dur', '700');
    anim2.setAttribute('easing', 'ease-in-out-cubic');

    var anim3 = document.createElement('a-animation');
    anim3.setAttribute('attribute', 'rotation');
    anim3.setAttribute('to', '0 0 0');
    anim3.setAttribute('dur', '700');
    anim3.setAttribute('easing', 'ease-in-out-cubic');

    var old = box.getElementsByTagName('a-animation');
    box.removeChild(old[0]);

    box.appendChild(anim);
    box.appendChild(anim2);
    box.appendChild(anim3);
  },

  animateToCorner: function(box, i) {
    console.log('fdhafjdkhsafsd');
    var curpos = box.getAttribute('position');
    var newpos = -3.5 + ' 1.45 ' + (-3 + i * 0.75);
    this.animateToPos(box, newpos);
  },

  animateToMiddle: function(box) {
    this.animateToPos(box, "0 2.5 -6.5");
  },

  makebox: function() {
    var box = document.createElement('a-box');
    box.setAttribute('color', 'white');
    box.setAttribute('width', '0.75');
    box.setAttribute('height', '0.75');
    box.setAttribute('depth', '0.75');
    box.setAttribute('rotation', '0 0 0');
    box.setAttribute('scale', '1 1 1');
    return box;
  },

  config: {
    toplevel: {
      destinations: [
        { src: '#destinations_button_nsw' },
        { src: '#destinations_button_qld' },
        { src: '#destinations_button_wa' },
        { src: '#destinations_button_nt' },
        { src: '#destinations_button_sa' },
        { src: '#destinations_button_vic' }
      ],
      news: [],
      features: [
        { src: '#features_button_sport' },
        { src: '#features_button_real_estate' },
        { src: '#features_button_food' },
        { src: '#features_button_business' },
      ],
      entertainment: [
        { src: '#entertainment_button_celebrity' },
        { src: '#entertainment_button_games' },
        { src: '#entertainment_button_music' },
        { src: '#entertainment_button_red_carpet' },
      ]
    }
  },

  addMenuRow: function(items) {
    var delayed = [];

    for (var i = 0; i < items.length; i++) {
      var box = this.makebox();
      var x = ((0 - items.length / 2) + i * 1);
      var y = 1.5;

      box.setAttribute('position', x + ' ' + ' 0.5 ' + ' -6.5');
      box.setAttribute('src', items[i].src);
      box.setAttribute('class', 'item-row-1');
      box.setAttribute('material.opacity', '0');

      // move-menu="on: click;"
      box.setAttribute('enter-experience', 'on: click;');
      

      var fadein = document.createElement('a-animation');
      fadein.setAttribute('attribute', 'material.opacity');
      fadein.setAttribute('from', '0');
      fadein.setAttribute('to', '1');
      fadein.setAttribute('dur', '700');

      var moveForward = document.createElement('a-animation');
      moveForward.setAttribute('to', x + ' 1.5 -6.5');
      moveForward.setAttribute('dur', '700');
      moveForward.setAttribute('attribute', 'position');

      delayed.push([box, fadein, moveForward]);
    }

    // stop the box flashing up too early
    setTimeout(function() {
      var container = document.createElement('a-entity');
      container.setAttribute('id', 'submenu-row');

      delayed.forEach(function(pair) {
        pair[0].appendChild(pair[1]);
        pair[0].appendChild(pair[2]);
        container.appendChild(pair[0]);
      });

       setTimeout(function() {
        document.getElementById('master-scene').appendChild(container);
      }, 50);
    }, 50);
  },

  deleteOldRow: function() {
    var master = document.getElementById('master-scene');
    var row = document.getElementById('submenu-row');
    if (row) {
      master.removeChild(row);
    }
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    var that = this;

    el.addEventListener(data.on, function () {
      var boxes = Array.prototype.slice.call(document.getElementsByTagName('a-box'), 0, 4);
      boxes.splice(boxes.indexOf(el), 1);
      console.log(boxes);
      boxes.forEach(function(b, i) {
        that.animateToCorner(b, i);  
      });

      that.animateToMiddle(el);

      that.deleteOldRow();
      that.addMenuRow(that.config.toplevel[el.id]);

      // getStory('09b7545627b783c80b54525401142f16', function(json) {
      //   console.log('will speak', json.title);
      //   speakText(json.title);
      // });

      // melbourne story
      // 7373b1109acf4e474fa01421adf27036
      // real estate
      //http://cdn.newsapi.com.au/content/v2/09b7545627b783c80b54525401142f16?api_key=gqz7h5zs6b9f5bxrwhpgfhhb
      //top news
      //http://cdn.newsapi.com.au/content/v2/8945baf8fc0f9cab6b425aa3ddc4cf39?api_key=gqz7h5zs6b9f5bxrwhpgfhhb
      //entertainment
      //http://cdn.newsapi.com.au/content/v2/ed2dfa176e69bee9b3f1a4397408e134?api_key=gqz7h5zs6b9f5bxrwhpgfhhb
      //sports
      //http://cdn.newsapi.com.au/content/v2/07d72a078dfb9d61af1f620890bb693f?api_key=gqz7h5zs6b9f5bxrwhpgfhhb
    });
  }
});