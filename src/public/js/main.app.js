(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var dat_gui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dat.gui */ \"./node_modules/dat.gui/build/dat.gui.module.js\");\n\n\nvar OrbitControls = __webpack_require__(/*! three-orbitcontrols */ \"./node_modules/three-orbitcontrols/OrbitControls.js\"); // import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';\n\n\n\nvar gui = new dat_gui__WEBPACK_IMPORTED_MODULE_1__[\"default\"].GUI();\nvar options = {\n  model: {\n    original: true,\n    rotated: false\n  }\n};\nvar opt = gui.addFolder('Model');\nvar optOrig = opt.add(options.model, 'original').listen();\nvar optRot = opt.add(options.model, 'rotated').listen();\nopt.open();\nvar scene = new three__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]();\nvar camera = new three__WEBPACK_IMPORTED_MODULE_0__[\"PerspectiveCamera\"](75, window.innerWidth / window.innerHeight, 0.1, 1000);\nvar renderer = new three__WEBPACK_IMPORTED_MODULE_0__[\"WebGLRenderer\"]({\n  alpha: true\n});\nrenderer.setSize(window.innerWidth, window.innerHeight);\ndocument.body.appendChild(renderer.domElement);\nrenderer.setClearColor(0xffffff, 0);\nvar controls = new OrbitControls(camera, renderer.domElement);\ncontrols.enableDamping = true;\ncontrols.dampingFactor = 0.25;\ncontrols.enableZoom = true;\ncamera.position.set(.5, .25, 2);\ncontrols.update(); // var geometry = new THREE.SphereGeometry(.5, 32, 32);\n// var material = new THREE.MeshLambertMaterial({color: 0xffff00});\n// var sphere = new THREE.Mesh(geometry, material);\n// scene.add(sphere);\n\nvar light = new three__WEBPACK_IMPORTED_MODULE_0__[\"AmbientLight\"](0x404040); // soft white light\n\nscene.add(light);\nvar directionalLight = new three__WEBPACK_IMPORTED_MODULE_0__[\"DirectionalLight\"](0xffffff, 0.5);\nscene.add(directionalLight);\nvar pointlight = new three__WEBPACK_IMPORTED_MODULE_0__[\"PointLight\"](0xffff00, 1, 100);\npointlight.position.set(5, 5, 5);\nscene.add(pointlight);\nvar pointlight_b = new three__WEBPACK_IMPORTED_MODULE_0__[\"PointLight\"](0xff00ff, 1, 100);\npointlight_b.position.set(0, -5, -5);\nscene.add(pointlight_b);\nvar axesHelper = new three__WEBPACK_IMPORTED_MODULE_0__[\"AxesHelper\"](1);\nscene.add(axesHelper);\n\nfunction createSplat(x, y, z, r, g, b, scale) {\n  var geometry = new three__WEBPACK_IMPORTED_MODULE_0__[\"PlaneGeometry\"](1 * scale, 1 * scale);\n  geometry.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 0, 1000));\n\n  if (z != 0) {\n    z = 1 - z / 5;\n  }\n\n  geometry.translate(x - .5, y - .5, z); // geometry.translate(x-.5, y-.5, z);\n\n  for (var i in geometry.faces) {\n    geometry.faces[i].color = new three__WEBPACK_IMPORTED_MODULE_0__[\"Color\"](r, g, b);\n  } // splat.castShadow = true;\n  // splat.receiveShadow = false;\n\n\n  return geometry;\n} // let a = createSplat(1, 0, 0, 1, 0, 0, 1);\n// let b = createSplat(0, 1, 0, 0, 1, 0, 1);\n// let c = createSplat(0, 0, 1, 0, 0, 1, 1);\n// let geo = new THREE.Geometry();\n// geo.merge(a);\n// geo.merge(b);\n// geo.merge(c);\n// let buf = new THREE.BufferGeometry().fromGeometry(geo);\n// let matNormal = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, vertexColors: THREE.FaceColors});\n// let meshNormal = new THREE.Mesh(buf, matNormal);\n// scene.add(meshNormal);\n\n\nvar loader = new three__WEBPACK_IMPORTED_MODULE_0__[\"FileLoader\"]();\n\nvar parse = __webpack_require__(/*! csv-parse/lib/sync */ \"./node_modules/csv-parse/lib/sync.js\");\n\nvar meshHolder = {};\n\nfunction openCSV(path, name, config) {\n  //load a text file and output the result to the console\n  loader.load( // resource URL\n  path, // onLoad callback\n  function (data) {\n    // output the text to the console\n    var records = parse(data, {\n      columns: false,\n      cast: true\n    });\n    var geo = new three__WEBPACK_IMPORTED_MODULE_0__[\"Geometry\"]();\n    var counter = 0;\n    var minx = 10000;\n    var maxx = -10000;\n    var miny = 10000;\n    var maxy = -10000;\n    var minz = 10000;\n    var minz2 = 10000;\n    var maxz = -10000;\n    var zs = [];\n    records.forEach(function (row) {\n      maxx = Math.max(maxx, row[0]);\n      minx = Math.min(minx, row[0]);\n      maxy = Math.max(maxy, row[1]);\n      miny = Math.min(miny, row[1]);\n      maxz = Math.max(maxz, row[2]);\n      minz = Math.min(minz, row[2]);\n      zs.push(row[2]);\n    });\n    records.forEach(function (row) {\n      // console.log(row);\n      // let a = createSplat(row.x, row.y,1, row.r, row.g, row.b, 0.83);\n      var x_norm = 1 - (row[0] - minx) / (maxx - minx);\n      var y_norm = (row[1] - miny) / (maxy - miny); // let y_norm = (row[1] - 64) / 64;\n\n      var z_norm = (row[2] - Math.m) / (maxz - minz2);\n      var a = createSplat(y_norm, x_norm, z_norm, row[3], row[4], row[5], 0.016);\n      geo.merge(a);\n      counter++;\n    }); // console.log(\"max x: \"+maxx+\", max y: \"+maxy+\", min/max z: \"+minz+\"/\"+maxz);\n\n    var buf = new three__WEBPACK_IMPORTED_MODULE_0__[\"BufferGeometry\"]().fromGeometry(geo);\n    var matNormal = new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshBasicMaterial\"]({\n      side: three__WEBPACK_IMPORTED_MODULE_0__[\"DoubleSide\"],\n      vertexColors: three__WEBPACK_IMPORTED_MODULE_0__[\"FaceColors\"]\n    });\n    var meshNormal = new three__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"](buf, matNormal);\n    meshNormal.visible = config;\n    scene.add(meshNormal);\n    console.log(\"added\", counter);\n    meshHolder[name] = meshNormal;\n  }, // onProgress callback\n  function (xhr) {\n    console.log(xhr.loaded / xhr.total * 100 + '% loaded');\n  }, // onError callback\n  function (err) {\n    console.error('An error happened');\n  });\n}\n\nopenCSV('/assets/data/data-test.csv', \"normal\", options.model.original); // openCSV('/assets/data/data-merged2.csv', \"rotated\", options.model.rotated);\n\noptOrig.onFinishChange(function (value) {\n  meshHolder[\"normal\"].visible = value;\n}); // optRot.onFinishChange(function (value) {\n//   meshHolder[\"rotated\"].visible = value;\n// });\n\nvar animate = function animate() {\n  requestAnimationFrame(animate); // cube.rotation.x += 0.01;\n  // cube.rotation.y += 0.01;\n\n  renderer.render(scene, camera);\n};\n\nanimate();\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./src/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/js/app.js */\"./src/js/app.js\");\n\n\n//# sourceURL=webpack:///multi_./src/js/app.js?");

/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//# sourceURL=webpack:///util_(ignored)?");

/***/ })

},[[0,"runtime","vendors"]]]);