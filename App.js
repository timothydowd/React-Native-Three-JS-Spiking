
import { View as GraphicsView } from 'expo-graphics';
import ExpoTHREE, { THREE } from 'expo-three';
import React from 'react';

export default class App extends React.Component {
  componentWillMount() {
    THREE.suppressExpoWarnings();
  }

  render() {
    // Create an `ExpoGraphics.View` covering the whole screen, tell it to call our
    // `onContextCreate` function once it's initialized.
    return (
      <GraphicsView
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
      />
    );
  }

  // This is called by the `ExpoGraphics.View` once it's initialized
  onContextCreate = async ({
    gl,
    canvas,
    width,
    height,
    scale: pixelRatio,
  }) => {
    this.renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height, antialias: true });
    this.renderer.setClearColor(0xffffff)
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 0.01
    const geometry = new THREE.SphereGeometry(0.5, 32, 32)
    const texture = new THREE.TextureLoader().load( 'https://i.ibb.co/Sdb1Lzt/projectroom.jpg' );
    const material = new THREE.MeshPhongMaterial({ map: texture })
    
    this.cube = new THREE.Mesh(geometry, material)

    this.cube.material.side = THREE.DoubleSide // shows material on inside of mesh
    this.cube.scale.y = -1
    this.scene.add(this.cube);

    this.scene.add(new THREE.AmbientLight(0x404040));

    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(3, 3, 3);
    this.scene.add(light);
  };

  onRender = delta => {
    // this.cube.rotation.x += 3.5 * delta;
    // this.cube.rotation.y += 2 * delta;
    this.renderer.render(this.scene, this.camera);
  };
}


//////////////////////////












// controls = new THREE.OrbitControls(camera, renderer.domElement)

// var geometry = new THREE.SphereGeometry(0.5, 32, 32) //
// var texture = new THREE.TextureLoader().load( 'https://i.ibb.co/Sdb1Lzt/projectroom.jpg' ); //


// var material = new THREE.MeshPhongMaterial({ map: texture }) //
// var mesh = new THREE.Mesh(geometry, material) //

// mesh.material.side = THREE.DoubleSide // shows material on inside of mesh
// mesh.scale.y = -1 //


// scene.add(mesh)//


// // add light

// const light = new THREE.AmbientLight(0xFFFFFF)
// light.position.set(10, 0, 25)
// scene.add(light)





// // render


// const render = () => {
//     requestAnimationFrame(render)
//     renderer.render(scene, camera)
// }

// render()