import{M as C}from"./index-DsvnoTdG.js";function N(a){const n=a.map(t=>typeof t=="string"?t:t.label).filter(Boolean).slice(0,C),g=Math.ceil(n.length/2),p=g>=4?.2:.16,l=g>=4?.11:.18;return n.map((t,r)=>{const s=r===n.length-1&&n.length%2;return{label:t,x:n.length===1||s?0:r%2?.17:-.17,y:n.length===1?.02:p-Math.floor(r/2)*l,width:.32,height:.092,angle:r%2?-.035:.035}})}function O(a,n,g){const p=g.map(t=>({...t,halfX:(Math.abs(Math.cos(t.angle))*t.width+Math.abs(Math.sin(t.angle))*t.height)/2+.002,halfY:(Math.abs(Math.cos(t.angle))*t.height+Math.abs(Math.sin(t.angle))*t.width)/2+.002})),l=p.map(()=>-1/0);for(let t=0;t<a.length;t+=3){const r=a[t],s=a[t+1],c=a[t+2],u=n[0]*r+n[4]*s+n[8]*c+n[12],v=n[1]*r+n[5]*s+n[9]*c+n[13],m=n[2]*r+n[6]*s+n[10]*c+n[14];for(let i=0;i<p.length;i++){const f=p[i];Math.abs(u-f.x)<=f.halfX&&Math.abs(v-f.y)<=f.halfY&&(l[i]=Math.max(l[i],m))}}return l}async function L(a,n,g,p){n.updateMatrixWorld(!0);const l=n.getObjectByProperty("isMesh",!0);if(!l)return;l.geometry.computeBoundingBox();const t=l.geometry.boundingBox,r=t.getSize(new a.Vector3),s=t.getCenter(new a.Vector3),c=l.material.clone();c.envMapIntensity=.8;const u=await new a.TextureLoader().loadAsync("/LABELED-LESS/assets/paper-label-texture.png");u.colorSpace=a.SRGBColorSpace,u.anisotropy=16,c.userData.plasterTexture=u,c.onBeforeCompile=e=>{e.uniforms.plasterExpansion={value:.86+Math.max(0,Math.min(96,p))/96*.25},e.uniforms.plasterTexture={value:u},e.uniforms.appleOrigin={value:new a.Vector3(s.x,t.min.y+r.y*.4,s.z)},e.uniforms.appleScale={value:new a.Vector3(r.x*.5,r.y*.4,r.z*.5)},e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
varying vec3 personalPosition;
varying vec3 smoothPlasterNormal;
uniform vec3 appleOrigin;
uniform vec3 appleScale;`),e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
personalPosition = position;
smoothPlasterNormal = normalize(normalMatrix * ((position-appleOrigin)/(appleScale*appleScale)));`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
      varying vec3 personalPosition;
      varying vec3 smoothPlasterNormal;
      uniform sampler2D plasterTexture;
      uniform vec3 appleOrigin;
      uniform vec3 appleScale;
      uniform float plasterExpansion;
      float personalPlaster;
      float plasterPatch(vec2 p, vec2 center, vec2 radius) {
        vec2 q = (p-center)/(radius*plasterExpansion);
        float edge = pow(pow(abs(q.x),3.0)+pow(abs(q.y),3.0),1.0/3.0) + .035*sin(p.x*15.0+p.y*9.0)*sin(p.y*13.0-p.x*7.0);
        return 1.0-smoothstep(.985,1.015,edge);
      }
    `),e.fragmentShader=e.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
      vec3 p = (personalPosition-appleOrigin)/appleScale;
      float upper = plasterPatch(p.xy, vec2(-.43,.46), vec2(.55,.45));
      float lower = plasterPatch(p.xy, vec2(.37,-.42), vec2(.58,.52));
      float base = plasterPatch(p.xy, vec2(-.56,-.66), vec2(.35,.28));
      personalPlaster = max(upper,max(lower,base)) * (1.0-smoothstep(.95,1.04,p.y));
      float grain = sin(p.x*397.0+p.y*71.0)*sin(p.z*281.0-p.y*431.0);
      vec2 stoneUv=vec2(.10,.55)+(1.0-abs(mod(p.xy*2.3,2.0)-1.0))*vec2(.32,.34);
      float stone=dot(texture2D(plasterTexture,stoneUv).rgb,vec3(.3333));
      vec3 chalk = vec3(.43,.407,.365) * (.72+stone*.65+grain*.012);
      diffuseColor.rgb = mix(diffuseColor.rgb, chalk, personalPlaster);
    `),e.fragmentShader=e.fragmentShader.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
normal = normalize(mix(normal,normalize(smoothPlasterNormal),personalPlaster));`),e.fragmentShader=e.fragmentShader.replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor = mix(.2,.94,personalPlaster);`),e.fragmentShader=e.fragmentShader.replace("#include <metalnessmap_fragment>",`#include <metalnessmap_fragment>
metalnessFactor = mix(.16,.0,personalPlaster);`)},l.material=c;const v=new a.Box3().setFromObject(n),m=v.getSize(new a.Vector3),i=v.getCenter(new a.Vector3),f=N(g).map(e=>({...e,x:i.x+e.x*m.x,y:i.y+e.y*m.y,width:m.x*e.width,height:m.y*e.height})),M=O(l.geometry.attributes.position.array,l.matrixWorld.elements,f);for(const[e,h]of f.entries()){const{x:P,y:z,width:B,height:_}=h,w=M[e];if(!Number.isFinite(w))continue;const y=document.createElement("canvas");y.width=2048,y.height=640;const o=y.getContext("2d");o.scale(2,2),o.fillStyle="#eeeae2",o.beginPath(),o.moveTo(18,15),o.lineTo(1006,10),o.lineTo(1015,301),o.lineTo(12,309),o.closePath(),o.fill();for(let x=0;x<1900;x++)o.fillStyle=x%2?"#81786b12":"#ffffff45",o.fillRect(20+x*137%982,20+x*79%280,1.4,1.4);o.fillStyle="#171410",o.textAlign="center",o.textBaseline="middle";let d=174;for(o.font=`500 ${d}px 'Times New Roman',serif`;o.measureText(h.label).width>870&&d>56;)d-=2,o.font=`500 ${d}px 'Times New Roman',serif`;o.fillText(h.label,512,164);const b=new a.CanvasTexture(y);b.colorSpace=a.SRGBColorSpace,b.anisotropy=16;const S=new a.Mesh(new a.PlaneGeometry(B,_),new a.MeshBasicMaterial({map:b,transparent:!0,alphaTest:.05,depthWrite:!0,toneMapped:!1}));S.position.set(P,z,w+m.z*.012),S.rotation.z=h.angle,S.userData.userLabel=h.label,n.parent.add(S)}}export{L as personalizeApple};
