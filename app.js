import * as THREE from "three";

import {
  OrbitControls
} from "three/addons/controls/OrbitControls.js";


/* =========================================================
   HUGO — AI-SRE 3D RUNTIME
========================================================= */


/* =========================================================
   BASIC SETUP
========================================================= */

const canvas =
  document.getElementById("scene");


const scene =
  new THREE.Scene();


scene.background =
  new THREE.Color(0x02040a);


scene.fog =
  new THREE.FogExp2(
    0x02040a,
    0.018
  );


const camera =
  new THREE.PerspectiveCamera(
    55,
    window.innerWidth /
      window.innerHeight,
    0.1,
    1000
  );


camera.position.set(
  22,
  16,
  27
);


const renderer =
  new THREE.WebGLRenderer({

    canvas,

    antialias: true,

    powerPreference:
      "high-performance"

  });


renderer.setSize(
  window.innerWidth,
  window.innerHeight
);


renderer.setPixelRatio(
  Math.min(
    window.devicePixelRatio,
    1.5
  )
);


renderer.outputColorSpace =
  THREE.SRGBColorSpace;


/* =========================================================
   ORBIT CONTROLS
========================================================= */

const controls =
  new OrbitControls(
    camera,
    renderer.domElement
  );


controls.enableDamping =
  true;


controls.dampingFactor =
  0.06;


controls.minDistance =
  8;


controls.maxDistance =
  65;


controls.target.set(
  0,
  3,
  0
);


/* =========================================================
   LIGHTING
========================================================= */

const ambient =
  new THREE.AmbientLight(
    0x8ab6d6,
    1.2
  );


scene.add(
  ambient
);


const mainLight =
  new THREE.PointLight(
    0x00eaff,
    55,
    60
  );


mainLight.position.set(
  0,
  12,
  4
);


scene.add(
  mainLight
);


const purpleLight =
  new THREE.PointLight(
    0x8b5cff,
    35,
    45
  );


purpleLight.position.set(
  -15,
  7,
  -10
);


scene.add(
  purpleLight
);


const greenLight =
  new THREE.PointLight(
    0x00ffae,
    30,
    40
  );


greenLight.position.set(
  14,
  6,
  10
);


scene.add(
  greenLight
);


/* =========================================================
   GRID
========================================================= */

const grid =
  new THREE.GridHelper(
    60,
    40,
    0x123b52,
    0x09202d
  );


grid.position.y =
  -2;


scene.add(
  grid
);


/* =========================================================
   BACKGROUND PARTICLES
========================================================= */

const particleCount =
  900;


const particlePositions =
  new Float32Array(
    particleCount * 3
  );


for (
  let i = 0;
  i < particleCount;
  i++
) {

  particlePositions[i * 3] =
    (Math.random() - 0.5) * 80;

  particlePositions[i * 3 + 1] =
    (Math.random() - 0.5) * 50;

  particlePositions[i * 3 + 2] =
    (Math.random() - 0.5) * 80;

}


const particleGeometry =
  new THREE.BufferGeometry();


particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(
    particlePositions,
    3
  )
);


const particleMaterial =
  new THREE.PointsMaterial({

    color: 0x278aa4,

    size: 0.035,

    transparent: true,

    opacity: 0.55

  });


const backgroundParticles =
  new THREE.Points(
    particleGeometry,
    particleMaterial
  );


scene.add(
  backgroundParticles
);


/* =========================================================
   NODE DATA
========================================================= */

