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
    });
  }
});