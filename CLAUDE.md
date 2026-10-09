# CLAUDE.md

Public repo. Two published packages: `packages/sankhya-cms` (Lit, `st-*` elements) and `packages/sankhya-cms-react` (thin React wrappers + JSON renderer).

- Every base component is implemented once, in Lit. `sankhya-cms-react` only wraps (props/events -> `st-*` tags). Never add UI logic to the React side.
- Node 26; oxlint only; simplified flat JSON (`ComponentNode`); keep dependencies at latest.
- TypeScript is pinned to 6.0.x: TS 7 (native) breaks tsup's dts build. Revisit when tsup supports it.
- Consumers: `apps` (via `@sankhyatronics/suite-components`) and `SankhyaPortals`. Both install published versions — keep changes backward compatible, new options optional.
- New component: folder under `packages/sankhya-cms/src/`, add an `exports` entry and add it to the `tsup` source list.
