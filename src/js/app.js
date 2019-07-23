import * as THREE from 'three';

const OrbitControls = require('three-orbitcontrols');
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import dat from 'dat.gui';

const gui = new dat.GUI();

let options = {
  model: {
    original: true,
    rotated: false
  }
};

let opt = gui.addFolder('Model');
let optOrig = opt.add(options.model, 'original').listen();
let optRot = opt.add(options.model, 'rotated').listen();
opt.open();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xffffff, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
camera.position.set(.5, .25, 2);
controls.update();


// var geometry = new THREE.SphereGeometry(.5, 32, 32);
// var material = new THREE.MeshLambertMaterial({color: 0xffff00});
// var sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);


var light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

const pointlight = new THREE.PointLight(0xffff00, 1, 100);
pointlight.position.set(5, 5, 5);
scene.add(pointlight);
const pointlight_b = new THREE.PointLight(0xff00ff, 1, 100);
pointlight_b.position.set(0, -5, -5);
scene.add(pointlight_b);

var axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);


function createSplat(x, y, z, r, g, b, scale) {
  let geometry = new THREE.PlaneGeometry(1 * scale, 1 * scale);
  geometry.lookAt(new THREE.Vector3(0, 0, 10));
  if (z != 0) {
    z = 1 - z / 5
  }


  geometry.translate(x - .5, y - .5, z);
  // geometry.translate(x-.5, y-.5, z);
  for (let i in geometry.faces) {
    geometry.faces[i].color = new THREE.Color(r, g, b);
  }
  // splat.castShadow = true;
  // splat.receiveShadow = false;
  return geometry;
}


// let a = createSplat(1, 0, 0, 1, 0, 0, 1);
// let b = createSplat(0, 1, 0, 0, 1, 0, 1);
// let c = createSplat(0, 0, 1, 0, 0, 1, 1);
// let geo = new THREE.Geometry();
// geo.merge(a);
// geo.merge(b);
// geo.merge(c);
// let buf = new THREE.BufferGeometry().fromGeometry(geo);
// let matNormal = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, vertexColors: THREE.FaceColors});
// let meshNormal = new THREE.Mesh(buf, matNormal);
// scene.add(meshNormal);


var loader = new THREE.FileLoader();
const parse = require('csv-parse/lib/sync');

let meshHolder = {};

function openCSV(path, name, config) {
  //load a text file and output the result to the console
  loader.load(
    // resource URL
    path,

    // onLoad callback
    function (data) {
      // output the text to the console

      const records = parse(data, {
        columns: true,
        cast: true
      });
      let geo = new THREE.Geometry();
      let counter = 0;
      records.forEach(function (row) {
        // console.log(row);
        // let a = createSplat(row.x, row.y,1, row.r, row.g, row.b, 0.83);
        let a = createSplat(row.x, row.y, row.z, row.r, row.g, row.b, 0.0083);
        geo.merge(a);
        counter++;
      });
      let buf = new THREE.BufferGeometry().fromGeometry(geo);
      let matNormal = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, vertexColors: THREE.FaceColors});
      let meshNormal = new THREE.Mesh(buf, matNormal);
      meshNormal.visible = config;
      scene.add(meshNormal);
      console.log("added", counter);
      meshHolder[name] = meshNormal;
    },

    // onProgress callback
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },

    // onError callback
    function (err) {
      console.error('An error happened');
    }
  );
}

openCSV('/assets/data/data-before2.csv', "normal", options.model.original);
openCSV('/assets/data/data-merged2.csv', "rotated", options.model.rotated);

optOrig.onFinishChange(function (value) {
  meshHolder["normal"].visible = value;
});
optRot.onFinishChange(function (value) {
  meshHolder["rotated"].visible = value;
});

const animate = function () {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