const nodes = [

  {
    id: "telemetry",
    name: "Telemetry",
    type: "OBSERVABILITY",
    position: [-11, 5, 0],
    color: 0x00eaff,
    description:
      "Collects infrastructure metrics, logs, traces and signal information.",
    stat:
      "12.8K events/sec"
  },

  {
    id: "topology",
    name: "Infrastructure Topology",
    type: "GRAPH MODEL",
    position: [-8, 0, -6],
    color: 0x00cfff,
    description:
      "Represents services, dependencies, nodes and infrastructure relationships.",
    stat:
      "438 relationships"
  },

  {
    id: "rag",
    name: "RAG Knowledge",
    type: "RETRIEVAL",
    position: [-3, 5, -5],
    color: 0x8b5cff,
    description:
      "Retrieves runbooks, SOPs, architecture documents and previous incidents.",
    stat:
      "Vector search: 24 ms"
  },

  {
    id: "reasoning",
    name: "AI Reasoning",
    type: "LLM ENGINE",
    position: [2, 7, 0],
    color: 0x9b7cff,
    description:
      "Combines telemetry, topology and retrieved evidence to form an incident diagnosis.",
    stat:
      "Confidence: 94%"
  },

  {
    id: "xai",
    name: "Explainable AI",
    type: "XAI",
    position: [6, 3, -5],
    color: 0xffc857,
    description:
      "Produces evidence-backed explanations and contributing factors for the diagnosis.",
    stat:
      "Evidence: 7 signals"
  },

  {
    id: "policy",
    name: "Policy Engine",
    type: "GUARDRAILS",
    position: [8, 1, 1],
    color: 0xff8b4d,
    description:
      "Checks whether a proposed infrastructure action is allowed under operational policy.",
    stat:
      "Policy: PASS"
  },

  {
    id: "approval",
    name: "Human Approval",
    type: "HITL",
    position: [7, 6, 6],
    color: 0x00ffae,
    description:
      "Requires human authorization before sensitive infrastructure-changing actions.",
    stat:
      "Approval required"
  },

  {
    id: "mcp",
    name: "HUGO MCP",
    type: "CONTROL INTERFACE",
    position: [1, 1, 7],
    color: 0x00eaff,
    description:
      "HUGO's own MCP interface exposes controlled tools for infrastructure actions.",
    stat:
      "8 tools available"
  },

  {
    id: "database",
    name: "Database",
    type: "DATA LAYER",
    position: [-8, -1, 7],
    color: 0x4287ff,
    description:
      "Stores operational metadata and structured platform state.",
    stat:
      "PostgreSQL"
  },

  {
    id: "graph",
    name: "Neo4j Graph",
    type: "TOPOLOGY STORE",
    position: [-1, -1, 10],
    color: 0x00d4a0,
    description:
      "Stores infrastructure relationships and dependency topology.",
    stat:
      "Neo4j"
  },

  {
    id: "service",
    name: "Infrastructure",
    type: "TARGET SYSTEM",
    position: [11, -2, 7],
    color: 0xff4f6d,
    description:
      "Target infrastructure controlled through approved HUGO actions.",
    stat:
      "Healthy"
  }

];


/* =========================================================
   NODE GROUPS
========================================================= */

const nodeObjects =
  new Map();


const nodeMeshes =
  [];


/* =========================================================
   CREATE GLOW SPRITE
========================================================= */

function createGlow(
  color,
  size = 2.5
) {

  const canvas =
    document.createElement(
      "canvas"
    );


  canvas.width = 128;
  canvas.height = 128;


  const context =
    canvas.getContext(
      "2d"
    );


  const gradient =
    context.createRadialGradient(
      64,
      64,
      0,
      64,
      64,
      64
    );


  const c =
    new THREE.Color(
      color
    );


  gradient.addColorStop(
    0,
    `rgba(${c.r * 255},${c.g * 255},${c.b * 255},0.8)`
  );


  gradient.addColorStop(
    0.25,
    `rgba(${c.r * 255},${c.g * 255},${c.b * 255},0.35)`
  );


  gradient.addColorStop(
    1,
    `rgba(${c.r * 255},${c.g * 255},${c.b * 255},0)`
  );


  context.fillStyle =
    gradient;


  context.fillRect(
    0,
    0,
    128,
    128
  );


  const texture =
    new THREE.CanvasTexture(
      canvas
    );


  const material =
    new THREE.SpriteMaterial({

      map: texture,

      transparent: true,

      depthWrite: false,

      blending:
        THREE.AdditiveBlending

    });


  const sprite =
    new THREE.Sprite(
      material
    );


  sprite.scale.set(
    size,
    size,
    1
  );


  return sprite;

}


/* =========================================================
   CREATE NODE
========================================================= */

