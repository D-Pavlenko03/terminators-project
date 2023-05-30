// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"app/modules/cards/card.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createCard;
function createCard(terminator) {
  var card = document.createElement('div');
  card.className = 'card';
  card.id = terminator.id;
  var cardImageWrapper = document.createElement('div');
  cardImageWrapper.className = 'card__image-wrapper';
  var cardImage = document.createElement('img');
  cardImage.className = 'card__image';
  cardImage.src = terminator['main-photo-url'];
  cardImage.alt = terminator.name;
  var cardOptions = document.createElement('div');
  cardOptions.className = 'card__options';
  var cardOptionsBtns = document.createElement('div');
  cardOptionsBtns.className = 'card__options-buttons';
  var buttonEye = document.createElement("button");
  buttonEye.className = "button__eye";
  buttonEye.innerHTML = "\n   <svg width=\"23\" height=\"23\" viewBox=\"0 0 23 23\" fill=\"black\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M11.5 17.9687C5.91296 17.9687 3.28712 12.0367 3.17212 11.7875C3.13416 11.6964 3.11462 11.5987 3.11462 11.5C3.11462 11.4013 3.13416 11.3036 3.17212 11.2125C3.28712 10.9633 5.91296 5.03125 11.5 5.03125C17.0871 5.03125 19.713 10.9633 19.828 11.2125C19.8659 11.3036 19.8855 11.4013 19.8855 11.5C19.8855 11.5987 19.8659 11.6964 19.828 11.7875C19.713 12.0367 17.0871 17.9687 11.5 17.9687ZM4.62879 11.5C5.19421 12.6021 7.50379 16.5312 11.5 16.5312C15.4963 16.5312 17.8059 12.6021 18.3713 11.5C17.8059 10.3979 15.4963 6.46875 11.5 6.46875C7.50379 6.46875 5.19421 10.3979 4.62879 11.5Z\" />\n      <path d=\"M11.5 14.6145C10.8839 14.6145 10.2818 14.4319 9.76959 14.0897C9.2574 13.7474 8.8582 13.261 8.62246 12.6918C8.38673 12.1228 8.32505 11.4965 8.44522 10.8924C8.5654 10.2881 8.86203 9.73317 9.29761 9.29761C9.73317 8.86203 10.2881 8.5654 10.8924 8.44522C11.4965 8.32505 12.1228 8.38673 12.6918 8.62246C13.261 8.8582 13.7474 9.2574 14.0897 9.76959C14.4319 10.2818 14.6145 10.8839 14.6145 11.5C14.612 12.3252 14.2831 13.116 13.6995 13.6995C13.116 14.2831 12.3252 14.612 11.5 14.6145ZM11.5 9.82287C11.1683 9.82287 10.844 9.9212 10.5683 10.1055C10.2925 10.2898 10.0775 10.5517 9.95052 10.8582C9.82364 11.1646 9.79039 11.5018 9.85507 11.8271C9.91986 12.1525 10.0795 12.4513 10.3141 12.6858C10.5486 12.9204 10.8474 13.0802 11.1728 13.1448C11.4981 13.2095 11.8353 13.1763 12.1418 13.0494C12.4482 12.9224 12.7101 12.7075 12.8944 12.4316C13.0787 12.1559 13.177 11.8316 13.177 11.5C13.1745 11.056 12.9971 10.6308 12.683 10.3169C12.3691 10.0028 11.944 9.82537 11.5 9.82287Z\" />\n   </svg>";
  buttonEye.setAttribute("data-src", terminator['main-photo-url']);
  var buttonCart = document.createElement("button");
  buttonCart.className = "button__basket";
  buttonCart.innerHTML = "\n   <svg width=\"17\" height=\"15\" viewBox=\"0 0 17 15\" fill=\"black\" xmlns=\"http://www.w3.org/2000/svg\">\n      <g clip-path=\"url(#clip0_88991_129)\">\n         <path d=\"M0 0.703125C0 0.313477 0.315799 0 0.708333 0H2.05122C2.70052 0 3.27604 0.375 3.54462 0.9375H15.6748C16.451 0.9375 17.0177 1.66992 16.8141 2.41406L15.604 6.87598C15.3531 7.7959 14.512 8.4375 13.5528 8.4375H5.03802L5.1974 9.27246C5.26233 9.60352 5.55451 9.84375 5.89392 9.84375H14.4028C14.7953 9.84375 15.1111 10.1572 15.1111 10.5469C15.1111 10.9365 14.7953 11.25 14.4028 11.25H5.89392C4.87274 11.25 3.99618 10.5293 3.80729 9.53613L2.28438 1.59668C2.26372 1.48535 2.16632 1.40625 2.05122 1.40625H0.708333C0.315799 1.40625 0 1.09277 0 0.703125ZM3.77778 13.5938C3.77778 13.4091 3.81442 13.2262 3.88562 13.0556C3.95681 12.885 4.06116 12.73 4.19271 12.5994C4.32426 12.4688 4.48043 12.3652 4.65231 12.2945C4.82419 12.2239 5.00841 12.1875 5.19445 12.1875C5.38048 12.1875 5.5647 12.2239 5.73658 12.2945C5.90846 12.3652 6.06463 12.4688 6.19618 12.5994C6.32773 12.73 6.43208 12.885 6.50327 13.0556C6.57447 13.2262 6.61111 13.4091 6.61111 13.5938C6.61111 13.7784 6.57447 13.9613 6.50327 14.1319C6.43208 14.3025 6.32773 14.4575 6.19618 14.5881C6.06463 14.7187 5.90846 14.8223 5.73658 14.893C5.5647 14.9636 5.38048 15 5.19445 15C5.00841 15 4.82419 14.9636 4.65231 14.893C4.48043 14.8223 4.32426 14.7187 4.19271 14.5881C4.06116 14.4575 3.95681 14.3025 3.88562 14.1319C3.81442 13.9613 3.77778 13.7784 3.77778 13.5938ZM13.6944 12.1875C14.0702 12.1875 14.4305 12.3357 14.6962 12.5994C14.9619 12.8631 15.1111 13.2208 15.1111 13.5938C15.1111 13.9667 14.9619 14.3244 14.6962 14.5881C14.4305 14.8518 14.0702 15 13.6944 15C13.3187 15 12.9584 14.8518 12.6927 14.5881C12.427 14.3244 12.2778 13.9667 12.2778 13.5938C12.2778 13.2208 12.427 12.8631 12.6927 12.5994C12.9584 12.3357 13.3187 12.1875 13.6944 12.1875ZM7.4375 4.6875C7.4375 5.00977 7.70313 5.27344 8.02778 5.27344H9.32639V6.5625C9.32639 6.88477 9.59202 7.14844 9.91667 7.14844C10.2413 7.14844 10.5069 6.88477 10.5069 6.5625V5.27344H11.8056C12.1302 5.27344 12.3958 5.00977 12.3958 4.6875C12.3958 4.36523 12.1302 4.10156 11.8056 4.10156H10.5069V2.8125C10.5069 2.49023 10.2413 2.22656 9.91667 2.22656C9.59202 2.22656 9.32639 2.49023 9.32639 2.8125V4.10156H8.02778C7.70313 4.10156 7.4375 4.36523 7.4375 4.6875Z\" />\n      </g> <defs> <clipPath id=\"clip0_88991_129\"> <rect width=\"17\" height=\"15\" fill=\"white\" /></clipPath></defs>\n   </svg>";
  buttonCart.id = terminator.id;
  cardImageWrapper.appendChild(cardImage);
  cardImageWrapper.appendChild(cardOptions);
  cardOptions.appendChild(cardOptionsBtns);
  cardOptionsBtns.appendChild(buttonEye);
  cardOptionsBtns.appendChild(buttonCart);
  var cardsBody = document.querySelector('.cards__body');
  cardsBody.appendChild(card);
  card.appendChild(cardImageWrapper);
  var cardLabel = document.createElement('div');
  cardLabel.className = 'card__label';
  if (terminator.isOff) {
    cardLabel.classList.add('card__label-off');
    var cardLabelItem = document.createTextNode('60% Off');
    cardLabel.appendChild(cardLabelItem);
  }
  if (terminator.isNew) {
    cardLabel.classList.add('card__label-new');
    var _cardLabelItem = document.createTextNode('NEW');
    cardLabel.appendChild(_cardLabelItem);
  }
  if (terminator.isTop) {
    cardLabel.classList.add('card__label-top');
    var _cardLabelItem2 = document.createTextNode('TOP Offer');
    cardLabel.appendChild(_cardLabelItem2);
  }
  cardImageWrapper.appendChild(cardLabel);
  var cardInfo = document.createElement('div');
  cardInfo.className = 'card__info';
  var cardName = document.createElement('h3');
  cardName.className = 'card__name';
  cardName.textContent = terminator.name;
  var cardPrice = document.createElement('span');
  cardPrice.className = 'card__price';
  cardPrice.textContent = "$".concat(terminator.price.toFixed(2));
  var cardColor = document.createElement('div');
  cardColor.className = 'card__color';
  var colorButton1 = document.createElement('button');
  colorButton1.className = 'card__color-first card__color_active';
  colorButton1.setAttribute("data-src", terminator['main-photo-url']);
  var colorButton2 = document.createElement('button');
  colorButton2.className = 'card__color-second';
  colorButton2.setAttribute("data-src", terminator['second-photo-url']);
  var colorButton3 = document.createElement('button');
  colorButton3.className = 'card__color-third';
  colorButton3.setAttribute("data-src", terminator['third-photo-url']);
  cardColor.appendChild(colorButton1);
  cardColor.appendChild(colorButton2);
  cardColor.appendChild(colorButton3);
  cardInfo.appendChild(cardName);
  cardInfo.appendChild(cardPrice);
  cardInfo.appendChild(cardColor);
  card.appendChild(cardInfo);
}
},{}],"app/api/api.js":[function(require,module,exports) {
"use strict";

var _card = _interopRequireDefault(require("../../app/modules/cards/card.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
fetch('https://6464831d043c103502bb5293.mockapi.io/api/terminators').then(function (response) {
  return response.json();
}).then(function (data) {
  data.slice(0, 8).forEach(function (terminator) {
    (0, _card.default)(terminator);
  });
}).catch(function (error) {
  console.log('Ошибка при получении данных', error);
});
},{"../../app/modules/cards/card.js":"app/modules/cards/card.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62023" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app/api/api.js"], null)
//# sourceMappingURL=/api.46137970.js.map