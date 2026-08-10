// ============================================================
// ALL TEXT TOOLS PROCESSING FUNCTIONS
// ============================================================

// 1. CHARACTER COUNTER
export function characterCount(text: string) {
  const total = text.length
  const noSpaces = text.replace(/\s/g, "").length
  const spaces = total - noSpaces
  const letters = (text.match(/[a-zA-Z]/g) || []).length
  const digits = (text.match(/[0-9]/g) || []).length
  const special = total - letters - digits - spaces
  return { total, noSpaces, spaces, letters, digits, special }
}

// 2. CASE CONVERTER
export function toUpperCase(text: string) { return text.toUpperCase() }
export function toLowerCase(text: string) { return text.toLowerCase() }
export function toTitleCase(text: string) {
  return text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
}
export function toSentenceCase(text: string) {
  return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase())
}
export function toCamelCase(text: string) {
  return text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
}
export function toSnakeCase(text: string) {
  return text.trim().toLowerCase().replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_|_$/g, "")
}
export function toKebabCase(text: string) {
  return text.trim().toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "")
}
export function toPascalCase(text: string) {
  return text.toLowerCase().replace(/(^\w|[^a-zA-Z0-9]+\w)/g, c => c.replace(/[^a-zA-Z0-9]/g, "").toUpperCase())
}
export function toAlternatingCase(text: string) {
  return text.split("").map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join("")
}
export function toInverseCase(text: string) {
  return text.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("")
}

// 3. LOREM IPSUM
const LOREM_WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(" ")

export function generateLorem(count: number, type: "words" | "sentences" | "paragraphs" = "paragraphs") {
  const randomWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]
  const randomSentence = () => {
    const len = 5 + Math.floor(Math.random() * 15)
    const words = Array.from({ length: len }, randomWord)
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
    return words.join(" ") + "."
  }
  const randomParagraph = () => {
    const len = 4 + Math.floor(Math.random() * 5)
    return Array.from({ length: len }, randomSentence).join(" ")
  }

  if (type === "words") return Array.from({ length: count }, randomWord).join(" ")
  if (type === "sentences") return Array.from({ length: count }, randomSentence).join(" ")
  return Array.from({ length: count }, randomParagraph).join("\n\n")
}

// 4. TEXT REVERSER
export function reverseCharacters(text: string) { return text.split("").reverse().join("") }
export function reverseWords(text: string) { return text.split(" ").reverse().join(" ") }
export function reverseLines(text: string) { return text.split("\n").reverse().join("\n") }
export function reverseEachWord(text: string) {
  return text.split(" ").map(w => w.split("").reverse().join("")).join(" ")
}

// 5. REMOVE DUPLICATES
export function removeDuplicateLines(text: string, caseSensitive = true) {
  const lines = text.split("\n")
  const seen = new Set<string>()
  return lines.filter(line => {
    const key = caseSensitive ? line : line.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  }).join("\n")
}
export function removeDuplicateWords(text: string) {
  const words = text.split(/\s+/)
  return Array.from(new Set(words)).join(" ")
}

// 6. LINE SORTER
export function sortLinesAsc(text: string) {
  return text.split("\n").sort((a, b) => a.localeCompare(b)).join("\n")
}
export function sortLinesDesc(text: string) {
  return text.split("\n").sort((a, b) => b.localeCompare(a)).join("\n")
}
export function sortLinesNumeric(text: string, desc = false) {
  return text.split("\n").sort((a, b) => {
    const na = parseFloat(a) || 0
    const nb = parseFloat(b) || 0
    return desc ? nb - na : na - nb
  }).join("\n")
}
export function shuffleLines(text: string) {
  const lines = text.split("\n")
  for (let i = lines.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lines[i], lines[j]] = [lines[j], lines[i]]
  }
  return lines.join("\n")
}

// 7. FIND AND REPLACE
export function findReplace(text: string, find: string, replace: string, options: { caseSensitive?: boolean; regex?: boolean; wholeWord?: boolean } = {}) {
  if (!find) return text
  try {
    let pattern: RegExp
    if (options.regex) {
      pattern = new RegExp(find, options.caseSensitive ? "g" : "gi")
    } else {
      let escaped = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      if (options.wholeWord) escaped = `\\b${escaped}\\b`
      pattern = new RegExp(escaped, options.caseSensitive ? "g" : "gi")
    }
    return text.replace(pattern, replace)
  } catch { return text }
}

// 8. TEXT DIFF (simple line-based)
export function diffTexts(text1: string, text2: string) {
  const lines1 = text1.split("\n")
  const lines2 = text2.split("\n")
  const max = Math.max(lines1.length, lines2.length)
  const diff: Array<{ line: number; left: string; right: string; status: "same" | "changed" | "added" | "removed" }> = []
  for (let i = 0; i < max; i++) {
    const left = lines1[i] || ""
    const right = lines2[i] || ""
    let status: "same" | "changed" | "added" | "removed" = "same"
    if (!lines1[i]) status = "added"
    else if (!lines2[i]) status = "removed"
    else if (left !== right) status = "changed"
    diff.push({ line: i + 1, left, right, status })
  }
  return diff
}

