"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useSetupAudioContext;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function fetchMusic(audioContext) {
  var soundResponse, soundArrayBuffer;
  return regeneratorRuntime.async(function fetchMusic$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("/metronome/asset/bgm.mp3", {
            method: "GET",
            responseType: "arraybuffer",
            cache: "force-cache"
          }));

        case 2:
          soundResponse = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(soundResponse.arrayBuffer());

        case 5:
          soundArrayBuffer = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(audioContext.decodeAudioData(soundArrayBuffer));

        case 8:
          return _context.abrupt("return", _context.sent);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}

function useSetupAudioContext() {
  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      audioContext = _useState2[0],
      setAudioContext = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      gain = _useState4[0],
      setGain = _useState4[1];

  var musicBuffer = (0, _react.useRef)();

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      load = _useState6[0],
      setLoad = _useState6[1];

  (0, _react.useEffect)(function () {
    var audio = new AudioContext();
    var gain = audio.createGain();
    gain.connect(audio.destination);
    setAudioContext(audio);
    setGain(gain);

    if (!load) {
      fetchMusic(audio).then(function (data) {
        return musicBuffer.current = data;
      });
      setLoad(true);
    }

    return function () {
      audio.close();
    };
  }, []);
  return [audioContext, gain, musicBuffer];
}