/** 
 * Get random number between two numbers
 */
export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}