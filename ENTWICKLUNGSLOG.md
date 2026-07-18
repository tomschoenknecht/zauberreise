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

### 2026-07-15 – Fee wird über die Reise lebendiger (Punkt 1 der Vision)
Zwei neue Stufen ergänzt, Freischaltung jetzt: 0 verzaubert (reglos) / 10 Farbe
(atmet, Flügel regen sich leicht) / 25 Augen auf, lächelt, blinzelt von allein /
45 spricht / **70 bewegt sich und winkt beim Antippen** / **100 fliegt und tanzt
(kräftiger Flügelschlag, flattert gelegentlich von allein hoch)**.

**Wichtiger technischer Fund (hätte die ganze Bewegung unsichtbar gemacht):**
Die Fee steht einmal in <defs> und wird überall per <use> eingebunden. Nachgemessen:
**CSS-Animationen auf dem Original wirken NICHT auf die <use>-Kopien** - sie liefen
laut getAnimations(), aber die gezeichnete Fee stand komplett still (0,00 px
Bewegung). Direkt gesetzte transform-Attribute dagegen kommen zuverlässig in allen
Kopien an (mit 60-px-Gegenprobe verifiziert). Deshalb umgebaut: eine zentrale
requestAnimationFrame-Schleife rechnet die Bewegung und setzt transform-Attribute
am Original - eine Schleife, alle Kopien laufen synchron.

**Testmethodik (zwei Fallstricke, beide dokumentiert):**
1. Die Vorschau läuft als *hidden* Tab -> requestAnimationFrame wird vom Browser
   komplett angehalten, Messung ergab fälschlich "keine Bewegung". Lösung: rAF im
   Test durch eine eigene Uhr ersetzen und Frames manuell durchfahren.
2. Zwei Verdachtsfälle auf Fehler ("Arm bleibt nach dem Winken gedreht") waren
   beide Artefakte der Testuhr (unterschiedliche Zeitbasis bzw. Schleife noch mit
   altem Zeiger belegt). Nach sauberem Neuladen: alles korrekt.

Verifiziert mit gemessener Geometrie der gerenderten Kopie: Stufe 0 = 0,00 px
Bewegung (schläft), Stufe 1 = 1,59 px (atmet), Stufe 4 = 1,90 px + Neigung,
Stufe 5 = 3,96 px. Flügelausschlag 0° / 4° / 6° / 17°. Winken nur ab Stufe 4
(Stufe 3 liefert "nod"), Arm hebt auf -41° und kehrt vollständig zurück.

### 2026-07-15 – Längere Etappen + schwerer Fehler behoben (Fee schlief nach Einkauf ein)
Tom: "der Erfolg kommt zu schnell, mindestens doppelt so viele Aufgaben pro Etappe."
- **Etappenlänge von 6 auf 12 Aufgaben verdoppelt** (TASKS_PER_ISLAND). Getestet:
  "Aufgabe 1 von 12".
- **Schwerer Fehler beim Reinschauen gefunden und nachgestellt:** Die Fee-Stufe wurde
  aus dem *aktuellen Kristall-Guthaben* berechnet - und der Salon zieht Kristalle ab.
  Folge: Ylvie kauft etwas im Salon, löst danach eine Aufgabe, und die Fee **fällt in
  den Schlaf zurück**. Nachgestellt und gemessen: Stufe 2 -> nach Einkauf (30 auf 5
  Kristalle) und einer Aufgabe -> **Stufe 0**, grau, Augen zu. Das hätte genau die
  Belohnung zerstört, die das ganze Konzept trägt: erst freuen, dann bestraft werden.
  **Fix:** Guthaben (`crystals`, ausgebbar) und Lebensleistung (`earned`, nur wachsend)
  sind jetzt getrennt. Die Fee-Stufe richtet sich allein nach `earned` und kann nie
  mehr sinken. Zusätzlich Absicherung: `S.stage` wird nur noch erhöht, nie gesenkt.
  Migration für bestehende Spielstände: `earned` wird mindestens auf die Schwelle der
  bereits erreichten Stufe gesetzt - getestet mit altem Stand (Stufe 3, nur 3 Kristalle
  Guthaben): Stufe bleibt 3, `earned` wird 45, auch nach weiteren Aufgaben stabil.
  Keine Konsolenfehler.

**Offene Pacing-Frage an Tom (noch nicht entschieden):** Mit 12 Aufgaben pro Etappe
gibt eine Etappe bis zu 24 Kristalle. Die Fee-Stufen liegen bei 10/25/45/70/100 -
damit wäre sie nach etwa 5 Etappen komplett erwacht, also evtl. schon in der ersten
Ferienwoche. Für einen 6-Wochen-Bogen müssten die Schwellen deutlich höher (Vorschlag:
z. B. 20/60/120/200/300) oder es braucht mehr Stufen. Mit Tom klären.

