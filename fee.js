/* Die Fee - EINE gemeinsame Quelle für alle Seiten.
   Einbinden: <script src="fee.js"></script> und dann feeInject() aufrufen.
   Danach überall verwendbar mit: <svg viewBox="0 0 200 236"><use href="#feeArt"/></svg>

   Lebendigkeit wächst über die Reise (feeStage(n)):
     0  verzaubert  - schläft, reglos, ohne Farbe
     1  Farbe       - beginnt zu atmen und sanft zu schweben
     2  Augen auf   - lächelt und blinzelt von allein
     3  Stimme      - spricht (Sprachausgabe in der App)
     4  Bewegung    - winkt beim Antippen, Flügel bewegen sich deutlich
     5  Flug/Tanz   - schnellerer Flügelschlag, flattert gelegentlich von allein hoch

   Gestalten (Salon): feeCustomize(cfg) -> {hair,dress,face,head,extra}, siehe FEE_CATALOG
   Interaktion:       feeTap()          -> von Berührung aufrufen (winkt ab Stufe 4)

   Grafik 2026-07-18 näher an Toms fotorealistische Vorlage gebracht: lange wellige
   blonde Haare, fließendes Fliederkleid mit silberner Ranke, Goldkrone mit blauem
   Edelstein, größere irideszente Flügel, feineres Gesicht mit blauen Augen. Bleibt
   umfärbbar (CSS-Variablen) und beweglich (transform-Attribute in einer Schleife). */
