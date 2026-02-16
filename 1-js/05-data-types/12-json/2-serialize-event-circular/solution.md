
```js run
let room = {
  number: 23
};

let meetup = {
  title: "Konference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

room.occupiedBy = meetup;
meetup.self = meetup;

alert( JSON.stringify(meetup, function replacer(key, value) {
  return (key != "" && value == meetup) ? undefined : value;
}));

/* 
{
  "title":"Konference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

Vi bør også teste `key==""` for at ekskludere det første kald, hvor det er normalt at `value` er `meetup`.

