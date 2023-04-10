import * as THREE from "https://unpkg.com/three/build/three.module.js";

const canvasWrapper = document.getElementById("canvas-wrapper");

//сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color('#A8D8EA');

//камера
let camera = new THREE.PerspectiveCamera(75, canvasWrapper.clientWidth / canvasWrapper.clientHeight, 1, 1000);

let cameraTarget = new THREE.Vector3(0, 0, 0);
camera.position.x = 0;
camera.position.y = 8;
camera.position.z = -15;

camera.lookAt(cameraTarget);
scene.add(camera);

//вертикальная плоскость
const geometry = new THREE.PlaneGeometry(10, 5);
const material = new THREE.MeshPhongMaterial({color: '#FCBAD3', dithering: true, side: THREE.DoubleSide});
const plane = new THREE.Mesh(geometry, material);
plane.position.x = 0;
plane.position.y = 2.5;
plane.position.z = 5;
plane.receiveShadow = true; 

scene.add(plane);

//горизонтальная плоскость
let vertices = [
    0, 0, 0,
    10, 0, 0,
    10, 0, 10,
    0, 0, 10
];

let indices = [
    2, 1, 0,
    0, 3, 2
];

let geometry1 = new THREE.BufferGeometry();

geometry1.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices), 3));
geometry1.setIndex(indices);
geometry1.computeVertexNormals();

let material1 = new THREE.MeshPhongMaterial({ color: "#AA96DA", dithering: true, side: THREE.DoubleSide });

let plane1 = new THREE.Mesh(geometry1, material1);
plane1.position.set(-5, 0, -5);
plane1.receiveShadow = true;

scene.add(plane1);

//куб
const geometry2 = new THREE.BoxGeometry(3, 3, 3);
const material2 = new THREE.MeshPhongMaterial({color: "BlueViolet", dithering: true, specular: 0x111111, shininess: 200});

let cube;
cube = new THREE.Mesh(geometry2, material2);
cube.position.y = 2;
cube.position.x = 2;
cube.position.z = -2;
cube.castShadow = true;
scene.add(cube);

//пирамида
let vertices1 = [
    0, 0, 0,
    4, 0, 0,
    2, 0, 4,
    2, 4, 2
];

let indices1 = [
    2, 1, 0,
    0, 3, 2,
    1, 0, 3,
    3, 2, 1
];

let geometry3 = new THREE.BufferGeometry();
geometry3.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices1), 3));
geometry3.setIndex(indices1);
geometry3.computeVertexNormals();

let material3 = new THREE.MeshPhongMaterial({color: "BlueViolet", dithering: true, side: THREE.DoubleSide});
let tetr = new THREE.Mesh(geometry3, material3);
tetr.position.set(-4, 0.5, -4);
tetr.castShadow = true;
scene.add(tetr);

//общий свет
const pointlight = new THREE.PointLight("#ffffff", 1, 100);
pointlight.position.set(0, 8, -15);
pointlight.castShadow = true;
scene.add(pointlight);

//свет прожектор
const spotLight = new THREE.SpotLight("#ffffff");
spotLight.position.set(5, 5, 5);
spotLight.castShadow = true;
scene.add(spotLight)

//рендер
const renderer = new THREE.WebGLRenderer();
renderer.setSize(canvasWrapper.clientWidth, canvasWrapper.clientHeight);
canvasWrapper.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true; 
renderer.render(scene, camera); 

//рендер по кругу
const clock = new THREE.Clock();

function render() {
    requestAnimationFrame(render);
    const elapsedTime = clock.getElapsedTime(); 

    camera.position.x = Math.cos(elapsedTime * 0.5) * 10;
    camera.position.z = Math.sin(elapsedTime * 0.5) * 10;

    camera.lookAt(cameraTarget);

    renderer.render(scene, camera);
}
render();


//цвет куба
document.forms[0].addEventListener('change', (e) => {
    cube.material.color.set(e.target.value);
})

//изменение света

// const light1 = document.getElementById("pointlight");
// const light2 = document.getElementById("spotlight");
// const light3 = document.getElementById("doublelight");
// const nulllight = document.getElementById("nulllight");

function changeLight(event) {

    event.preventDefault();

    if (document.getElementById("pointlight").checked){

        pointlight.intensity.set(event.target.value);

    } else if (document.getElementById("spotlight").checked){

        spotLight.intensity.set(event.target.value);

    } else if (document.getElementById("doublelight").checked){

        pointlight.intensity.set(event.target.value);
        spotLight.intensity.set(event.target.value);

    } else if (document.getElementById("nulllight").checked){

        pointlight.intensity.set(event.target.value);
        spotLight.intensity.set(event.target.value);

    }
}

document.forms[1].addEventListener('change', (e) => {
    changeLight(e);
})



