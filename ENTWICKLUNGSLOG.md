# Entwicklungslog & Lernstand – Ylvies Zauberreise

Kontinuierliche Feedback-Schleife: Ylvies Rückmeldungen und Erkenntnisse aus ihrem
Lernstand und ihrer Arbeitsweise fließen hier ein und steuern Entwicklung und Design.
Die App muss stark an Ylvies Realität und Möglichkeiten angepasst werden.

## Wie wir das nutzen
- Nach jeder Nutzung: Was hat Spaß gemacht? Was war zu schwer/zu leicht/langweilig?
  Wo hat sie aufgegeben? Was hat sie zum Weitermachen gebracht?
- Beobachtungen zum Rechnen: Wo hakt es (Zehnerübergang, Einmaleins ...)? Zählt sie
  an den Fingern? Welche Aufgaben löst sie sicher, welche gar nicht?
- Daraus je Iteration konkrete Änderungen ableiten und hier festhalten.

## Lernstand-Dokumentation
Die App speichert Ylvies Fortschritt lokal (welche Fähigkeiten geübt, Trefferquote,
Wiederholungsbedarf). Ziel: Stärken/Schwächen sichtbar machen und die Aufgaben
automatisch anpassen. Exportierbare Zusammenfassung ist geplant, damit die
Erkenntnisse hierher zurückfließen können.

---

## Log

### 2026-07-15 – Projektstart
- Konzept, Persona, Name (Ylvies Zauberreise) und MVP-Schnitt stehen.
- Belohnungs-Rückgrat "Befreiung der Fee" ergänzt (Toms Idee).
- Erster Baustein: Countdown-Sneak-Preview bis Freitag 15:00, Namensvergabe ab Donnerstag.
- Countdown-Seite (index.html) gebaut und funktional getestet: alle drei Zustaende
  laufen (Countdown -> zeigt "Nur noch 2 Tage"; Naming -> Name wird gespeichert und
  angezeigt; Open -> greift gespeicherten Namen auf, "Tuer ist offen"). Namens-
  Speicherung uebersteht Seitenwechsel (localStorage).
- Hinweis: Gerendertes Screenshot in dieser Umgebung nicht moeglich (Aufnahme haengt
  bei Blur/Filter-Effekten). Optische Feinabstimmung der Fee-/Tuer-Grafik nach Toms
  erstem Blick.
- Offen: Feedback von Ylvie zum ersten Anblick der Seite; Deployment (GitHub Pages
  oder Datei aufs Tablet) durch Tom.

### 2026-07-15 – Countdown-Seite überarbeitet (Toms Feedback)
- Heller, mehr Rosa und Lila; Fee deutlich größer, detaillierter, Barbie-Look
  (lange blond-rosa Haare, Tiara, Glanzkleid, große schimmernde Flügel, Gesicht
  mit Wimpern/Wangen/Lippen), schläft noch verzaubert.
- "In ... beginnt Ylvies Zauberreise" jetzt als live laufender Satz-Countdown.
- Echte Umlaute überall in der Oberfläche (Dauerregel).
- Geheimnisvolles Kichern: ambientes Kichern in unregelmäßigen Abständen; beim
  Antippen der Fee kichert sie und wackelt kurz. Funktional getestet.
- Kichern auf Toms Wunsch geändert: echte Kichertöne statt Schrift. Synthetisch
  per Web Audio erzeugt (5-7 stimmhafte Silben, steigend-fallende Tonhöhe, zwei
  Formant-Filter für Vokal-"i"-Charakter, Kicher-Rhythmus). Ton wird beim ersten
  Antippen freigeschaltet (Browser-Regel gegen Auto-Ton). Kein Text mehr.
  Hinweis: kein echtes Kind-Sample - falls gewünscht, echte Audiodatei einbetten.
- Tom-Feedback: "klingt nicht echt genug". Bewertung: synthetische Stimme aus
  Oszillatoren erreicht kein echtes Kichern, weiteres Feintuning lohnt nicht.
  Entscheidung: echte Aufnahme. ERLEDIGT (siehe unten).