### 2026-07-15 – Inseln länger und als kleines Abenteuer in Abschnitten
Tom: "der Erfolg kommt zu schnell, mindestens doppelt so viele Aufgaben pro
Etappe, da kann mehr passieren."
- Aufgaben pro Insel von 12 auf **24 verdoppelt**.
- Statt einer langen Liste: **3 Abschnitte** je 8 Aufgaben ("Zum Aufwärmen",
  "Jetzt wird gezaubert", "Die letzte Prüfung"). Nach jedem Abschnitt ein
  **Rastplatz** mit Zwischenbelohnung und der Wahl "Weiter" oder "Pause machen".
- **Wiedereinstieg punktgenau:** der erreichte Abschnitt wird pro Insel gespeichert
  (S.sections[inselId]); bei Pause/Verlassen steigt Ylvie später genau im nächsten
  Abschnitt wieder ein, nicht von vorn. Das ist bei ihrer ~10-Minuten-Spanne
  wichtig - eine 24-Aufgaben-Insel am Stück würde sie sonst mittendrin abbrechen
  und alles verlieren. Karte zeigt bei angefangenen Inseln "Abschnitt x von 3".
- Insel-Gesamtbelohnung summiert jetzt über alle Abschnitte (lesson.total).
Getestet (echte Klicks, kompletter Durchlauf): Abschnitt 1 endet am Rastplatz statt
sofort "Geschafft"; Pause führt zur Karte, Karte zeigt "Abschnitt 2 von 3";
Wiedereinstieg startet in Abschnitt 2 Aufgabe 1; nach Abschnitt 3 kommt "Geschafft!"
mit Gesamtsumme +38 und Freischaltung der nächsten Insel. Keine Konsolenfehler.

### 2026-07-15 – Zwei neue Lern-Inseln: Zahlenraum 100 und Einmaleins
Damit der Lernstoff über die Ferien mitwächst (nicht nur die Menge, sondern auch
der Schwierigkeitsgrad). Beide nach Würfelhaus-Prinzip - Struktur statt Abzählen:
- **Hunderter-Insel** (Rechnen bis 100), 3 Aufgabentypen: Zehner+Zehner (50+30),
  runde Zahl+Einer (30+6), Zehner-Zehner (70-40). Darstellung: **Zehnerstangen**
  (Bündel zu 10) plus einzelne Einer-Punkte. Tipps arbeiten mit den Stangen
  ("Zähle nur die Zehnerstangen: 5 und 2 Stangen sind 7 Zehner, also 70").
