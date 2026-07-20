# Übergabe – Ylvies Zauberreise

Stand: 2026-07-20. Kompakter Einstieg für die nächste Sitzung. Volldetails im
[ENTWICKLUNGSLOG.md](ENTWICKLUNGSLOG.md); Strategie/Konzept/Persona liegen im
Strategie-Projekt (siehe unten).

## Was es ist
Private Mathe-Lern-App für Toms Tochter Ylvie (7, 2. Klasse), Fee-geführte
Ferien-Abenteuerreise. Kein Verkaufsprodukt. Sie hat am Fr 2026-07-17 15:00 gestartet,
spielt seither, Toms Rückmeldung: "sie hat Spaß", "gefällt alles super". App ist im
täglichen Einsatz - deshalb: **niemals einen Zustand ausliefern, der Ylvies Spielstand
kaputt macht oder ihr etwas wegnimmt.**

## Live & Deployment
- Live: https://tomschoenknecht.github.io/zauberreise/
- Repo: https://github.com/tomschoenknecht/zauberreise (Branch main, GitHub Pages aus /)
- Deploy = im Projektordner committen + pushen; Pages baut in 1-2 Min neu.
- GitHub-Login: Token liegt lokal im Gartenplaner-Repo-Remote
  (C:\claude-projekt\Gemüsegarten\_site, git remote origin). Für gh/push:
  `export GH_TOKEN="<Token aus jenem Remote>"`. Nicht anzeigen/committen.
- Deploy-Prüfung: `curl -s ".../fee.js?cb=$RANDOM" | grep ...` (Cache-Buster nutzen).

## Testen (WICHTIG)
- Toms Test-Link: `https://tomschoenknecht.github.io/zauberreise/?test=1`
  -> eigener localStorage-Namespace (Suffix `_test`), gelbes TESTMODUS-Banner,
  Tür ist im Testmodus immer offen. Rührt Ylvies echten Stand nie an.
- Reset (nur echter Stand): `.../?reset=1` (löscht yz_fairyName/yz_muted/yz_state_v1/
  yz_introSeen, Testdaten bleiben).
- Lokale Vorschau: `node .claude/server.js` (Port 5177, dient den Projektordner).
  Server stirbt mit der Sitzung -> bei Bedarf neu starten.

## Screenshots / Grafik prüfen (WICHTIG - Stolperfalle)
- Der Claude_Browser-Screenshot (mcp__Claude_Browser__computer screenshot) läuft in
  dieser Umgebung IMMER ins Timeout - unbrauchbar.
- Funktioniert: **chrome-devtools-MCP** (mcp__chrome-devtools__new_page /
  navigate_page / take_screenshot). Vorgehen für Grafik: isolierte feetest.html
  bauen (nur fee.js + <use href="#feeArt">), über localhost:5177 laden, Screenshot.
  feetest.html danach wieder löschen (nicht committen).
- Programmatische Klicks (dispatchEvent) überspringen Ebenen-/Trefferprüfung ->
  bei Klick-Themen mit echtem Klick bzw. elementFromPoint gegenprüfen.

## Dateien
- index.html  - Landingpage/Countdown (Namensvergabe Do 15 Uhr, Tür Fr 15 Uhr; im
                 Testmodus Tür offen)
- app.html    - die eigentliche App (Karte, Aufgaben, Salon, Wiese, Chat, Wunsch)
- fee.js      - GEMEINSAME Fee-Grafik (Vektor, umfärbbar/animiert). Bewegung läuft
                über requestAnimationFrame-Schleife, die transform-Attribute setzt
                (CSS-Animationen wirken NICHT auf <use>-Kopien!). feeScale skaliert
                die Figur, damit sie den Rahmen füllt.
- tiere.js    - Haustiere (Ei->Baby->groß), petSvg()/PET_CATALOG
- freundinnen.js - die drei Freundinnen (Figur, Geschichte, Chat-Persönlichkeit).
                WICHTIG: eigene Farben inline, NICHT wie fee.js über Root-CSS-
                Variablen - sonst könnte man nicht mehrere Feen gleichzeitig in
                verschiedenen Farben zeigen. Muster für alle weiteren Charaktere.