// 9. LINE COUNTER
export function lineStats(text: string) {
  const lines = text.split("\n")
  const total = lines.length
  const nonEmpty = lines.filter(l => l.trim()).length
  const empty = total - nonEmpty
  const avgLength = nonEmpty > 0 ? Math.round(lines.reduce((s, l) => s + l.length, 0) / total) : 0
  const longest = lines.reduce((max, l) => l.length > max ? l.length : max, 0)
  const shortest = nonEmpty > 0 ? lines.filter(l => l.trim()).reduce((min, l) => l.length < min ? l.length : min, Infinity) : 0
  return { total, nonEmpty, empty, avgLength, longest, shortest }
}

// 10. SLUG GENERATOR
export function slugify(text: string, separator = "-") {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, separator)
    .replace(new RegExp(`^${separator}|${separator}$`, "g"), "")
}

// 11. TEXT SPLITTER
export function splitText(text: string, delimiter: string) {
  if (!delimiter) return text
  return text.split(delimiter).join("\n")
}

// 12. TEXT MERGER
export function mergeText(text: string, delimiter: string) {
  return text.split("\n").filter(l => l).join(delimiter)
}

// 13. WHITESPACE REMOVER
export function removeExtraWhitespace(text: string) {
  return text.replace(/\s+/g, " ").trim()
}
export function removeAllWhitespace(text: string) {
  return text.replace(/\s/g, "")
}
export function removeLeadingSpaces(text: string) {
  return text.split("\n").map(l => l.trimStart()).join("\n")
}
export function removeTrailingSpaces(text: string) {
  return text.split("\n").map(l => l.trimEnd()).join("\n")
}
export function removeEmptyLines(text: string) {
  return text.split("\n").filter(l => l.trim()).join("\n")
}

// 14. TEXT REPEATER
export function repeatText(text: string, count: number, separator = "\n") {
  if (count < 1) return ""
  return Array(count).fill(text).join(separator)
}

