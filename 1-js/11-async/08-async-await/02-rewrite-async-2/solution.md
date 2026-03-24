
Der er ikke nogen tricks her. Bare erstat `.catch` med `try..catch` inde i `demoGithubUser` og tilføj `async/await` hvor det er nødvendigt:

```js run
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

// Spørg efter et brugernavn indtil github returnerer en gyldig bruger
async function demoGithubUser() {

  let user;
  while(true) {
    let name = prompt("Skriv et brugernavn?", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // ingen fejl, hop ud af loopet
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // loop fortsætter efter alert
        alert("Brugeren findes ikke. Indtast et nyt brugernavn.");
      } else {
        // ukendt fejl, rethrow
        throw err;
      }
    }      
  }


  alert(`Fulde navn: ${user.name}.`);
  return user;
}

demoGithubUser();
```