function createNode(
  data
) {

  const group =
    new THREE.Group();


  group.position.set(
    ...data.position
  );


  group.userData =
    data;


  /* Main geometry */

  const geometry =
    new THREE.IcosahedronGeometry(
      1.15,
      2
    );


  const material =
    new THREE.MeshStandardMaterial({

      color:
        data.color,

      emissive:
        data.color,

      emissiveIntensity:
        0.75,

      metalness:
        0.7,

      roughness:
        0.25

    });


  const mesh =
    new THREE.Mesh(
      geometry,
      material
    );


  mesh.userData =
    data;


  group.add(
    mesh
  );


  /* Inner core */

  const coreGeometry =
    new THREE.IcosahedronGeometry(
      0.55,
      2
    );


  const coreMaterial =
    new THREE.MeshBasicMaterial({

      color:
        data.color,

      transparent:
        true,

      opacity:
        0.75

    });


  const core =
    new THREE.Mesh(
      coreGeometry,
      coreMaterial
    );


  group.add(
    core
  );


  /* Outer ring */

  const ringGeometry =
    new THREE.TorusGeometry(
      1.65,
      0.025,
      8,
      64
    );


  const ringMaterial =
    new THREE.MeshBasicMaterial({

      color:
        data.color,

      transparent:
        true,

      opacity:
        0.8

    });


  const ring =
    new THREE.Mesh(
      ringGeometry,
      ringMaterial
    );


  ring.rotation.x =
    Math.PI / 2;


  group.add(
    ring
  );


  /* Glow */

  const glow =
    createGlow(
      data.color,
      5
    );


  glow.position.y =
    0.2;


  group.add(
    glow
  );


  /* Label */

  const label =
    createLabel(
      data.name,
      data.color
    );


  label.position.y =
    -2.1;


  group.add(
    label
  );


  scene.add(
    group
  );


  nodeObjects.set(
    data.id,
    group
  );


  nodeMeshes.push(
    mesh
  );

}


/* =========================================================
   CREATE TEXT LABEL
========================================================= */

function createLabel(
  text,
  color
) {

  const canvas =
    document.createElement(
      "canvas"
    );


  canvas.width =
    512;


  canvas.height =
    96;


  const context =
    canvas.getContext(
      "2d"
    );


  context.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  context.font =
    "bold 24px Arial";


  context.textAlign =
    "center";


  context.fillStyle =
    "#dffaff";


  context.shadowColor =
    "#" +
    new THREE.Color(
      color
    ).getHexString();


  context.shadowBlur =
    12;


  context.fillText(
    text.toUpperCase(),
    256,
    58
  );


  const texture =
    new THREE.CanvasTexture(
      canvas
    );


  const material =
    new THREE.SpriteMaterial({

      map:
        texture,

      transparent:
        true,

      depthWrite:
        false

    });


  const sprite =
    new THREE.Sprite(
      material
    );


  sprite.scale.set(
    4.5,
    0.84,
    1
  );


  return sprite;

}


/* =========================================================
   BUILD NODES
========================================================= */

nodes.forEach(
  createNode
);


/* =========================================================
   CONNECTIONS
========================================================= */

const connections = [

  ["telemetry", "topology"],

  ["telemetry", "rag"],

  ["topology", "rag"],

  ["rag", "reasoning"],

  ["reasoning", "xai"],

  ["reasoning", "policy"],

  ["xai", "policy"],

  ["policy", "approval"],

  ["approval", "mcp"],

  ["mcp", "service"],

  ["database", "rag"],

  ["graph", "topology"],

  ["mcp", "graph"],

  ["database", "mcp"]

];


const connectionLines =
  [];


function createConnection(
  fromId,
  toId
) {

  const from =
    nodeObjects.get(
      fromId
    ).position;


  const to =
    nodeObjects.get(
      toId
    ).position;


  const points = [
    from.clone(),
    to.clone()
  ];


  const geometry =
    new THREE.BufferGeometry()
      .setFromPoints(
        points
      );


  const material =
    new THREE.LineBasicMaterial({

      color:
        0x16768b,

      transparent:
        true,

      opacity:
        0.35

    });


  const line =
    new THREE.Line(
      geometry,
      material
    );


  scene.add(
    line
  );


  connectionLines.push(
    line
  );

}


connections.forEach(
  connection =>
    createConnection(
      connection[0],
      connection[1]
    )
);


/* =========================================================
   DATA FLOW PARTICLES
========================================================= */

const flowParticles =
  [];


function createFlowParticle(
  connectionIndex
) {

  const connection =
    connections[
      connectionIndex
    ];


  const from =
    nodeObjects.get(
      connection[0]
    ).position;


  const to =
    nodeObjects.get(
      connection[1]
    ).position;


  const geometry =
    new THREE.SphereGeometry(
      0.09,
      8,
      8
    );


  const material =
    new THREE.MeshBasicMaterial({

      color:
        0x00eaff

    });


  const particle =
    new THREE.Mesh(
      geometry,
      material
    );


  particle.userData = {

    from:
      from.clone(),

    to:
      to.clone(),

    progress:
      Math.random(),

    speed:
      0.002 +
      Math.random() * 0.003

  };


  scene.add(
    particle
  );


  flowParticles.push(
    particle
  );

}


