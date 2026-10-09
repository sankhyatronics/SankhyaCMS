# SankhyaCMS

Open-source building blocks for JSON-driven portals.

| Package | What it is |
|---|---|
| `@sankhyatronics/sankhya-cms` | Lit web components (`st-*`) — the single implementation of every base component |
| `@sankhyatronics/sankhya-cms-react` | Thin React wrappers over the Lit components plus the JSON renderer |

## Rules

- Base components are **Lit only**. React packages wrap them; they never re-implement them.
- **Node 26**, pnpm 12. `pnpm install && pnpm build`.
- **oxlint** only (shared config in `tooling/oxlint-config`); no ESLint.
- Page content uses the **simplified flat JSON** schema (`ComponentNode`: flat props, `children`, `slot`, `@action:`).
- Dependencies are kept at latest; versions live in the `catalog:` of `pnpm-workspace.yaml`.

## Commands

```
pnpm install
pnpm lint | typecheck | build | test
pnpm update-version   # stamps the root version into every package
```

Publishing runs from `.github/workflows/publish.yml` (npmjs, needs the `NPM_TOKEN` secret).
