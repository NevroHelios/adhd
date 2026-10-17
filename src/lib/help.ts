// Helplines shown on the banner, pause screen, results and help page.
// `checked` is the date someone confirmed the number on the official source.
// Unchecked entries render with a note so nobody mistakes them for verified.

export type Line = { name: string; numbers: string[]; hours: string; about: string; source: string; checked?: string };

export const INDIA: Line[] = [
	{
		name: 'Tele-MANAS',
		numbers: ['14416', '1-800-891-4416'],
		hours: '24x7, free',
		about: 'Government of India mental health helpline. Trained counsellors, many Indian languages.',
		source: 'https://telemanas.mohfw.gov.in',
		checked: '2026-10-18'
	},
	{
		name: 'Emergency (police, fire, ambulance)',
		numbers: ['112'],
		hours: '24x7',
		about: 'If you or someone else is in immediate danger.',
		source: 'https://112.gov.in'
	}
];

export const ELSEWHERE = { name: 'Find A Helpline', url: 'https://findahelpline.com', about: 'Free, confidential helplines in many countries.' };

export const tel = (n: string) => `tel:${n.replace(/[^0-9+]/g, '')}`;
