export type TupleToUnion<T extends readonly string[]> =
	T extends readonly string[] ? T[number] : never;

export type UnionToDict<T extends string> = Readonly<{
	[K in T extends string ? Uppercase<T> : never]: T extends string
		? Lowercase<K>
		: never;
}>;

export type LiteralStringUnion<LiteralType> =
	| LiteralType
	| (string & Record<never, never>);

export type ValueOf<
	ObjectType,
	ValueType extends keyof ObjectType = keyof ObjectType,
> = ObjectType[ValueType];

// export const keysToDict = <T extends string>(keys: readonly string[]) =>
// 	keys.reduce(
// 		(all, key) => Object.assign(all, { [key.toLocaleUpperCase()]: key }),
// 		{} as UnionToDict<T>
// 	);

export function assertNotNull(
	value: unknown
): asserts value is NonNullable<typeof value> {
	if (value === null) throw new Error('Argument is null!');
}

export function assertInstanceOf<T>(
	element: unknown,
	expected: new () => T
): asserts element is T {
	if (!element || !(element instanceof expected)) {
		const received = !element ? 'null' : element.constructor.name;
		throw new Error(
			`Expected element to be a ${expected.name}, but was ${received}`
		);
	}
}

export function assertCondition(
	condition: boolean,
	message = 'Damn you typescript'
): asserts condition {
	if (!condition) throw new Error(message);
}
