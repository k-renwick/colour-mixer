const DEFAULT_PERCENTAGE = 0.5
const BLACK = '#000'
const WHITE = '#FFF'

/**********************************************************************************************************************
 * Checks if string is a valid hex colour code
 * @param {string} colour
 * @returns {boolean} returns true if passed string is a valid hex colour code, false otherwise
 */
export function isValidHex(colour = '') {
  return /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3,4})$/g.test(colour.toString())
}

/**********************************************************************************************************************
 * Checks if string is a valid rgb or rgba colour code
 * @param {string} colour
 * @returns {boolean} returns true is passed string is a valid rgb or rgba colour code, false otherwise
 */
export function isValidRgb(colour = '') {
  colour.toString()
  const isRgb = /^rgb\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)$/g.test(colour)
  const isRgba = /^rgba\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3}), ?(1|0|0\.[0-9]+)\)$/g.test(colour)
  return isRgb || isRgba
}

/**********************************************************************************************************************
 * Converts an rgb numeric array to a hex code
 * @param {number} r red
 * @param {number} g green
 * @param {number} b blue
 * @returns {string} Hex colour code
 */
export function asHex(r, g, b) {
  return isValidRgb(`rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`) &&
    `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).substr(0, 6).toUpperCase()}`
}

/**********************************************************************************************************************
 * Converts colour string to a numeric rgb array
 * @param {string} colour
 * @returns {Array.<number>} Numeric array of rgb values
 */
export function asRgbArray(colour) {
  // Handle rgb colour codes
  if (isValidRgb(colour)) {
    const [r, g, b] = colour.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',').slice(0, 3)
    return [parseInt(r), parseInt(g), parseInt(b)]
  }

  // Handle hex colour codes
  if (isValidHex(colour)) {
    colour = colour.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b)
    const [_, r, g, b] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(colour)
    return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)]
  }

  // Handle invalid colour codes
  return false
}

/**********************************************************************************************************************
 * Blends two colours together
 * @param {string} firstColour Any valid hex or rgb colour string
 * @param {number} percentage Valid numbers are between 0 and 1
 * @param {string} secondColour Any valid hex or rgb colour string
 * @returns {string} Resulting blended colour in hex format
 */
export function blend(firstColour, percentage = DEFAULT_PERCENTAGE, secondColour = WHITE) {
  // Ensure colours are valid codes and percentage is numeric
  if (
    !isValidHex(firstColour) && !isValidRgb(firstColour) ||
    !isValidHex(secondColour) && !isValidRgb(secondColour) ||
    isNaN(percentage)
  ) return false

  firstColour = asRgbArray(firstColour)
  secondColour = asRgbArray(secondColour)
  percentage = percentage > 1 ? 1 : percentage < 0 ? 0 : percentage

  const blendedRgb = firstColour.map((c, i) => percentage * c + (1 - percentage) * secondColour[i])

  return asHex(...blendedRgb)
}

/**********************************************************************************************************************
 * Takes a colour and lightens it by a percent
 * @param {string} colour Any valid hex or rgb colour string
 * @param {number} percentage Valid numbers are between 0 and 1
 * @returns {string} Resulting lightened colour in hex format
 */
export function lighten(colour, percentage = DEFAULT_PERCENTAGE) {
  return blend(colour, percentage, WHITE)
}

/**********************************************************************************************************************
 * Takes a colour and darkens it by a percent
 * @param {string} colour Any valid hex or rgb colour string
 * @param {number} percentage Valid numbers are between 0 and 1
 * @returns {string} Resulting darkened colour in hex format
 */
export function darken(colour, percentage = DEFAULT_PERCENTAGE) {
  return blend(colour, percentage, BLACK)
}