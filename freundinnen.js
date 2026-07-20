/* Freundinnen der Fee - Ylvies Zauberreise.
   Eigene gemeinsame Grafikquelle, nach dem Muster von tiere.js: bewusst als
   Inline-SVG (nicht <use>), damit jede Freundin ihre EIGENEN Farben tragen kann.
   Die Haupt-Fee (fee.js) faerbt ueber Root-CSS-Variablen - damit koennte man nicht
   mehrere unterschiedlich gefaerbte Feen gleichzeitig zeigen. Hier bringt jede
   Figur ihre Farben selbst mit.

   Jede Freundin: eigenes Design (Haar/Kleid/Fluegel/Schmuck), eigene kleine
   Geschichte (Befreiung) und eigene Chat-Persoenlichkeit (regelbasiert, sicher,
   ohne KI - wie beim Fee-Chat, Kindersicherheit).

   API:
     window.friendSvg(id)        -> SVG-String der Figur (viewBox 0 0 200 236)
     window.FRIEND_LIST          -> [{id,name,sub,unlock,theme}] fuer Karten/Reihenfolge
     window.FRIEND_NAME(id)      -> Anzeigename
     window.FRIEND_BY(id)        -> volles Datenobjekt (story, unlock, pitch ...)
     window.friendReply(id, txt) -> liebevolle, sichere Antwort im Ton der Freundin

   Bewusst KEINE Insekten (Ylvie hat Angst davor) - Themen sind Blueten, Sterne, Wasser. */
