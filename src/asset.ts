/**
 * Asset types for the collection system.
 * Assets are file attachments associated with models.
 */

import type { UUID, ISODateString } from "./utils.ts";

/**
 * Variant of an asset (e.g., thumbnail, preview).
 */
export interface AssetVariant {
	/** Variant name (e.g., "thumbnail", "large") */
	name: string;
	/** Width in pixels */
	width?: number;
	/** Height in pixels */
	height?: number;
	/** File format (e.g., "webp", "jpg") */
	format?: string;
	/** URL to access this variant */
	url: string;
}

/**
 * Asset data including file metadata and variants.
 */
export interface AssetData {
	/** Original filename */
	filename: string;
	/** MIME type */
	mimetype: string;
	/** File size in bytes */
	size: number;
	/** URL to access the original file */
	url: string;
	/** Generated variants (thumbnails, previews, etc.) */
	variants?: AssetVariant[];
	/** Additional file metadata */
	metadata?: Record<string, unknown>;
}

/**
 * Asset attached to a model.
 */
export interface ModelAsset {
	/** Unique asset identifier */
	asset_id: UUID;
	/** Model this asset belongs to */
	model_id: UUID;
	/** Field name in the model schema */
	field_name: string;
	/** Sort order for multiple assets */
	sort_order: number;
	/** Asset file data */
	data: AssetData;
	/** Creation timestamp */
	_created_at: ISODateString;
	/** Last update timestamp */
	_updated_at: ISODateString;
}
