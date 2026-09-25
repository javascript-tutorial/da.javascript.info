Det er en god brug af event delegation-mønsteret.

I virkeligheden kan vi i stedet for at spørge brugeren også sende en "logning" til en server, som gemmer informationen om hvor brugeren forlod vores site. Eller vi kan indlæse indholdet og vise det lige i siden (hvis tilladt).

Alt hvad vi har brug for, er at fange `contents.onclick` og bruge `confirm` til at spørge brugeren. En god idé ville være at bruge `link.getAttribute('href')` i stedet for `link.href` til URL'en. Se løsningen for detaljer.
