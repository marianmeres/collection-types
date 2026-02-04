# AGENTS.md - @marianmeres/collection-types

Machine-readable documentation for AI agents and automated tools.

## Package Identity

```yaml
name: "@marianmeres/collection-types"
version: "1.x"
type: "workspace-package"
runtime: "deno"
entry: "./src/mod.ts"
```

## Purpose

Type definitions and schema utilities for the collection management system:
- Core types: Model, Collection, Relation
- Branded types: UUID, ISODateString, LtreePath
- Domain types: Account, Product, Order, Customer, Session, etc.
- Schema builder: `createObjectSchema<T>()` for type-safe schema definitions
- Admin UI types: Navigation, FormRoutes, AreaPages, JoyConfig

## Quick Reference

| Task | File | Key Export |
|------|------|------------|
| Branded types | `src/utils.ts` | `UUID`, `ISODateString`, `LtreePath` |
| Model types | `src/model.ts` | `Model<T>`, `ModelDTOIn`, `ModelDTOOut` |
| Collection types | `src/collection.ts` | `Collection`, `CollectionDTOIn` |
| Relation types | `src/relation.ts` | `Relation`, `RelationType` |
| Schema types | `src/schema.ts` | `PropertyDefinition`, `JsonSchema` |
| Schema builder | `src/schema-builder.ts` | `createObjectSchema<T>()` |
| API types | `src/api.ts` | `ApiResponse`, `PaginatedResponse` |
| Asset types | `src/asset.ts` | `AssetData`, `AssetVariant` |
| Navigation types | `src/navigation.ts` | `NavItem`, `UnifiedNavigation` |

## File Map

```
src/
├── mod.ts              # Entry point (barrel export)
├── utils.ts            # Branded types (UUID, ISODateString, LtreePath)
├── model.ts            # Model entity types (ModelDTOIn/Out/DbRow)
├── collection.ts       # Collection container types
├── relation.ts         # Relation and RelationType types
├── schema.ts           # JSON Schema extensions for UI/form
├── schema-builder.ts   # Type-safe schema builder
├── api.ts              # API response wrappers, pagination
├── asset.ts            # File attachment types
├── adapter.ts          # Database adapter interface types
├── linked.ts           # Metadata-based asset linking config
├── navigation.ts       # Admin UI navigation menu types
├── form-routes.ts      # Form route override configuration
├── area-pages.ts       # Custom/Customer area page definitions
├── joy-config.ts       # Admin UI configuration types
├── joy-response.ts     # Unified config endpoint response
├── external-domain.ts  # Cross-domain reference support
└── [domain].ts         # Domain-specific data types:
    ├── account.ts      # AccountData, AccountSession
    ├── customer.ts     # CustomerData
    ├── order.ts        # OrderData, OrderItemData
    ├── payment.ts      # PaymentData
    ├── product.ts      # ProductData, CategoryData
    ├── session.ts      # SessionData, CartItem
    ├── template.ts     # TemplateData
    ├── email.ts        # EmailData, EmailPayload
    ├── project.ts      # ProjectData
    ├── country.ts      # CountryData
    └── example.ts      # ExampleData (reference)
```

## Primary Exports

```typescript
// Branded types
export type { UUID, ISODateString, LtreePath, MaybeLocalized } from "./utils.ts";
export type { JsonPrimitive, JsonObject, JsonArray, JsonValue, UserData } from "./utils.ts";

// Core entities
export type { Model, ModelDTOIn, ModelDTOOut, ModelDbRow, ModelUpsertData } from "./model.ts";
export type { Collection, CollectionDTOIn, CollectionDTOOut, CollectionDbRow } from "./collection.ts";
export type { Relation, RelationType, RelationDTOIn, RelationTypeDTOIn } from "./relation.ts";

// Schema
export type { PropertyDefinition, JsonSchema, HtmlSpec } from "./schema.ts";
export type { ObjectSchema, ExtendedSchema } from "./schema-builder.ts";
export { createObjectSchema } from "./schema-builder.ts";  // Runtime function

// API
export type { ApiResponse, PaginatedResponse, ApiMeta } from "./api.ts";

// Assets
export type { AssetData, AssetVariant } from "./asset.ts";

// Domain types
export type { AccountData, AccountSession } from "./account.ts";
export type { ProductData, CategoryData } from "./product.ts";
export type { CustomerData } from "./customer.ts";
export type { OrderData, OrderItemData } from "./order.ts";
export type { PaymentData } from "./payment.ts";
export type { SessionData, CartItem } from "./session.ts";
export type { TemplateData } from "./template.ts";
export type { EmailData } from "./email.ts";

// Admin UI
export type { NavItem, UnifiedNavigation } from "./navigation.ts";
export type { FormRouteConfig } from "./form-routes.ts";
export type { AreaPageConfig } from "./area-pages.ts";
export type { JoyConfig } from "./joy-config.ts";
```

## Key Types

### Branded Types

```typescript
type UUID = string;           // UUID string
type ISODateString = string;  // ISO 8601 date string
type LtreePath = string;      // PostgreSQL ltree path
type MaybeLocalized<T> = T | Record<string, T>;  // i18n support
```

### Model Layer Types

