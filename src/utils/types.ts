// export type TupleToUnion<T extends readonly string[]> =
// 	T extends readonly string[] ? T[number] : never;

// export type UnionToDict<T extends string> = Readonly<{
// 	[K in T extends string ? Uppercase<T> : never]: T extends string
// 		? Lowercase<K>
// 		: never;
// }>;

// export const keysToDict = <T extends string>(keys: readonly string[]) =>
// 	keys.reduce(
// 		(all, key) => Object.assign(all, { [key.toLocaleUpperCase()]: key }),
// 		{} as UnionToDict<T>
// 	);

export type LiteralStringUnion<LiteralType> =
	| LiteralType
	| (string & Record<never, never>);

export type ValueOf<
	ObjectType,
	ValueType extends keyof ObjectType = keyof ObjectType,
> = ObjectType[ValueType];

type NonEmptyArray<T> = [T, ...T[]];

type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>] ? U : never;

export function stringUnionToStrictArray<T>() {
	return <U extends NonEmptyArray<T>>(...items: MustInclude<T, U>) => items;
}

// export type Permutations<T, U = T> = [T] extends [never]
// 	? []
// 	: T extends T
// 	? [T, ...Permutations<Exclude<U, T>>]
// 	: never;
