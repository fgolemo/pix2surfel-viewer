import * as THREE from 'three';

const {mean, std} = require('mathjs');
let OrbitControls = require('three-orbitcontrols');
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import dat from 'dat.gui';
import Dragdropper from "./dragdropper";

// let gui = new dat.GUI();

// let options = {
//   model: {
//     original: true,
//     rotated: false
//   }
// };
//
// let opt = gui.addFolder('Model');
// let optOrig = opt.add(options.model, 'original').listen();
// let optRot = opt.add(options.model, 'rotated').listen();
// opt.open();

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xffffff, 0);

let controls = new OrbitControls(camera, renderer.domElement);
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

let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

let pointlight = new THREE.PointLight(0xffff00, 1, 100);
pointlight.position.set(5, 5, 5);
scene.add(pointlight);
let pointlight_b = new THREE.PointLight(0xff00ff, 1, 100);
pointlight_b.position.set(0, -5, -5);
scene.add(pointlight_b);

var axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);


function createSplat(x, y, z, r, g, b, scale) {
  let geometry = new THREE.PlaneGeometry(1 * scale, 1 * scale);
  geometry.lookAt(new THREE.Vector3(0, 0, 1000));
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


var loader = new THREE.FileLoader();
let parse = require('csv-parse/lib/sync');

let dataHolder;

function parseCSV(data) {
  let records = parse(data, {
    columns: false,
    cast: true
  });
  let geo = new THREE.Geometry();
  let counter = 0;
  let minx = 10000;
  let maxx = -10000;
  let miny = 10000;
  let maxy = -10000;
  let minz = 10000;
  let maxz = -10000;
  let zs = [];
  records.forEach(function (row) {
    maxx = Math.max(maxx, row[0]);
    minx = Math.min(minx, row[0]);

    maxy = Math.max(maxy, row[1]);
    miny = Math.min(miny, row[1]);

    maxz = Math.max(maxz, row[2]);
    minz = Math.min(minz, row[2]);
    zs.push(row[2]);
  });
  let meanZ = mean(zs);
  let stdZ = std(zs);
  records.forEach(function (row) {
    let x_norm = 1 - ((row[0] - minx) / (maxx - minx));
    let y_norm = (row[1] - miny) / (maxy - miny);
    let z_norm = (row[2] - meanZ) / (stdZ) + minz;

    let a = createSplat(y_norm, x_norm, z_norm, row[3], row[4], row[5], 0.016);
    geo.merge(a);
    counter++;

  });
  // console.log("max x: "+maxx+", max y: "+maxy+", min/max z: "+minz+"/"+maxz);
  let buf = new THREE.BufferGeometry().fromGeometry(geo);
  let matNormal = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, vertexColors: THREE.FaceColors});
  let meshNormal = new THREE.Mesh(buf, matNormal);
  // meshNormal.visible = config;
  if (dataHolder !== null) {
    scene.remove(dataHolder);
  }

  dataHolder = meshNormal;
  scene.add(meshNormal);
  console.log("added", counter);
  // meshHolder[name] = meshNormal;
}

function openCSV(path) {
  //load a text file and output the result to the console
  loader.load(
    // resource URL
    path,

    function (data) {
      parseCSV(data);
    },

    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },

    function (err) {
      console.error('An error happened');
    }
  );
}

// openCSV('/assets/data/data-test.csv', "normal");

// optOrig.onFinishChange(function (value) {
//   meshHolder["normal"].visible = value;
// });

let ds = new Dragdropper(parseCSV);

let animate = function () {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};


animate();
