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
| Cross-domain reference meta | `ExternalDomainMeta` |
| Admin UI navigation | `NavConfig`, `NavItemDef` |
| Linked assets config | `LinkedAssetsConfig`, `LinkedAssetRule` |
| Form route overrides | `FormRoutesConfig`, `FormRouteRule` |

## Relation Types

Relations support two reference mechanisms:

```typescript
// RelationDTOIn - one of these must be provided
interface RelationDTOIn {
  related_id?: UUID;         // Strong: FK-enforced (same adapter)
  weak_related_id?: string;  // Weak: No FK (cross-domain, external)
  sort_order?: number;
  meta?: Record<string, any>;
}
```

**When to use each:**
- `related_id`: Models in the same adapter (product→tag, order→event)
- `weak_related_id`: Cross-domain refs or external IDs (session→account)

## ExternalDomainMeta

For cross-domain relations, descriptor collections use this metadata:

```typescript
import { ExternalDomainMeta, isExternalDomainMeta } from "@marianmeres/collection-types";

// In collection.meta
const meta: ExternalDomainMeta = {
  __external_domain__: true,           // Marker flag
  external_domain: "account",          // Target domain
  external_adapter_prefix: "account_", // Target table prefix
  external_collection_path: "account", // Target collection path
  description: "Cross-domain ref",
};

// Type guard
if (isExternalDomainMeta(collection.meta)) {
  // Handle as external reference
}
```

## Query Operators

`eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `like`, `nlike`, `match`, `nmatch`, `is`, `nis`, `in`, `nin`, `ltree`, `ancestor`, `descendant`

## Form Route Overrides

Types for the `__joy_form_routes__` config record that allows custom form submission endpoints:

```typescript
import type {
  FormRoutesConfig,
  FormRouteRule,
  FormRouteMatch,
  FormRouteContext,
  HttpMethod
} from "@marianmeres/collection-types";

// Config stored as __joy_form_routes__ model value
const config: FormRoutesConfig = {
  version: 1,
  rules: [{
    id: "product-special",
    description: "Custom save for products",
    match: { domain: "product", entity: "product", method: "PUT" },
    endpoint: "/api/custom/products/{id}/save",
    enabled: true,
    priority: 10
  }]
};

// Wildcards supported: "*" matches any value
const wildcardMatch: FormRouteMatch = { domain: "product", entity: "*", type: "*", method: "*" };

// Endpoint placeholders: {domain}, {entity}, {type}, {id}
```

## Navigation Types

Types for admin UI navigation generation stored in `__nav_config__`:

```typescript
import type { NavConfig, NavItemDef, ModuleRegistryEntry } from "@marianmeres/collection-types";

// Customize auto-generated navigation
const navConfig: NavConfig = {
  overrides: {
    "product": { label: "Products", order: 1, icon: "box" },
    "product/category": { label: "Categories", group: "Catalog" }
  },
  hidden: ["example", "project/_config"],
  custom: [{ label: "Dashboard", href: "/dashboard", icon: "home", order: 0 }]
};
```

## Linked Assets

Types for metadata-based asset linking stored in `__joy_linked_assets__`:

```typescript
import type { LinkedAssetsConfig, LinkedAssetRule } from "@marianmeres/collection-types";

// Link assets by matching metadata fields
const rule: LinkedAssetRule = {
  id: "product-images",
  label: "Product Images",
  match: { domain: "product", entity: "product" },
  asset_query: {
    type: "product-image",
    conditions: [{
      asset_field: "data.custom.sku",
      operator: "eq",
      value_source: "model_field",
      value: "sku"  // Match asset's custom.sku to model's sku field
    }]
  },
  upload: { auto_fill_custom: { "custom.sku": "sku" } }
};
```
