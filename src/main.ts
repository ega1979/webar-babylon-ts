import './style.scss'
import * as BABYLON from '@babylonjs/core';

const main = async () => {
  const renderCavas = <HTMLCanvasElement>(
    document.getElementById('renderCanvas')
  );

  if (!renderCavas) {
    return
  }

  const engine = new BABYLON.Engine(renderCavas, true);
  const scene = new BABYLON.Scene(engine);

  scene.createDefaultCameraOrLight(true, true, true);

  const xr = await scene.createDefaultXRExperienceAsync({
    uiOptions: {
      sessionMode: 'immersive-ar',
    },
    optionalFeatures: true,
  });

  const featureManager = xr.baseExperience.featuresManager;

  const hitTestOptions: BABYLON.IWebXRHitTestOptions = {
    enableTransientHitTest: true,
    disablePermanentHitTest: true,
    transientHitTestProfile: 'generic-touchscreen',
  }

  const hitTest = featureManager.enableFeature(
    BABYLON.WebXRHitTest,
    'latest',
    hitTestOptions,
  ) as BABYLON.WebXRHitTest;

  hitTest?.onHitTestResultObservable.add((results) => {
    if (!results.length) {
      return
    }
    const boxSize = 0.2;
    const box = BABYLON.MeshBuilder.CreateBox('box', { size: boxSize });
    box.position = results[0].position;
    box.rotationQuaternion = results[0].rotationQuaternion;
  });

  engine.runRenderLoop(() => {
    scene.render();
  });
}

main();