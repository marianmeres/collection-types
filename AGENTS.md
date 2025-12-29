# AGENTS.md

## Project Overview

Type-only package for the @marianmeres ecosystem. No runtime code - pure TypeScript type definitions.

## Structure

```
src/
├── mod.ts          # Main entry point, re-exports all modules
├── utils.ts        # Branded types (UUID, ISODateString, LtreePath) and helpers
├── model.ts        # Model entity types (DTOIn → DTOOut → DbRow pattern)
├── collection.ts   # Collection entity types
├── relation.ts     # Relation and RelationType entity types
├── schema.ts       # JSON Schema extensions for UI/form generation
├── api.ts          # API response wrappers, pagination, query syntax
├── asset.ts        # File attachment types
└── adapter.ts      # Database adapter interface types
```

## Key Patterns

- **DTO Layering**: `DTOIn` (input) → `DTOOut` (+ server fields) → `DbRow` (+ internal fields)
- **Branded Types**: `UUID`, `ISODateString`, `LtreePath` for compile-time safety
- **Internal Fields**: Prefixed with `__` (e.g., `__is_rest_disabled`, `__searchable`)
- **Server Fields**: Prefixed with `_` (e.g., `_created_at`, `_updated_at`)

## Build & Publish

```bash
deno task rp        # Release patch + publish to JSR and npm
deno task rpm       # Release minor + publish
deno check src/mod.ts  # Type check
```

## Related Packages

- `@marianmeres/condition-builder` - QueryOperator type is mirrored from here
- Uses Deno for development, publishes to both JSR and npm

## Notes

- All exports have JSDoc comments
- Flat file structure (no subdirectories in src/)
- Formatting: tabs, 4-space indent width, 90 char line width
