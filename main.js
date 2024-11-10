import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x121212);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

//Start of lists with models
//Each index has these values String: fileNameOfObject, String[] correctGuesses, String: hint
var objects = [
    ["sam.glb", ["sam the minuteman", "sam", "minuteman", "minuteman sam"], "Go! Go U! Go UMass!"], 
    ["donut.glb", ["donut", "doughnut"],  "We got some from Dunk's!"], 
    ["churro.glb", ["churro", "long star thing"], "Comes with a lot of sugar, cinnamon, and melted chocolate"],
    ["apple.glb", ["apple", "ringo", "manzana"], "Keeps the doctor away"],
    ["energydrink.glb", ["energy drink", "red bull", "redbull", "monster energy", "monster", "monster can", "can", "soda", "coke", "pop"], "Gives you wings"],
    ["monkey.glb", ["monkey", "chimp", "suzanne"], "Gives you wings"]
]

var funcReturn = newObject(objects, -1);
objects = funcReturn[0];
var currentObjIndex = funcReturn[1];

// Listener for the user input
document.addEventListener('DOMContentLoaded', () => {
    const text = document.getElementById('guess');
    const subBut = document.getElementById('submit');
    const form = document.getElementById('form');

    function getGuess(event) {
      event.preventDefault();
      var guess = text.value;
      form.reset();
      guess = guess.toLowerCase();
      for(var i = 0; i<objects[currentObjIndex][1].length; i++){
        if(objects[currentObjIndex][1][i]==guess){
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
            funcReturn = newObject(objects, currentObjIndex);
            objects = funcReturn[0];
            currentObjIndex = funcReturn[1];
            break;
        }
      }
      console.log(guess);  
  }

    subBut.addEventListener('click', getGuess);
  });


function newObject(objects, indexToRemove){
    if(indexToRemove!=-1){
        objects.splice(indexToRemove, 1);
    }
    var currentObjIndex = Math.floor(Math.random() * objects.length); //random num from [0, objects.length)
    const modelLoader = new GLTFLoader();
    modelLoader.load( './models/'+objects[currentObjIndex][0], function ( gltf ) {
        // Traverse the model to access all children and their materials
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                // Extract the geometry from the mesh
                const geometry = child.geometry;

                // Create a PointsMaterial for rendering the vertices as points
                const pointsMaterial = new THREE.PointsMaterial({
                    color: 0xffffff, // Color of the points
                    size: 0.02,      // Size of each point
                });

                // Create a Points object from the geometry and the material
                const points = new THREE.Points(geometry, pointsMaterial);

                // Add the Points object to the scene
                scene.add(points);
            }
        });


    }, undefined, (error) => {
        console.error('An error occurred while loading the GLTF model:', error);
    });
    return [objects, currentObjIndex];
}

// const geometry = new THREE.BoxGeometry( 1,1,1 ); 
// const material = new THREE.PointsMaterial( { color: 0xffffff});
// material.size = 0.04;
// const cube = new THREE.Points( geometry, material );

// scene.add( cube );

// Instantiates OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
// Set zoom limits
controls.minDistance = 2; // Minimum zoom distance
controls.maxDistance = 7; // Maximum zoom distance

camera.position.z = 5;

// Handles scene resizing
// Load the font
window.addEventListener('resize', () => {
	const width = window.innerWidth;
	const height = window.innerHeight;

	renderer.setSize(width, height);

	camera.aspect = width	 / height;

	camera.updateProjectionMatrix();
});

function animate() {
	controls.update();
	renderer.render( scene, camera );
}

renderer.setAnimationLoop(animate);
