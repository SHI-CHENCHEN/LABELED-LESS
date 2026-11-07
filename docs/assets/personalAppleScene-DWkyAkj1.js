const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/DecalGeometry-f5ZMOeoa.js","assets/three.module-BT1pP-6r.js"])))=>i.map(i=>d[i]);
import{_ as z}from"./index-B9NUGE-b.js";async function j(o,s,c,y){const{DecalGeometry:S}=await z(async()=>{const{DecalGeometry:e}=await import("./DecalGeometry-f5ZMOeoa.js");return{DecalGeometry:e}},__vite__mapDeps([0,1]));s.updateMatrixWorld(!0);const n=s.getObjectByProperty("isMesh",!0);if(!n)return;const a=n.material.clone();a.roughness=.85,a.metalness=.4,a.envMapIntensity=1.6,a.normalMap=null;const m=new o.Box3().setFromObject(s),r=m.getSize(new o.Vector3),u=m.getCenter(new o.Vector3);a.onBeforeCompile=e=>{e.uniforms.userCoverage={value:Math.max(.25,Math.min(.95,.25+y/130))},e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
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
      float nearest = 20.0; float selected = 0.0;
      for (int x=-1;x<=1;x++) for(int y=-1;y<=1;y++) for(int z=-1;z<=1;z++) {
        vec3 offset = vec3(float(x),float(y),float(z));
        vec3 id = cell + offset;
        vec3 seed = vec3(cellHash(id),cellHash(id+19.0),cellHash(id+43.0));
        float d = length(offset + .2 + seed*.6 - local);
        if(d < nearest) { nearest=d; selected=cellHash(id+71.0); }
      }
      vec3 averageInk = vec3(0.0);
      for(int i=-1;i<=1;i++) for(int j=-1;j<=1;j++) {
        averageInk += texture2D(map, vMapUv + vec2(float(i),float(j))*.012).rgb / 9.0;
      }
      float sourcePlaster = smoothstep(.32,.63,min(averageInk.g,averageInk.b)/max(.001,averageInk.r)) * smoothstep(.045,.20,averageInk.r);
      float cleanSurface = smoothstep(.40,.66,min(diffuseColor.g,diffuseColor.b)/max(.001,diffuseColor.r)) * smoothstep(.035,.16,max(diffuseColor.g,diffuseColor.b));
      sourcePlaster = max(sourcePlaster,cleanSurface);
      float addedPlaster = step(selected, max(0.0,userCoverage-.55));
      // Continuous plaster: never cut red procedural cell seams into white areas.
      float plaster = max(sourcePlaster,addedPlaster);
      plaster *= 1.0 - smoothstep(.83,.95,personalPosition.y);
      personalPlaster = plaster;
      float grain = cellHash(floor(personalPosition*1600.0));
      float sourceRed = smoothstep(1.3,2.5,diffuseColor.r/max(.003,diffuseColor.g));
      vec3 redGlass = mix(vec3(.24,.001,.006),diffuseColor.rgb,sourceRed);
      vec3 chalk = vec3(.35,.32,.28) * (.78 + grain*.30);
      diffuseColor.rgb = mix(redGlass, chalk, plaster);
    `),e.fragmentShader=e.fragmentShader.replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor = mix(.13,.94,personalPlaster);`),e.fragmentShader=e.fragmentShader.replace("#include <metalnessmap_fragment>",`#include <metalnessmap_fragment>
metalnessFactor = mix(.42,.015,personalPlaster);`)},n.material=a;const g=[[-.07,.08],[.17,.2],[-.2,.2],[.21,-.03],[-.19,-.13],[.1,-.23],[-.07,.31],[0,-.32],[-.29,-.02],[.3,.1]],v=new o.Raycaster;for(let e=0;e<c.length&&e<g.length;e++){const d=typeof c[e]=="string"?c[e]:c[e].label;if(!d)continue;const[P,w]=g[e];v.set(new o.Vector3(u.x+P*r.x,u.y+w*r.y,m.max.z+r.z),new o.Vector3(0,0,-1));const x=v.intersectObject(n)[0];if(!x)continue;const C=new o.Euler(0,0,e%2?-.06:.07),i=document.createElement("canvas");i.width=1024,i.height=352;const t=i.getContext("2d");t.scale(2,2),t.fillStyle="#e9e5dc",t.beginPath(),t.moveTo(12,15),t.lineTo(490,7),t.lineTo(506,151),t.lineTo(19,169),t.closePath(),t.fill();for(let l=0;l<2400;l++){const _=l*137%512,b=l*79%176;t.fillStyle=l%2?"#857f7420":"#ffffff60",t.fillRect(_,b,1.5,1.5)}t.fillStyle="#151312",t.textAlign="center",t.textBaseline="middle";let f=86;for(t.font=`500 ${f}px 'Times New Roman',serif`;t.measureText(d).width>450&&f>34;)f-=2,t.font=`500 ${f}px 'Times New Roman',serif`;t.fillText(d,256,87,466);const p=new o.CanvasTexture(i);p.colorSpace=o.SRGBColorSpace,p.anisotropy=16;const h=new o.Mesh(new S(n,x.point,C,new o.Vector3(r.x*.29,r.y*.09,r.z*.22)),new o.MeshBasicMaterial({map:p,transparent:!0,depthWrite:!1,side:o.DoubleSide,polygonOffset:!0,polygonOffsetFactor:-8}));h.renderOrder=3,s.parent.add(h)}}export{j as personalizeApple};
