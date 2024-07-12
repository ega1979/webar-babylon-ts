import './style.scss'
import * as BABYLON from '@babylonjs/core';

const main = async () => {
  const renderCavas = <HTMLCanvasElement>(
    document.getElementById('renderCanvas')
  );

  if (renderCavas) {
    const engine = new BABYLON.Engine(renderCavas, true);
    const scene = new BABYLON.Scene(engine);

    scene.createDefaultCameraOrLight(true, true, true);
    // scene.createDefaultEnvironment();

    const boxSize = 0.2;
    const box = BABYLON.MeshBuilder.CreateBox('box', { size: boxSize });
    box.position.addInPlaceFromFloats(0, boxSize / 1.2, 0);

    await scene.createDefaultXRExperienceAsync({
      uiOptions: {
        sessionMode: 'immersive-ar',
      },
    });

    engine.runRenderLoop(() => {
      scene.render();
    });
  }
}

main();