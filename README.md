# @marianmeres/collection-types

Type definitions and schema utilities for the @marianmeres/collection ecosystem.

## Overview

This package provides:

1. **Core Types**: Model, Collection, Relation, Schema definitions
2. **Domain Types**: Typed interfaces for all stack-xyz domains
3. **Schema Builder**: `createObjectSchema<T>()` for type-safe schema definitions

## Installation

```typescript
import type {
  Model,
  Collection,
  UUID,
  ProductData,
  CustomerData,
} from "@marianmeres/collection-types";

import {
  createObjectSchema,
  type ExtendedSchema,
} from "@marianmeres/collection-types";
```

## Type Layers

The collection system uses a layered type structure:

| Layer | Interface | Purpose |
|-------|-----------|---------|
| Input | `ModelDTOIn` | User-provided fields for create/update |
| Output | `ModelDTOOut` | Response with server-generated fields |
| Database | `ModelDbRow` | Full row including internal fields |
| Typed | `Model<T>` | Generic model with typed `data` field |

```typescript
import type { Model } from "@marianmeres/collection-types";
import type { ProductData } from "@marianmeres/collection-types";

type ProductModel = Model<ProductData>;
// ProductModel.data is typed as ProductData
```

## Domain Types

### Core Types

| File | Exports |
|------|---------|
| `model.ts` | ModelDTOIn, ModelDTOOut, ModelDbRow, Model |
| `collection.ts` | Collection, CollectionDTOIn, CollectionDTOOut |
| `relation.ts` | Relation, RelationType |
| `schema.ts` | PropertyDefinition, SchemaDefinition |
| `utils.ts` | UUID, LtreePath, ISODateString, MaybeLocalized |

### E-commerce Types

| File | Exports |
|------|---------|
| `session.ts` | SessionData, CartData, CartItem |
| `customer.ts` | CustomerData, AddressData |
| `order.ts` | OrderData, OrderEventData, OrderLineItem, OrderTotals |
| `payment.ts` | PaymentData, PaymentIntent, PaymentResult |

### Stack Domain Types

| File | Exports |
|------|---------|
| `account.ts` | AccountData, PasswordData, TokenData |
| `product.ts` | ProductData, CategoryData |
| `project.ts` | ConfigData, ConfigDataDefault, ConfigDataRbac |
| `template.ts` | TemplateData |
| `email.ts` | EmailData, EmailStatus |
| `asset.ts` | AssetData, AssetVariant, ModelAsset |
| `example.ts` | ExampleData, ExampleDataDefault, CommentData |

## Type-Safe Schema Definitions

Use `createObjectSchema<T>()` to catch property typos at compile time.

### The Problem

Without type safety, typos in schema property names are not caught:

```typescript
// BAD: TypeScript does NOT catch the typo "namex"
const schema = {
  type: "object",
  properties: {
    namex: { type: "string" },  // Typo! Should be "name"
  },
};
```

### The Solution

```typescript
import {
  createObjectSchema,
  type ProductData,
} from "@marianmeres/collection-types";

// GOOD: TypeScript catches typos!
const schema = createObjectSchema<ProductData>({
  type: "object",
  required: ["name"],
  properties: {
    namex: { type: "string" },  // TS Error: 'namex' does not exist
  },
});
```

### Defining Data Interfaces

Data interfaces must include:

1. **Data fields** with their types
2. **UI-only fields** (relations) as `never` type
3. **Index signature** for `Model<T>` compatibility

```typescript
export interface ProductData {
  // Data fields
  name: string;
  price?: number;
  sku?: string;

  // UI-only fields (never stored in data)
  category?: never;
  images?: never;

  // Index signature for Model<T> compatibility
  [key: string]: unknown;
}
```

### Extended Schemas

For schemas using `__extends`, use `ExtendedSchema`:

```typescript
import { type ExtendedSchema } from "@marianmeres/collection-types";

const schemas = {
  default: createObjectSchema<ProductData>({
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string" },
      price: { type: "integer" },
    },
  }),

  premium: {
    __extends: "default",
    properties: {
      warranty_years: { type: "integer" },
    },
  } as ExtendedSchema,
};
```

## Best Practices

1. Define all domain interfaces in this package
2. Use `createObjectSchema<T>()` for base schemas
3. Use `as ExtendedSchema` for `__extends` schemas
4. Include UI-only fields as `never` type
5. Keep index signature for Model<T> compatibility
6. Re-export types from stack package mod.ts

See `workspace/stack-example/README.md` for comprehensive examples.

## License

MIT
