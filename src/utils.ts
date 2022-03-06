export const uuidv4 = (str?: string): string | boolean => {
	if (str) return /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(str);
	const values = [...window.crypto.getRandomValues(new Uint8Array(16))].map(val => { const v = val.toString(16); return v.length > 1 ? v : '0' + v; });
	const groups = [];
	groups.push(values[0] + values[1] + values[2] + values[3]);
	groups.push(values[4] + values[5]);
	groups.push((values[6] + values[7]).replace(/^[\da-f]/i, '4'));
	groups.push((values[8] + values[9]).replace(/^[\da-f]/i, match => ['8', '9', 'a', 'b'][Math.ceil((window.parseInt(match, 16) + 1) / 4) - 1]));
	groups.push(values[10] + values[11] + values[12] + values[13] + values[14] + values[15]);
	return groups.join('-');
};

export const nullishFilter = (value: any) => value != null;
export const capitalizeFirstLetter = (str: string) => str[0].toUpperCase() + str.slice(1).toLowerCase();