for (
  let i = 0;
  i < connections.length;
  i++
) {

  createFlowParticle(
    i
  );

}


/* =========================================================
   HUGO CENTRAL CORE
========================================================= */

const hugoGroup =
  new THREE.Group();


hugoGroup.position.set(
  0,
  1,
  0
);


scene.add(
  hugoGroup
);


const hugoSphere =
  new THREE.Mesh(

    new THREE.IcosahedronGeometry(
      2.1,
      3
    ),

    new THREE.MeshStandardMaterial({

      color:
        0x00eaff,

      emissive:
        0x006c88,

      emissiveIntensity:
        2,

      transparent:
        true,

      opacity:
        0.85,

      metalness:
        0.7,

      roughness:
        0.15

    })

  );


hugoGroup.add(
  hugoSphere
);


/* Core rings */

for (
  let i = 0;
  i < 3;
  i++
) {

  const ring =
    new THREE.Mesh(

      new THREE.TorusGeometry(
        2.7 + i * 0.45,
        0.025,
        8,
        80
      ),

      new THREE.MeshBasicMaterial({

        color:
          i === 0
            ? 0x00eaff
            : i === 1
              ? 0x8b5cff
              : 0x00ffae,

        transparent:
          true,

        opacity:
          0.75

      })

    );


  ring.rotation.x =
    i * 0.6;


  ring.rotation.y =
    i * 0.45;


  ring.userData.rotationSpeed =
    0.003 +
    i * 0.001;


  hugoGroup.add(
    ring
  );

}


/* HUGO glow */

hugoGroup.add(
  createGlow(
    0x00eaff,
    9
  )
);


/* HUGO label */

const hugoLabel =
  createLabel(
    "HUGO AI-SRE",
    0x00eaff
  );


hugoLabel.position.y =
  -3.7;


hugoGroup.add(
  hugoLabel
);


/* =========================================================
   RAYCASTER
========================================================= */

const raycaster =
  new THREE.Raycaster();


const mouse =
  new THREE.Vector2();


renderer.domElement.addEventListener(
  "pointerdown",
  event => {

    mouse.x =
      (event.clientX /
        window.innerWidth) *
        2 -
      1;


    mouse.y =
      -(event.clientY /
        window.innerHeight) *
        2 +
      1;


    raycaster.setFromCamera(
      mouse,
      camera
    );


    const intersects =
      raycaster.intersectObjects(
        nodeMeshes
      );


    if (
      intersects.length > 0
    ) {

      const data =
        intersects[0]
          .object
          .userData;


      showInspector(
        data
      );


      playClick();

    }

  }
);


/* =========================================================
   INSPECTOR
========================================================= */

function showInspector(
  data
) {

  const content =
    document.getElementById(
      "inspector-content"
    );


  content.innerHTML = `

    <div class="node-name">
      ${data.name}
    </div>

    <div class="node-type">
      ${data.type}
    </div>

    <div class="node-description">
      ${data.description}
    </div>

    <div class="node-stat">

      <div class="node-stat-label">
        RUNTIME STATUS
      </div>

      <div class="node-stat-value">
        ${data.stat}
      </div>

    </div>

  `;

}


/* =========================================================
   INCIDENT SYSTEM
========================================================= */

let incidentActive =
  false;


const incidentAlert =
  document.getElementById(
    "incident-alert"
  );


const incidentMessage =
  document.getElementById(
    "incident-message"
  );


document
  .getElementById(
    "incidentBtn"
  )
  .addEventListener(
    "click",
    simulateIncident
  );


function simulateIncident() {

  incidentActive =
    true;


  incidentAlert.classList.add(
    "show"
  );


  incidentMessage.textContent =
    "High latency detected in Application Service. HUGO is analyzing telemetry and topology.";


  playAlert();


  /* Change infrastructure node */

  const service =
    nodeObjects.get(
      "service"
    );


  if (service) {

    service.userData.incident =
      true;

    service.children[0]
      .material.color.setHex(
        0xff3030
      );

    service.children[0]
      .material.emissive.setHex(
        0xff2020
      );

  }


  setTimeout(
    () => {

      incidentMessage.textContent =
        "RAG retrieved a matching runbook. AI diagnosis generated with 94% confidence.";

    },
    1800
  );


  setTimeout(
    () => {

      incidentMessage.textContent =
        "Policy engine requires human approval before remediation.";

    },
    3800
  );

}