- **Einmaleins-Insel**, Reihen 2/3/4/5/10 mal 1-10. Darstellung: **strukturiertes
  Reihen-Bild** (r Reihen mit je c Punkten) - Multiplikation als Struktur sichtbar.
  Tipp zählt in Schritten der Reihe ("5 Reihen mit je 8. Zähle in 5er-Schritten:
  5, 10, 15 ... 40").
- Karte auf 6 Lern-Inseln + Salon erweitert, Höhe von 600 auf 760 (viewBox),
  Schatzpfad wird jetzt dynamisch aus den Inselpositionen gezeichnet (statt
  hartkodiert) - neue Inseln reihen sich damit automatisch ein.
- **Auto-Scroll zur aktuellen Insel:** die Karte ist jetzt ~2,2x höher als der
  Bildschirm (1274 px Inhalt bei 572 px sichtbar). Beim Öffnen springt sie
  automatisch zur aktuellen Insel, damit Ylvie nie suchen/scrollen muss.

Getestet:
- 36 Stichproben Hunderter: alle 3 Aufgabentypen ausgewogen verteilt (11/11/14),
  Rechnungen korrekt, richtige Antwort immer unter den Optionen, keine Doppel.
- Einmaleins: Reihen-Bild zeigt exakt so viele Punkte wie das Ergebnis
  (28 Punkte bei 4×7), Rechnungen und Optionen korrekt.
- Tipps beider Inseln inhaltlich geprüft.
- **Gefundener Fehler:** "Nimm 1 Zehnerstangen weg" (Mehrzahl bei Einzahl) -
  korrigiert zu "1 Zehnerstange", mit gezielter Stichprobe bestätigt.
- Echte Trefferprüfung (elementFromPoint) für die neuen Inseln: anklickbar,
  keine Ebenen-Blockade. Auto-Scroll bei progress 0 und progress 5 verifiziert.
- Anmerkung zur Methodik: zweimal fälschlich einen Fehler vermutet (Aufgabentyp
  "fehlt", Subtraktion mit 10 "kommt nicht vor") - beides war Zufall in zu
  kleinen Stichproben. Bei Zufallsinhalten immer ausreichend groß stichproben.

### 2026-07-17 – YLVIE HAT GESTARTET. Erste echte Rückmeldung: **"sie hat Spaß"**
Ferienstart, Tür ging um 15:00 auf, Ylvie hat gespielt. Toms Rückmeldung nach der
ersten Sitzung: **"sie hat spaß"**. Das ist die wichtigste Bestätigung des ganzen
Konzepts - Motivation war das Kernproblem, und der Einstieg trägt.
Zwischenfall: Tom meldete "App läuft bei Ylvie nicht", kurz darauf "läuft jetzt".
Live-Version war durchgehend erreichbar (alle Dateien HTTP 200, keine Fehler in
der Konsole, Eingangsgeschichte startete sauber). Ursache blieb ungeklärt -
vermutlich Zwischenspeicher oder Seite noch nicht fertig geladen. Keine Änderung
an der Live-App nötig. Beobachten, ob es wiederkommt.
Noch offen und wichtig: konkretes Feedback von Ylvie (was macht Spaß, wo hakt es,
wo gibt sie auf) - das steuert den weiteren Ausbau.

### 2026-07-17 – Der große Wunsch + Sechs-Wochen-Takt korrigiert
**Wichtiger Fund vor dem Einbau:** Mit den alten Stufen-Schwellen (10/25/45/70/100)
wäre die Fee schon nach ca. 3 Inseln komplett erwacht - also nach 1-2 Wochen,
danach hätte es für die restlichen 4 Wochen nichts mehr freizuschalten gegeben.
Genau das Sechs-Wochen-Problem, das Tom früh angesprochen hatte.
- **Schwellen gestreckt auf 12/35/75/140/220.** Rechnung: eine Insel bringt ca. 38
  Kristalle (24 Aufgaben), sechs Inseln also ca. 230 - die volle Befreiung der Fee
  ist damit der Höhepunkt am ENDE der Reise. Erste Stufe bewusst früh (12, noch im
  ersten Abschnitt), damit Ylvie die Wirkung sofort sieht (Persona: Fortschritt
  früh und sichtbar).
- **Der große Wunsch gebaut:** Ylvie legt direkt nach der Challenge ihr eigenes
  Fernziel fest (Freitext + 8 Ideen-Vorschläge zum Antippen). Erfüllt wird er,
  wenn die Fee ganz frei ist (220 Kristalle) - also am Ende der sechs Wochen.
  Banner auf der Karte zeigt Wunsch + Restweg und ist antippbar (Wunsch änderbar).
  Eigener Erfüllungs-Bildschirm mit Funkel-Ausbruch. Hinweis im Wunsch-Dialog:
  "Besprich deinen Wunsch mit Mama oder Papa" - er muss ja einlösbar sein.
- **Migration ohne Verlust getestet** (kritisch, da Ylvie schon echten Fortschritt
  hat): simulierter Altstand (Stufe 3 bei 45 Kristallen) behält nach dem Update
  Stufe 3, earned wird auf die neue Schwelle (75) angehoben statt die Stufe zu
  entziehen. Guthaben, Insel-Fortschritt, Abschnitte und Wunsch bleiben unberührt.
  Grundsatz: es wird nie etwas weggenommen.
- **Gefundener Fehler:** "Noch 1 Kristalle" (Mehrzahl bei Einzahl) an drei Stellen -
  Helfer kristalle(n) eingeführt, korrigiert zu "1 Kristall", bestätigt.
Getestet: Wunsch-Bildschirm erscheint nach der Challenge, Ideen-Knopf füllt das
Feld, zu kurze Eingabe wird abgelehnt, Banner zählt korrekt runter, Erfüllung
löst bei Zielerreichung aus und wird gespeichert, Fee auf Stufe 5. Keine Fehler.

### 2026-07-17 – Haustiere (Die Kuschelwiese)
Nächster Vision-Punkt, passt zu Ylvies Animal-Crossing-Vorliebe. Neue Datei
tiere.js (eigene gemeinsame Grafikquelle, bewusst Inline-SVG statt <use> - siehe
Fee-Lehre zu <use>-Kopien).
- Vier Tiere zum Adoptieren mit gestaffelten Preisen: Wolkenhase (30),
  Sternenkätzchen (35), Glitzerdrache (45), Einhorn-Fohlen (55, das seltenste).
- **Wachstum als Sog:** jedes Tier startet als Ei und wächst mit dem Weiterspielen:
  Ei -> Baby (nach +8 dazuverdienten Kristallen) -> groß (nach +40). Gemessen an
  earned seit Adoption, also an Fleiß, nicht an Uhrzeit - das Tier ist ein Grund
  zum Weitermachen. Kurz vorm Schlüpfen bekommt das Ei einen Riss.
- Neuer Karten-Ort "Die Kuschelwiese", offen ab der ersten geschafften Insel
  (davor gesperrt mit Fee-Hinweis). Aktives Tier wählbar, mehrere adoptierbar.
Getestet: Adoption (Kristallabzug korrekt 60->25), Ei mit Schlüpf-Countdown,
alle drei Wachstumsstufen mit passenden Statustexten, Ei-Riss kurz vorm Schlüpfen,
zu teures Tier wird abgelehnt ohne Abzug, Wiese vor erster Insel gesperrt mit
Hinweis, echte Trefferprüfung (anklickbar, keine Vignette-Blockade), keine
Konsolenfehler. WICHTIG fürs Deployment: tiere.js ist neue Datei, muss mit hoch.

### 2026-07-17 – Zauber-Salon grafisch aufgewertet
Vorher: nüchterne Fee-Vorschau über einer Reihe Farbkreise. Jetzt ein richtiger
Salon-Raum:
- Verzierter Schmink-Spiegel (goldener Rahmen, gewölbtes Glas) mit 11 rundum
  angeordneten, sanft glimmenden Glühbirnen (per Bogen-Formel platziert).
- Die aktuelle Fee steht IM Spiegel (gleiche gemeinsame Quelle, färbt sich beim
  Stylen live mit).
- Tapeten-Punktmuster, zwei Vorhänge, Schminktisch mit vier bunten Fläschchen,
  Funkel-Akzente.
- Kristall-Guthaben oben rechts sichtbar, jede Kategorie mit eigenem Icon
  (Haare/Kleid/Gesicht/Kopfschmuck/Extra), ausgewählter Artikel mit Häkchen.
Getestet: Raum rendert (Spiegel, 11 Birnen, Fee im Spiegel, 4 Fläschchen,
5 Kategorie-Icons), Kauf funktioniert weiter (80->65 bei Meerblau), Fee im Spiegel
färbt sich live mit, Guthaben-Anzeige aktualisiert, Häkchen beim gewählten Artikel,
keine Konsolenfehler. Optische Endabnahme durch Tom (Screenshot hier nicht möglich).

### 2026-07-17 – Mit der Fee reden + Fee-Grafik-Richtung (Hybrid)
Tom-Wunsch: Fee "annähernd fotorealistisch und beweglich" + Ylvie will mit der Fee
chatten. Zwei ehrliche Weichenstellungen mit Tom geklärt (AskUserQuestion):
- **Grafik = Hybrid:** spielbare Fee bleibt Vektor (umfärbbar/animiert/wächst),
  zusätzlich ein hochwertiges/fotorealistisches Bild nur für Porträt + großen Moment.
  Tom hat eine fotorealistische Vorlage (blonde Feenprinzessin, lila Kleid, Krone,
  Flügel) geschickt. MUSS noch als Datei rein: fee-portrait.png im Projektordner.
  App ist schon vorbereitet: <img src="fee-portrait.png" onerror=entfernen> über der
  Vektor-Fee - sobald die Datei da ist, erscheint das Bild automatisch (Chat-Porträt).
- **Chat = "Verzaubertes Gespräch" (KEIN echtes KI):** bewusst regelbasiert, offline,
  ohne Kosten/Server. Begründung Kindersicherheit: unkontrollierte KI-Antworten für
  ein 7-jähriges Kind + API-Schlüssel läge öffentlich offen = nicht verantwortbar.
  Umsetzung: Fee antworten per Stichwort-Erkennung (Begrüßung, wie-gehts, Name,
  Haustier, Wunsch, Rechnen, Salon, Geheimnis, Gefühle/Trost, Liebe, tschüss, ja/nein,
  Fallback). Kontextabhängig (nutzt Fee-Name, aktives Haustier, Wunschtext). Chips zum
  Antippen + Freitext-Eingabe. Zugang: Fee in der Kopfzeile antippen (ab wach, Stufe 2).
  Sprachausgabe der Fee-Antworten ab Stufe 3.
- **Gefundene Fehler in der Worterkennung, behoben:** "hi" traf in "hilf" (Begrüßung
  statt Rechnen) -> Ganzes-Wort-Prüfung (hasWord) für kurze Wörter. "Wie geht es
  <Haustier>" landete bei allgemeiner wie-gehts-Antwort -> Reihenfolge: konkrete Themen
  vor Allgemeinem. "ich mag dich nicht" wurde als Liebeserklärung gelesen ->
  Negations-Wächter (nicht/kein). Alle drei nachgetestet und korrekt.
Getestet: Chat öffnet per Fee-Antippen, Begrüßung mit Name, kontextuelle Chips
(Haustier/Wunsch), Chip- und Freitext-Antworten korrekt, Eingabe wird geleert,
Porträt-Fallback auf Vektor-Fee (Bild fehlt noch), keine Konsolenfehler.
OFFEN: Tom legt fee-portrait.png in den Projektordner, dann Bild auch für den
Befreiungs-Höhepunkt einbauen.

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