(function(){
"use strict";

/* ---------- gemeinsame Bausteine ---------- */

/* Freundliches Gesicht mit grossen Augen - immer warm. */
function gesicht(cfg){
  var eye=cfg.eye, cheek=cfg.cheek, lip=cfg.lip;
  return ''+
    /* Wangen */
    '<circle cx="89" cy="85" r="2.9" fill="'+cheek+'" opacity=".5"/>'+
    '<circle cx="111" cy="85" r="2.9" fill="'+cheek+'" opacity=".5"/>'+
    /* Augen (gross, glaenzend) */
    '<ellipse cx="94" cy="79" rx="3.1" ry="3.7" fill="#fff"/>'+
    '<circle cx="94" cy="79.6" r="2.2" fill="'+eye+'"/><circle cx="94" cy="79.9" r="1" fill="#20223a"/>'+
    '<circle cx="94.9" cy="78.3" r=".8" fill="#fff"/>'+
    '<ellipse cx="106" cy="79" rx="3.1" ry="3.7" fill="#fff"/>'+
    '<circle cx="106" cy="79.6" r="2.2" fill="'+eye+'"/><circle cx="106" cy="79.9" r="1" fill="#20223a"/>'+
    '<circle cx="106.9" cy="78.3" r=".8" fill="#fff"/>'+
    /* Wimpern zart */
    '<path d="M90.6 76.6 Q94 75.4 97.4 76.6 M102.6 76.6 Q106 75.4 109.4 76.6" stroke="'+cfg.brow+'" stroke-width=".9" fill="none" stroke-linecap="round"/>'+
    /* Naeschen */
    '<path d="M100 82 q1 1 0 2" stroke="#e0a48a" stroke-width=".9" fill="none" stroke-linecap="round"/>'+
    /* Laecheln */
    '<path d="M95.5 86.5 q4.5 4 9 0 q-4.5 2.4 -9 0 Z" fill="'+lip+'"/>';
}

/* Zwei-lappige Fluegel, hinter der Figur. c = Farbe, edge = Randfarbe. */
function fluegel(c, edge){
  return ''+
    '<g opacity=".88">'+
      '<path d="M95 118 C62 96 30 92 30 118 C30 142 64 142 95 126 Z" fill="'+c+'" stroke="'+edge+'" stroke-width="1"/>'+
      '<path d="M95 128 C64 128 40 150 48 176 C58 196 88 170 95 144 Z" fill="'+c+'" stroke="'+edge+'" stroke-width="1"/>'+
      '<path d="M105 118 C138 96 170 92 170 118 C170 142 136 142 105 126 Z" fill="'+c+'" stroke="'+edge+'" stroke-width="1"/>'+
      '<path d="M105 128 C136 128 160 150 152 176 C142 196 112 170 105 144 Z" fill="'+c+'" stroke="'+edge+'" stroke-width="1"/>'+
    '</g>';
}

/* Grundkoerper: langes Haar hinten, Kleid, Mieder, Arme, Hals, Kopf, Gesicht.
   Haar vorne + Schmuck kommt je Freundin oben drauf. */
function koerper(cfg){
  var hair=cfg.hair, hairHi=cfg.hairHi, skin=cfg.skin, dress=cfg.dress, bodice=cfg.bodice;
  return ''+
    /* Haar hinten (lang, voll) */
    '<path d="M80 66 C54 84 54 140 64 180 C68 190 76 187 82 182 C86 150 82 112 100 92 C118 112 114 150 118 182 C124 187 132 190 136 180 C146 140 146 84 120 66 Z" fill="'+hair+'"/>'+
    '<path d="M74 96 C68 122 70 152 78 178 M126 96 C132 122 130 152 122 178" stroke="'+hairHi+'" stroke-width="1" fill="none" opacity=".45"/>'+
    /* Kleid */
    '<path d="M100 100 C88 100 82 108 80 120 L68 205 C84 214 116 214 132 205 L120 120 C118 108 112 100 100 100 Z" fill="'+dress+'"/>'+
    '<path d="M100 104 L96 206 M100 104 L104 206" stroke="#fff" stroke-width="1" opacity=".35" fill="none" stroke-linecap="round"/>'+
    '<path d="M68 205 C84 214 116 214 132 205" fill="none" stroke="#fff" stroke-width="1.4" opacity=".5"/>'+
    /* Mieder */
    '<path d="M100 96 C91 96 86 103 88 116 C93 123 107 123 112 116 C114 103 109 96 100 96 Z" fill="'+bodice+'"/>'+
    '<path d="M93 102 C96 108 104 108 107 102" fill="none" stroke="#fff" stroke-width=".9" opacity=".5"/>'+
    /* Arme + Haende */
    '<path d="M90 116 C81 122 78 136 81 149" stroke="'+skin+'" stroke-width="5" fill="none" stroke-linecap="round"/>'+
    '<circle cx="81" cy="150" r="3.4" fill="'+skin+'"/>'+
    '<path d="M110 116 C119 122 122 136 119 149" stroke="'+skin+'" stroke-width="5" fill="none" stroke-linecap="round"/>'+
    '<circle cx="119" cy="150" r="3.4" fill="'+skin+'"/>'+
    /* Hals + Kopf */
    '<path d="M96 90 h8 v8 q-4 3 -8 0 Z" fill="'+skin+'"/>'+
    '<circle cx="100" cy="79" r="15" fill="'+skin+'"/>'+
    gesicht(cfg);
}

/* ---------- Kataloge der drei Freundinnen ---------- */

var FRIENDS = {

  /* --- Blütenfee: warm, sonnig, liebt alles Wachsende --- */
  bluete: {
    name:"Rosalie, die Blütenfee",
    kurz:"Rosalie",
    sub:"riecht nach Blumen und Sonne",
    theme:"#ff9ec6",
    unlock:20,
    pitch:1.65,
    art:function(){
      var cfg={hair:"#f0b86a", hairHi:"#fff0c0", skin:"#ffe3d0", dress:"#ff9ec6", bodice:"#ff7fb6",
               eye:"#7a5a2a", cheek:"#ff8fbf", lip:"#e5719a", brow:"#d59a4a", wing:"#ffe0ef", wingE:"#ffb6d6"};
      return fluegel(cfg.wing, cfg.wingE)+koerper(cfg)+
        /* Haar vorne, weiche Wellen */
        '<path d="M84 72 C80 58 92 53 100 53 C108 53 120 58 116 72 C110 62 106 60 100 60 C94 60 90 62 84 72 Z" fill="#f0b86a"/>'+
        '<path d="M84 71 C77 84 80 100 88 112 C82 118 86 126 91 118 C87 106 90 92 92 82 Z" fill="#f0b86a"/>'+
        '<path d="M116 71 C123 84 120 100 112 112 C118 118 114 126 109 118 C113 106 110 92 108 82 Z" fill="#f0b86a"/>'+
        /* Blütenkranz */
        blossom(88,60,"#ff86c4")+blossom(96,55,"#fff2a8")+blossom(104,55,"#c9a1ff")+blossom(112,60,"#8ff0d0")+
        /* schwebende Blütenblätter */
        '<g opacity=".9"><path d="M52 96 q-6 -5 -1 -10 q4 4 1 10 Z" fill="#ffb6d6"/>'+
        '<path d="M150 108 q6 -5 1 -10 q-4 4 -1 10 Z" fill="#ffd0a8"/>'+
        '<path d="M60 150 q-5 -4 -1 -8 q3 3 1 8 Z" fill="#ff9ec6"/></g>';
    }
  },

  /* --- Sternenfee: ruhig, träumerisch, kennt die Nacht --- */
  stern: {
    name:"Lumi, die Sternenfee",
    kurz:"Lumi",
    sub:"leuchtet sanft wie der Abendhimmel",
    theme:"#8fa0e0",
    unlock:60,
    pitch:1.35,
    art:function(){
      var cfg={hair:"#7b5fd6", hairHi:"#c9b6ff", skin:"#f3ddd0", dress:"#4f5fb0", bodice:"#3f4f9a",
               eye:"#3f4fa0", cheek:"#c98fd0", lip:"#c86fae", brow:"#6a4fc0", wing:"#d9e0ff", wingE:"#a6b6f0"};
      return fluegel(cfg.wing, cfg.wingE)+koerper(cfg)+
        /* silberne Sterne auf dem Kleid */
        '<g fill="#e8ecff" opacity=".9">'+starGlyph(92,150,3)+starGlyph(108,168,2.4)+starGlyph(98,188,2.6)+'</g>'+
        /* Haar vorne, seitlich gescheitelt */
        '<path d="M83 72 C78 57 93 52 100 52 C109 52 119 58 117 71 C112 61 106 59 100 59 C93 59 88 63 83 72 Z" fill="#7b5fd6"/>'+
        '<path d="M83 71 C75 85 79 102 87 114 C81 120 85 128 90 120 C86 108 89 92 91 82 Z" fill="#7b5fd6"/>'+
        '<path d="M117 71 C124 83 121 99 113 111 C119 117 115 125 110 117 C114 106 111 92 109 82 Z" fill="#7b5fd6"/>'+
        /* Sternen-Diadem */
        '<path d="M86 64 Q100 56 114 64" fill="none" stroke="#dfe6ff" stroke-width="1.6"/>'+
        '<g fill="#fff2a8">'+starGlyph(100,52,4)+'</g>'+
        '<g fill="#e8ecff">'+starGlyph(89,60,2.4)+starGlyph(111,60,2.4)+'</g>'+
        /* schwebende Sterne */
        '<g fill="#fff2a8" opacity=".95">'+starGlyph(52,100,3)+starGlyph(150,112,2.6)+starGlyph(58,152,2.2)+'</g>';
    }
  },

  /* --- Wellenfee: verspielt, quirlig, kommt aus dem Wasser --- */
  welle: {
    name:"Perla, die Wellenfee",
    kurz:"Perla",
    sub:"lacht wie plätscherndes Wasser",
    theme:"#5fd6e0",
    unlock:120,
    pitch:1.75,
    art:function(){
      var cfg={hair:"#3fb8b0", hairHi:"#b6fff0", skin:"#ffe6da", dress:"#4fd0e0", bodice:"#2fb6c9",
               eye:"#1a8a92", cheek:"#ff9ebf", lip:"#e5719a", brow:"#2f9a9a", wing:"#d6fbff", wingE:"#8fe6f0"};
      return fluegel(cfg.wing, cfg.wingE)+koerper(cfg)+
        /* Wellen-Saum am Kleid */
        '<path d="M70 198 q8 -8 16 0 t16 0 t16 0 t14 0" fill="none" stroke="#eafcff" stroke-width="2" opacity=".8"/>'+
        /* Haar vorne, wellig mit Locke */
        '<path d="M84 72 C79 57 93 52 100 52 C108 52 120 57 116 72 C110 62 106 60 100 60 C94 60 90 62 84 72 Z" fill="#3fb8b0"/>'+
        '<path d="M84 71 C76 84 80 101 87 113 C80 120 86 130 92 121 C86 112 89 96 92 82 Z" fill="#3fb8b0"/>'+
        '<path d="M116 71 C124 84 120 102 112 114 C120 120 114 132 108 122 C114 110 110 95 108 82 Z" fill="#3fb8b0"/>'+
        /* Muschel-Krone mit Perlen */
        '<path d="M91 61 C93 52 107 52 109 61 C104 58 96 58 91 61 Z" fill="#ffd9ef" stroke="#ff9ec6" stroke-width=".8"/>'+
        '<path d="M100 61 L100 55 M95 61 L96 56 M105 61 L104 56" stroke="#ff9ec6" stroke-width=".8"/>'+
        '<circle cx="100" cy="54" r="1.8" fill="#fff"/><circle cx="93" cy="58" r="1.3" fill="#fff"/><circle cx="107" cy="58" r="1.3" fill="#fff"/>'+
        /* schwebende Tropfen/Blasen */
        '<g fill="#bff2ff" opacity=".85"><circle cx="54" cy="102" r="4"/><circle cx="150" cy="116" r="3.4"/><circle cx="60" cy="150" r="2.8"/></g>'+
        '<g fill="#fff" opacity=".7"><circle cx="52.6" cy="100.6" r="1.2"/><circle cx="148.8" cy="114.8" r="1"/></g>';
    }
  }
};

/* kleine Blüte fuer den Blütenkranz */
function blossom(x,y,c){
  var p='';
  for(var i=0;i<5;i++){ var a=i/5*6.283; p+='<ellipse cx="'+(x+Math.cos(a)*3).toFixed(1)+'" cy="'+(y+Math.sin(a)*3).toFixed(1)+'" rx="2.2" ry="1.4" transform="rotate('+(i*72)+' '+(x+Math.cos(a)*3).toFixed(1)+' '+(y+Math.sin(a)*3).toFixed(1)+')" fill="'+c+'"/>'; }
  return '<g>'+p+'<circle cx="'+x+'" cy="'+y+'" r="1.6" fill="#ffe08a"/></g>';
}

/* fuenfzackiger Stern um (x,y) mit Radius r */
function starGlyph(x,y,r){
  var pts='', ri=r*0.42;
  for(var i=0;i<10;i++){ var rr=(i%2===0)?r:ri, a=-1.5708+i*0.6283;
    pts+=(x+Math.cos(a)*rr).toFixed(1)+','+(y+Math.sin(a)*rr).toFixed(1)+' '; }
  return '<polygon points="'+pts.trim()+'"/>';
}

/* ---------- Geschichten (Befreiung jeder Freundin) ---------- */
var STORIES = {
  bluete:[
    "Tief im Blütenwald hat dein Zauber jemanden geweckt ...",
    "Zwischen den Blumen sitzt eine kleine Fee mit einem Blütenkranz. Sie reibt sich die Augen: \"Oh! Hast DU mich geweckt?\"",
    "\"Ich bin Rosalie, die Blütenfee. Ich habe ganz lange geschlafen - aber deine Rechen-Zauberkraft hat mich gefunden!\"",
    "\"Willst du meine Freundin sein? Dann erzähl ich dir alles über Blumen und Sonne.\""
  ],
  stern:[
    "Als es dunkel wurde, hat dein Zauber einen Stern zum Leuchten gebracht ...",
    "Aus dem Licht steigt leise eine Fee mit Sternen im Haar. \"Wie schön ruhig es hier ist\", flüstert sie.",
    "\"Ich bin Lumi, die Sternenfee. Ich wohne im Abendhimmel und passe auf die Träume auf.\"",
    "\"Du hast mich mit deinem Fleiß herbeigerufen. Magst du mit mir Freundin sein?\""
  ],
  welle:[
    "Vom Ufer her hörst du ein Plätschern und ein helles Lachen ...",
    "Eine Fee mit türkisem Haar taucht aus dem Wasser auf und spritzt vor Freude. \"Hihi, endlich jemand zum Spielen!\"",
    "\"Ich bin Perla, die Wellenfee. Ich sammle Muscheln und Perlen und liebe alles, was glitzert.\"",
    "\"Deine Zauberkraft war so stark, dass sie mich bis hierher gerufen hat. Freundinnen?\""
  ]
};

/* ---------- Chat-Persoenlichkeiten (sicher, ohne KI) ---------- */
var LINES = {
  bluete:{
    self:"Ich bin Rosalie, die Blütenfee. Ich wohne mitten im Blütenwald.",
    fee:"Deine Fee ist meine allerbeste Freundin! Ohne sie hätten wir uns nie gefunden.",
    love:"Ohh, du bist so lieb wie eine frisch aufgeblühte Blume!",
    sad:"Komm, wir setzen uns ins weiche Gras. Bei mir darfst du ganz du selbst sein.",
    play:"Lass uns Blumen zählen! Jede Rechenaufgabe lässt bei mir eine neue Blüte wachsen.",
    secret:"Psst: Wenn du einer Blume ganz leise etwas sagst, flüstert sie es der Sonne weiter.",
    math:"Rechnen ist wie gießen - je öfter du übst, desto schöner blüht alles auf. Ich helf dir!",
    greet:"Hallo Ylvie! Ich hab dir schon eine Blume gepflückt.",
    fallback:["Riech mal - überall duftet es nach Blumen, wenn du da bist.",
      "Erzähl mir was Schönes, dann wachsen bei mir gleich zwei Blüten.",
      "Mit dir zu reden macht mich so fröhlich wie ein Sonnentag."]
  },
  stern:{
    self:"Ich bin Lumi, die Sternenfee. Ich lebe oben im Abendhimmel.",
    fee:"Deine Fee und ich winken uns jeden Abend zu - sie ist wunderbar.",
    love:"Das wärmt mein Sternenherz. Du funkelst heller als jeder Stern.",
    sad:"Schau nach oben - jeder Stern ist ein kleines Licht, das für dich leuchtet. Ich bin bei dir.",
    play:"Komm, wir suchen Sternbilder! Für jede Aufgabe zünde ich einen neuen Stern an.",
    secret:"Ein Geheimnis: Wenn du dir bei einer Sternschnuppe etwas wünschst, hört der Himmel zu.",
    math:"Zahlen sind wie Sterne - erst viele, dann erkennst du die Muster. Ganz ruhig, ich zeig es dir.",
    greet:"Guten Abend, Ylvie. Ich hab auf dich gewartet und dabei die Sterne gezählt.",
    fallback:["Ganz ruhig ... hörst du, wie still und schön es hier ist?",
      "Erzähl mir von deinem Tag, ich hör dir gern zu.",
      "Du bist tapfer gewesen. Träum heute Nacht etwas Schönes."]
  },
  welle:{
    self:"Ich bin Perla, die Wellenfee! Ich komme aus dem glitzernden Wasser.",
    fee:"Deine Fee ist toll! Wir haben zusammen schon ganz viele Muscheln gesammelt.",
    love:"Hihi, jetzt muss ich vor Freude im Wasser hüpfen! Ich hab dich auch lieb.",
    sad:"Weißt du was? Wasser trägt alles Schwere fort. Atme aus - ich bin bei dir.",
    play:"Juhu, spielen! Für jede Aufgabe tauche ich eine neue Perle für dich hoch.",
    secret:"Geheimnis: In jeder Muschel wohnt ein winziges Lachen. Deins klingt am schönsten.",
    math:"Rechnen ist wie Wellen zählen - eins nach dem anderen, plitsch, platsch! Ich helf dir.",
    greet:"Hallooo Ylvie! *spritz* Oh, jetzt bist du ein bisschen nass. Hihi!",
    fallback:["Plitsch-platsch - erzähl mir mehr, das macht Spaß!",
      "Ich hab eine glänzende Muschel für dich gefunden. Magst du sie?",
      "Mit dir zu quatschen ist wie im Wasser planschen - einfach schön."]
  }
};

/* ---------- oeffentliche API ---------- */
window.friendSvg=function(id){
  var f=FRIENDS[id]; if(!f) return '';
  return '<svg viewBox="0 0 200 236" width="100%" height="100%">'+f.art()+'</svg>';
};
window.FRIEND_LIST=Object.keys(FRIENDS).map(function(id){
  var f=FRIENDS[id];
  return {id:id, name:f.name, kurz:f.kurz, sub:f.sub, unlock:f.unlock, theme:f.theme};
});
window.FRIEND_NAME=function(id){ return FRIENDS[id]?FRIENDS[id].name:""; };
window.FRIEND_KURZ=function(id){ return FRIENDS[id]?FRIENDS[id].kurz:""; };
window.FRIEND_BY=function(id){ var f=FRIENDS[id]; if(!f) return null;
  return {id:id, name:f.name, kurz:f.kurz, sub:f.sub, unlock:f.unlock, theme:f.theme, pitch:f.pitch, story:STORIES[id]||[]}; };

window.friendReply=function(id, input){
  var L=LINES[id]; if(!L) return "";
  var s=(input||"").toLowerCase();
  function has(){ for(var i=0;i<arguments.length;i++){ if(s.indexOf(arguments[i])>=0) return true; } return false; }
  function hasWord(){ for(var i=0;i<arguments.length;i++){
    if(new RegExp("(^|[^a-zäöüß])"+arguments[i]+"([^a-zäöüß]|$)").test(s)) return true; } return false; }
  var negiert=has("nicht","kein");
  if(has("wie heißt","wie heisst","dein name","heißt du","heisst du","wer bist")) return L.self;
  if(has("fee","prinzessin")) return L.fee;
  if(has("rechn","mathe","zahl","plus","minus","hilf","einmaleins")) return L.math;
  if(has("spiel","langweilig","was machen","spielen")) return L.play;
  if(has("geheim")) return L.secret;
  if(has("traurig","weinen","angst","allein","einsam","müde","muede")) return L.sad;
  if(!negiert && has("lieb","hübsch","huebsch","schön","schoen","süß","suess","beste","mag dich")) return L.love;
  if(hasWord("hallo","hey","hallöchen","moin","servus")||has("guten tag","guten abend")) return L.greet;
  return L.fallback[Math.floor(Math.random()*L.fallback.length)];
};
})();
