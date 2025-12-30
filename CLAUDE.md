# CLAUDE.md

Quick reference for @marianmeres/collection-types.

## Common Import Patterns

```typescript
// All types from single import
import type {
	Model, Collection, Relation, RelationType,
	UUID, ISODateString, QuerySyntax, ApiResponse
} from "@marianmeres/collection-types";

// DTOIn types for creating/updating
import type { ModelDTOIn, CollectionDTOIn, RelationDTOIn } from "@marianmeres/collection-types";

// DTOOut types for API responses
import type { ModelDTOOut, CollectionDTOOut, RelationDTOOut } from "@marianmeres/collection-types";

// API/Query types
import type { QuerySyntax, QueryCondition, QueryOperator, ApiListResponse } from "@marianmeres/collection-types";

// Schema types for form generation
import type { PropertyDefinition, ModelDefinition, SchemaHtmlConfig } from "@marianmeres/collection-types";

// Generic model with typed data
import type { Model, UserData } from "@marianmeres/collection-types";
type Book = Model<{ title: string; author: string }>;
```

## Field Naming Conventions

| Prefix | Meaning | Example |
|--------|---------|---------|
| `__` | Internal/system fields (not exposed via API) | `__is_rest_disabled`, `__searchable` |
| `_` | Server-managed fields (read-only) | `_created_at`, `_updated_at`, `_label` |
| none | User-provided fields | `data`, `meta`, `tags` |

## Type Layers

Each entity follows: **DTOIn → DTOOut → DbRow**

- **DTOIn**: User input for create/update
- **DTOOut**: API response with server fields added
- **DbRow**: Full database row with internal fields

## Key Types

| Use Case | Type |
|----------|------|
| Model with typed data | `Model<TData>` |
| Collection container | `Collection` |
| Relationship definition | `RelationType` |
| Relationship instance | `Relation` |
| API list response | `ApiListResponse<T>` |
| Query filtering | `QuerySyntax` |
| Schema field definition | `PropertyDefinition` |
| File attachment | `ModelAsset` |

## Query Operators

`eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `like`, `nlike`, `match`, `nmatch`, `is`, `nis`, `in`, `nin`, `ltree`, `ancestor`, `descendant`
