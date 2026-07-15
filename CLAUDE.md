# Ylvies Zauberreise – App-Projekt

Mathe-Lern-App für Ylvie (7, 2. Klasse). Fee-geführte Ferien-Abenteuerreise.
Privates Projekt für Toms Tochter, kein Verkaufsprodukt.

## Strategie und Konzept (im Strategie-Projekt)
- Konzept: C:\claude-projekt\Strategie\KONZEPT-YLVIES-ZAUBERREISE.md
- Persona (Ylvie als Nutzerin, mit Design-Konsequenzen): C:\claude-projekt\Strategie\PERSONAS-YLVIES-ZAUBERREISE.md

## Das Wichtigste in Kürze
- Zwei echte Probleme: fehlende Motivation/kein Sinn und schnelles Vergessen.
- Didaktik: Würfelhaus-Prinzipien (Mengenbilder statt zählen, Kraft der Fünf/Zehn,
  Zehnerübergang durch Ergänzen zum Zehner). Nur Prinzipien, nicht die geschützten Materialien.
- Belohnungs-Rückgrat: Die Fee ist anfangs verzaubert/fast unbeweglich und wird mit
  jeder Lektion beweglicher, plastischer und gestaltbar (schminken, Kleidung, Flügel,
  geheime Eigenschaften) - so wird sie Schritt für Schritt zu Ylvies Freundin. Das
  staffelt zugleich die Animations-Entwicklung.
- Geld ist der didaktische Türöffner (dort machte es bei ihr "klick").
- 10-Minuten-Regel, Frust abfangen statt hartes Falsch, keine Insekten.

## Ablaufplan (Ferienstart NRW: Fr 2026-07-17, 15:00)
- Heute Abend: Countdown-Sneak-Preview (verschlossene magische Tür).
- Donnerstag: Ylvie darf der Fee einen Namen geben.
- Freitag 15:00: Tür öffnet sich, Land der Feenprinzessin (Lern-App) begehbar.

## Feedback-Schleife
Ylvies Rückmeldungen und ihr Lernstand fließen kontinuierlich in Entwicklung und
Design ein. Siehe ENTWICKLUNGSLOG.md. Die App muss stark an Ylvies Realität und
Möglichkeiten angepasst werden; ihr Lernstand wird dokumentiert.

## Technik
- Statische Single-File-Web-App (index.html), tabletfähig, ohne Build-Step.
- Lokale Speicherung (localStorage), kein Login/Server nötig, WLAN vorausgesetzt.
- Läuft auch direkt per Datei-Öffnen auf dem Tablet.
- Keine externen Assets: Grafik als Inline-SVG/CSS, damit alles in sich geschlossen ist.

## Konventionen
- Keine Emojis in Doku/Chat (Tom-Regel). In der Kinder-Oberfläche stattdessen SVG-Grafik.
- Nach jeder Dateiänderung Link zur Datei in der Antwort zeigen (Tom-Regel).
