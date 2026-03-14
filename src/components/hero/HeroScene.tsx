"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DataNodes() {
    const groupRef = useRef<THREE.Group>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    const { nodes, edges } = useMemo(() => {
        const nodeCount = 60;
        const nodePositions: THREE.Vector3[] = [];
        for (let i = 0; i < nodeCount; i++) {
            nodePositions.push(
                new THREE.Vector3(
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 8,
                    (Math.random() - 0.5) * 6
                )
            );
        }

        const edgePairs: [number, number][] = [];
        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                const dist = nodePositions[i].distanceTo(nodePositions[j]);
                if (dist < 2.5) {
                    edgePairs.push([i, j]);
                }
            }
        }

        return { nodes: nodePositions, edges: edgePairs };
    }, []);

    // Mouse tracking
    if (typeof window !== "undefined") {
        window.addEventListener("mousemove", (e) => {
            mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
        });
    }

    useFrame(({ clock }) => {
        if (groupRef.current) {
            const t = clock.getElapsedTime();
            groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.15 + mouseRef.current.x * 0.08;
            groupRef.current.rotation.x = Math.cos(t * 0.08) * 0.1 + mouseRef.current.y * 0.05;
        }
    });

    const edgeGeometry = useMemo(() => {
        const positions: number[] = [];
        edges.forEach(([a, b]) => {
            positions.push(nodes[a].x, nodes[a].y, nodes[a].z);
            positions.push(nodes[b].x, nodes[b].y, nodes[b].z);
        });
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        return geo;
    }, [nodes, edges]);

    return (
        <group ref={groupRef}>
            {/* Edges */}
            <lineSegments geometry={edgeGeometry}>
                <lineBasicMaterial color="#1e3f6e" transparent opacity={0.25} />
            </lineSegments>

            {/* Nodes */}
            {nodes.map((pos, i) => {
                const isHighlight = i % 7 === 0;
                return (
                    <mesh key={i} position={pos}>
                        <sphereGeometry args={[isHighlight ? 0.06 : 0.035, 16, 16]} />
                        <meshBasicMaterial
                            color={isHighlight ? "#c9a84c" : "#4a7fd4"}
                            transparent
                            opacity={isHighlight ? 0.9 : 0.6}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 50 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
            >
                <ambientLight intensity={0.3} />
                <DataNodes />
            </Canvas>

            {/* Radial gradient overlay for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-navy-900)_80%)]" />
        </div>
    );
}