```typescript
// Input (user-provided)
interface ModelDTOIn {
  type?: string;
  parent_id?: UUID | null;
  path?: LtreePath | null;
  folder?: string | null;
  tags?: string[];
  data?: UserData;
  meta?: UserData;
  is_unlisted?: boolean;
  is_deletable?: boolean;
  is_readonly?: boolean;
  is_starred?: boolean;
  is_enabled?: boolean;
  red?, orange?, yellow?, green?, blue?, purple?, gray?: boolean;
}

// Output (+ server fields)
interface ModelDTOOut extends ModelDTOIn {
  model_id: UUID;
  collection_id: UUID;
  type: string;
  depth: number;
  _label?: MaybeLocalized<string> | null;
  _hierarchy_label?: string | null;
  _created_at: ISODateString;
  _updated_at: ISODateString;
}

// Database (+ internal fields)
interface ModelDbRow extends ModelDTOOut {
  __is_rest_disabled: boolean;
  __searchable: Record<string, unknown>;
  __searchable2: string;
  __hierarchy_path: LtreePath | null;
}

// Generic typed model
type Model<TData extends UserData = UserData> = ModelDbRow & { data: TData };
```

### Schema Builder

```typescript
interface ObjectSchema<T> {
  type: "object";
  required?: (keyof T)[];
  properties: { [K in keyof T]?: PropertyDefinition };
  additionalProperties?: boolean;
  _title?: MaybeLocalized<string>;
  _description?: MaybeLocalized<string>;
  _extra_form_fields?: Record<string, PropertyDefinition>;
}

// Type-safe schema creation
function createObjectSchema<T>(schema: ObjectSchema<T>): ObjectSchema<T>;

// Inheritance pattern
type ExtendedSchema = {
  __extends: string;
  properties?: Record<string, PropertyDefinition>;
};
```

## Type Hierarchy

```
DTOIn (user input)
  │
  ├─► DTOOut (+ server fields: id, timestamps)
  │     │
  │     └─► DbRow (+ internal fields: __searchable, __is_rest_disabled)
  │           │
  │           └─► Model<T> (typed data access)
  │
Field Prefixes:
  - (none)  = user-provided, mutable
  - _       = server-managed, read-only
  - __      = internal, not exposed via API
```

## Common Operations

### Type-Safe Schema Definition

```typescript
import { createObjectSchema, type Model } from "@marianmeres/collection-types";

interface ProductData {
  name: string;
  price: number;
  sku: string;
}

// TypeScript validates property keys match interface
const productSchema = createObjectSchema<ProductData>({
  type: "object",
  required: ["name", "price"],
  properties: {
    name: { type: "string", _label_source: true },
    price: { type: "number" },
    sku: { type: "string", _unique: true }
  }
});

// Typed model usage
type Product = Model<ProductData>;
const product: Product = await service.findOne(id);
console.log(product.data.price);  // TypeScript knows this is number
```

### Schema Inheritance

```typescript
import type { ExtendedSchema } from "@marianmeres/collection-types";

// Base schema
const baseSchema = createObjectSchema<{ name: string }>({
  type: "object",
  properties: { name: { type: "string" } }
});

// Extended schema
const featuredSchema: ExtendedSchema = {
  __extends: "default",
  properties: {
    featured_until: { type: "string", format: "date" }
  }
};
```

### API Response Types

```typescript
import type { ApiResponse, PaginatedResponse, Model } from "@marianmeres/collection-types";

// Single item response
type ProductResponse = ApiResponse<Model<ProductData>>;

// Paginated list response
type ProductListResponse = PaginatedResponse<Model<ProductData>>;
// { data: Product[], meta: { total, limit, offset, ... } }
```

## Testing

```bash
deno check src/mod.ts  # Type check
deno task rp           # Release patch
deno task rpm          # Release minor
```

## Dependencies

This is a types-only package with minimal dependencies:
- None (pure TypeScript types)

## Conventions

1. **DTO Layering**: `DTOIn` → `DTOOut` → `DbRow` → `Model<T>`
2. **Field Prefixes**:
   - `__` = internal (not exposed via API)
   - `_` = server-managed (read-only to clients)
   - (none) = user-provided
3. **Branded Types**: Use `UUID`, `ISODateString`, `LtreePath` for type safety
4. **Generic Models**: Use `Model<TData>` for typed data access
5. **Flat Structure**: All types in `src/`, no subdirectories
6. **JSDoc Comments**: All exports documented inline

## Gotchas/Notes

1. **Index signature requirement**: When using `Model<T>`, your interface needs `[key: string]: unknown` for compatibility with `UserData`. The `createObjectSchema` helper uses `KnownKeys<T>` to still validate property names.

2. **Import style**: Use `import type` for type-only imports to ensure tree-shaking:
   ```typescript
   import type { Model, UUID } from "@marianmeres/collection-types";
   import { createObjectSchema } from "@marianmeres/collection-types";  // Runtime
   ```

3. **MaybeLocalized**: Fields that support i18n can be either a direct value or a `Record<lang, value>`:
   ```typescript
   // Both valid:
   _label: "Product Name"
   _label: { en: "Product Name", de: "Produktname" }
   ```

4. **ExtendedSchema**: For inheritance patterns (`__extends`), use the loose `ExtendedSchema` type instead of `ObjectSchema<T>` since the final shape is computed at runtime.
