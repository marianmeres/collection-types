export type TW_COLORS =
	| "amber"
	| "blue"
	| "cyan"
	| "emerald"
	| "fuchsia"
	| "gray"
	| "green"
	| "indigo"
	| "lime"
	| "neutral"
	| "orange"
	| "pink"
	| "purple"
	| "red"
	| "rose"
	| "sky"
	| "slate"
	| "stone"
	| "teal"
	| "violet"
	| "yellow"
	| "zinc";

/**
 * Base configuration interface for Joy admin UI.
 * Extensible via index signature - consumers can add custom fields.
 *
 * @example
 * ```ts
 * // Extend with custom fields
 * interface MyJoyConfig extends JoyConfig {
 *   myCustomField: string;
 *   stuic: {
 *     DismissibleMessage: {
 *       theme: "red" | "blue"; // Stricter typing
 *     };
 *   };
 * }
 * ```
 */
export interface JoyConfig {
	/** Project/app title */
	title?: string;

	/** Stuic component configuration overrides */
	stuic?: {
		DismissibleMessage?: {
			/** Theme color for dismissible messages */
			theme?: TW_COLORS;
		};
		Notifications?: {
			/** Theme color for error notifications */
			themeError?: TW_COLORS;
			/** Theme color for success notifications */
			themeSuccess?: TW_COLORS;
			/** Theme color for info notifications */
			themeInfo?: TW_COLORS;
			/** Theme color for warning notifications */
			themeWarn?: TW_COLORS;
		};
		[component: string]: Record<string, unknown> | undefined;
	};

	/** Index signature for custom extensions */
	[key: string]: unknown;
}
