# HOW TO USE

```json
PORT="3000"
```

## Endpoints

List of availables endpoints:

- `POST /add-user`
- `POST /login`
- `POST /google-login`
- `GET /news`
- `GET /leagues`
- `GET /leagues/:id/standings`

&nbsp;

## 1. POST /Login

Request:

- body:

```json
{
  "username": "string",
  "password": "string"
}
```

_Response (201 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username already exists"
}
OR
{
  "message": "Field is required"
}
OR
{
  "message": "Wrong username/password"
}
```

## 2. POST /add-user

Request:

- body:

```json
{
  "fullName": "string",
  "username": "string",
  "password": "string"
}
```

_Response (201 - OK)_

```json
{
  "message": "Success add new user"
}
```

```json
{
  "id": "integer",
  "fullName": "string",
  "username": "string",
  "password": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "username and password are all required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthorized JWT Error"
}
OR
{
  "message": "Unauthorized JWT Error"
}
```

_Response (409 - CustomMessage)_

```json
{
  "message": "Username already exists"
}
```

## 3. GET /news

Request:

- body:

```json
{
  "headline": "string",
  "url": "string"
}
```

_Response (201 - OK)_

```json
{
  "message": "Success read data"
}
```

```json
{
  "headLine": "Southampton hold Coventry to extend unbeaten run to 13 games",
  "url": "https://www.skysports.com/football/coventry-city-vs-southampton/report/484949",
  "source": "skysports"
}
```

## 4. GET /leagues

Request:

- body:

```json
{
  "id": "integer",
  "name": "string",
  "abbr": "string",
  "logos": "string"
}
```

_Response (201 - OK)_

```json
{
  "message": "Success read data"
}
```

```json
{
  "id": "arg.1",
  "name": "Argentine Liga Profesional de Fútbol",
  "abbr": "Prim A",
  "logos": {
    "light": "https://a.espncdn.com/i/leaguelogos/soccer/500/1.png",
    "dark": "https://a.espncdn.com/i/leaguelogos/soccer/500-dark/1.png"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data with id ${id} not found"
}
```

## 5. GET /leagues/:id/standings

Request:

- body:

```json
{
  "name": "string",
  "abbreviaton": "string",
  "logos": "string",
  "logos": "string",
  "note": {
    "description": "string",
    "rank": 1
  },
  "stats": [
    {
      "name": "string",
      "displayValue": "string"
    },
    {
      "name": "string",
      "displayValue": "string"
    },
    {
      "name": "string",
      "displayValue": "string"
    },
    {
      "name": "string",
      "displayValue": "string"
    },
    {
      "name": "string",
      "displayValue": "string15"
    },
    {
      "name": "string",
      "displayValue": "string"
    },
    {
      "name": "string",
      "displayValue": "string"
    },
    {
      "name": "string",
      "displayValue": "string"
    },
    {
      "name": "string",
      "displayValue": "string"
    },
    {
      "name": "string",
      "displayValue": "string"
    }
  ]
}
```

_Response (201 - OK)_

```json
{
  "name": "string",
  "abbreviaton": "string",
  "logos": "string",
  "logos": "string",
  "note": {
    "description": "Champions League",
    "rank": 1
  },
  "stats": [
    {
      "name": "gamesPlayed",
      "displayValue": "16"
    },
    {
      "name": "losses",
      "displayValue": "1"
    },
    {
      "name": "pointDifferential",
      "displayValue": "+21"
    },
    {
      "name": "points",
      "displayValue": "37"
    },
    {
      "name": "pointsAgainst",
      "displayValue": "15"
    },
    {
      "name": "pointsFor",
      "displayValue": "36"
    },
    {
      "name": "ties",
      "displayValue": "4"
    },
    {
      "name": "wins",
      "displayValue": "11"
    },
    {
      "name": "rank",
      "displayValue": "1"
    }
  ]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data with id ${id} not found"
}
```
