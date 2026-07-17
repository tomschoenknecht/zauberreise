/* Haustiere für Ylvies Zauberreise - eigene gemeinsame Grafikquelle.
   Bewusst als Inline-SVG (nicht <use>), weil sich bei <use>-Kopien nachweislich
   keine Animationen/Änderungen zuverlässig übertragen (siehe ENTWICKLUNGSLOG).

   petSvg(id, stufe)  -> SVG-String. Stufe: 0 = Ei, 1 = Baby, 2 = groß
   PET_CATALOG        -> Liste zum Adoptieren (id, name, kosten, Beschreibung) */
(function(){
"use strict";

var PETS = {
  wolkenhase: {
    name:"Wolkenhase", cost:30, sub:"weich wie eine Wolke",
    c1:"#eaf6ff", c2:"#b9dcf5", c3:"#7fb8e0", eiPunkt:"#b9dcf5",
    art:function(g){
      return ''+
      /* Ohren */
      '<ellipse cx="-9" cy="-30" rx="5" ry="15" fill="'+this.c1+'" stroke="'+this.c3+'" stroke-width="1.5"/>'+
      '<ellipse cx="9" cy="-30" rx="5" ry="15" fill="'+this.c1+'" stroke="'+this.c3+'" stroke-width="1.5"/>'+
      '<ellipse cx="-9" cy="-30" rx="2.2" ry="9" fill="#ffd0ee"/>'+
      '<ellipse cx="9" cy="-30" rx="2.2" ry="9" fill="#ffd0ee"/>'+
      /* Körper + Kopf */
      '<ellipse cx="0" cy="12" rx="20" ry="16" fill="'+this.c1+'" stroke="'+this.c3+'" stroke-width="1.5"/>'+
      '<circle cx="0" cy="-8" r="17" fill="'+this.c1+'" stroke="'+this.c3+'" stroke-width="1.5"/>'+
      '<circle cx="-16" cy="16" r="6" fill="'+this.c2+'"/><circle cx="16" cy="16" r="6" fill="'+this.c2+'"/>'+
      (g?'<circle cx="22" cy="4" r="7" fill="'+this.c2+'" stroke="'+this.c3+'" stroke-width="1.2"/>':'')+
      gesicht(this.c3);
    }
  },
  sternkatze: {
    name:"Sternenkätzchen", cost:35, sub:"funkelt im Dunkeln",
    c1:"#e9d8ff", c2:"#c9a1ff", c3:"#8b3fd6", eiPunkt:"#c9a1ff",
    art:function(g){
      return ''+
      '<path d="M-16,-18 L-12,-32 L-3,-22 Z" fill="'+this.c1+'" stroke="'+this.c3+'" stroke-width="1.5"/>'+
      '<path d="M16,-18 L12,-32 L3,-22 Z" fill="'+this.c1+'" stroke="'+this.c3+'" stroke-width="1.5"/>'+
      '<ellipse cx="0" cy="12" rx="19" ry="16" fill="'+this.c1+'" stroke="'+this.c3+'" stroke-width="1.5"/>'+
      '<circle cx="0" cy="-8" r="17" fill="'+this.c1+'" stroke="'+this.c3+'" stroke-width="1.5"/>'+
      '<path d="M18,16 Q30,10 26,-2" fill="none" stroke="'+this.c2+'" stroke-width="5" stroke-linecap="round"/>'+
      (g?'<path d="M0,-40 l2.2,5 5,2.2 -5,2.2 -2.2,5 -2.2,-5 -5,-2.2 5,-2.2Z" fill="#ffe08a"/>':'')+
      gesicht(this.c3);
    }
  },
  glitzerdrache: {
    name:"Glitzerdrache", cost:45, sub:"klein, aber mutig",
    c1:"#ffd9f0", c2:"#ff9ecf", c3:"#c23f8e", eiPunkt:"#ff9ecf",
    art:function(g){
      return ''+
      (g?'<path d="M-18,-4 C-34,-18 -34,4 -20,10 Z" fill="'+this.c2+'" stroke="'+this.c3+'" stroke-width="1.4" opacity=".9"/>'+
          '<path d="M18,-4 C34,-18 34,4 20,10 Z" fill="'+this.c2+'" stroke="'+this.c3+'" stroke-width="1.4" opacity=".9"/>':'')+
      '<path d="M-6,-26 L-3,-34 L0,-26 Z" fill="#ffe08a"/>'+
      '<path d="M4,-26 L7,-33 L10,-26 Z" fill="#ffe08a"/>'+
      '<ellipse cx="0" cy="12" rx="19" ry="16" fill="'+this.c1+'" stroke="'+this.c3+'" stroke-width="1.5"/>'+
      '<circle cx="0" cy="-8" r="17" fill="'+this.c1+'" stroke="'+this.c3+'" stroke-width="1.5"/>'+
      '<path d="M18,18 Q32,16 30,4" fill="none" stroke="'+this.c2+'" stroke-width="5" stroke-linecap="round"/>'+
      gesicht(this.c3);
    }
  },
  einhorn: {
    name:"Einhorn-Fohlen", cost:55, sub:"das seltenste von allen",
    c1:"#fff6fb", c2:"#ffd0ee", c3:"#c97ce0", eiPunkt:"#ffe08a",
    art:function(g){
      return ''+
      '<path d="M0,-24 L2,-42 L5,-24 Z" fill="#ffe08a" stroke="#e6a52f" stroke-width="1"/>'+
      '<path d="M-14,-20 C-20,-30 -8,-30 -6,-22 Z" fill="'+this.c2+'"/>'+
      '<ellipse cx="0" cy="12" rx="20" ry="16" fill="'+this.c1+'" stroke="'+this.c3+'" stroke-width="1.5"/>'+
      '<circle cx="0" cy="-8" r="17" fill="'+this.c1+'" stroke="'+this.c3+'" stroke-width="1.5"/>'+
      '<path d="M-10,-18 C-2,-26 8,-24 12,-16" fill="none" stroke="'+this.c2+'" stroke-width="4" stroke-linecap="round"/>'+
      '<path d="M18,14 Q32,8 28,-4" fill="none" stroke="'+this.c2+'" stroke-width="5" stroke-linecap="round"/>'+
      (g?'<g fill="#ffe08a"><path d="M-26,-6 l1.4,3 3,1.4 -3,1.4 -1.4,3 -1.4,-3 -3,-1.4 3,-1.4Z"/>'+
          '<path d="M26,-12 l1.2,2.6 2.6,1.2 -2.6,1.2 -1.2,2.6 -1.2,-2.6 -2.6,-1.2 2.6,-1.2Z"/></g>':'')+
      gesicht(this.c3);
    }
  }
};

/* Gemeinsames Gesicht: große Augen, Wangen, Lächeln - immer freundlich. */
function gesicht(dunkel){
  return ''+
  '<ellipse cx="-6" cy="-9" rx="2.8" ry="3.4" fill="#fff"/><circle cx="-6" cy="-8.5" r="1.9" fill="#3a2050"/>'+
  '<circle cx="-5.2" cy="-9.6" r=".7" fill="#fff"/>'+
  '<ellipse cx="6" cy="-9" rx="2.8" ry="3.4" fill="#fff"/><circle cx="6" cy="-8.5" r="1.9" fill="#3a2050"/>'+
  '<circle cx="6.8" cy="-9.6" r=".7" fill="#fff"/>'+
  '<circle cx="-12" cy="-3" r="2.6" fill="#ff9ec6" opacity=".6"/>'+
  '<circle cx="12" cy="-3" r="2.6" fill="#ff9ec6" opacity=".6"/>'+
  '<path d="M-3,-2 q3,3 6,0" fill="none" stroke="'+dunkel+'" stroke-width="1.4" stroke-linecap="round"/>';
}

/* Ei: schlicht, mit Tupfen in der Tierfarbe. Bei "fast geschlüpft" mit Riss. */
function eiSvg(pet, fastGeschluepft){
  return '<ellipse cx="0" cy="0" rx="22" ry="28" fill="#fff8ee" stroke="#e0b87a" stroke-width="2"/>'+
    '<circle cx="-8" cy="-8" r="4" fill="'+pet.eiPunkt+'" opacity=".8"/>'+
    '<circle cx="7" cy="2" r="5" fill="'+pet.eiPunkt+'" opacity=".7"/>'+
    '<circle cx="-4" cy="12" r="3.5" fill="'+pet.eiPunkt+'" opacity=".75"/>'+
    '<circle cx="10" cy="-14" r="3" fill="'+pet.eiPunkt+'" opacity=".6"/>'+
    (fastGeschluepft ? '<path d="M-22,-2 L-10,3 L-2,-4 L8,3 L18,-3" fill="none" stroke="#c9a15f" stroke-width="1.6"/>' : '');
}

/* Haupt-Zeichenfunktion. stufe: 0 = Ei, 1 = Baby, 2 = groß */
window.petSvg=function(id, stufe, fastGeschluepft){
  var p=PETS[id]; if(!p) return '';
  var inner, box;
  if(stufe<=0){ inner=eiSvg(p, !!fastGeschluepft); box='translate(50,52)'; }
  else {
    var s = (stufe>=2) ? 1 : 0.68;                 // Baby ist kleiner
    inner = '<g transform="scale('+s+')">'+p.art.call(p, stufe>=2)+'</g>';
    box='translate(50,56)';
  }
  return '<svg viewBox="0 0 100 100" width="100%" height="100%"><g transform="'+box+'">'+inner+'</g></svg>';
};

window.PET_CATALOG = Object.keys(PETS).map(function(id){
  return {id:id, name:PETS[id].name, cost:PETS[id].cost, sub:PETS[id].sub, c2:PETS[id].c2};
});
window.PET_NAME=function(id){ return PETS[id]?PETS[id].name:""; };
})();
