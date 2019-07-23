(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n\nvar OrbitControls = __webpack_require__(/*! three-orbitcontrols */ \"./node_modules/three-orbitcontrols/OrbitControls.js\"); // import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';\n\n\nvar scene = new three__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]();\nvar camera = new three__WEBPACK_IMPORTED_MODULE_0__[\"PerspectiveCamera\"](75, window.innerWidth / window.innerHeight, 0.1, 1000);\nvar renderer = new three__WEBPACK_IMPORTED_MODULE_0__[\"WebGLRenderer\"]();\nrenderer.setSize(window.innerWidth, window.innerHeight);\ndocument.body.appendChild(renderer.domElement);\nvar controls = new OrbitControls(camera, renderer.domElement);\ncontrols.enableDamping = true;\ncontrols.dampingFactor = 0.25;\ncontrols.enableZoom = true;\ncamera.position.set(5, 5, 5);\ncontrols.update();\nvar geometry = new three__WEBPACK_IMPORTED_MODULE_0__[\"SphereGeometry\"](.5, 32, 32);\nvar material = new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshLambertMaterial\"]({\n  color: 0xffff00\n});\nvar sphere = new three__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"](geometry, material);\nscene.add(sphere);\nvar light = new three__WEBPACK_IMPORTED_MODULE_0__[\"AmbientLight\"](0x404040); // soft white light\n\nscene.add(light);\nvar directionalLight = new three__WEBPACK_IMPORTED_MODULE_0__[\"DirectionalLight\"](0xffffff, 0.5);\nscene.add(directionalLight);\nvar pointlight = new three__WEBPACK_IMPORTED_MODULE_0__[\"PointLight\"](0xffff00, 1, 100);\npointlight.position.set(5, 5, 5);\nscene.add(pointlight);\nvar pointlight_b = new three__WEBPACK_IMPORTED_MODULE_0__[\"PointLight\"](0xff00ff, 1, 100);\npointlight_b.position.set(0, -5, -5);\nscene.add(pointlight_b);\nvar axesHelper = new three__WEBPACK_IMPORTED_MODULE_0__[\"AxesHelper\"](5);\nscene.add(axesHelper);\n\nfunction createSplat(x, y, z, r, g, b, scale) {\n  var geometry = new three__WEBPACK_IMPORTED_MODULE_0__[\"PlaneGeometry\"](1 * scale, 1 * scale);\n  geometry.lookAt(new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](1, 0, 1));\n  geometry.translate(x, y, z);\n\n  for (var i in geometry.faces) {\n    geometry.faces[i].color = new three__WEBPACK_IMPORTED_MODULE_0__[\"Color\"](r, g, b);\n  } // splat.castShadow = true;\n  // splat.receiveShadow = false;\n\n\n  return geometry;\n}\n\nvar a = createSplat(1, 0, 0, 1, 0, 0, 1);\nvar b = createSplat(0, 1, 0, 0, 1, 0, 1);\nvar c = createSplat(0, 0, 1, 0, 0, 1, 1);\nvar geo = new three__WEBPACK_IMPORTED_MODULE_0__[\"Geometry\"]();\ngeo.merge(a);\ngeo.merge(b);\ngeo.merge(c);\nvar buf = new three__WEBPACK_IMPORTED_MODULE_0__[\"BufferGeometry\"]().fromGeometry(geo);\nvar matNormal = new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshBasicMaterial\"]({\n  side: three__WEBPACK_IMPORTED_MODULE_0__[\"DoubleSide\"],\n  vertexColors: three__WEBPACK_IMPORTED_MODULE_0__[\"FaceColors\"]\n});\nvar meshNormal = new three__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"](buf, matNormal);\nscene.add(meshNormal);\nvar loader = new three__WEBPACK_IMPORTED_MODULE_0__[\"FileLoader\"](); //load a text file and output the result to the console\n\nloader.load( // resource URL\n'data-before.csv', // onLoad callback\nfunction (data) {\n  // output the text to the console\n  console.log(data);\n}, // onProgress callback\nfunction (xhr) {\n  console.log(xhr.loaded / xhr.total * 100 + '% loaded');\n}, // onError callback\nfunction (err) {\n  console.error('An error happened');\n});\n\nvar animate = function animate() {\n  requestAnimationFrame(animate); // cube.rotation.x += 0.01;\n  // cube.rotation.y += 0.01;\n\n  renderer.render(scene, camera);\n};\n\nanimate();\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./src/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/js/app.js */\"./src/js/app.js\");\n\n\n//# sourceURL=webpack:///multi_./src/js/app.js?");

/***/ })

},[[0,"runtime","vendors"]]]);