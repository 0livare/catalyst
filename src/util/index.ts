/**
 * Transform a string into an enum value whose key exactly matches the string.
 * The preferable way to do this is instead to use an enum with a string value,
 * and then simply cast the string to the enum type with 'as'.  This, for example,
 * allows spaces to be used, whereas spaces are of course not allowed in the
 * variable name that is the enum key.
 * @param enumObj The Enum object to derive the key from
 * @param str A string which exactly matches one of the keys of the intended enum
 */
export function getEnumFromStringKey<T>(enumObj: T, str: string): T[keyof T] {
  const enumKey = str as keyof T
  return enumObj[enumKey]
}

/**
 *
 * @param enumObj
 */
export function getIntEnumKeys(enumObj: any) {
  Object
    .keys(enumObj)
    .filter(key => !isNaN(Number(enumObj[key])))
}

export const emptyChar = '—' // emdash, em dash

/**
 * Like Array.map(), except that it excludes falsy values from
 * the mapped array, and if there are no truthy values in the
 * mapped array, it simply returns null.
 * @param arr The array to be mapped
 * @param map The mapping function
 */
export function mapExcludeNulls<A, B>(arr: A[], map: (a: A) => B): B[] | null {
  let mapped: B[] = arr.map(map)
  let areDefined = mapped.filter(b => b)
  return areDefined.length > 0 ? areDefined : null
}

/**
 * Returns the names of any parameters to the passed function.
 * e.g. 'function (a,b,c)...' // returns ["a","b","c"]
 * Stolen from: https://stackoverflow.com/a/31194949/2517147
 * @param func The function to analyze
 */
export function getFunctionArgNames(func: (...args: any[]) => any) {
  return (func + '')
    .replace(/[/][/].*$/mg, '') // strip single-line comments
    .replace(/\s+/g, '') // strip white space
    .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments
    .split('){', 1)[0].replace(/^[^(]*[(]/, '') // extract the parameters
    .replace(/=[^,]+/g, '') // strip any ES6 defaults
    .split(',').filter(Boolean) // split & filter [""]
}