// 15. RANDOM TEXT
const CHARS = {
  alpha: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numeric: "0123456789",
  alphanumeric: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  special: "!@#$%^&*()_+-=[]{}|;:,.<>?"
}
export function randomText(length: number, type: keyof typeof CHARS = "alphanumeric") {
  const chars = CHARS[type]
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

// 16. TEXT ENCODER
export function encodeURL(text: string) { return encodeURIComponent(text) }
export function encodeHTML(text: string) {
  const map: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }
  return text.replace(/[&<>"']/g, c => map[c])
}
export function encodeBase64(text: string) {
  try { return btoa(unescape(encodeURIComponent(text))) } catch { return "" }
}

// 17. TEXT DECODER
export function decodeURL(text: string) {
  try { return decodeURIComponent(text) } catch { return text }
}
export function decodeHTML(text: string) {
  const map: Record<string, string> = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }
  return text.replace(/&(amp|lt|gt|quot|#39);/g, m => map[m])
}
export function decodeBase64(text: string) {
  try { return decodeURIComponent(escape(atob(text))) } catch { return "" }
}

// 18. TEXT FORMATTER
export function formatText(text: string) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\s+$/gm, "")
    .replace(/^\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

// 19. TEXT STATISTICS (Advanced)
export function textStatistics(text: string) {
  const chars = text.length
  const charsNoSpaces = text.replace(/\s/g, "").length
  const words = (text.match(/\S+/g) || []).length
  const sentences = (text.match(/[.!?]+/g) || []).length
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length
  const lines = text.split("\n").length
  const uniqueWords = new Set(text.toLowerCase().match(/\S+/g) || []).size
  const avgWordLength = words > 0 ? Math.round((charsNoSpaces / words) * 10) / 10 : 0
  const avgSentenceLength = sentences > 0 ? Math.round(words / sentences) : 0
  const readingMin = Math.ceil(words / 200)
  const speakingMin = Math.ceil(words / 130)
  return { chars, charsNoSpaces, words, sentences, paragraphs, lines, uniqueWords, avgWordLength, avgSentenceLength, readingMin, speakingMin }
}

// 20. READABILITY SCORE (Flesch)
export function readabilityScore(text: string) {
  const words = (text.match(/\S+/g) || []).length
  const sentences = Math.max(1, (text.match(/[.!?]+/g) || []).length)
  const syllables = (text.toLowerCase().match(/[aeiouy]+/g) || []).length
  if (words === 0) return { score: 0, level: "N/A", grade: "N/A" }
  const score = Math.round(206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words))
  let level = "Very Difficult", grade = "College Graduate"
  if (score >= 90) { level = "Very Easy"; grade = "5th Grade" }
  else if (score >= 80) { level = "Easy"; grade = "6th Grade" }
  else if (score >= 70) { level = "Fairly Easy"; grade = "7th Grade" }
  else if (score >= 60) { level = "Standard"; grade = "8th-9th Grade" }
  else if (score >= 50) { level = "Fairly Difficult"; grade = "10th-12th Grade" }
  else if (score >= 30) { level = "Difficult"; grade = "College" }
  return { score, level, grade }
}

// 21. KEYWORD DENSITY
export function keywordDensity(text: string, minLength = 3) {
  const stopWords = new Set(["the", "and", "for", "are", "but", "not", "you", "all", "can", "her", "was", "one", "our", "out", "day", "get", "has", "him", "his", "how", "man", "new", "now", "old", "see", "two", "who", "boy", "did", "its", "let", "put", "say", "she", "too", "use", "with", "this", "that", "have", "from", "they", "been", "were", "said", "each", "which", "their", "will", "about", "would", "there", "could", "other"])
  const words = (text.toLowerCase().match(/[a-z]+/g) || []).filter(w => w.length >= minLength && !stopWords.has(w))
  const total = words.length
  const freq: Record<string, number> = {}
  words.forEach(w => freq[w] = (freq[w] || 0) + 1)
  const results = Object.entries(freq)
    .map(([word, count]) => ({ word, count, density: total > 0 ? Math.round((count / total) * 1000) / 10 : 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)
  return { total, unique: Object.keys(freq).length, results }
}

// 22. PALINDROME CHECKER
export function isPalindrome(text: string) {
  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, "")
  const reversed = clean.split("").reverse().join("")
  return { isPalindrome: clean === reversed && clean.length > 0, cleaned: clean, reversed }
}

// 23. ANAGRAM
export function findAnagrams(text: string, words: string) {
  const sortedTarget = text.toLowerCase().replace(/[^a-z]/g, "").split("").sort().join("")
  const wordList = words.split(/\s+/).filter(w => w)
  return wordList.filter(w => w.toLowerCase().replace(/[^a-z]/g, "").split("").sort().join("") === sortedTarget)
}
export function areAnagrams(text1: string, text2: string) {
  const clean1 = text1.toLowerCase().replace(/[^a-z]/g, "").split("").sort().join("")
  const clean2 = text2.toLowerCase().replace(/[^a-z]/g, "").split("").sort().join("")
  return clean1 === clean2 && clean1.length > 0
}

// 24. TEXT TO ASCII
export function textToASCII(text: string) {
  return text.split("").map(c => c.charCodeAt(0)).join(" ")
}
export function asciiToText(codes: string) {
  return codes.split(/\s+/).map(c => String.fromCharCode(parseInt(c))).join("")
}

// 25. ASCII ART (simple banner)
export function textToBanner(text: string) {
  const chars: Record<string, string[]> = {
    A: [" █████ ", "██   ██", "███████", "██   ██", "██   ██"],
    B: ["██████ ", "██   ██", "██████ ", "██   ██", "██████ "],
    C: [" ██████", "██     ", "██     ", "██     ", " ██████"],
    D: ["██████ ", "██   ██", "██   ██", "██   ██", "██████ "],
    E: ["███████", "██     ", "█████  ", "██     ", "███████"],
    F: ["███████", "██     ", "█████  ", "██     ", "██     "],
    G: [" ██████", "██     ", "██  ███", "██   ██", " ██████"],
    H: ["██   ██", "██   ██", "███████", "██   ██", "██   ██"],
    I: ["██", "██", "██", "██", "██"],
    L: ["██     ", "██     ", "██     ", "██     ", "███████"],
    O: [" █████ ", "██   ██", "██   ██", "██   ██", " █████ "],
    " ": ["  ", "  ", "  ", "  ", "  "]
  }
  const upper = text.toUpperCase()
  const rows = ["", "", "", "", ""]
  for (const ch of upper) {
    const glyph = chars[ch] || chars[" "]
    for (let i = 0; i < 5; i++) rows[i] += glyph[i] + "  "
  }
  return rows.join("\n")
}

// 26. NUMBER TO WORDS
const ONES = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"]
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
const SCALES = ["", "thousand", "million", "billion", "trillion"]

function chunkToWords(n: number): string {
  if (n === 0) return ""
  if (n < 20) return ONES[n]
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? "-" + ONES[n % 10] : "")
  return ONES[Math.floor(n / 100)] + " hundred" + (n % 100 ? " " + chunkToWords(n % 100) : "")
}

export function numberToWords(num: number): string {
  if (num === 0) return "zero"
  if (num < 0) return "negative " + numberToWords(-num)
  let words = ""
  let scaleIdx = 0
  while (num > 0) {
    const chunk = num % 1000
    if (chunk) words = chunkToWords(chunk) + (SCALES[scaleIdx] ? " " + SCALES[scaleIdx] : "") + (words ? " " + words : "")
    num = Math.floor(num / 1000)
    scaleIdx++
  }
  return words.trim()
}

// 27. WORDS TO NUMBER (basic)
export function wordsToNumber(words: string): number {
  const numMap: Record<string, number> = {
    zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
    ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
    seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40,
    fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90
  }
  const scaleMap: Record<string, number> = { hundred: 100, thousand: 1000, million: 1000000, billion: 1000000000 }
  let total = 0, current = 0
  words.toLowerCase().replace(/-/g, " ").split(/\s+/).forEach(w => {
    if (w in numMap) current += numMap[w]
    else if (w === "hundred") current *= 100
    else if (w in scaleMap) { total += current * scaleMap[w]; current = 0 }
  })
  return total + current
}