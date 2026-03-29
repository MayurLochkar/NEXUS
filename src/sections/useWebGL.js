/**
 * useWebGL.js — Shared Three.js scene builder
 * Used by: Hero, About, Tracks, Timeline, Prizes, FAQ, Contact
 *
 * Each section gets: perspective grid, drifting particles (cyan+red),
 * floating hexagons, neon energy lines — with mouse parallax.
 */
import { useEffect } from 'react';
import * as THREE from 'three';

export default function useWebGL(canvasRef, options = {}) {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    const {
        particleCount = isMobile ? 400 : 900,
        hexCount = isMobile ? 5 : 10,
        lineCount = isMobile ? 8 : 16,
        particleColor = 0x00f0ff,
        accentColor = 0xff003c,
    } = options;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let renderer = null;
        let animId = null;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, canvas.offsetWidth / canvas.offsetHeight || 1, 0.1, 500);
        camera.position.set(0, 0, 28);

        // ── Grid ──
        const gLines = [];
        const GS = 70, STEP = 5, GOFF = 36;
        for (let x = -GS; x <= GS; x += STEP) gLines.push(x, -GOFF, -GS, x, -GOFF, GS);
        for (let z = -GS; z <= GS; z += STEP) gLines.push(-GS, -GOFF, z, GS, -GOFF, z);
        const gridGeo = new THREE.BufferGeometry();
        gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(gLines, 3));
        const gridMat = new THREE.LineBasicMaterial({ color: particleColor, transparent: true, opacity: 0.1 });
        scene.add(new THREE.LineSegments(gridGeo, gridMat));

        // ── Particles A ──
        const pPos = new Float32Array(particleCount * 3);
        const pVel = [];
        for (let i = 0; i < particleCount; i++) {
            pPos[i * 3] = (Math.random() - 0.5) * 100;
            pPos[i * 3 + 1] = (Math.random() - 0.5) * 70;
            pPos[i * 3 + 2] = (Math.random() - 0.5) * 70;
            pVel.push({ x: (Math.random() - 0.5) * 0.018, y: (Math.random() - 0.5) * 0.014, z: (Math.random() - 0.5) * 0.009 });
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pMesh = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: particleColor, size: isMobile ? 0.3 : 0.2, transparent: true, opacity: 0.55, sizeAttenuation: true }));
        scene.add(pMesh);

        // ── Particles B (accent) ──
        const p2Count = Math.floor(particleCount * 0.35);
        const p2Pos = new Float32Array(p2Count * 3);
        for (let i = 0; i < p2Count; i++) {
            p2Pos[i * 3] = (Math.random() - 0.5) * 90;
            p2Pos[i * 3 + 1] = (Math.random() - 0.5) * 55;
            p2Pos[i * 3 + 2] = (Math.random() - 0.5) * 55;
        }
        const p2Geo = new THREE.BufferGeometry();
        p2Geo.setAttribute('position', new THREE.BufferAttribute(p2Pos, 3));
        const pMesh2 = new THREE.Points(p2Geo, new THREE.PointsMaterial({ color: accentColor, size: isMobile ? 0.24 : 0.16, transparent: true, opacity: 0.3, sizeAttenuation: true }));
        scene.add(pMesh2);

        // ── Hex rings ──
        const hexMeshes = [];
        const hColors = [0x00f0ff, 0xff003c, 0xffe600, 0x7b2fbe];
        for (let i = 0; i < hexCount; i++) {
            const r = Math.random() * 3 + 1.2;
            const shape = new THREE.Shape();
            for (let s = 0; s < 6; s++) {
                const a = (Math.PI / 3) * s;
                s === 0 ? shape.moveTo(Math.cos(a) * r, Math.sin(a) * r) : shape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
            }
            shape.closePath();
            const hGeo = new THREE.BufferGeometry().setFromPoints(shape.getPoints(6));
            const hMat = new THREE.LineBasicMaterial({ color: hColors[i % 4], transparent: true, opacity: 0.14 + Math.random() * 0.16 });
            const hex = new THREE.LineLoop(hGeo, hMat);
            hex.position.set((Math.random() - 0.5) * 70, (Math.random() - 0.5) * 45, (Math.random() - 0.5) * 28 - 8);
            hex.rotation.z = Math.random() * Math.PI;
            hex.userData = { rs: (Math.random() - 0.5) * 0.004, fs: Math.random() * 0.8 + 0.4, fa: Math.random() * 1.8 + 0.6, by: hex.position.y };
            scene.add(hex);
            hexMeshes.push(hex);
        }

        // ── Energy lines ──
        for (let i = 0; i < lineCount; i++) {
            const c = hColors[Math.floor(Math.random() * 4)];
            const pts = [
                new THREE.Vector3((Math.random() - 0.5) * 70, (Math.random() - 0.5) * 38, -18),
                new THREE.Vector3((Math.random() - 0.5) * 70, (Math.random() - 0.5) * 38, -18),
            ];
            const lg = new THREE.BufferGeometry().setFromPoints(pts);
            scene.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: Math.random() * 0.22 + 0.04 })));
        }

        // ── Mouse / scroll ──
        let mx = 0, my = 0, sy = 0;
        const onMM = (e) => { mx = (e.clientX / window.innerWidth - 0.5) * 2; my = -(e.clientY / window.innerHeight - 0.5) * 2; };
        const onSc = () => { sy = window.scrollY; };

        let t = 0;
        
        const initRenderer = () => {
            if (renderer) return;
            // Provide context limit guard: no antialiasing on mobile to speed things up
            renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isMobile });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
            renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
            
            window.addEventListener('mousemove', onMM);
            window.addEventListener('scroll', onSc);
            
            const tick = () => {
                animId = requestAnimationFrame(tick);
                t += 0.007;

                camera.position.x += (mx * 2.5 - camera.position.x) * 0.04;
                camera.position.y += (my * 1.8 - camera.position.y) * 0.04;
                camera.position.z = 28 - sy * 0.015;
                camera.lookAt(0, 0, 0);

                const pp = pGeo.attributes.position.array;
                for (let i = 0; i < particleCount; i++) {
                    pp[i * 3] += pVel[i].x; pp[i * 3 + 1] += pVel[i].y; pp[i * 3 + 2] += pVel[i].z;
                    if (Math.abs(pp[i * 3]) > 52) pVel[i].x *= -1;
                    if (Math.abs(pp[i * 3 + 1]) > 36) pVel[i].y *= -1;
                    if (Math.abs(pp[i * 3 + 2]) > 36) pVel[i].z *= -1;
                }
                pGeo.attributes.position.needsUpdate = true;
                pMesh.rotation.y = t * 0.035;
                pMesh2.rotation.y = -t * 0.025;
                pMesh2.rotation.x = t * 0.012;
                gridMat.opacity = 0.07 + Math.sin(t) * 0.035;

                hexMeshes.forEach(h => {
                    h.rotation.z += h.userData.rs;
                    h.position.y = h.userData.by + Math.sin(t * h.userData.fs) * h.userData.fa;
                });

                renderer.render(scene, camera);
            };
            tick();
        }

        const destroyRenderer = () => {
            if (!renderer) return;
            cancelAnimationFrame(animId);
            renderer.dispose();
            renderer.getContext()?.getExtension('WEBGL_lose_context')?.loseContext();
            renderer = null;
            window.removeEventListener('mousemove', onMM);
            window.removeEventListener('scroll', onSc);
        }

        // Initialize intersection observer
        let intersectionTimeout;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    clearTimeout(intersectionTimeout);
                    initRenderer();
                } else {
                    // Slight delay before destroying context to prevent flutter during scrolls
                    intersectionTimeout = setTimeout(() => {
                        destroyRenderer();
                    }, 500);
                }
            });
        }, { threshold: 0.01 });

        observer.observe(canvas);

        const onResize = () => {
            if(renderer) {
                renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
                camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
                camera.updateProjectionMatrix();
            }
        };
        window.addEventListener('resize', onResize);

        return () => {
            observer.disconnect();
            clearTimeout(intersectionTimeout);
            destroyRenderer();
            window.removeEventListener('resize', onResize);
            
            // Clean up Geometries/Materials
            gridGeo.dispose(); gridMat.dispose();
            pGeo.dispose(); pMesh.material.dispose();
            p2Geo.dispose(); pMesh2.material.dispose();
            hexMeshes.forEach(h => { h.geometry.dispose(); h.material.dispose(); });
        };
    }, [canvasRef, isMobile, particleCount, hexCount, lineCount, particleColor, accentColor]);
}