### 2026-07-15 – Echtes Kichern eingebaut
- Aufnahme-Seite gebaut (aufnahme.html): nimmt über den Browser auf, mit Pegelanzeige
  und Vorschau "Als Fee anhören". Nur über http://localhost erreichbar (Browser
  erlauben Mikrofon nicht per Datei-Aufruf).
- Tom hat aufgenommen: kichern-1.webm (6,9 Sek.). Analyse ergab drei Takes darin:
  2,25-3,32 / 3,98-5,10 / 5,43-6,45 Sek.
- Alle drei Takes werden genutzt: die Fee kichert abwechselnd, nie zweimal
  hintereinander derselbe Take, dazu leichte Zufallsvariation der Tonhöhe.
- Tonhöhe um Faktor 1,38 angehoben (Feenstimme), Lautstärke 1,8-fach (Aufnahme war
  leise), sanftes Ein-/Ausblenden gegen Knackser. Länge je Kichern ca. 0,75-0,8 Sek.
- Aufnahme steckt als Base64 in kichern.js und ist damit fest Teil der Seite -
  läuft auch offline. WICHTIG: kichern.js muss beim Hosten mit hochgeladen werden.
- Synthetischer Klang vollständig entfernt.
- Getestet: Base64 lädt, dekodiert sauber (6,9 Sek., Stereo), Ausschnitte liegen im
  gültigen Bereich, keine Konsolenfehler. Klangliche Beurteilung durch Tom.
- Offen weiterhin: Toms optische Abnahme der Fee; danach das Land hinter der Tür.

### 2026-07-15 – Das Land hinter der Tür gebaut (app.html)
Tag-1-Kern steht und ist durchgetestet:
- **Zauberkarte** mit 4 Inseln: Insel der Funkelsteine (Mengen erkennen),
  Das Zehnerhaus (Ergänzen zum Zehner), Die Regenbogenbrücke (Zehnerübergang),
  Der Zaubermarkt (Geld).
- **Würfelhaus-Didaktik umgesetzt:** Würfelbilder blitzen kurz auf und verschwinden
  (Erkennen statt Abzählen); Zahlen über 6 immer als 5 + Rest (Kraft der Fünf);
  Zehnerfeld macht 5 und 10 sichtbar; Zehnerübergang mit Ergänzen zum Zehner.
  Getestet: "6 + 5" → Tipp "Mach erst die Zehn voll: 6 + 4 = 10. Dann bleibt noch
  1 übrig: 10 + 1 = 11." Mathematisch korrekt.
- **Erinnerungszauber:** je Fähigkeit Stärke 0-5 und Fälligkeit; Intervalle von
  2 Min bis 3 Tage. Getestet: nach richtiger Antwort Stärke 0→1, Wiederholung
  automatisch auf +10 Min gelegt. Fällige Inseln "rufen" auf der Karte.
- **Frust abfangen bestätigt:** kein hartes Falsch. 1. Fehler → "Fast! Schau mal ..."
  plus Tipp plus Mengenbild, neuer Versuch möglich. 2. Fehler → "Das machen wir
  zusammen", Lösung wird gezeigt, trotzdem 1 Kristall, dann weiter.
- **Belohnung:** 2 Kristalle beim ersten Versuch, 1 mit Hilfe. Freischalt-Stufen:
  10 = Farbe kehrt zurück, 25 = Augen auf und Lächeln, 45 = sie kann sprechen
  (Sprachausgabe). Fortschrittsbalken zeigt den Weg zur nächsten Stufe.
- Lernstand wird lokal gespeichert (Fähigkeitsstärke, Trefferquote, Fälligkeit).

Offen: echte Kicher-Aufnahme; Deployment für Ylvies Tablet; Toms optische Abnahme.

### 2026-07-15 – Hintergrundmusik und Kichern nur auf Klick
- Tom hat eigene Musik geliefert (Pixabay): mirostar-magic-fantasy-fairy-tale-music-560304.mp3,
  1:51 lang, läuft als Endlosschleife auf der Landingpage. Ziel: Vorfreude erhöhen.
