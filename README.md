# SGU Toolbox

A small SvelteKit toolbox for Sai Gon University students.

> **Disclaimer:** This project is not an official service and is not affiliated with the school.

## Features

- Log in with the same account used for the official SGU portal.
- Generate `.ics` calendar files from registered courses.
- Import schedules into Apple Calendar or Google Calendar.
- Complete available lecturer surveys in one click.


## Getting Started

Install dependencies:

```bash
bun install
```

Start the development server:

```bash
bun run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```


## Notes

- This app proxies requests to the official SGU API at `thongtindaotao.sgu.edu.vn`.
- Credentials are used for login requests only and are not stored by the app.
- Generated calendar links are temporary and expire after 15 minutes.
