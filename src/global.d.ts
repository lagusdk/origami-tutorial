declare module "*.css";
declare module "*.scss";
declare module "*.module.css";
// three.d.ts
declare module "three/examples/jsm/loaders/OBJLoader" {
  import { Loader, LoadingManager } from "three";

  export class OBJLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (object: THREE.Object3D) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    parse(data: string): THREE.Object3D;
  }
}

declare module "three/examples/jsm/loaders/FBXLoader" {
  import { Loader, LoadingManager, AnimationClip, Group } from "three";

  export class FBXLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (object: Group) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    parse(FBXText: string, path: string): Group;
    parse(FBXBuffer: ArrayBuffer | string, path: string): Group;
  }
}
