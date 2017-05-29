function smartScroll(container, selectorScrollable) {
  if (!selectorScrollable || container.isScroll) {
    return;
  }

  var data = {
    posY: 0,
    maxscroll: 0
  };

  var nScroll = false;

  container.addEventListener('touchstart', function(event) {
    var events = event.touches[0] || event;
    var elTarget = event.target;

    if (elTarget === selectorScrollable || isChild(selectorScrollable, elTarget)) {
      nScroll = false;
    } else if (elTarget === container || isChild(container, elTarget)) {
      nScroll = true;
    }

    if (nScroll) {
      return;
    }

    data.posY = events.pageY;
    data.scrollY = selectorScrollable.scrollTop;
    data.maxscroll = selectorScrollable.scrollHeight - selectorScrollable.clientHeight;
  });

  container.addEventListener('touchmove', function() {
    if (data.maxscroll <= 0 || nScroll) {
      event.preventDefault();
    }

    var scrollTop = selectorScrollable.scrollTop;
    var events = event.touches[0] || event;
    var distanceY = events.pageY - data.posY;

    if (distanceY > 0 && scrollTop == 0) {
      event.preventDefault();
      return;
    }

    if (distanceY < 0 && (scrollTop + 1 >= data.maxscroll)) {
      event.preventDefault();
      return;
    }
  });

  container.addEventListener('touchend', function() {
    data.maxscroll = 0;
  });

  container.isScroll = true;

  function isChild(self, child){
    var children = self.children;
    var length = children.length;
    var child_len = 0;
    for (var i = 0; i < length; i++) {
      if (children[i] === child) {
        return true;
      }
      if (children[i].firstElementChild) {
        child_len = children[i].children.length;
        for (var j = 0; j < child_len; j++) {
          if (isChild(children[i], child)) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
