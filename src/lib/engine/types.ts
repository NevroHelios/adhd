// Shapes shared by the engine. The bank is compiled from bank/*.yaml at build
// time; a session is nothing but the list of answers given so far.

export type Track = 'validated' | 'experimental';
export type Mode = 'validated' | 'experimental';

export type Band = { min: number; label: string; level: number }; // level 0 = none .. 4 = severe

// GRM parameters: discrimination a, ordered thresholds b (length = options - 1).
export type Irt = { a: number; b: number[] };

export type Item = {
	id: string; // globally unique, e.g. "phq9.9"
	text: string;
	text_in?: string; // Indian wording variant, when it differs
	options: string[]; // response = option index
	weights?: number[]; // score per option; default = index
	counts_from?: number; // count scoring: option index at which the item counts
	always?: boolean; // asked even when the scale's screen is negative (safety items)
	risk?: { banner: number; pause: number }; // option index thresholds
	irt?: Irt;
};

export type Scale = {
	id: string;
	condition: string;
	name: string;
	track: Track;
	source: string; // citation + where the wording was checked
	timeframe: string;
	stem?: string;
	scoring: 'sum' | 'count' | 'none' | 'irt';
	screen?: { items: number; cutoff: number }; // first N items; continue only if score >= cutoff
	cutoff?: number; // published positive threshold on the full scale
	bands?: Band[]; // ascending by min
	opens_if?: { scale: string; min: number }; // scale score needed to open this scale
	max_items?: number; // irt scales: hard cap
	items: Item[];
};

export type Condition = { id: string; name: string; blurb: string };

export type Bank = { version: string; conditions: Condition[]; scales: Scale[] };

export type Answer = { id: string; value: number };