/* =========================================================
   APPROVAL
========================================================= */

document
  .getElementById(
    "approveBtn"
  )
  .addEventListener(
    "click",
    approveAction
  );


function approveAction() {

  if (
    !incidentActive
  ) {

    incidentMessage.textContent =
      "No pending infrastructure action.";

    incidentAlert.classList.add(
      "show"
    );


    setTimeout(
      () =>
        incidentAlert.classList.remove(
          "show"
        ),
      1800
    );


    return;

  }


  incidentMessage.textContent =
    "Human approval received. HUGO MCP is executing the controlled remediation.";


  playSuccess();


  setTimeout(
    () => {

      const service =
        nodeObjects.get(
          "service"
        );


      if (service) {

        service.children[0]
          .material.color.setHex(
            0x00ffae
          );

        service.children[0]
          .material.emissive.setHex(
            0x006633
          );

      }


      incidentMessage.textContent =
        "Remediation completed. Infrastructure returned to healthy state.";

    },
    2200
  );


  setTimeout(
    () => {

      incidentAlert.classList.remove(
        "show"
      );

      incidentActive =
        false;

    },
    5000
  );

}


/* =========================================================
   AUDIO
========================================================= */

let audioContext =
  null;


function getAudio() {

  if (!audioContext) {

    audioContext =
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();

  }


  return audioContext;

}


function tone(
  frequency,
  duration,
  type = "sine"
) {

  const ctx =
    getAudio();


  const oscillator =
    ctx.createOscillator();


  const gain =
    ctx.createGain();


  oscillator.type =
    type;


  oscillator.frequency.value =
    frequency;


  gain.gain.setValueAtTime(
    0.0001,
    ctx.currentTime
  );


  gain.gain.exponentialRampToValueAtTime(
    0.08,
    ctx.currentTime + 0.02
  );


  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    ctx.currentTime + duration
  );


  oscillator.connect(
    gain
  );


  gain.connect(
    ctx.destination
  );


  oscillator.start();


  oscillator.stop(
    ctx.currentTime +
      duration
  );

}


function playClick() {

  tone(
    650,
    0.08,
    "sine"
  );

}


function playAlert() {

  tone(
    180,
    0.15,
    "square"
  );


  setTimeout(
    () =>
      tone(
        120,
        0.18,
        "square"
      ),
    130
  );

}


function playSuccess() {

  tone(
    600,
    0.1
  );


  setTimeout(
    () =>
      tone(
        900,
        0.12
      ),
    100
  );

}


/* =========================================================
   ANIMATION
========================================================= */

const clock =
  new THREE.Clock();


function animate() {

  requestAnimationFrame(
    animate
  );


  const elapsed =
    clock.getElapsedTime();


  /* Background */

  backgroundParticles.rotation.y =
    elapsed *
    0.008;


  /* HUGO core */

  hugoGroup.rotation.y =
    elapsed *
    0.15;


  hugoSphere.rotation.x =
    elapsed *
    0.12;


  /* HUGO rings */

  hugoGroup.children
    .forEach(
      child => {

        if (
          child.userData
            .rotationSpeed
        ) {

          child.rotation.z +=
            child.userData
              .rotationSpeed;

        }

      }
    );


  /* Nodes */

  nodeObjects.forEach(
    group => {

      const time =
        elapsed +
        group.position.x;


      group.position.y +=
        Math.sin(time * 1.2) *
        0.0015;

    }
  );


  /* Flow particles */

  flowParticles.forEach(
    particle => {

      const data =
        particle.userData;


      data.progress +=
        data.speed;


      if (
        data.progress >= 1
      ) {

        data.progress = 0;

      }


      particle.position.lerpVectors(
        data.from,
        data.to,
        data.progress
      );

    }
  );


  controls.update();


  renderer.render(
    scene,
    camera
  );

}


animate();


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );


    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        1.5
      )
    );

  }
);


/* =========================================================
   FAIL-SAFE ERROR HANDLING
========================================================= */

window.addEventListener(
  "error",
  event => {

    console.error(
      "HUGO Runtime Error:",
      event.error ||
        event.message
    );

  }
);


/* =========================================================
   LOADER
   500ms — intentionally short
========================================================= */

const loading =
  document.getElementById(
    "loading"
  );


setTimeout(
  () => {

    loading.classList.add(
      "hidden"
    );

  },
  500
);