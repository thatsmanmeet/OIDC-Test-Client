# SQLite / `better-sqlite3` VPS Fix

## Symptom

App fails around:

```ts
database: new Database("./auth.db")
```

On the VPS, the real issue was not the code line itself. The native `better-sqlite3` dependency was not building/installing correctly.

## Root Cause

1. `better-auth` required `better-sqlite3` `^12.x`
2. The project was pinned to `better-sqlite3` `^11.10.0`
3. `pnpm-workspace.yaml` had:

```yaml
allowBuilds:
  better-sqlite3: false
```

That setting blocked `better-sqlite3`'s native build step on the VPS.

## Fix Applied

### `package.json`

Changed:

```json
"better-sqlite3": "^11.10.0"
```

to:

```json
"better-sqlite3": "^12.4.1"
```

### `pnpm-workspace.yaml`

Changed:

```yaml
allowBuilds:
  better-sqlite3: false
```

to:

```yaml
allowBuilds:
  better-sqlite3: true
```

## VPS Recovery Steps

After pulling the latest repo changes:

```bash
pnpm install --no-frozen-lockfile
pnpm build
```

## Important Notes

- Use `pnpm`, not `npm`, because this repo uses `pnpm-lock.yaml`
- If install still fails, make sure the VPS has native build tools installed:

```bash
sudo apt update
sudo apt install -y build-essential python3 make g++
```

## Short Version

If this happens again:

1. Check `better-sqlite3` version matches what `better-auth` expects
2. Check `pnpm-workspace.yaml` is not blocking native builds
3. Run:

```bash
pnpm install --no-frozen-lockfile
pnpm build
```
