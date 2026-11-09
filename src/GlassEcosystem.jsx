import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, OrbitControls } from '@react-three/drei';
import { ArrowUpRight, MousePointer2, RotateCcw } from 'lucide-react';
import * as THREE from 'three';

export const ECOSYSTEM_NODES = [
  { id: 'students', name: 'Students', position: [-2.18, 1.22, 0.45], color: '#96c5d6', detail: 'Empowering the next generation to learn, create, and lead.' },
  { id: 'research', name: 'Research', position: [2.2, 1.26, -0.25], color: '#b3d4e2', detail: 'Turning inquiry into knowledge and practical innovation.' },
  { id: 'industry', name: 'Industry', position: [2.28, -1.42, 0.35], color: '#aec6d9', detail: 'Bridging academic knowledge with real-world practice.' },
  { id: 'society', name: 'Society', position: [-2.2, -1.4, -0.2], color: '#c5d9d4', detail: 'Creating meaningful solutions for communities.' }
];

function FloatingOrb({ position, radius = .45, color = '#b2d4e4', active = false, onClick }) {
  const mesh = useRef();
  useFrame((state) => {
    if (mesh.current) {
      const target = active ? 1.16 : 1;
      mesh.current.scale.lerp(new THREE.Vector3(target, target, target), .085);
    }
  });

  return (
    <group position={position}>
      <mesh ref={mesh} onClick={onClick} onPointerOver={e => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = ''; }}>
        <sphereGeometry args={[radius, 36, 36]} />
        <meshPhysicalMaterial color={color} metalness={.13} roughness={.08} transmission={.76} thickness={1.4} ior={1.32} clearcoat={1} clearcoatRoughness={.08} transparent opacity={1} />
      </mesh>
      <mesh scale={radius * .51}>
        <sphereGeometry args={[1, 20, 20]} />
        <meshBasicMaterial color={active ? '#5a99bb' : '#cde4ee'} transparent opacity={.48} />
      </mesh>
      <mesh rotation={[.65, .2, -.4]}>
        <torusGeometry args={[radius * 1.32, .014, 8, 80]} />
        <meshBasicMaterial color={active ? '#477f9b' : '#a3bccb'} transparent opacity={active ? .8 : .44} />
      </mesh>
    </group>
  );
}

function GlassCore() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.elapsedTime * .09;
  });
  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[1.16, 5]} />
        <meshPhysicalMaterial color="#b4d4e2" transmission={.86} thickness={2} roughness={.12} metalness={.08} ior={1.35} clearcoat={1} />
      </mesh>
      <mesh scale={.61}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color="#638ca8" metalness={.72} roughness={.3} transparent opacity={.54} />
      </mesh>
      <mesh rotation={[.3, .55, .7]}>
        <torusGeometry args={[1.5, .026, 10, 96]} />
        <meshStandardMaterial color="#7da7bc" metalness={.76} roughness={.2} transparent opacity={.82} />
      </mesh>
      <mesh rotation={[1.3, .3, -.6]}>
        <torusGeometry args={[1.75, .018, 10, 96]} />
        <meshStandardMaterial color="#b1cad7" metalness={.62} roughness={.22} transparent opacity={.75} />
      </mesh>
    </group>
  );
}

function Stars() {
  const positions = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 70; i++) {
      const x = Math.sin(i * 12.9898) * 4.5;
      const y = Math.cos(i * 7.347) * 3.5;
      const z = -1.6 - Math.abs(Math.sin(i * 3.517) * 2);
      pts.push(x, y, z);
    }
    return new Float32Array(pts);
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, positions.length / 3, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#82b2ca" size={.027} transparent opacity={.58} sizeAttenuation />
    </points>
  );
}

