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
   Interaktion:       feeTap()          -> von Berührung aufrufen (winkt ab Stufe 4) */
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

/* WICHTIG - technische Grundlage der Bewegung:
   Die Fee steht einmal in <defs> und wird überall per <use> eingebunden.
   Nachgemessen: CSS-Animationen auf dem Original wirken sich NICHT auf die
   <use>-Kopien aus (sie liefen, aber die gezeichnete Fee stand still).
   Direkt gesetzte Transformationen dagegen kommen zuverlässig in allen Kopien an.
   Deshalb wird die Bewegung hier von einer zentralen Schleife gerechnet und als
   SVG-transform-Attribut gesetzt - eine Schleife, alle Kopien bewegen sich synchron. */
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

  '<g id="feeArt"><g id="feeAlive">'+
    /* Flügel */
    '<g id="feeWingL" opacity=".82">'+
      '<path d="M96 118 C60 96 44 108 46 128 C48 150 74 150 96 128 Z" fill="url(#fWing)" stroke="#ffd0f2" stroke-width="1"/>'+
      '<path d="M96 128 C66 120 52 138 58 156 C64 172 86 160 96 140 Z" fill="url(#fWing)" stroke="#ffd0f2" stroke-width="1"/>'+
    '</g>'+
    '<g id="feeWingR" opacity=".82">'+
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
    /* Arme + Hände (rechter Arm eigene Gruppe, damit er winken kann) */
    '<path d="M92 114 C82 120 78 134 80 146" stroke="url(#fSkin)" stroke-width="6" fill="none" stroke-linecap="round"/>'+
    '<circle cx="80" cy="147" r="4" fill="url(#fSkin)"/>'+
    '<g id="feeArmR">'+
      '<path d="M108 114 C118 120 122 134 120 146" stroke="url(#fSkin)" stroke-width="6" fill="none" stroke-linecap="round"/>'+
      '<circle cx="120" cy="147" r="4" fill="url(#fSkin)"/>'+
    '</g>'+
    /* Hals + Kopf */
    '<rect x="96" y="90" width="8" height="12" rx="4" fill="url(#fSkin)"/>'+
    '<circle cx="100" cy="80" r="15" fill="url(#fSkin)"/>'+
    '<circle id="feeCheekL" cx="91" cy="83" r="3.2" style="fill:var(--fee-cheek)" opacity=".55"/>'+
    '<circle id="feeCheekR" cx="109" cy="83" r="3.2" style="fill:var(--fee-cheek)" opacity=".55"/>'+
    /* Augen geschlossen (Stufe 0-1, und kurz beim Blinzeln) */
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
    /* Kopfschmuck (nur einer sichtbar) */
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
  '</g></g>'+
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

/* Eine Schleife für alle Bewegungen. Setzt transform-Attribute direkt am Original -
   das kommt (nachgemessen) in allen <use>-Kopien an. */
function frame(now){
  rafId = requestAnimationFrame(frame);
  var t = now/1000;

  /* Körper: ab Stufe 1 atmen, ab Stufe 4 schweben, ab Stufe 5 lebhafter */
  var lift=0, tilt=0;
  if(curStage>=5){ lift = Math.sin(t*1.9)*3.2; tilt = Math.sin(t*1.3)*0.9; }
  else if(curStage>=4){ lift = Math.sin(t*1.3)*2.4; tilt = Math.sin(t*0.9)*0.6; }
  else if(curStage>=1){ lift = Math.sin(t*1.4)*1.6; }
  if(now < flutterUntil){                       // gelegentliches Hochflattern
    var f = 1-(flutterUntil-now)/1500;
    lift -= Math.sin(f*Math.PI)*13;
  }
  if(curStage>=1 || now<flutterUntil){
    setT("feeAlive", "translate(0 "+lift.toFixed(2)+") "+(tilt? rot(tilt, ORIGIN.feeAlive):""));
  } else setT("feeAlive", null);

  /* Flügel: reglos -> leicht -> deutlich -> schneller Schlag */
  var amp=0, speed=0;
  if(curStage>=5){ amp=17; speed=11; }
  else if(curStage>=4){ amp=6; speed=3.4; }
  else if(curStage>=1){ amp=4; speed=1.4; }
  if(amp){
    var w = Math.sin(t*speed)*amp;
    setT("feeWingL", rot(-Math.abs(w)*0.5 - w*0.5, ORIGIN.feeWingL));
    setT("feeWingR", rot( Math.abs(w)*0.5 + w*0.5, ORIGIN.feeWingR));
  } else { setT("feeWingL", null); setT("feeWingR", null); }

  /* Winken (ab Stufe 4, nach Berührung) */
  if(now < waveUntil){
    var p = 1-(waveUntil-now)/1500;
    var a = -28 + Math.sin(p*Math.PI*4)*14 - Math.sin(p*Math.PI)*8;
    setT("feeArmR", rot(a, ORIGIN.feeArmR));
  } else setT("feeArmR", null);

  /* Ab Stufe 5 flattert sie ab und zu von allein hoch */
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
