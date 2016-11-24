AFRAME.registerComponent('move-menu', {
  schema: {
    on: {type: 'string'}
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    el.addEventListener(data.on, function () {
      var boxes = document.getElementsByTagName('a-box');
      for (var i = 0; i < boxes.length; i++) {
        var curpos = boxes[i].getAttribute('position');
        var anim = document.createElement('a-animation');
        anim.setAttribute('attribute', 'position');
        anim.setAttribute('to', -2 + (i * 2) + ' -1 ' + -3);
        anim.setAttribute('dur', '700');
        anim.setAttribute('easing', 'ease-in-out-cubic');

        var old = boxes[i].getElementsByTagName('a-animation');
        old[0].setAttribute('dur', '25500');

        boxes[i].appendChild(anim);
      }

      getStory('09b7545627b783c80b54525401142f16', function(json) {
        console.log('will speak', json.title);
        speakText(json.title);
      });

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