function Network({ selected, onSelect, reducedMotion }) {
  const group = useRef();
  const connectors = useMemo(() => ECOSYSTEM_NODES.map(n => {
    const p = new THREE.Vector3(...n.position);
    const middle = p.clone().multiplyScalar(.5).add(new THREE.Vector3(0, .13, -.45));
    return new THREE.QuadraticBezierCurve3(new THREE.Vector3(0,0,0), middle, p).getPoints(28).map(v => v.toArray());
  }), []);

  useFrame(({ clock, pointer }) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * .12 + Math.sin(clock.elapsedTime * .13) * .13, .012);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * .09 + Math.sin(clock.elapsedTime * .17) * .035, .012);
    group.current.position.y = Math.sin(clock.elapsedTime * .54) * .055;
  });

  return (
    <group ref={group} scale={.88}>
      <Stars />
      <GlassCore />
      {connectors.map((path,i) => <Line key={i} points={path} color="#81aabe" lineWidth={1.3} transparent opacity={selected === ECOSYSTEM_NODES[i].id ? .95 : .45} />)}
      {ECOSYSTEM_NODES.map((node) => <FloatingOrb key={node.id} position={node.position} radius={selected === node.id ? .47 : .39} color={node.color} active={selected === node.id} onClick={(e) => {e.stopPropagation(); onSelect(node.id);}} />)}
      <pointLight position={[0, 2, 4]} intensity={56} color="#fff" />
    </group>
  );
}

export default function GlassEcosystem({ compact = false }) {
  const [selected, setSelected] = useState('students');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener?.('change', update);
    try {
      const el = document.createElement('canvas');
      setSupported(Boolean(el.getContext('webgl2') || el.getContext('webgl')));
    } catch { setSupported(false); }
    return () => media.removeEventListener?.('change', update);
  }, []);

  const active = ECOSYSTEM_NODES.find(x => x.id === selected) || ECOSYSTEM_NODES[0];

  return (
    <div className={'ecosystem '+(compact ? 'ecosystem--compact' : '')} aria-label="Interactive 3D academic ecosystem">
      <div className="ecosystem__orbital" aria-hidden="true" />
      <div className="ecosystem__axis ecosystem__axis--x" aria-hidden="true" />
      <div className="ecosystem__axis ecosystem__axis--y" aria-hidden="true" />
      {supported ? (
        <div className="ecosystem__canvas">
          <Canvas dpr={[1,1.6]} camera={{position:[0, 0, 8.6], fov:46}} gl={{alpha:true, antialias:true, powerPreference:'low-power'}} fallback={<div className="ecosystem__fallback">Explore the academic ecosystem below.</div>}>
            <color attach="background" args={['#f1f6f6']} />
            <ambientLight intensity={2.8} />
            <hemisphereLight args={['#ffffff','#88aabf',3]} />
            <directionalLight position={[3,5,6]} intensity={4.5} color="#ffffff" />
            <directionalLight position={[-3,-2,3]} intensity={3} color="#92c6dc" />
            <Suspense fallback={null}>
              <Network selected={selected} onSelect={setSelected} reducedMotion={reducedMotion} />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={.05} minPolarAngle={Math.PI*.31} maxPolarAngle={Math.PI*.69} />
          </Canvas>
        </div>
      ) : <div className="ecosystem__static" aria-hidden="true"><span className="ecosystem__static-center">IMPACT</span>{ECOSYSTEM_NODES.map(n=><span key={n.id} className={'ecosystem__static-node ecosystem__static-node--'+n.id}/>)}</div>}
      <span className="ecosystem__serial">ECOSYSTEM / 001</span>
      <div className="ecosystem__topline"><span className="live-dot" /> A LIVING SYSTEM OF CONNECTIONS</div>
      <div className="ecosystem__info" aria-live="polite">
        <div className="ecosystem__info-index">0{ECOSYSTEM_NODES.findIndex(n=>n.id===selected)+1} / 04</div>
        <div><strong>{active.name}</strong><p>{active.detail}</p></div>
        <ArrowUpRight size={17} strokeWidth={1.5}/>
      </div>
      <div className="ecosystem__toolbar">
        <span><MousePointer2 size={13}/> DRAG TO EXPLORE</span>
        <button onClick={()=>setSelected('students')} aria-label="Reset ecosystem selection"><RotateCcw size={14} /></button>
      </div>
      <div className="ecosystem__selectors" aria-label="Select academic ecosystem pillar">
        {ECOSYSTEM_NODES.map((node,i)=><button key={node.id} className={node.id===selected?'is-active':''} onClick={()=>setSelected(node.id)} aria-pressed={node.id===selected}><span>0{i+1}</span> {node.name}</button>)}
      </div>
    </div>
  );
}
