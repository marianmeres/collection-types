# Type Catalog

Complete type reference for @marianmeres/collection-types.

## Type Hierarchy

```
Model:        ModelDTOIn → ModelDTOOut → ModelDbRow → Model<TData>
Collection:   CollectionDTOIn → CollectionDTOOut → CollectionDbRow (= Collection)
RelationType: RelationTypeDTOIn → RelationTypeDTOOut → RelationTypeDbRow (= RelationType)
Relation:     RelationDTOIn → RelationDTOOut → RelationDbRow (= Relation)
```

---

## utils.ts — Branded Types & Helpers

| Type | Description |
|------|-------------|
| `UUID` | String type for UUIDs |
| `ISODateString` | String type for ISO 8601 dates |
| `LtreePath` | String type for PostgreSQL ltree paths |
| `MaybeLocalized<T>` | `T \| Record<string, T>` for localized values |
| `JsonPrimitive` | `string \| number \| boolean \| null` |
| `JsonObject` | `{ [key: string]: JsonValue }` |
| `JsonArray` | `JsonValue[]` |
| `JsonValue` | `JsonPrimitive \| JsonObject \| JsonArray` |
| `UserData` | `Record<string, unknown>` for flexible data |
| `Brand<T, B>` | Helper for creating branded types |

## model.ts — Model Entity Types

| Type | Description |
|------|-------------|
| `ModelDTOIn` | Input DTO (type, parent_id, path, folder, tags, data, meta, flags) |
| `ModelDTOOut` | + model_id, collection_id, depth, _label, _created_at, _updated_at |
| `ModelDbRow` | + __is_rest_disabled, __searchable, __searchable2, __hierarchy_path |
| `ModelUpsertData` | + __relations__ for relation upserts |
| `Model<TData>` | Generic type with typed data field |

## collection.ts — Collection Container Types

| Type | Description |
|------|-------------|
| `FolderDefinition` | Folder config (label, description, color) |
| `TagDefinition` | Tag config (label, color) |
| `CollectionDTOIn` | Input DTO (path, cardinality, types, schemas, defaults, folders, tags) |
| `CollectionDTOOut` | + collection_id, project_id, _created_at, _updated_at |
| `CollectionDbRow` | + __is_rest_disabled |
| `Collection` | Alias for CollectionDbRow |

## relation.ts — Relationship Types

| Type | Description |
|------|-------------|
| `RelationTypeDTOIn` | Input DTO (relation_type, model_collection_id, related_collection_id) |
| `RelationTypeDTOOut` | + _relation_type_id, cardinality fields, timestamps |
| `RelationTypeDbRow` | + __is_rest_disabled |
| `RelationType` | Alias for RelationTypeDbRow |
| `RelationDTOIn` | Input DTO (related_id, weak_related_id, sort_order, flags, meta) |
| `RelationDTOOut` | + relation_id, _relation_type_id, model_id, timestamps |
| `RelationDbRow` | Equals RelationDTOOut |
| `Relation` | Alias for RelationDbRow |

## schema.ts — JSON Schema Extensions

| Type | Description |
|------|-------------|
| `SchemaHtmlType` | Union: text, textarea, wysiwyg, number, boolean, select, multiselect, date, datetime, time, color, relation, asset, json, code |
| `RelationTypeConfig` | Config for relation fields (relation_type, domain, entity, cardinality) |
| `AssetTypeConfig` | Config for asset fields (accept, maxSize, variants) |
| `SelectConfig` | Config for select fields (options array) |
| `SchemaHtmlConfig` | HTML field config (type, _type_config, rows, placeholder, help, readonly, hidden) |
| `CustomSchemaKeywords` | Custom keywords (_default, _html, _title, _description, _label_source, _unique, _searchable, _order) |
| `PropertyDefinition` | JSON Schema + custom keywords |
| `ModelDefinition` | Model type schema (properties, required) |

## api.ts — API & Query Types

| Type | Description |
|------|-------------|
| `PaginationMeta` | Pagination info (limit, offset, total, hasMore) |
| `ApiResponse<T>` | Generic response wrapper (data, meta) |
| `ApiListResponse<T>` | List response with pagination and included relations |
| `QueryOperator` | Filter operators: eq, neq, gt, gte, lt, lte, like, nlike, match, nmatch, is, nis, in, nin, ltree, ancestor, descendant |
| `QueryCondition` | Single filter condition (field, operator, value) |
| `QuerySyntax` | Query params (where, search, order, asc, limit, offset) |

## asset.ts — File Attachment Types

| Type | Description |
|------|-------------|
| `AssetVariant` | Asset variant (name, width, height, format, url) |
| `AssetData` | Asset metadata (filename, mimetype, size, url, variants, metadata) |
| `ModelAsset` | Asset attached to model (asset_id, model_id, field_name, sort_order, data, timestamps) |

## adapter.ts — Database Adapter Types

| Type | Description |
|------|-------------|
| `DbQueryResult<T>` | Query result (rows, rowCount) |
| `QueryProvider` | DB interface (type: "pg" \| "sqlite", query, each) |
| `AdapterOptions` | Adapter config (tablePrefix, preInitSql, postInitSql, projectIdFk, resetAll) |

## linked-assets.ts — Metadata-Based Asset Linking

| Type | Description |
|------|-------------|
| `LinkedAssetOperator` | Match operators: eq, neq, lt, lte, gt, gte, like, ilike, in, nin, ?, descendant |
| `LinkedAssetValueSource` | Value source: "literal" or "model_field" |
| `LinkedAssetCondition` | Single matching condition (asset_field, operator, value_source, value) |
| `LinkedAssetUploadConfig` | Upload config (auto_fill_custom, type, accept, cardinality) |
| `LinkedAssetUnlinkConfig` | Unlink config (field, confirm) |
| `LinkedAssetQueryConfig` | Query config (domain, entity, type, conditions, base_conditions) |
| `LinkedAssetMatchConfig` | Match context (domain, entity, type) |
| `LinkedAssetRule` | Single rule (id, label, match, asset_query, upload, unlink, enabled, order) |
| `LinkedAssetsConfig` | Complete config with version and rules array |

## navigation.ts — Admin UI Navigation

| Type | Description |
|------|-------------|
| `CollectionTypeEntry` | Type entry within collection (name, schemaTitle) |
| `ModuleRegistryEntry` | Domain module registry (domain, mount, domainLabel, collections) |
| `NavConfig` | Navigation customization (overrides, hidden, custom items) |
| `NavItemDef` | Output nav item (label, href, domain, entity, type, id, folder, icon, group) |

## form-routes.ts — Form Route Overrides

| Type | Description |
|------|-------------|
| `HttpMethod` | HTTP methods for forms: "POST", "PUT", "DELETE" |
| `FormRouteMatch` | Matching context (domain, entity, type, method) with wildcard support |
| `FormRouteRule` | Single override rule (id, description, match, endpoint, enabled, priority) |
| `FormRoutesConfig` | Complete config with version and rules array |
| `FormRouteContext` | Runtime lookup context for route resolution |
