/* Die Fee - EINE gemeinsame Quelle für alle Seiten.
   Einbinden: <script src="fee.js"></script> und dann feeInject() aufrufen.
   Danach überall verwendbar mit: <svg viewBox="0 0 200 236"><use href="#feeArt"/></svg>
   Stufen steuern:      feeStage(n)  -> 0 verzaubert, 1 Farbe (leichtes Schwanken),
                         2 Augen auf + Lächeln + Blinzeln, 3 spricht, 4 winkt & bewegt sich lebendiger,
                         5 tanzt/fliegt (schnellerer Flügelschlag, gelegentliches Flattern von allein)
   Gestalten (Salon):   feeCustomize(cfg)  -> {hair,dress,face,head,extra} Kategorie-IDs, siehe FEE_CATALOG
   Interaktion:         feeTap()  -> von Berührung aufrufen; winkt ab Stufe 4, sonst kleines Wackeln */
(function(){
"use strict";

/* Farbpaletten für Haare/Kleid: je 3 Verlaufsfarben (hell -> mittel -> dunkel) */
var HAIR = {
  goldrosa: ["#fff2c6","#ffdf87","#ff9ecf"],
  lila:     ["#f3e2ff","#d9aaff","#a663e0"],
  meer:     ["#e3fbff","#8fe0f5","#3fa8cf"],
  feuer:    ["#ffe3c6","#ff9a5e","#e0503f"],
  regenbogen:["#fff2c6","#ff9ecf","#a663e0"]
};
var DRESS = {
  rosalila: ["#ffe0f6","#f0a8ec","#c97ce0"],
  minze:    ["#e3fff5","#8ff0d0","#3fbf9a"],
  sonne:    ["#fff9e0","#ffe08a","#f0b23f"],
  sternennacht:["#e3e9ff","#8fa0e0","#3f4fa0"],
  kristall: ["#ffffff","#fff0c2","#e6a52f"]
};
var FACE = {
  zart:    {cheek:"#ff9ec6", lip:"#ff7fb0"},
  beere:   {cheek:"#e05fa0", lip:"#c23f7e"},
  koralle: {cheek:"#ff8a6a", lip:"#ff6a4e"},
  glitzer: {cheek:"#ff5fd0", lip:"#e83fb6"}
};

/* Katalog: Anzeige-Infos + Kristallpreis (0 = von Anfang an dabei) */
window.FEE_CATALOG = {
  hair:  [ {id:"goldrosa", name:"Gold-Rosa",    cost:0},
           {id:"lila",     name:"Lila-Traum",   cost:10},
           {id:"meer",     name:"Meerblau",     cost:15},
           {id:"feuer",    name:"Feuerrot",     cost:15},
           {id:"regenbogen",name:"Regenbogen",  cost:25} ],
  dress: [ {id:"rosalila", name:"Rosa-Flieder", cost:0},
           {id:"minze",    name:"Minzgrün",     cost:10},
           {id:"sonne",    name:"Sonnengelb",   cost:10},
           {id:"sternennacht",name:"Sternennacht",cost:15},
           {id:"kristall", name:"Kristallweiß-Gold",cost:20} ],
  face:  [ {id:"zart",    name:"Zart",          cost:0},
           {id:"beere",   name:"Beere",         cost:8},
           {id:"koralle", name:"Koralle",       cost:8},
           {id:"glitzer", name:"Glitzer-Pink",  cost:12} ],
  head:  [ {id:"tiara",   name:"Sternentiara",  cost:0},
           {id:"blume",   name:"Blütenkranz",   cost:12},
           {id:"schleife",name:"Schleife",      cost:10},
           {id:"krone",   name:"Große Krone",   cost:20} ],
  extra: [ {id:"keine",   name:"Kein Extra",    cost:0},
           {id:"schmetterlinge",name:"Schmetterlinge",cost:15},
           {id:"glitzerspur",name:"Glitzerspur", cost:15},
           {id:"sternenstaub",name:"Sternenstaub",cost:18} ]
};

var SVG =
'<svg id="feeDefs" width="0" height="0" style="position:absolute" aria-hidden="true">'+
'<defs>'+
  '<linearGradient id="fHair" x1="0" y1="0" x2="0" y2="1">'+
    '<stop offset="0" style="stop-color:var(--fee-hair-1)"/><stop offset="55%" style="stop-color:var(--fee-hair-2)"/><stop offset="100%" style="stop-color:var(--fee-hair-3)"/>'+
  '</linearGradient>'+
  '<linearGradient id="fSkin" x1="0" y1="0" x2="0" y2="1">'+
    '<stop offset="0" stop-color="#ffe6d6"/><stop offset="1" stop-color="#ffd2bd"/>'+
  '</linearGradient>'+
  '<linearGradient id="fGown" x1="0" y1="0" x2="0" y2="1">'+
    '<stop offset="0" style="stop-color:var(--fee-dress-1)"/><stop offset="50%" style="stop-color:var(--fee-dress-2)"/><stop offset="100%" style="stop-color:var(--fee-dress-3)"/>'+
  '</linearGradient>'+
  '<linearGradient id="fBodice" x1="0" y1="0" x2="0" y2="1">'+
    '<stop offset="0" style="stop-color:var(--fee-dress-1)"/><stop offset="1" style="stop-color:var(--fee-dress-2)"/>'+
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
    /* Extra: Schmetterlinge / Glitzerspur / Sternenstaub (nur einer sichtbar) */
    '<g id="feeExtraSchmetterlinge" style="display:none">'+
      '<g transform="translate(58,100)"><path d="M0 0 q-8 -8 -2 -14 q6 4 4 12 Z" fill="#ffb0e0"/><path d="M0 0 q8 -8 2 -14 q-6 4 -4 12 Z" fill="#ffd0ee"/></g>'+
      '<g transform="translate(146,108) scale(.8)"><path d="M0 0 q-8 -8 -2 -14 q6 4 4 12 Z" fill="#b0e0ff"/><path d="M0 0 q8 -8 2 -14 q-6 4 -4 12 Z" fill="#d0f0ff"/></g>'+
    '</g>'+
    '<g id="feeExtraGlitzerspur" style="display:none" fill="#fff">'+
      '<circle cx="66" cy="150" r="2"/><circle cx="60" cy="164" r="1.4"/><circle cx="70" cy="176" r="1.8"/>'+
      '<circle cx="134" cy="150" r="2"/><circle cx="140" cy="164" r="1.4"/><circle cx="130" cy="176" r="1.8"/>'+
    '</g>'+
    '<g id="feeExtraSternenstaub" style="display:none" fill="#ffe08a">'+
      '<path d="M62 96 l1.4 3 3 1.4 -3 1.4 -1.4 3 -1.4 -3 -3 -1.4 3 -1.4Z"/>'+
      '<path d="M140 100 l1.2 2.6 2.6 1.2 -2.6 1.2 -1.2 2.6 -1.2 -2.6 -2.6 -1.2 2.6 -1.2Z"/>'+
      '<path d="M100 55 l1 2.2 2.2 1 -2.2 1 -1 2.2 -1 -2.2 -2.2 -1 2.2 -1Z"/>'+
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
    '<circle id="feeCheekL" cx="91" cy="83" r="3.2" style="fill:var(--fee-cheek)" opacity=".55"/>'+
    '<circle id="feeCheekR" cx="109" cy="83" r="3.2" style="fill:var(--fee-cheek)" opacity=".55"/>'+
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
    '<path id="feeMouthCalm" style="fill:var(--fee-lip)" d="M96 87 q4 3 8 0 q-4 1 -8 0 Z"/>'+
    '<path id="feeMouthSmile" style="fill:var(--fee-lip);display:none" d="M94 86 q6 6 12 0 q-6 3 -12 0 Z"/>'+
    /* Haare vorne */
    '<path d="M85 74 C82 66 90 60 100 60 C110 60 118 66 115 74 C110 68 108 66 100 66 C92 66 90 68 85 74 Z" fill="url(#fHair)"/>'+
    '<path d="M85 74 C80 86 82 96 88 104 C86 92 86 82 90 74 Z" fill="url(#fHair)"/>'+
    '<path d="M115 74 C120 86 118 96 112 104 C114 92 114 82 110 74 Z" fill="url(#fHair)"/>'+
    /* Kopfschmuck: Tiara / Blütenkranz / Schleife / große Krone (nur einer sichtbar) */
    '<g id="feeHeadTiara">'+
      '<path d="M89 63 L94 55 L100 61 L106 55 L111 63 Z" fill="url(#fGold)" stroke="#fff" stroke-width=".6"/>'+
      '<circle cx="100" cy="60" r="2.4" fill="#bff7e6" stroke="#fff" stroke-width=".6"/>'+
    '</g>'+
    '<g id="feeHeadBlume" style="display:none">'+
      '<circle cx="90" cy="63" r="4" fill="#ff9ec6"/><circle cx="97" cy="59" r="4" fill="#fff2c6"/>'+
      '<circle cx="104" cy="60" r="4" fill="#c9a1ff"/><circle cx="110" cy="64" r="4" fill="#8ff0d0"/>'+
      '<circle cx="90" cy="63" r="1.6" fill="#e6a52f"/><circle cx="97" cy="59" r="1.6" fill="#e6a52f"/>'+
      '<circle cx="104" cy="60" r="1.6" fill="#e6a52f"/><circle cx="110" cy="64" r="1.6" fill="#e6a52f"/>'+
    '</g>'+
    '<g id="feeHeadSchleife" style="display:none">'+
      '<path d="M78 66 C70 60 70 72 78 70 C70 76 72 84 80 76 Z" fill="#ff5fb6" stroke="#fff" stroke-width=".8"/>'+
      '<circle cx="80" cy="73" r="2.4" fill="#e83f9e"/>'+
    '</g>'+
    '<g id="feeHeadKrone" style="display:none">'+
      '<path d="M86 64 L91 52 L96 60 L100 50 L104 60 L109 52 L114 64 Z" fill="url(#fGold)" stroke="#fff" stroke-width=".7"/>'+
      '<circle cx="100" cy="55" r="3" fill="#ff86c4" stroke="#fff" stroke-width=".6"/>'+
      '<circle cx="90" cy="60" r="1.8" fill="#8ff0d0"/><circle cx="110" cy="60" r="1.8" fill="#8ff0d0"/>'+
    '</g>'+
  '</g>'+
'</defs></svg>';

window.feeInject=function(){
  if(document.getElementById("feeDefs")) return;
  var d=document.createElement("div");
  d.innerHTML=SVG;
  document.body.insertBefore(d.firstChild, document.body.firstChild);
  applyDefaultVars();
};
function applyDefaultVars(){
  var r=document.documentElement.style;
  var h=HAIR.goldrosa, g=DRESS.rosalila, f=FACE.zart;
  r.setProperty("--fee-hair-1",h[0]); r.setProperty("--fee-hair-2",h[1]); r.setProperty("--fee-hair-3",h[2]);
  r.setProperty("--fee-dress-1",g[0]); r.setProperty("--fee-dress-2",g[1]); r.setProperty("--fee-dress-3",g[2]);
  r.setProperty("--fee-cheek",f.cheek); r.setProperty("--fee-lip",f.lip);
}

/* Stufen: 0 verzaubert (grau, schläft) | 1 Farbe | 2 Augen auf + Lächeln | 3 spricht */
window.feeStage=function(st){
  var ec=document.getElementById("feeEyesClosed"), eo=document.getElementById("feeEyesOpen"),
      mc=document.getElementById("feeMouthCalm"), ms=document.getElementById("feeMouthSmile");
  if(!ec) return;
  ec.style.display = st>=2 ? "none":"block";
  eo.style.display = st>=2 ? "block":"none";
  mc.style.display = st>=2 ? "none":"block";
  ms.style.display = st>=2 ? "block":"none";
};

/* Gestalten: cfg = {hair,dress,face,head,extra} (Kategorie-IDs aus FEE_CATALOG) */
window.feeCustomize=function(cfg){
  var r=document.documentElement.style;
  if(cfg.hair && HAIR[cfg.hair]){ var h=HAIR[cfg.hair]; r.setProperty("--fee-hair-1",h[0]); r.setProperty("--fee-hair-2",h[1]); r.setProperty("--fee-hair-3",h[2]); }
  if(cfg.dress && DRESS[cfg.dress]){ var g=DRESS[cfg.dress]; r.setProperty("--fee-dress-1",g[0]); r.setProperty("--fee-dress-2",g[1]); r.setProperty("--fee-dress-3",g[2]); }
  if(cfg.face && FACE[cfg.face]){ var f=FACE[cfg.face]; r.setProperty("--fee-cheek",f.cheek); r.setProperty("--fee-lip",f.lip); }
  var heads={tiara:"feeHeadTiara", blume:"feeHeadBlume", schleife:"feeHeadSchleife", krone:"feeHeadKrone"};
  Object.keys(heads).forEach(function(k){ var el=document.getElementById(heads[k]); if(el) el.style.display=(cfg.head===k)?"block":"none"; });
  var extras={keine:null, schmetterlinge:"feeExtraSchmetterlinge", glitzerspur:"feeExtraGlitzerspur", sternenstaub:"feeExtraSternenstaub"};
  Object.keys(extras).forEach(function(k){ var id=extras[k]; if(!id) return; var el=document.getElementById(id); if(el) el.style.display=(cfg.extra===k)?"block":"none"; });
};
})();
