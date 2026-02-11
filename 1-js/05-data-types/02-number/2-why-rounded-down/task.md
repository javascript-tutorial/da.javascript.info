importance: 4

---

# Hvorfor er 6.35.toFixed(1) == 6.3?

Ifølge dokumentationen afrunder både `Math.round` og `toFixed` til det nærmeste tal: `0..4` runder ned, mens `5..9` runder op.

For eksempel:

```js run
alert( 1.35.toFixed(1) ); // 1.4
```

I det lignende eksempel nedenfor, hvorfor afrundes `6.35` til `6.3` og ikke `6.4`?

```js run
alert( 6.35.toFixed(1) ); // 6.3
```

Hvordan kan vi runde `6.35` korrekt?

