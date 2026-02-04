# @marianmeres/collection-types — Agent Guide

## Quick Reference

| | |
|-|-|
| **Stack** | TypeScript (type definitions only) |
| **Runtime** | Deno (dev), publishes to JSR + npm |
| **Type check** | `deno check src/mod.ts` |
| **Release** | `deno task rp` (patch) / `deno task rpm` (minor) |

## Project Structure

```
src/
├── mod.ts              # Entry point (barrel export)
├── utils.ts            # Branded types (UUID, ISODateString, LtreePath)
├── model.ts            # Model entity types
├── collection.ts       # Collection container types
├── relation.ts         # Relation and RelationType entity types
├── schema.ts           # JSON Schema extensions for UI/form generation
├── schema-builder.ts   # Type-safe schema builder (createObjectSchema)
├── api.ts              # API response wrappers, pagination, query syntax
├── asset.ts            # File attachment types
├── adapter.ts          # Database adapter interface types
├── linked.ts           # Metadata-based asset linking configuration
├── navigation.ts       # Admin UI navigation menu types
├── form-routes.ts      # Form route override configuration types
└── [domain].ts         # Domain-specific data types (account, customer, order, etc.)
```

## Critical Conventions

1. **DTO Layering**: `DTOIn` (input) → `DTOOut` (+ server fields) → `DbRow` (+ internal fields)
2. **Field Prefixes**: `__` internal (not exposed), `_` server-managed (read-only), none user-provided
3. **Branded Types**: Use `UUID`, `ISODateString`, `LtreePath` for compile-time safety
4. **Flat Structure**: All types in src/, no subdirectories
5. **JSDoc Comments**: All exports documented inline
6. **Generic Models**: Use `Model<TData>` for typed data access

## Before Making Changes

- [ ] Read existing types in target file first
- [ ] Follow DTO layering pattern if adding entity types
- [ ] Add JSDoc comments to new exports
- [ ] Run `deno check src/mod.ts`
- [ ] Export from mod.ts if adding new public types
- [ ] Formatting: tabs, 4-space indent width, 90 char line width

## Related Packages

- `@marianmeres/condition-builder` — QueryOperator type is mirrored from here

## Documentation Index

| Document | Purpose |
|----------|---------|
| [docs/type-catalog.md](./docs/type-catalog.md) | Complete type reference (100+ types) |
| [README.md](./README.md) | Installation, user guide, best practices |
