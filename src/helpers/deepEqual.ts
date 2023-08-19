/**
 * Recursively checks if two objects are deeply equal.
 *
 * @param obj1 - The first object to compare.
 * @param obj2 - The second object to compare.
 * @returns true if objects are deeply equal, otherwise false.
 */
export function deepEqual(obj1: any, obj2: any): boolean {
  // Base case: if both objects are strictly equal, return true.
  if (obj1 === obj2) return true;

  // If either of the objects is not an actual object or is null, they aren't deeply equal.
  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    return false;
  }

  // Get the keys of both objects.
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  // If the number of properties is different between the two objects, they aren't equal.
  if (keys1.length !== keys2.length) return false;

  // Recursively check each property in obj1 against obj2.
  for (let key of keys1) {
    // If obj2 doesn't have the key from obj1 or their values aren't deeply equal, return false.
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  // If all checks passed, objects are deeply equal.
  return true;
}