- Als Datei eingebunden (nicht als Base64) - 3,4 MB wären inline zu viel. WICHTIG:
  Die MP3 muss beim Hosten mitgeliefert werden.
- Musik startet erst bei der ersten Berührung (Browser verbieten Ton von allein) und
  blendet dann über 2,5 Sek. sanft von 0 auf 30 Prozent ein.
- Ton-Schalter oben rechts (Lautsprecher-Symbol), Zustand wird gespeichert.
- Beim Kichern zieht die Musik kurz auf 10 Prozent zurück und kommt danach wieder hoch,
  damit das Kichern trägt.
- Tom-Wunsch umgesetzt: Kichern NUR noch beim Antippen der Fee. Das ambiente Kichern
  in Intervallen ist entfernt. Zusätzlich Überlappungsschutz - schnelles Mehrfachtippen
  löst kein Stapeln aus.
- Getestet: vor Berührung stumm, danach Einblendung auf 0,30, Schleife aktiv, kein
  automatisches Kichern über 6 Sek. Beobachtung, Duck greift, Schalter aus/an sauber,
  keine Konsolenfehler.
- Die vier selbst erzeugten Musik-Varianten (musik.html) werden damit nicht gebraucht,
  bleiben aber als Alternative liegen.

### 2026-07-15 – App-Neubau nach Toms Feedback ("neuer Versuch, neues Glück")
Toms Kritik: alte Fee oben links, keine Eingangsgeschichte, zu flaches Rosa,
zu wenig funkelig, mehr im Stil von Avatar World / Toca Boca / Animal Crossing.
Umgesetzt:
- **fee.js als EINE gemeinsame Fee-Quelle** angelegt (SVG-Symbol #feeArt + feeStage()).
  Damit nie wieder eine veraltete Fee-Kopie irgendwo hängt. app.html nutzt sie
  jetzt (Kopfzeile, Story, Level-up). Getestet: neue Fee erscheint überall.
- **Eingangsgeschichte** (5 Beats zum Durchtippen): Ylvie tritt durch die Tür, das
  Land ist still, die Fee schläft verzaubert, Rechnen = Zauberkraft, die sie weckt.
  Endet mit der Challenge-Frage und Button "Ja! Ich nehme die Challenge an!".
  Mit Funkel-Ausbruch beim Annehmen. Läuft einmalig (Flag yz_introSeen), danach
  direkt zur Karte. Namens-Formulierung robust mit/ohne vergebenen Namen.
- **Funkeliger:** tiefer, mehrfarbiger Verlauf (Lila/Pink/Türkis/Gold) statt flachem
  Rosa, Sternenhimmel + aufsteigende Glitzersterne, Glanz auf Karten/Kopfzeile.
- **Abenteuerkarte** statt Liste: bunte, runde Insel-Knoten im Zickzack-Pfad, je Insel
  eigene kräftige Farbe (Pink/Lila/Türkis/Gold), fällige Inseln hüpfen und rufen.
- Aufgaben-Engine, Erinnerungszauber, Frust-Abfangen, Belohnung, Musik + Kichern
  (nur auf Klick) unverändert übernommen und erneut getestet.
Getestet: Story komplett, Challenge-Annahme, Karte mit 4 farbigen Inseln, Aufgabe
lösen, Kristalle 8->10, Freischaltung Stufe 1 (Fee bekommt Farbe), keine Fehler.
Optische Beurteilung wieder durch Tom (Screenshot hier nicht möglich).

Offen (nächste Schritte laut Priorisierung): Zauber-Salon (Fee selbst gestalten),
weitere Freischalt-Stufen, Zahlenraum 100 + Einmaleins, Zauber-Fragebogen, echte
Kicher-Aufnahme falls gewünscht, Deployment.

### 2026-07-15 – Deployment auf GitHub Pages
Eigenes Repository tomschoenknecht/zauberreise angelegt (getrennt vom Gartenplaner),
GitHub Pages aus main/root aktiviert. Live geprüft (HTTP 200): Landingpage, App,
fee.js, kichern.js, Musikdatei. Damit läuft der Countdown jetzt dauerhaft, unabhängig
von Toms Rechner oder einer laufenden Chat-Sitzung.
- Landingpage: https://tomschoenknecht.github.io/zauberreise/index.html
- Lern-App: https://tomschoenknecht.github.io/zauberreise/app.html
Für künftige Änderungen: lokal bearbeiten, dann im Projektordner committen und
pushen (git add -A / git commit / git push) - Pages baut automatisch neu, meist
innerhalb 1-2 Minuten live.

### 2026-07-15 – Namensvergabe auf Do 15 Uhr + Story-Erweiterung + Zauber-Salon
Auf Toms Wunsch:
- Namensvergabe (index.html) von "Donnerstag 00:00" auf "Donnerstag 15:00" verschoben.
- Eingangsgeschichte um zwei Sätze erweitert: die 6-Wochen-Klammer ("wir werden
  zusammen Abenteuer erleben, ich erwache Stück für Stück, wenn du mir hilfst")
  und das Schmink-/Anzieh-Versprechen für später. Getestet: alle 7 Beats laufen
  korrekt durch bis zur Challenge-Frage.
- **Zauber-Salon gebaut** (Toms Kernidee: Fee selbst gestalten). fee.js zu einem
  parametrisierbaren System umgebaut: Haare/Kleid als CSS-Variablen-Farbverläufe,
  Wangen/Lippen als Farbvariable, Kopfschmuck (Tiara/Blütenkranz/Schleife/große
  Krone) und Extra-Zauber (Schmetterlinge/Glitzerspur/Sternenstaub) als
  austauschbare SVG-Gruppen. Katalog mit 5 Kategorien, ca. 19 Kombinationen,
  gestaffelte Kristallpreise (0-25). Salon schaltet sich erst mit Fee-Stufe 1
  frei (narrativ: "ich brauche erst meine Farbe zurück") - koppelt Fortschritt
  und Gestalten sauber aneinander.
  Getestet: Kauf mit ausreichend Kristallen (Abzug korrekt, Farbe wechselt sofort
  global inkl. Kopfzeilen-Fee), Kauf bei zu wenig Kristallen wird abgelehnt ohne
  Abzug, bereits gekaufte Artikel lassen sich kostenlos erneut anziehen,
  Kopfschmuck/Extra schließen sich pro Kategorie gegenseitig aus (nur ein Item
  sichtbar). Keine Konsolenfehler.
Damit ist der wichtigste noch fehlende Baustein aus Toms Prioritätenliste
umgesetzt. Bleibt offen: weitere Freischalt-Stufen (Bewegung/Fliegen),
Zahlenraum 100 + Einmaleins, Zauber-Fragebogen, geheime Eigenschaften,
großer selbst definierter Wunsch.

### 2026-07-15 – Testmodus (getrennter Speicher für Toms Ausprobieren)
Tom will die App laufend selbst ausprobieren, ohne Ylvies Fortschritt zu
verändern. Kein Account-System gebaut (würde Server/Login erfordern, passt nicht
zur bewusst account-losen, rein lokalen Architektur) - stattdessen ein
URL-Parameter-Testmodus:
- ?test=1 (index.html oder app.html) nutzt eigene localStorage-Schlüssel mit
  Suffix "_test", zeigt ein gelbes TESTMODUS-Banner, wird beim Wechsel von
  Landingpage zu App automatisch mitgenommen.
- ?reset=1 auf index.html löscht NUR den echten (nicht-Test) Spielstand und
  räumt den Parameter aus der URL - gedacht für Freitag kurz vor Ylvies Start,
  damit egal was Tom vorher getestet hat, sie bei null anfängt.
Getestet: echter Spielstand (33 Kristalle, Name "Luna", Intro gesehen) blieb
während eines kompletten Testdurchlaufs im Testmodus unverändert; Testmodus
startet unabhängig bei null; Reset löschte ausschließlich die echten Schlüssel,
Testdaten blieben unangetastet. Keine Konsolenfehler.
Nächstes Mal für Tom: zum Ausprobieren immer den ?test=1-Link nutzen, kurz vor
Freitag 15 Uhr einmal den ?reset=1-Link öffnen.

### 2026-07-15 – Schatzkarte statt Liste
Tom-Feedback: "die Zauberkarte ist langweilig, mach eine richtige Schatzkarte
auf verschiedenen Inseln draus." Umgesetzt: die vertikale Insel-Liste ist einem
echten SVG-Kartenbild gewichen - Pergament-Hintergrund mit doppeltem Rand und
Alterungsflecken, Kompassrose oben rechts, ein gepunkteter Schatzpfad, der sich
in Kurven durch die Landschaft schlängelt, fünf frei im Raum verteilte
Insel-Blobs (eigene Farbe je Insel, Symbol im weißen Medaillon, Name + Sterne
als Beschriftung, sanftes Wippen, "ruft dich!"-Sprechblase bei fälligen
Wiederholungen). Der Salon ist als eigene, andersfarbene Insel Teil der Karte.
Getestet: alle 5 Inseln klickbar und starten die richtige Aufgabe bzw. den
Salon, gesperrter Salon zeigt weiterhin nur den Hinweistext statt sich zu
öffnen, Sterne/Fälligkeiten korrekt aus dem Spielstand abgeleitet, keine
Konsolenfehler.

### 2026-07-15 – Lineare Reise + reichere Kartengrafik + Klick-Fehler behoben
Tom-Feedback: Inseln sollen linear nacheinander bearbeitet werden (Ylvie kann
nicht frei wählen), Karte soll deutlich hochwertiger aussehen.
- **Lineare Freischaltung:** neues Feld `progress` im Spielstand. Nur Inseln bis
  einschließlich `progress` sind betretbar, der Rest zeigt eine graue Insel mit
  Schloss und "gesperrt". Abschluss der aktuellen Insel schaltet die nächste frei
  ("Eine neue Insel taucht aus dem Nebel auf: ..."). Klick auf gesperrte Insel:
  freundlicher Hinweis der Fee statt Start.
- **Kartengrafik deutlich aufgewertet:** Ozean-Verlauf mit Wellenlinien, gerissenes
  Pergament mit unregelmäßiger Kontur statt Rechteck, Eselsohr, Alterungsflecken,
  ausgearbeitete Kompassrose mit Himmelsrichtungen und roter Nadel, Vignette,
  organischere Inselformen mit Schattenwurf, Wasserlinie und Uferschaum, dazu je
  Insel eigene Landschafts-Deko (Kristalle, Haus, Regenbogen, Marktstand, Salon).
- **WICHTIGER FEHLER (von Tom gefunden): Inseln waren nicht anklickbar.** Ursache:
  die neue Vignette lag als transparentes Rechteck ÜBER allen Inseln und fing
  sämtliche Klicks ab. Fix: `pointer-events="none"` auf der Vignette.
  **Lehre für künftige Tests:** Mein Test hatte den Fehler NICHT gefunden, weil ich
  Klicks per `dispatchEvent` direkt an das Element geschickt habe - das überspringt
  die Ebenen-/Trefferprüfung des Browsers und meldet fälschlich Erfolg. Bei
  Klick-Themen künftig immer mit echtem Klick an Bildschirmkoordinaten bzw.
  `elementFromPoint` gegenprüfen.
Getestet (echter Klick, nicht per Skript): Funkelstein-Insel startet, gesperrte
Insel startet nicht und zeigt Fee-Hinweis, Durchspielen von Insel 1 schaltet
Insel 2 frei, Insel 3/4 bleiben gesperrt, keine Konsolenfehler.

### 2026-07-15 – Grafik-Richtung entschieden
Tom wollte "annähernd fotorealistisch". Ehrlich eingeordnet: mit den hier
verfügbaren Mitteln (handgeschriebenes Vektor-SVG, kein Bildgenerator) ist echte
Fotorealität nicht erreichbar. Tom hat sich nach Rückfrage für "beste
Illustration, die ich zeichnen kann" entschieden - also reichere Vektor-Grafik
mit mehr Details/Schattierung, dafür weiterhin umfärbbar und animierbar.
Alternative (fertige Bilder einbinden) bleibt möglich, kostet aber die
Umfärb-/Animierbarkeit an den betreffenden Stellen.

### 2026-07-15 – Roadmap-Notiz: große Vision von Tom
Tom hat den Fahrplan für die kommenden Wochen skizziert (noch nicht gebaut,
hier nur festgehalten, damit nichts verloren geht):
- Die Fee soll mit der Zeit nicht nur Stufen freischalten, sondern zunehmend
  **plastischer, beweglicher und interaktiver** werden (mehr als die aktuellen
  4 Stufen Farbe/Lächeln/Sprechen) - **bevor** der Style-Teil kommt.
- Der Schmink-/Anzieh-Teil (Zauber-Salon) soll **grafisch anspruchsvoller**
  werden als der aktuelle Stand.
- Später: die Fee bekommt **eine oder mehrere Freundinnen** mit eigenen,
  unterschiedlichen Charakteren und eigenem Design - inklusive eigener
  Geschichte dazu.
- **Haustiere.**
- Ein **Märchenwald** als neue Welt/Umgebung.
- Ein **Haus, das Ylvie einrichten kann.**
Einordnung: das ist ein mehrwöchiger Ausbau, kein Tagesprojekt. Reihenfolge mit
Tom noch abzustimmen - siehe KONZEPT-YLVIES-ZAUBERREISE.md im Strategie-Projekt
für den fortlaufenden MVP-Fahrplan.

### 2026-07-15 – Lineare Inseln + reichhaltigere Kartengrafik
Tom-Feedback: Inseln sollen nacheinander freigeschaltet werden (nicht frei
wählbar), und die Karte/Grafik wirkte "billig und lieblos", soll deutlich
detaillierter/realistischer werden.

Wichtige Klarstellung geklärt: echte Fotorealität ist mit handgezeichnetem
SVG-Code technisch nicht erreichbar (kein Bildgenerator in dieser Umgebung
verfügbar). Tom hat sich per Rückfrage für "beste erreichbare Vektor-
Illustration" entschieden (statt fertige/generierte Bilder einzubinden) -
bleibt damit umfärbbar und animierbar, was für Salon/Stufen essenziell ist.

Umgesetzt:
- **Lineare Fortschrittslogik:** neues Feld S.progress (Index der am weitesten
  erreichten Insel). Nur Inseln mit Index <= progress sind antippbar; alle
  weiteren zeigen ein Schloss-Symbol und "gesperrt". Erstes Abschließen einer
  Insel schaltet automatisch die nächste frei ("Eine neue Insel taucht aus dem
  Nebel auf ..." auf dem Belohnungsschirm). Bereits gemeisterte Inseln bleiben
  offen (wichtig für den Erinnerungszauber/Wiederholungen). Der Zauber-Salon
  bleibt separat über die Fee-Stufe gesteuert (unverändert).
- **Reichhaltigere Kartengrafik:** Ozean-Hintergrund mit Wellenlinien, Pergament
  jetzt mit unregelmäßigem "zerknittertem" Rand statt perfektem Rechteck, altes
  gefaltetes Eckstück, mehrere Alterungsflecken, Vignette für Tiefe. Jede Insel
  hat jetzt Wasserringe/Schatten am Fuß, einen Lichtreflex, und eine zur
  Insel passende kleine Landschafts-Deko (Kristallspitzen, Häuschen mit Dach,
  Regenbogen mit Wolken, Schatzkiste mit Münzen, Zelt mit Fähnchen für den
  Salon). Gesperrte Inseln sind gräulich mit Schloss-Icon. Kompassrose
  aufwendiger (N/S/O/W, doppelter Stern, rote Spitze).
Getestet: gesperrte Insel öffnet sich nicht (nur Hinweistext), Abschluss der
ersten Insel schaltet korrekt die zweite frei (progress 0->1), bereits
gemeisterte Inseln bleiben klickbar, dritte Insel bleibt weiterhin gesperrt.
Keine Konsolenfehler.

_(Weitere Einträge folgen mit Ylvies Reaktionen.)_
