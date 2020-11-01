import randomConfig from '@/configs/random-string'

/**
 * Generate random string
 *
 * @param {Array} characterType
 * @param {Integer} numOfResult
 * @param {Integer} stringLength
 * @returns {String}
 */
export function randomStringGenerate(
  numOfResult = 1,
  stringLength = 6,
  characterType = randomConfig.charactersDefault
) {
  let result = ''
  const characters = characterType
    .map((type) => {
      return randomConfig.characters[type]
    })
    .join('')
  result = Array.apply(
    null,
    Array(Math.max(1, Math.min(randomConfig.maxResult, numOfResult)))
  ).map(() => {
    return Array.apply(
      null,
      Array(Math.max(1, Math.min(randomConfig.maxStringLength, stringLength)))
    )
      .map(() => {
        return characters.charAt(Math.floor(Math.random() * characters.length))
      })
      .join('')
  })

  return result
}

export default ({ app }, inject) => {
  inject('randomStringGenerate', randomStringGenerate)
}
