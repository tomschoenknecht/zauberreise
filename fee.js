/* Die Fee - EINE gemeinsame Quelle für alle Seiten.
   Einbinden: <script src="fee.js"></script> und dann feeInject() aufrufen.
   Danach überall verwendbar mit: <svg viewBox="0 0 200 236"><use href="#feeArt"/></svg>
   Stufen steuern: feeStage(n)  -> 0 verzaubert, 1 Farbe, 2 Augen auf + Lächeln, 3+ spricht */
(function(){
"use strict";
var SVG =
'<svg id="feeDefs" width="0" height="0" style="position:absolute" aria-hidden="true">'+
'<defs>'+
  '<linearGradient id="fHair" x1="0" y1="0" x2="0" y2="1">'+
    '<stop offset="0" stop-color="#fff2c6"/><stop offset="55%" stop-color="#ffdf87"/><stop offset="100%" stop-color="#ff9ecf"/>'+
  '</linearGradient>'+
  '<linearGradient id="fSkin" x1="0" y1="0" x2="0" y2="1">'+
    '<stop offset="0" stop-color="#ffe6d6"/><stop offset="1" stop-color="#ffd2bd"/>'+
  '</linearGradient>'+
  '<linearGradient id="fGown" x1="0" y1="0" x2="0" y2="1">'+
    '<stop offset="0" stop-color="#ffe0f6"/><stop offset="50%" stop-color="#f0a8ec"/><stop offset="100%" stop-color="#c97ce0"/>'+
  '</linearGradient>'+
  '<linearGradient id="fBodice" x1="0" y1="0" x2="0" y2="1">'+
    '<stop offset="0" stop-color="#ffd0ee"/><stop offset="1" stop-color="#e58fd8"/>'+
  '</linearGradient>'+
  '<linearGradient id="fGold" x1="0" y1="0" x2="0" y2="1">'+
    '<stop offset="0" stop-color="#fff0c2"/><stop offset="1" stop-color="#e6a52f"/>'+
  '</linearGradient>'+
  '<radialGradient id="fWing" cx="50%" cy="40%" r="60%">'+
    '<stop offset="0" stop-color="#ffffff" stop-opacity=".92"/>'+
    '<stop offset="55%" stop-color="#ffd6f5" stop-opacity=".6"/>'+
    '<stop offset="100%" stop-color="#c4e6ff" stop-opacity=".25"/>'+
  '</radialGradient>'+

  '<g id="feeArt">'+
    /* Flügel */
    '<g class="fWingL" opacity=".82">'+
      '<path d="M96 118 C60 96 44 108 46 128 C48 150 74 150 96 128 Z" fill="url(#fWing)" stroke="#ffd0f2" stroke-width="1"/>'+
      '<path d="M96 128 C66 120 52 138 58 156 C64 172 86 160 96 140 Z" fill="url(#fWing)" stroke="#ffd0f2" stroke-width="1"/>'+
    '</g>'+
    '<g class="fWingR" opacity=".82">'+
      '<path d="M104 118 C140 96 156 108 154 128 C152 150 126 150 104 128 Z" fill="url(#fWing)" stroke="#ffd0f2" stroke-width="1"/>'+
      '<path d="M104 128 C134 120 148 138 142 156 C136 172 114 160 104 140 Z" fill="url(#fWing)" stroke="#ffd0f2" stroke-width="1"/>'+
    '</g>'+
    /* Haare hinten */
    '<path d="M78 74 C64 92 66 138 74 168 C82 150 86 150 92 156 C90 120 92 96 100 84 C108 96 110 120 108 156 C114 150 118 150 126 168 C134 138 136 92 122 74 Z" fill="url(#fHair)"/>'+
    /* Kleid */
    '<path d="M100 112 C92 112 86 118 84 128 L72 200 C84 210 116 210 128 200 L116 128 C114 118 108 112 100 112 Z" fill="url(#fGown)"/>'+
    '<path d="M100 120 L94 198 M100 120 L108 198 M88 150 L84 196 M112 150 L116 196" stroke="#fff" stroke-width="1.2" opacity=".45" fill="none" stroke-linecap="round"/>'+
    '<path d="M72 200 C84 210 116 210 128 200" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>'+
    /* Mieder */
    '<path d="M100 100 C93 100 89 106 90 116 C94 122 106 122 110 116 C111 106 107 100 100 100 Z" fill="url(#fBodice)"/>'+
    /* Arme + Hände */
    '<path d="M92 114 C82 120 78 134 80 146" stroke="url(#fSkin)" stroke-width="6" fill="none" stroke-linecap="round"/>'+
    '<path d="M108 114 C118 120 122 134 120 146" stroke="url(#fSkin)" stroke-width="6" fill="none" stroke-linecap="round"/>'+
    '<circle cx="80" cy="147" r="4" fill="url(#fSkin)"/>'+
    '<circle cx="120" cy="147" r="4" fill="url(#fSkin)"/>'+
    /* Hals + Kopf */
    '<rect x="96" y="90" width="8" height="12" rx="4" fill="url(#fSkin)"/>'+
    '<circle cx="100" cy="80" r="15" fill="url(#fSkin)"/>'+
    '<circle cx="91" cy="83" r="3.2" fill="#ff9ec6" opacity=".55"/>'+
    '<circle cx="109" cy="83" r="3.2" fill="#ff9ec6" opacity=".55"/>'+
    /* Augen geschlossen (Stufe 0-1) */
    '<g id="feeEyesClosed">'+
      '<path d="M90 78 q4 4 8 0" stroke="#7a4a6a" stroke-width="1.6" fill="none" stroke-linecap="round"/>'+
      '<path d="M102 78 q4 4 8 0" stroke="#7a4a6a" stroke-width="1.6" fill="none" stroke-linecap="round"/>'+
      '<path d="M90 78 l-2 3 M92 79 l-1.5 3.2 M110 78 l2 3 M108 79 l1.5 3.2" stroke="#7a4a6a" stroke-width="1" stroke-linecap="round"/>'+
    '</g>'+
    /* Augen offen (ab Stufe 2) */
    '<g id="feeEyesOpen" style="display:none">'+
      '<ellipse cx="94" cy="79" rx="3.2" ry="3.8" fill="#fff"/><circle cx="94" cy="79.5" r="2.1" fill="#5a3a8a"/>'+
      '<circle cx="94.9" cy="78.4" r=".8" fill="#fff"/>'+
      '<ellipse cx="106" cy="79" rx="3.2" ry="3.8" fill="#fff"/><circle cx="106" cy="79.5" r="2.1" fill="#5a3a8a"/>'+
      '<circle cx="106.9" cy="78.4" r=".8" fill="#fff"/>'+
      '<path d="M90.5 76 l-1.5 -1.6 M94 75.2 l-.4 -2 M97.6 76 l1.2 -1.6" stroke="#7a4a6a" stroke-width="1" stroke-linecap="round"/>'+
      '<path d="M102.4 76 l-1.2 -1.6 M106 75.2 l.4 -2 M109.5 76 l1.5 -1.6" stroke="#7a4a6a" stroke-width="1" stroke-linecap="round"/>'+
    '</g>'+
    /* Augenbrauen */
    '<path d="M90 73 q4 -2 8 0 M102 73 q4 -2 8 0" stroke="#e2b06a" stroke-width="1.2" fill="none" stroke-linecap="round"/>'+
    /* Näschen */
    '<path d="M100 82 q1 1 0 2" stroke="#e0a48a" stroke-width="1" fill="none"/>'+
    /* Mund ruhig / lächelnd */
    '<path id="feeMouthCalm" d="M96 87 q4 3 8 0 q-4 1 -8 0 Z" fill="#ff7fb0"/>'+
    '<path id="feeMouthSmile" d="M94 86 q6 6 12 0 q-6 3 -12 0 Z" fill="#ff5f9e" style="display:none"/>'+
    /* Haare vorne */
    '<path d="M85 74 C82 66 90 60 100 60 C110 60 118 66 115 74 C110 68 108 66 100 66 C92 66 90 68 85 74 Z" fill="url(#fHair)"/>'+
    '<path d="M85 74 C80 86 82 96 88 104 C86 92 86 82 90 74 Z" fill="url(#fHair)"/>'+
    '<path d="M115 74 C120 86 118 96 112 104 C114 92 114 82 110 74 Z" fill="url(#fHair)"/>'+
    /* Tiara */
    '<path d="M89 63 L94 55 L100 61 L106 55 L111 63 Z" fill="url(#fGold)" stroke="#fff" stroke-width=".6"/>'+
    '<circle cx="100" cy="60" r="2.4" fill="#bff7e6" stroke="#fff" stroke-width=".6"/>'+
  '</g>'+
'</defs></svg>';

window.feeInject=function(){
  if(document.getElementById("feeDefs")) return;
  var d=document.createElement("div");
  d.innerHTML=SVG;
  document.body.insertBefore(d.firstChild, document.body.firstChild);
};
// Stufen: 0 verzaubert (grau, schläft) | 1 Farbe | 2 Augen auf + Lächeln | 3 spricht
window.feeStage=function(st){
  var ec=document.getElementById("feeEyesClosed"), eo=document.getElementById("feeEyesOpen"),
      mc=document.getElementById("feeMouthCalm"), ms=document.getElementById("feeMouthSmile");
  if(!ec) return;
  ec.style.display = st>=2 ? "none":"block";
  eo.style.display = st>=2 ? "block":"none";
  mc.style.display = st>=2 ? "none":"block";
  ms.style.display = st>=2 ? "block":"none";
};
})();
