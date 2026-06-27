# TaskManager — Projekt zaliczeniowy 
Dawid Żołędź 095626

Aplikacja internetowa do zarządzania zadaniami. Zbudowana w architekturze REST z backendem **Express.js** i frontendem **React**.

## Wymagania systemowe

Przed uruchomieniem upewnij się, że masz zainstalowane:

- [Node.js](https://nodejs.org/) w wersji 18 lub nowszej
- [MongoDB Atlas](https://www.mongodb.com/atlas) (chmura)


---

## Struktura projektu

```
taskmanager/
├── backend/                  ← Serwer Express.js (REST API)
│   ├── config/db.js          ← Połączenie z MongoDB
│   ├── controllers/          ← Logika biznesowa (MVC - Controller)
│   ├── middleware/auth.js     ← Weryfikacja tokenu JWT
│   ├── models/               ← Schematy Mongoose (MVC - Model)
│   ├── routes/               ← Definicje endpointów REST
│   ├── validators/           ← Walidacja danych (express-validator)
│   ├── server.js             ← Punkt wejściowy serwera
│   └── .env.example          ← Przykładowe zmienne środowiskowe
│
└── frontend/                 ← Aplikacja React (MVC - View)
    └── src/
        ├── components/       ← Komponenty wielokrotnego użytku
        ├── context/          ← Globalny stan autoryzacji
        ├── pages/            ← Strony (Login, Register, Dashboard)
        └── services/         ← Komunikacja z API (axios)
```

---

## Uruchomienie — krok po kroku

### 1. MongoDB

```
Połącz cluster używając tego linku w MongoDB Compass:
mongodb+srv://<twojehasło>@cluster0.depjnxd.mongodb.net/
```
---

### 2. Backend

```bash
# Przejdź do folderu backend
cd taskmanager/backend

# Zainstaluj zależności
npm install

Jeżeli plik .env nie istnieje:
Otwórz plik `.env` i uzupełnij:
```env
PORT=5000
MONGO_URI=mongodb+srv://<twojehasło>.depjnxd.mongodb.net/
JWT_SECRET=wpisz_tutaj_dowolny_dlugi_losowy_ciag_znakow
```

# Utwórz plik konfiguracyjny
cp .env.example .env
```

```bash
# Uruchom serwer (tryb developerski z auto-restartem)
npm run dev

# LUB uruchom normalnie
npm start
```

Serwer będzie dostępny pod adresem: **http://localhost:5000**

---

### 3. Frontend

Otwórz **nowy terminal** (backend musi działać równolegle):

```bash
# Przejdź do folderu frontend
cd taskmanager/frontend

# Zainstaluj zależności
npm install

# Uruchom aplikację React
npm start
```

Aplikacja otworzy się w przeglądarce pod adresem: **http://localhost:3000**

---

## Korzystanie z aplikacji

1. Przejdź na **http://localhost:3000**
2. Kliknij **„Zarejestruj się"** i utwórz konto
3. Po zalogowaniu możesz:
   - Dodawać zadania przyciskiem **„+ Nowe zadanie"**
   - Filtrować zadania po statusie i priorytecie
   - Zmieniać status zadania bezpośrednio na karcie
   - Edytować i usuwać zadania

---

## API — endpointy

| Metoda | Endpoint              | Opis                          | Wymaga tokenu |
|--------|-----------------------|-------------------------------|---------------|
| POST   | /api/auth/register    | Rejestracja użytkownika       | Nie           |
| POST   | /api/auth/login       | Logowanie                     | Nie           |
| GET    | /api/tasks            | Pobierz zadania (+ filtry)    | Tak           |
| POST   | /api/tasks            | Utwórz zadanie                | Tak           |
| PUT    | /api/tasks/:id        | Edytuj zadanie                | Tak           |
| DELETE | /api/tasks/:id        | Usuń zadanie                  | Tak           |

Token JWT należy przesyłać w nagłówku: `Authorization: Bearer <token>`

Opcjonalne parametry GET /api/tasks:
- `?status=todo` — filtruj po statusie (`todo`, `in-progress`, `done`)
- `?priority=high` — filtruj po priorytecie (`low`, `medium`, `high`)

---

## Technologie i wymagania zaliczeniowe

| Wymaganie                       | Realizacja                              |
|---------------------------------|-----------------------------------------|
| Szkielet po stronie serwera     | **Express.js**                          |
| Szkielet po stronie klienta     | **React**                               |
| Nierelacyjna baza danych        | **MongoDB** + Mongoose                  |
| Operacje CRUD                   | Pełny CRUD na zadaniach                 |
| REST API                        | Endpointy /api/auth i /api/tasks        |
| Hashowanie haseł                | **bcryptjs** (10 rund)                  |
| Autoryzacja i ochrona tras      | **JWT** + middleware auth               |
| Walidacja po stronie klienta    | **react-hook-form**                     |
| Walidacja po stronie serwera    | **express-validator**                   |
| Wzorzec MVC                     | Models / Controllers / Routes+Views     |

---


