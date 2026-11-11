import{p as F,a as N,b as W,C as w,R as b}from"./index-67NK5ET6.js";async function B(e,m,v,o,C){const d=m.getObjectByProperty("isMesh",!0),l=d.material,u=F(v.length);let f,y;if(u&&(f=document.createElement("canvas"),[y]=await Promise.all([N(),W(f,v)]),C()))return;const t=new e.MeshBasicMaterial({map:l.map,toneMapped:!1});d.material=t;for(const r of Object.values(l))r!=null&&r.isTexture&&r!==l.map&&r.dispose();if(l.dispose(),!u)return;const i=new e.CanvasTexture(f);i.colorSpace=e.SRGBColorSpace,i.anisotropy=o.capabilities.getMaxAnisotropy();const s=new e.CanvasTexture(y);s.colorSpace=e.SRGBColorSpace,s.wrapS=s.wrapT=e.MirroredRepeatWrapping;const h=new e.Box3().setFromObject(m),c=h.getSize(new e.Vector3),M=h.getCenter(new e.Vector3),x=new e.Vector3(0,Math.sin(w),Math.cos(w)),z=Math.max(c.x,c.y,c.z)*.51*1.06*1.07/Math.sin(Math.PI*16/180),a=new e.PerspectiveCamera(32,1,.01,10);a.position.copy(x).multiplyScalar(z),a.lookAt(0,0,0),a.updateMatrixWorld();const P=new e.Matrix4().multiplyMatrices(a.projectionMatrix,a.matrixWorldInverse),p=new e.WebGLRenderTarget(1024,1024);p.depthTexture=new e.DepthTexture(1024,1024,e.UnsignedIntType);const n=new e.Scene;n.add(m.clone(!0)),n.overrideMaterial=new e.MeshBasicMaterial;const D=o.getRenderTarget();try{o.setRenderTarget(p),o.render(n,a)}finally{o.setRenderTarget(D),n.overrideMaterial.dispose(),n.clear()}const S=1160/1e3,g=1230/1128,j=new e.Vector4(S,g,(60-100*S)/b,1-g+(90*g-12)/b);t.userData.plasterTexture=i,t.userData.coverageStone=s,t.userData.referenceDepthTarget=p,t.customProgramCacheKey=()=>"personal-crystal-plaster",t.onBeforeCompile=r=>{Object.assign(r.uniforms,{plasterFront:{value:i},plasterDepth:{value:p.depthTexture},plasterStone:{value:s},plasterProjection:{value:P},plasterFrame:{value:j},plasterDirection:{value:x},plasterProgress:{value:u},crystalCenter:{value:M},crystalSize:{value:c}}),r.vertexShader=`uniform mat4 plasterProjection;
      varying vec4 plasterCoords;
      varying vec3 crystalNormal;
      varying vec3 crystalWorld;
    `+r.vertexShader,r.vertexShader=r.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
      vec4 crystalPosition = modelMatrix * vec4(position, 1.);
      crystalWorld = crystalPosition.xyz;
      crystalNormal = normalize(mat3(modelMatrix) * normal);
      plasterCoords = plasterProjection * crystalPosition;
    `),r.fragmentShader=`uniform sampler2D plasterFront;
      uniform sampler2D plasterDepth;
      uniform sampler2D plasterStone;
      uniform vec4 plasterFrame;
      uniform vec3 plasterDirection;
      uniform float plasterProgress;
      uniform vec3 crystalCenter;
      uniform vec3 crystalSize;
      varying vec4 plasterCoords;
      varying vec3 crystalNormal;
      varying vec3 crystalWorld;
      vec3 stoneGrain(vec2 uv) {
        vec2 rotated = mat2(.8,.6,-.6,.8) * uv * 1.23 + vec2(.31,.72);
        return mix(texture2D(plasterStone, uv).rgb, texture2D(plasterStone, rotated).rgb, .48);
      }
    `+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
      vec3 stoneNormal = normalize(crystalNormal);
      vec3 p = (crystalWorld - crystalCenter) / crystalSize;
      float edge = .035 * sin(p.x*95. + p.z*77.) * sin(p.y*109. - p.z*48.);
      float field = .49 + .20*sin(p.y*14. + p.x*3.1) + .18*cos(p.z*12. - p.y*6.3)
        + .13*sin(p.x*13. + p.z*5.7) + edge;
      float boundary = .99 - plasterProgress*.60;
      float coverage = smoothstep(boundary-.014, boundary+.008, field)
        * (1. - smoothstep(.19, .26, p.y));
      vec3 weights = pow(abs(stoneNormal), vec3(5.));
      weights /= weights.x + weights.y + weights.z;
      vec3 stone = stoneGrain(p.yz*7.)*weights.x + stoneGrain(p.xz*7.)*weights.y + stoneGrain(p.xy*7.)*weights.z;
      float light = .79 + .22*max(0., dot(stoneNormal, normalize(vec3(-.3,.8,.4))));
      float rim = mix(.64, 1., smoothstep(boundary+.006, boundary+.045, field));

      vec3 projection = plasterCoords.xyz / plasterCoords.w * .5 + .5;
      vec2 artwork = projection.xy * plasterFrame.xy + plasterFrame.zw;
      float facing = smoothstep(.13, .54, dot(stoneNormal, plasterDirection));
      float frontSurface = 0.;
      vec4 photographed = vec4(0.);
      if (all(greaterThanEqual(artwork, vec2(0.))) && all(lessThanEqual(artwork, vec2(1.)))) {
        float firstSurface = 1. - smoothstep(.00014, .00050,
          abs(projection.z - texture2D(plasterDepth, projection.xy).r));
        frontSurface = facing * firstSurface;
        photographed = texture2D(plasterFront, artwork);
      }
      diffuseColor.rgb = mix(diffuseColor.rgb, stone*light*rim, coverage*(1.-frontSurface));
      diffuseColor.rgb = mix(diffuseColor.rgb, photographed.rgb, photographed.a*frontSurface);
    `)}}export{B as applyCrystalMaterial};
