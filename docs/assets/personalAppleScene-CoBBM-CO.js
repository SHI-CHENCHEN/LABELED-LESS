const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/DecalGeometry-f5ZMOeoa.js","assets/three.module-BT1pP-6r.js"])))=>i.map(i=>d[i]);
import{_ as C}from"./index-BqQAypG2.js";async function z(o,s,c,h){const{DecalGeometry:y}=await C(async()=>{const{DecalGeometry:e}=await import("./DecalGeometry-f5ZMOeoa.js");return{DecalGeometry:e}},__vite__mapDeps([0,1]));s.updateMatrixWorld(!0);const a=s.getObjectByProperty("isMesh",!0);if(!a)return;const n=a.material.clone();n.roughness=.85,n.metalness=.4,n.envMapIntensity=1.6,n.normalMap=null;const f=new o.Box3().setFromObject(s),r=f.getSize(new o.Vector3),p=f.getCenter(new o.Vector3);n.onBeforeCompile=e=>{e.uniforms.userCoverage={value:Math.max(.25,Math.min(.95,.25+h/130))},e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
varying vec3 personalPosition;`),e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
personalPosition = position;`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
      varying vec3 personalPosition;
      uniform float userCoverage;
      float personalPlaster;
      float cellHash(vec3 p) { return fract(sin(dot(p, vec3(127.1,311.7,74.7))) * 43758.5453); }
    `),e.fragmentShader=e.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
      vec3 p = personalPosition * 5.0;
      vec3 cell = floor(p);
      vec3 local = fract(p);
      float nearest = 20.0; float second = 20.0; float selected = 0.0;
      for (int x=-1;x<=1;x++) for(int y=-1;y<=1;y++) for(int z=-1;z<=1;z++) {
        vec3 offset = vec3(float(x),float(y),float(z));
        vec3 id = cell + offset;
        vec3 seed = vec3(cellHash(id),cellHash(id+19.0),cellHash(id+43.0));
        float d = length(offset + .2 + seed*.6 - local);
        if(d < nearest) { second=nearest; nearest=d; selected=cellHash(id+71.0); }
        else if(d < second) second=d;
      }
      vec3 averageInk = vec3(0.0);
      for(int i=-1;i<=1;i++) for(int j=-1;j<=1;j++) {
        averageInk += texture2D(map, vMapUv + vec2(float(i),float(j))*.012).rgb / 9.0;
      }
      float sourcePlaster = smoothstep(.32,.63,min(averageInk.g,averageInk.b)/max(.001,averageInk.r)) * smoothstep(.045,.20,averageInk.r);
      float addedPlaster = step(selected, max(0.0,userCoverage-.55)) * smoothstep(.03,.08,second-nearest);
      float plaster = max(sourcePlaster,addedPlaster) * smoothstep(.001,.009,second-nearest);
      plaster *= 1.0 - smoothstep(.83,.95,personalPosition.y);
      personalPlaster = plaster;
      float grain = cellHash(floor(personalPosition*1600.0));
      float sourceRed = smoothstep(1.3,2.5,diffuseColor.r/max(.003,diffuseColor.g));
      vec3 redGlass = mix(vec3(.24,.001,.006),diffuseColor.rgb,sourceRed);
      vec3 chalk = vec3(.35,.32,.28) * (.78 + grain*.30);
      diffuseColor.rgb = mix(redGlass, chalk, plaster);
    `),e.fragmentShader=e.fragmentShader.replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor = mix(.13,.94,personalPlaster);`),e.fragmentShader=e.fragmentShader.replace("#include <metalnessmap_fragment>",`#include <metalnessmap_fragment>
metalnessFactor = mix(.42,.015,personalPlaster);`)},a.material=n;const g=[[-.07,.08],[.17,.2],[-.2,.2],[.21,-.03],[-.19,-.13],[.1,-.23],[-.07,.31],[0,-.32],[-.29,-.02],[.3,.1]],u=new o.Raycaster;for(let e=0;e<c.length&&e<g.length;e++){const m=typeof c[e]=="string"?c[e]:c[e].label;if(!m)continue;const[S,P]=g[e];u.set(new o.Vector3(p.x+S*r.x,p.y+P*r.y,f.max.z+r.z),new o.Vector3(0,0,-1));const d=u.intersectObject(a)[0];if(!d)continue;d.face.normal.clone().transformDirection(a.matrixWorld);const _=new o.Euler(0,0,e%2?-.06:.07),i=document.createElement("canvas");i.width=512,i.height=176;const t=i.getContext("2d");t.fillStyle="#e9e5dc",t.beginPath(),t.moveTo(12,15),t.lineTo(490,7),t.lineTo(506,151),t.lineTo(19,169),t.closePath(),t.fill();for(let l=0;l<2400;l++){const w=l*137%512,b=l*79%176;t.fillStyle=l%2?"#857f7420":"#ffffff60",t.fillRect(w,b,1.5,1.5)}t.fillStyle="#201c1b",t.textAlign="center",t.textBaseline="middle",t.font=`${Math.min(82,650/Math.max(7,m.length))}px Georgia`,t.fillText(m,256,87,466);const v=new o.CanvasTexture(i);v.colorSpace=o.SRGBColorSpace;const x=new o.Mesh(new y(a,d.point,_,new o.Vector3(r.x*.27,r.y*.08,r.z*.22)),new o.MeshBasicMaterial({map:v,transparent:!0,depthWrite:!1,side:o.DoubleSide,polygonOffset:!0,polygonOffsetFactor:-8}));x.renderOrder=3,s.parent.add(x)}}export{z as personalizeApple};