(function(){
"use strict";

/* Farbpaletten für Haare/Kleid: je 3 Verlaufsfarben (hell -> mittel -> dunkel).
   Standard = näher an der Vorlage: goldblond + flieder. */
var HAIR = {
  goldrosa: ["#fff4cf","#ffde86","#e7bd5c"],   /* Gold-Blond (Standard) */
  lila:     ["#f3e2ff","#d9aaff","#a663e0"],
  meer:     ["#e3fbff","#8fe0f5","#3fa8cf"],
  feuer:    ["#ffe3c6","#ff9a5e","#e0503f"],
  regenbogen:["#fff2c6","#ff9ecf","#a663e0"]
};
var DRESS = {
  rosalila: ["#efe0ff","#cba7ec","#a67fce"],   /* Flieder (Standard) */
  minze:    ["#e3fff5","#8ff0d0","#3fbf9a"],
  sonne:    ["#fff9e0","#ffe08a","#f0b23f"],
  sternennacht:["#e3e9ff","#8fa0e0","#3f4fa0"],
  kristall: ["#ffffff","#fff0c2","#e6a52f"]
};
var FACE = {
  zart:    {cheek:"#ff9ec6", lip:"#e57fa0"},
  beere:   {cheek:"#e05fa0", lip:"#c23f7e"},
  koralle: {cheek:"#ff8a6a", lip:"#ff6a4e"},
  glitzer: {cheek:"#ff5fd0", lip:"#e83fb6"}
};

/* Katalog: Anzeige-Infos + Kristallpreis (0 = von Anfang an dabei) */
window.FEE_CATALOG = {
  hair:  [ {id:"goldrosa", name:"Gold-Blond",   cost:0},
           {id:"lila",     name:"Lila-Traum",   cost:10},
           {id:"meer",     name:"Meerblau",     cost:15},
           {id:"feuer",    name:"Feuerrot",     cost:15},
           {id:"regenbogen",name:"Regenbogen",  cost:25} ],
  dress: [ {id:"rosalila", name:"Flieder",      cost:0},
           {id:"minze",    name:"Minzgrün",     cost:10},
           {id:"sonne",    name:"Sonnengelb",   cost:10},
           {id:"sternennacht",name:"Sternennacht",cost:15},
           {id:"kristall", name:"Kristallweiß-Gold",cost:20} ],
  face:  [ {id:"zart",    name:"Zart",          cost:0},
           {id:"beere",   name:"Beere",         cost:8},
           {id:"koralle", name:"Koralle",       cost:8},
           {id:"glitzer", name:"Glitzer-Pink",  cost:12} ],
  head:  [ {id:"tiara",   name:"Goldkrone",     cost:0},
           {id:"blume",   name:"Blütenkranz",   cost:12},
           {id:"schleife",name:"Schleife",      cost:10},
           {id:"krone",   name:"Große Krone",   cost:20} ],
  extra: [ {id:"keine",   name:"Kein Extra",    cost:0},
           {id:"schmetterlinge",name:"Schmetterlinge",cost:15},
           {id:"glitzerspur",name:"Glitzerspur", cost:15},
           {id:"sternenstaub",name:"Sternenstaub",cost:18} ]
};

/* WICHTIG - technische Grundlage der Bewegung:
   Die Fee steht einmal in <defs> und wird überall per <use> eingebunden.
   CSS-Animationen wirken sich NICHT auf <use>-Kopien aus - direkt gesetzte
   transform-Attribute schon. Deshalb rechnet eine zentrale Schleife die Bewegung
   und setzt sie als Attribut; alle Kopien bewegen sich synchron. */
var ORIGIN={
  feeAlive:{x:100,y:150}, feeWingL:{x:96,y:124}, feeWingR:{x:104,y:124}, feeArmR:{x:108,y:114}
};

var SVG =
'<svg id="feeDefs" width="0" height="0" style="position:absolute" aria-hidden="true">'+
'<defs>'+
  '<linearGradient id="fHair" x1="0" y1="0" x2="0" y2="1">'+
    '<stop offset="0" style="stop-color:var(--fee-hair-1)"/><stop offset="55%" style="stop-color:var(--fee-hair-2)"/><stop offset="100%" style="stop-color:var(--fee-hair-3)"/>'+
  '</linearGradient>'+
  '<linearGradient id="fSkin" x1="0" y1="0" x2="0" y2="1">'+
    '<stop offset="0" stop-color="#ffe8da"/><stop offset="1" stop-color="#ffd3bd"/>'+
  '</linearGradient>'+
  '<linearGradient id="fGown" x1="0" y1="0" x2="0" y2="1">'+
    '<stop offset="0" style="stop-color:var(--fee-dress-1)"/><stop offset="50%" style="stop-color:var(--fee-dress-2)"/><stop offset="100%" style="stop-color:var(--fee-dress-3)"/>'+
  '</linearGradient>'+
  '<linearGradient id="fBodice" x1="0" y1="0" x2="0" y2="1">'+
    '<stop offset="0" style="stop-color:var(--fee-dress-1)"/><stop offset="1" style="stop-color:var(--fee-dress-2)"/>'+
  '</linearGradient>'+
  '<linearGradient id="fGold" x1="0" y1="0" x2="0" y2="1">'+
    '<stop offset="0" stop-color="#fff2c2"/><stop offset="1" stop-color="#e0a52f"/>'+
  '</linearGradient>'+
  '<radialGradient id="fWing" cx="44%" cy="40%" r="68%">'+
    '<stop offset="0" stop-color="#ffffff" stop-opacity=".97"/>'+
    '<stop offset="45%" stop-color="#ffe0fa" stop-opacity=".9"/>'+
    '<stop offset="80%" stop-color="#e0cbff" stop-opacity=".78"/>'+
    '<stop offset="100%" stop-color="#c8e4ff" stop-opacity=".6"/>'+
  '</radialGradient>'+
  '<radialGradient id="fFaceShade" cx="50%" cy="45%" r="60%">'+
    '<stop offset="60%" stop-color="#ffffff" stop-opacity="0"/>'+
    '<stop offset="100%" stop-color="#e8a98f" stop-opacity=".35"/>'+
  '</radialGradient>'+

  /* feeScale füllt den Rahmen: die Figur füllte nur ~72% des viewBox (viel leerer
     Rand oben), wirkte dadurch klein. Hochskaliert und zentriert. Statisch - die
     Bewegung sitzt weiter in feeAlive darin, also unberührt. */
  '<g id="feeArt"><g id="feeScale" transform="translate(-25 -48.4) scale(1.25)"><g id="feeAlive">'+
    /* ---------- Flügel (größer, irideszent, zarte Adern) ---------- */
    '<g id="feeWingL" opacity=".92">'+
      '<path d="M95 120 C60 92 26 88 26 116 C26 142 62 142 95 126 Z" fill="url(#fWing)" stroke="#fff" stroke-width="1.2"/>'+
      '<path d="M95 128 C66 128 40 150 48 178 C58 200 88 172 95 144 Z" fill="url(#fWing)" stroke="#fff" stroke-width="1.2"/>'+
      '<path d="M90 122 C66 114 46 114 34 120 M90 132 C68 134 54 148 50 166" stroke="#fff" stroke-width=".8" fill="none" opacity=".6"/>'+
    '</g>'+
    '<g id="feeWingR" opacity=".92">'+
      '<path d="M105 120 C140 92 174 88 174 116 C174 142 138 142 105 126 Z" fill="url(#fWing)" stroke="#fff" stroke-width="1.2"/>'+
      '<path d="M105 128 C134 128 160 150 152 178 C142 200 112 172 105 144 Z" fill="url(#fWing)" stroke="#fff" stroke-width="1.2"/>'+
      '<path d="M110 122 C134 114 154 114 166 120 M110 132 C132 134 146 148 150 166" stroke="#fff" stroke-width=".8" fill="none" opacity=".6"/>'+
    '</g>'+
    /* Extra: Schmetterlinge / Glitzerspur / Sternenstaub (nur einer sichtbar) */
    '<g id="feeExtraSchmetterlinge" style="display:none">'+
      '<g transform="translate(56,98)"><path d="M0 0 q-8 -8 -2 -14 q6 4 4 12 Z" fill="#ffb0e0"/><path d="M0 0 q8 -8 2 -14 q-6 4 -4 12 Z" fill="#ffd0ee"/></g>'+
      '<g transform="translate(148,106) scale(.8)"><path d="M0 0 q-8 -8 -2 -14 q6 4 4 12 Z" fill="#b0e0ff"/><path d="M0 0 q8 -8 2 -14 q-6 4 -4 12 Z" fill="#d0f0ff"/></g>'+
    '</g>'+
    '<g id="feeExtraGlitzerspur" style="display:none" fill="#fff">'+
      '<circle cx="64" cy="156" r="2"/><circle cx="58" cy="170" r="1.4"/><circle cx="70" cy="182" r="1.8"/>'+
      '<circle cx="136" cy="156" r="2"/><circle cx="142" cy="170" r="1.4"/><circle cx="130" cy="182" r="1.8"/>'+
    '</g>'+
    '<g id="feeExtraSternenstaub" style="display:none" fill="#ffe08a">'+
      '<path d="M60 94 l1.4 3 3 1.4 -3 1.4 -1.4 3 -1.4 -3 -3 -1.4 3 -1.4Z"/>'+
      '<path d="M142 98 l1.2 2.6 2.6 1.2 -2.6 1.2 -1.2 2.6 -1.2 -2.6 -2.6 -1.2 2.6 -1.2Z"/>'+
      '<path d="M100 47 l1 2.2 2.2 1 -2.2 1 -1 2.2 -1 -2.2 -2.2 -1 2.2 -1Z"/>'+
    '</g>'+
    /* ---------- Haare hinten (lang, wellig) ---------- */
    '<path d="M80 70 C58 92 58 142 68 180 C72 192 82 190 86 178 C89 152 84 118 97 90 C100 84 100 84 103 90 C116 118 111 152 114 178 C118 190 128 192 132 180 C142 142 142 92 120 70 Z" fill="url(#fHair)"/>'+
    '<path d="M84 92 C78 120 80 150 86 172 M116 92 C122 120 120 150 114 172" stroke="#fff" stroke-width=".8" fill="none" opacity=".25"/>'+
    /* ---------- Kleid (langes fließendes Fliederkleid) ---------- */
    '<path d="M100 116 C89 116 83 123 81 134 L68 210 C84 220 116 220 132 210 L119 134 C117 123 111 116 100 116 Z" fill="url(#fGown)"/>'+
    /* weiche Falten-Schattierung */
    '<path d="M92 132 L82 206 M108 132 L118 206" stroke="#7a4a8a" stroke-width="2" opacity=".14" fill="none" stroke-linecap="round"/>'+
    '<path d="M100 124 L96 208 M100 124 L104 208" stroke="#fff" stroke-width="1.1" opacity=".4" fill="none" stroke-linecap="round"/>'+
    /* silberne Ranken-Stickerei mittig */
    '<path d="M100 122 C104 140 96 158 100 176 C103 190 99 200 100 210" stroke="#fff" stroke-width="1" opacity=".6" fill="none"/>'+
    '<g fill="#fff" opacity=".6"><ellipse cx="96" cy="146" rx="2.4" ry="1.2" transform="rotate(35 96 146)"/><ellipse cx="104" cy="160" rx="2.4" ry="1.2" transform="rotate(-35 104 160)"/><ellipse cx="97" cy="176" rx="2.2" ry="1.1" transform="rotate(35 97 176)"/><ellipse cx="103" cy="192" rx="2.2" ry="1.1" transform="rotate(-35 103 192)"/></g>'+
    '<path d="M68 210 C84 220 116 220 132 210" fill="none" stroke="#fff" stroke-width="1.6" opacity=".55"/>'+
    /* ---------- Mieder (Sweetheart) ---------- */
    '<path d="M100 98 C91 98 86 105 87 118 C93 126 107 126 113 118 C114 105 109 98 100 98 Z" fill="url(#fBodice)"/>'+
    '<path d="M92 104 C96 111 104 111 108 104" fill="none" stroke="#fff" stroke-width="1" opacity=".55"/>'+
    /* ---------- Arme + Hände (rechter Arm eigene Gruppe zum Winken) ---------- */
    '<path d="M91 116 C81 122 77 138 80 151" stroke="url(#fSkin)" stroke-width="5.4" fill="none" stroke-linecap="round"/>'+
    '<circle cx="80" cy="152" r="3.6" fill="url(#fSkin)"/>'+
    '<g id="feeArmR">'+
      '<path d="M109 116 C119 122 123 138 120 151" stroke="url(#fSkin)" stroke-width="5.4" fill="none" stroke-linecap="round"/>'+
      '<circle cx="120" cy="152" r="3.6" fill="url(#fSkin)"/>'+
    '</g>'+
    /* ---------- Hals + Kopf ---------- */
    '<path d="M96 90 h8 v9 q-4 3 -8 0 Z" fill="url(#fSkin)"/>'+
    '<circle cx="100" cy="79" r="14.5" fill="url(#fSkin)"/>'+
    '<circle cx="100" cy="79" r="14.5" fill="url(#fFaceShade)"/>'+
    '<circle id="feeCheekL" cx="91" cy="84" r="3" style="fill:var(--fee-cheek)" opacity=".5"/>'+
    '<circle id="feeCheekR" cx="109" cy="84" r="3" style="fill:var(--fee-cheek)" opacity=".5"/>'+
    /* Augen geschlossen (Stufe 0-1 und beim Blinzeln) */
    '<g id="feeEyesClosed">'+
      '<path d="M90 79 q4 3.5 8 0" stroke="#7a4a6a" stroke-width="1.5" fill="none" stroke-linecap="round"/>'+
      '<path d="M102 79 q4 3.5 8 0" stroke="#7a4a6a" stroke-width="1.5" fill="none" stroke-linecap="round"/>'+
      '<path d="M90 79 l-2 2.6 M92 80 l-1.4 2.8 M110 79 l2 2.6 M108 80 l1.4 2.8" stroke="#7a4a6a" stroke-width=".9" stroke-linecap="round"/>'+
    '</g>'+
    /* Augen offen (ab Stufe 2) - blau, mit Glanz und Wimpern */
    '<g id="feeEyesOpen" style="display:none">'+
      '<path d="M90 79 q4 -3.4 8 0 q-4 3.4 -8 0 Z" fill="#fff"/>'+
      '<circle cx="94" cy="79" r="2.7" fill="#4a74c8"/><circle cx="94" cy="79" r="1.2" fill="#20304f"/><circle cx="95" cy="77.8" r=".7" fill="#fff"/>'+
      '<path d="M102 79 q4 -3.4 8 0 q-4 3.4 -8 0 Z" fill="#fff"/>'+
      '<circle cx="106" cy="79" r="2.7" fill="#4a74c8"/><circle cx="106" cy="79" r="1.2" fill="#20304f"/><circle cx="107" cy="77.8" r=".7" fill="#fff"/>'+
      '<path d="M90 79 q4 -3.4 8 0" stroke="#5a3a4a" stroke-width="1.2" fill="none" stroke-linecap="round"/>'+
      '<path d="M102 79 q4 -3.4 8 0" stroke="#5a3a4a" stroke-width="1.2" fill="none" stroke-linecap="round"/>'+
      '<path d="M90 79 l-2.2 -1.4 M110 79 l2.2 -1.4" stroke="#5a3a4a" stroke-width="1" stroke-linecap="round"/>'+
    '</g>'+
    /* Augenbrauen */
    '<path d="M90 73.5 q4 -2 8 -.3 M102 73.2 q4 -1.7 8 .3" stroke="#e0b878" stroke-width="1.2" fill="none" stroke-linecap="round"/>'+
    /* Näschen */
    '<path d="M100 82 q1.2 1.2 0 2.4" stroke="#e0a48a" stroke-width="1" fill="none" stroke-linecap="round"/>'+
    /* Mund ruhig / lächelnd (fülliger) */
    '<path id="feeMouthCalm" style="fill:var(--fee-lip)" d="M96 88 q4 2.6 8 0 q-4 1.6 -8 0 Z"/>'+
    '<path id="feeMouthSmile" style="fill:var(--fee-lip);display:none" d="M95 87 q5 4.6 10 0 q-5 2.6 -10 0 Z"/>'+
    /* ---------- Haare vorne (Mittelscheitel, Wellen, Strähnen) ---------- */
    '<path d="M84 72 C81 60 91 55 100 55 C109 55 119 60 116 72 C110 63 106 61 100 61 C94 61 90 63 84 72 Z" fill="url(#fHair)"/>'+
    '<path d="M84 72 C78 90 81 104 90 114 C86 98 84 84 90 72 Z" fill="url(#fHair)"/>'+
    '<path d="M116 72 C122 90 119 104 110 114 C114 98 116 84 110 72 Z" fill="url(#fHair)"/>'+
    '<path d="M100 61 C97 66 96 70 98 75 M100 61 C103 66 104 70 102 75" stroke="#fff" stroke-width=".7" fill="none" opacity=".3"/>'+
    /* ---------- Kopfschmuck (nur einer sichtbar) ---------- */
    /* Standard: Goldkrone mit blauem Tropfen-Edelstein (wie Vorlage) */
    '<g id="feeHeadTiara">'+
      '<path d="M87 63 L90 53 L95 60 L100 50 L105 60 L110 53 L113 63 Z" fill="url(#fGold)" stroke="#fff" stroke-width=".6"/>'+
      '<rect x="87" y="62.5" width="26" height="3.4" rx="1.4" fill="url(#fGold)" stroke="#fff" stroke-width=".4"/>'+
      '<circle cx="90" cy="53" r="1.2" fill="#fff2c2"/><circle cx="100" cy="50" r="1.3" fill="#fff2c2"/><circle cx="110" cy="53" r="1.2" fill="#fff2c2"/>'+
      '<path d="M100 55 C102.4 57.5 102.4 60.5 100 62.5 C97.6 60.5 97.6 57.5 100 55 Z" fill="#2a5bd0" stroke="#fff" stroke-width=".5"/>'+
      '<circle cx="99.2" cy="57.6" r=".6" fill="#bcd4ff"/>'+
    '</g>'+
    '<g id="feeHeadBlume" style="display:none">'+
      '<circle cx="90" cy="61" r="4" fill="#ff9ec6"/><circle cx="97" cy="57" r="4" fill="#fff2c6"/>'+
      '<circle cx="104" cy="58" r="4" fill="#c9a1ff"/><circle cx="110" cy="62" r="4" fill="#8ff0d0"/>'+
      '<circle cx="90" cy="61" r="1.6" fill="#e6a52f"/><circle cx="97" cy="57" r="1.6" fill="#e6a52f"/>'+
      '<circle cx="104" cy="58" r="1.6" fill="#e6a52f"/><circle cx="110" cy="62" r="1.6" fill="#e6a52f"/>'+
    '</g>'+
    '<g id="feeHeadSchleife" style="display:none">'+
      '<path d="M78 64 C70 58 70 70 78 68 C70 74 72 82 80 74 Z" fill="#ff5fb6" stroke="#fff" stroke-width=".8"/>'+
      '<circle cx="80" cy="71" r="2.4" fill="#e83f9e"/>'+
    '</g>'+
    '<g id="feeHeadKrone" style="display:none">'+
      '<path d="M85 62 L90 50 L96 58 L100 48 L104 58 L110 50 L115 62 Z" fill="url(#fGold)" stroke="#fff" stroke-width=".7"/>'+
      '<rect x="85" y="61.5" width="30" height="3.6" rx="1.6" fill="url(#fGold)" stroke="#fff" stroke-width=".4"/>'+
      '<path d="M100 53 C102.6 55.6 102.6 58.8 100 61 C97.4 58.8 97.4 55.6 100 53 Z" fill="#2a5bd0" stroke="#fff" stroke-width=".5"/>'+
      '<circle cx="90" cy="58" r="1.8" fill="#8ff0d0"/><circle cx="110" cy="58" r="1.8" fill="#ff86c4"/>'+
    '</g>'+
  '</g></g></g>'+
'</defs></svg>';

var curStage = 0, blinkTimer = null, rafId = null;
var waveUntil = 0, flutterUntil = 0, nextFlutter = 0;

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
function el(id){ return document.getElementById(id); }
function setT(id, t){ var e=el(id); if(e){ if(t) e.setAttribute("transform", t); else e.removeAttribute("transform"); } }
function rot(deg, o){ return "rotate("+deg.toFixed(2)+" "+o.x+" "+o.y+")"; }

/* Blinzeln ab Stufe 2: kurzes Schließen der Augen in unregelmäßigen Abständen */
function startBlink(){
  stopBlink();
  (function loop(){
    blinkTimer=setTimeout(function(){
      if(curStage>=2){
        var ec=el("feeEyesClosed"), eo=el("feeEyesOpen");
        if(ec&&eo){ ec.style.display="block"; eo.style.display="none";
          setTimeout(function(){ if(curStage>=2){ ec.style.display="none"; eo.style.display="block"; } }, 130); }
      }
      loop();
    }, 2600+Math.random()*3800);
  })();
}
function stopBlink(){ if(blinkTimer){ clearTimeout(blinkTimer); blinkTimer=null; } }

/* Eine Schleife für alle Bewegungen. Setzt transform-Attribute direkt am Original. */
function frame(now){
  rafId = requestAnimationFrame(frame);
  var t = now/1000;

  var lift=0, tilt=0;
  if(curStage>=5){ lift = Math.sin(t*1.9)*3.2; tilt = Math.sin(t*1.3)*0.9; }
  else if(curStage>=4){ lift = Math.sin(t*1.3)*2.4; tilt = Math.sin(t*0.9)*0.6; }
  else if(curStage>=1){ lift = Math.sin(t*1.4)*1.6; }
  if(now < flutterUntil){
    var f = 1-(flutterUntil-now)/1500;
    lift -= Math.sin(f*Math.PI)*13;
  }
  if(curStage>=1 || now<flutterUntil){
    setT("feeAlive", "translate(0 "+lift.toFixed(2)+") "+(tilt? rot(tilt, ORIGIN.feeAlive):""));
  } else setT("feeAlive", null);

  var amp=0, speed=0;
  if(curStage>=5){ amp=17; speed=11; }
  else if(curStage>=4){ amp=6; speed=3.4; }
  else if(curStage>=1){ amp=4; speed=1.4; }
  if(amp){
    var w = Math.sin(t*speed)*amp;
    setT("feeWingL", rot(-Math.abs(w)*0.5 - w*0.5, ORIGIN.feeWingL));
    setT("feeWingR", rot( Math.abs(w)*0.5 + w*0.5, ORIGIN.feeWingR));
  } else { setT("feeWingL", null); setT("feeWingR", null); }

  if(now < waveUntil){
    var p = 1-(waveUntil-now)/1500;
    var a = -28 + Math.sin(p*Math.PI*4)*14 - Math.sin(p*Math.PI)*8;
    setT("feeArmR", rot(a, ORIGIN.feeArmR));
  } else setT("feeArmR", null);

  if(curStage>=5 && now>nextFlutter){ flutterUntil = now+1500; nextFlutter = now+7000+Math.random()*9000; }
}
function startLoop(){ if(rafId==null) rafId=requestAnimationFrame(frame); }
function stopLoop(){ if(rafId!=null){ cancelAnimationFrame(rafId); rafId=null; } }

window.feeStage=function(st){
  if(!el("feeEyesClosed")) return;
  curStage = st;
  var awake = st>=2;
  el("feeEyesClosed").style.display = awake ? "none":"block";
  el("feeEyesOpen").style.display   = awake ? "block":"none";
  el("feeMouthCalm").style.display  = awake ? "none":"block";
  el("feeMouthSmile").style.display = awake ? "block":"none";

  if(st>=2) startBlink(); else stopBlink();
  if(st>=1){ nextFlutter = performance.now()+7000; startLoop(); }
  else { stopLoop(); setT("feeAlive",null); setT("feeWingL",null); setT("feeWingR",null); setT("feeArmR",null); }
};

/* Berührung: ab Stufe 4 winkt sie, darunter nur ein kleiner Gruß-Impuls */
window.feeTap=function(){
  if(curStage>=4){ waveUntil = performance.now()+1500; startLoop(); return "wave"; }
  return curStage>=1 ? "nod" : "none";
};

/* Gestalten: cfg = {hair,dress,face,head,extra} (Kategorie-IDs aus FEE_CATALOG) */
window.feeCustomize=function(cfg){
  var r=document.documentElement.style;
  if(cfg.hair && HAIR[cfg.hair]){ var h=HAIR[cfg.hair]; r.setProperty("--fee-hair-1",h[0]); r.setProperty("--fee-hair-2",h[1]); r.setProperty("--fee-hair-3",h[2]); }
  if(cfg.dress && DRESS[cfg.dress]){ var g=DRESS[cfg.dress]; r.setProperty("--fee-dress-1",g[0]); r.setProperty("--fee-dress-2",g[1]); r.setProperty("--fee-dress-3",g[2]); }
  if(cfg.face && FACE[cfg.face]){ var f=FACE[cfg.face]; r.setProperty("--fee-cheek",f.cheek); r.setProperty("--fee-lip",f.lip); }
  var heads={tiara:"feeHeadTiara", blume:"feeHeadBlume", schleife:"feeHeadSchleife", krone:"feeHeadKrone"};
  Object.keys(heads).forEach(function(k){ var e=el(heads[k]); if(e) e.style.display=(cfg.head===k)?"block":"none"; });
  var extras={keine:null, schmetterlinge:"feeExtraSchmetterlinge", glitzerspur:"feeExtraGlitzerspur", sternenstaub:"feeExtraSternenstaub"};
  Object.keys(extras).forEach(function(k){ var id=extras[k]; if(!id) return; var e=el(id); if(e) e.style.display=(cfg.extra===k)?"block":"none"; });
};
})();