- kichern.js  - Toms echte Kicher-Aufnahme als Base64 (Landingpage)
- fee-portrait.jpg - Toms fotorealistisches Fee-Bild (Chat-Porträt + Wunsch-Erfüllung)
- mirostar-...mp3  - Hintergrundmusik (Landingpage)
- .claude/server.js - lokaler Vorschau-Server

## Was fertig & live ist
- Lernstoff nach Würfelhaus: Mengen, Zehnerhaus, Zehnerübergang, Geld, Zahlenraum 100
  (Zehnerstangen), Einmaleins (Reihenbild). Erinnerungszauber (Spaced Repetition),
  Frust-Abfangen (kein hartes Falsch).
- Schatzkarte mit 6 Inseln, LINEAR freigeschaltet, je Insel 3 Abschnitte (24 Aufgaben)
  mit Rastplätzen + Pause + punktgenauem Wiedereinstieg. Auto-Scroll zur aktuellen Insel.
- Fee wird über 6 Stufen lebendiger (Schwellen 12/35/75/140/220 - auf 6 Wochen gestreckt):
  Farbe->Augen/Lächeln->Sprechen->Bewegung/Winken->Fliegen/Tanzen.
- Zauber-Salon (Haare/Kleid/Gesicht/Kopfschmuck/Extra), grafisch aufgewerteter Raum.
- Kuschelwiese: 4 adoptierbare Tiere, wachsen mit dem Weiterspielen.
- Großer selbst definierter Wunsch als Fernziel (erfüllt bei voller Befreiung = 220).
- Mit der Fee reden: regelbasiertes, sicheres Gespräch (KEINE echte KI - bewusst,
  Kindersicherheit). Zugang: Fee in der Kopfzeile antippen (ab Stufe 2).
- Fee neu gezeichnet, näher an Toms Vorlage (blond, Fliederkleid+Ranke, Goldkrone+
  blauer Stein, blaue Augen, zarte Flügel, volleres welliges Haar). Foto-Porträt im Chat.
- Freundinnen-Lichtung (seit 2026-07-20): drei Freundinnen mit eigenem Design,
  eigener Geschichte und eigener Chat-Persönlichkeit - Rosalie (Blütenfee, ab 20
  verdienten Kristallen), Lumi (Sternenfee, ab 60), Perla (Wellenfee, ab 120).
  Gesperrte bleiben als verschleierte Silhouette mit Kristall-Rest sichtbar.
  Freischaltung über "earned", damit sie durch Salon-Einkäufe nie verschwinden.

## Offen (Toms große Vision - noch nicht gebaut)
Über die Ferien verteilt nachlegen, wenn bei Ylvie die Luft rausgeht:
1. Märchenwald als neue Welt/Umgebung.
2. Haus, das Ylvie einrichten kann.
Für die Freundinnen später denkbar: im Salon anziehen, eigener Hintergrund je Freundin.
Kleiner/optional: Zauber-Fragebogen am Anfang (Vorlieben -> Themenwelt einfärben),
Bastel-Brücke mit Zauberwort (ausdrucken/basteln, Geheimwort freischalten),
weitere Fee-Politur.

## Arbeitsweise mit Tom (aus dem Verlauf gelernt)
- Deutsch, echte Umlaute (ä ö ü ß) überall - auch in Code/UI/Doku, nie ae/oe/ue/ss.
- Keine Emojis in Doku/Chat (in der Kinder-UI SVG statt Emoji).
- Nach Dateiänderung den Dateilink zeigen.
- Ehrlich einordnen, was (nicht) geht (z. B. kein Fotorealismus mit Vektor,
  keine KI-Chat für ein Kind). Grafik vor dem Deploy per chrome-devtools ansehen.
- Feedback-Schleife: Ylvies Reaktionen ins ENTWICKLUNGSLOG, sie steuern die Reihenfolge.

## Strategie-Projekt (C:\claude-projekt\Strategie)
- KONZEPT-YLVIES-ZAUBERREISE.md, PERSONAS-YLVIES-ZAUBERREISE.md, APPS.md, IDEEN.md.
