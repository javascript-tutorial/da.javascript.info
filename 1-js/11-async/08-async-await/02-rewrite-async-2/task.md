
# Omskriv "rethrow" med async/await

Nedenfor ser du "rethrow" eksemplet. Omskriv det ved hjælp af `async/await` i stedet for `.then/catch`.

Og erstat rekursionen med et loop i `demoGithubUser`: med `async/await` bliver det nemt at gøre.

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    });
}

// Spørg efter et brugernavn indtil github returnerer en gyldig bruger
function demoGithubUser() {
  let name = prompt("Skriv et brugernavn?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Fulde navn: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("Brugeren findes ikke. Indtast et nyt brugernavn.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```
