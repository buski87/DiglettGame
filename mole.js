var Moles = Moles || {};

Moles.Units = (function () {
  var randomInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  return {
    randomInterval: randomInterval,
  }
})();

Moles.Mole = function () {
  this.visible = false;

  this.init = function () {
  };

  this.show = function () {
    this.visible = true;
    var that = this;
    this.el.addClass('show');
    var interval = Moles.Units.randomInterval(1000, 2000)
    setTimeout(function () { that.hide() }, interval);
  };

  this.addElement = function (element) {
    this.el = element;
    var that = this;
    this.el.click(function () {
      if (that.visible) {
        that.el.removeClass('show');
        that.visible = false;
        Moles.Model.addToScore();
      }
    })
  };

  this.hide = function () {
    this.visible = false
    this.el.removeClass('show');
    var interval = Moles.Units.randomInterval(1000, 16000)
    var that = this;
    setTimeout(function () { that.show() }, interval);
  };
};

Moles.Model = (function () {

  var _numMoles = 9;
  var moles = [];
  var score = 0;

  var init = function () {
    for (var i = 0; i < _numMoles; ++i) {
      var mole = new Moles.Mole();
      mole.init();
      moles.push(mole);
    }
  }

  var addToScore = function () {
    score += 1;
    return score;
  }

  var getScore = function () {
    return score;
  }

  var getMoles = function () {
    return moles;
  }

  return {
    init: init,
    getMoles: getMoles,
    getScore: getScore,
    addToScore: addToScore
  };

})();

Moles.View = (function () {

  var $element = null;

  var init = function (id) {
    $element = $(id);
    setup();
  };

  var setup = function () {
    var moles = Moles.Model.getMoles();
    moles.forEach(function (mole) {
      var moleObject = $('<div>');
      moleObject.addClass('mole');
      $element.append(moleObject);
      mole.addElement(moleObject);
      mole.hide();
    })
  }

  var render = function () {
    $('#score').text(Moles.Model.getScore());
  }

  return {
    init: init,
    render: render,
  }

})();

$(function () {
  Moles.Model.init();
  Moles.View.init('#moles');
  setInterval(function () {
    Moles.View.render();
  }, 100)
})
