import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { Quaternion, Vector3 } from "three";

const calculateIdealOffset = (character, baseVector) => {
  const idealOffset = baseVector;
  // const idealOffset = new Vector3(-3, 6.0, -6.0);
  idealOffset.applyQuaternion(character.quaternion);
  idealOffset.add(character.position);
  return idealOffset;
};
const calculateIdealLookAt = (character, baseVector) => {
  const idealLookAt = baseVector;
  // const idealLookAt = new Vector3(0, 2.0, 10.0);
  idealLookAt.applyQuaternion(character.quaternion);
  idealLookAt.add(character.position);
  return idealLookAt;
};

const Character = ({ characterRef = false }) => {
  const mesh = useRef();
  const { offsetVector, lookAtVector, normalSpeed, runningSpeed } = useControls(
    "Character",
    {
      offsetVector: {
        value: new Vector3(-1, 3, -6),
      },
      lookAtVector: {
        value: new Vector3(-17, 2, 60),
      },
      normalSpeed: {
        value: 4,
      },
      runningSpeed: {
        value: 10,
      },
    }
  );

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "w":
      case "W":
        mesh.current.userData.moveForward = true;
        break;
      case "s":
      case "S":
        mesh.current.userData.moveBackward = true;
        break;
      case "a":
      case "A":
        mesh.current.userData.moveLeft = true;
        break;
      case "d":
      case "D":
        mesh.current.userData.moveRight = true;
        break;
      case "r":
      case "R":
        mesh.current.userData.moveUp = true;
        break;
      case "f":
      case "F":
        mesh.current.userData.moveDown = true;
        break;
      case "Shift":
        mesh.current.userData.movementSpeed = runningSpeed;
        break;
    }
  });
  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "w":
      case "W":
        mesh.current.userData.moveForward = false;
        break;
      case "s":
      case "S":
        mesh.current.userData.moveBackward = false;
        break;
      case "a":
      case "A":
        mesh.current.userData.moveLeft = false;
        break;
      case "d":
      case "D":
        mesh.current.userData.moveRight = false;
        break;
      case "r":
      case "R":
        mesh.current.userData.moveUp = false;
        break;
      case "f":
      case "F":
        mesh.current.userData.moveDown = false;
        break;
      case "Shift":
        mesh.current.userData.movementSpeed = 0;
        break;
    }
  });
  useFrame((state, delta) => {
    const { camera } = state;

    // Character Movement
    const controlObject = mesh.current;
    const _Q = new Quaternion();
    const _A = new Vector3();
    const _R = controlObject.quaternion.clone();

    const userData = mesh.current.userData;
    const movementSpeed = userData.movementSpeed || normalSpeed;
    const character = mesh.current;
    const actualMoveSpeed = -delta * movementSpeed;
    if (userData.moveForward && !userData.moveBackward) {
      character.translateZ(-actualMoveSpeed);
    }
    if (userData.moveBackward) character.translateZ(actualMoveSpeed);
    if (userData.moveLeft) {
      character.translateX(-actualMoveSpeed);
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * Math.PI * delta * 0.125);
      _R.multiply(_Q);
    }
    if (userData.moveRight) {
      character.translateX(actualMoveSpeed);
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * delta * 0.125);
      _R.multiply(_Q);
    }
    if (userData.moveUp) character.translateY(-actualMoveSpeed);
    if (userData.moveDown) character.translateY(actualMoveSpeed);
    mesh.current.quaternion.copy(_R);

    // Camera Follow
    const idealOffset = calculateIdealOffset(
      mesh.current,
      new Vector3().copy(offsetVector)
    );
    const idealLookAt = calculateIdealLookAt(
      mesh.current,
      new Vector3().copy(lookAtVector)
    );
    const t = 0.15;
    const currentPosition = new Vector3().copy(camera.position);
    const currentLookAt = new Vector3().copy(character.position);
    currentPosition.lerp(idealOffset, t);
    currentLookAt.lerp(idealLookAt, t);

    camera.position.copy(currentPosition);
    camera.lookAt(currentLookAt);
    if (characterRef) characterRef.current = mesh.current;
  });

  return (
    <mesh ref={mesh} position={[1, 2, 0]}>
      <boxGeometry args={[1, 4, 1]} />
      <meshBasicMaterial />
    </mesh>
  );
};

export default Character;
