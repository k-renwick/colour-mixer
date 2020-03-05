/**********************************************************************************************************************
 * Checks if string is a valid hex colour code
 * @param {string} colour
 * @returns {boolean} returns true is passed string is a valid hex colour code, false otherwise
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
 * Converts an rgb string to an array of numbers
 * @param {string} rgb rgb string
 */
export function asRgb(hex) {
  if (!isHexCode(hex)) return false
  hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b)
  const [colour, r, g, b] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex)
  return colour ? [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)] : false
}

/**********************************************************************************************************************
 * Converts an rgb string to an array of numbers
 * @param {string} rgb
 * @returns {Array.<number>} Numeric array of rgb values
 */
export function asRgbArray(rgb) {
  return isRgbCode(rgb) &&
    rgb.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',').slice(0, 3)
}

/**********************************************************************************************************************
 * Blends two colours together
 * @param {string} colour original colour
 * @param {number} opacity valid numbers are between 0 and 1
 * @param {string} [background=white]
 * @returns {string} blended colour
 */
export function blend(colour, opacity = 0.16, background = [255, 255, 255]) {
  if (!isHexCode(colour) && !isRgbCode(colour)) return false
  opacity = isNaN(opacity) ? 0.16 : opacity > 1 ? 1 : opacity < 0 ? 0 : opacity
  colour = asRgb(colour) || asRgbArray(colour)
  const blendedRgb = colour.map((colour, index) => opacity * colour + (1 - opacity) * background[index])
  return asHex(...blendedRgb)
}

//TODO: add "lighten" and "darken" methods
