import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import { isTalkingAtom } from "pages/Home/store";
import { memo, useEffect, useMemo, useRef } from "react";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

const avatarUrl = "/models/man-model.glb";

const Avatar = memo(() => {
  const [isTalking] = useAtom(isTalkingAtom);
  const group = useRef();
  const avatarRef = useRef();

  const { scene } = useGLTF(avatarUrl);
  const { animations: idleAnimations } = useGLTF(
    "/animations/M_Standing_Idle_001.glb",
  );
  const { animations: talkAnimations } = useGLTF(
    "/animations/M_Talking_Variations_007.glb",
  );

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  // Gunakan AnimationMixer langsung untuk menghindari bug useAnimations (@react-three/drei #2340)
  // yang sering memanggil mixer.stopAllAction() dan mereset avatar ke T-pose.
  const mixer = useMemo(() => new THREE.AnimationMixer(clone), [clone]);

  const idleAction = useMemo(() => {
    if (!idleAnimations?.[0]) return null;
    const action = mixer.clipAction(idleAnimations[0]);
    action.setLoop(THREE.LoopRepeat, Infinity);
    return action;
  }, [mixer, idleAnimations]);

  const talkAction = useMemo(() => {
    if (!talkAnimations?.[0]) return null;
    const action = mixer.clipAction(talkAnimations[0]);
    action.setLoop(THREE.LoopRepeat, Infinity);
    return action;
  }, [mixer, talkAnimations]);

  // Mainkan idle pada awal load
  useEffect(() => {
    if (!idleAction) return;
    idleAction.setEffectiveWeight(1);
    idleAction.play();
  }, [idleAction]);

  // Crossfade mulus tanpa pernah menyentuh T-pose
  const currentActionRef = useRef(idleAction);

  useEffect(() => {
    if (!idleAction || !talkAction) return;

    const nextAction = isTalking ? talkAction : idleAction;
    const prevAction = currentActionRef.current || idleAction;

    if (nextAction !== prevAction) {
      nextAction.reset();
      nextAction.setEffectiveWeight(1);
      nextAction.play();
      prevAction.crossFadeTo(nextAction, 0.4, false);
      currentActionRef.current = nextAction;
    }
  }, [isTalking, idleAction, talkAction]);

  // Update frame mixer dan perbaiki posisi hips bone
  useFrame((_, delta) => {
    mixer.update(delta);

    const hips = clone.getObjectByName("Hips");
    if (hips) hips.position.set(0, hips.position.y, 0);
  });

  // Cleanup hanya saat component unmount
  useEffect(() => {
    return () => {
      mixer.stopAllAction();
    };
  }, [mixer]);

  return (
    <group
      ref={group}
      position={[0, -1.2, 0]}
      dispose={null}
      name="character-1"
    >
      <primitive
        object={clone}
        ref={avatarRef}
      />
    </group>
  );
});

export default Avatar;

useGLTF.preload(avatarUrl);
useGLTF.preload("/animations/M_Standing_Idle_001.glb");
useGLTF.preload("/animations/M_Talking_Variations_007.glb");
