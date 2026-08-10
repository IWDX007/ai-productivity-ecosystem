export interface Tool {
  slug: string
  name: string
  description: string
  icon?: string
  status?: 'live' | 'coming-soon'
  isPopular?: boolean
}

export interface Category {
  slug: string
  name: string
  description: string
  longDescription: string
  icon: string
  color: string
  bgColor: string
  totalTools: number
  liveTools: number
  status: 'live' | 'coming-soon'
  phase: string
  tools: Tool[]
}

export const categories: Record<string, Category> = {

  text: {
    slug: 'text',
    name: 'Text Tools',
    description: 'Powerful text manipulation tools',
    longDescription: 'Word counter, case converter, formatter and 27+ more text tools. Free, fast and 100% private.',
    icon: 'Type',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    totalTools: 30,
    liveTools: 30,
    status: 'live',
    phase: 'Phase 1',
    tools: [
      { slug: 'word-counter', name: 'Word Counter', description: 'Count words, chars, sentences', status: 'live', isPopular: true },
      { slug: 'character-counter', name: 'Character Counter', description: 'Count characters instantly', status: 'live', isPopular: true },
      { slug: 'case-converter', name: 'Case Converter', description: 'UPPER, lower, Title, camel case', status: 'live', isPopular: true },
      { slug: 'lorem-ipsum', name: 'Lorem Ipsum Generator', description: 'Generate placeholder text', status: 'live' },
      { slug: 'text-reverser', name: 'Text Reverser', description: 'Reverse text or words', status: 'live' },
      { slug: 'remove-duplicates', name: 'Remove Duplicates', description: 'Remove duplicate lines', status: 'live' },
      { slug: 'line-sorter', name: 'Line Sorter', description: 'Sort lines alphabetically', status: 'live' },
      { slug: 'find-replace', name: 'Find and Replace', description: 'Find and replace text', status: 'live' },
      { slug: 'text-diff', name: 'Text Diff Checker', description: 'Compare two texts', status: 'live' },
      { slug: 'line-counter', name: 'Line Counter', description: 'Count lines in text', status: 'live' },
      { slug: 'slug-generator', name: 'Slug Generator', description: 'Generate URL-friendly slugs', status: 'live' },
      { slug: 'text-splitter', name: 'Text Splitter', description: 'Split text into parts', status: 'live' },
      { slug: 'text-merger', name: 'Text Merger', description: 'Merge multiple texts', status: 'live' },
      { slug: 'whitespace-remover', name: 'Whitespace Remover', description: 'Remove extra spaces', status: 'live' },
      { slug: 'text-repeater', name: 'Text Repeater', description: 'Repeat text N times', status: 'live' },
      { slug: 'random-text', name: 'Random Text Generator', description: 'Generate random text', status: 'live' },
      { slug: 'text-encoder', name: 'Text Encoder', description: 'Encode text', status: 'live' },
      { slug: 'text-decoder', name: 'Text Decoder', description: 'Decode encoded text', status: 'live' },
      { slug: 'text-formatter', name: 'Text Formatter', description: 'Format and clean text', status: 'live' },
      { slug: 'text-statistics', name: 'Text Statistics', description: 'Complete text analysis', status: 'live' },
      { slug: 'readability-score', name: 'Readability Score', description: 'Check text readability', status: 'live' },
      { slug: 'keyword-density', name: 'Keyword Density', description: 'Analyze keyword usage', status: 'live' },
      { slug: 'palindrome-checker', name: 'Palindrome Checker', description: 'Check if text is palindrome', status: 'live' },
      { slug: 'anagram-solver', name: 'Anagram Solver', description: 'Find anagrams', status: 'live' },
      { slug: 'text-to-ascii', name: 'Text to ASCII', description: 'Convert text to ASCII art', status: 'live' },
      { slug: 'ascii-art', name: 'ASCII Art Generator', description: 'Create ASCII art from text', status: 'live' },
      { slug: 'number-to-words', name: 'Number to Words', description: 'Convert numbers to words', status: 'live' },
      { slug: 'words-to-number', name: 'Words to Number', description: 'Convert words to numbers', status: 'live' },
      { slug: 'text-to-speech', name: 'Text to Speech', description: 'Convert text to voice', status: 'live' },
      { slug: 'speech-to-text', name: 'Speech to Text', description: 'Convert voice to text', status: 'live' },
    ]
  },

  calculators: {
    slug: 'calculators',
    name: 'Calculators',
    description: '30 powerful calculators',
    longDescription: 'Finance, health, math, dates and more calculators. Free, fast and 100% private.',
    icon: 'Calculator',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    totalTools: 30,
    liveTools: 30,
    status: 'live',
    phase: 'Phase 1',
    tools: [
      { slug: 'bmi-calculator', name: 'BMI Calculator', description: 'Body Mass Index calculator', status: 'live', isPopular: true },
      { slug: 'loan-calculator', name: 'Loan Calculator', description: 'Calculate loan EMI', status: 'live', isPopular: true },
      { slug: 'percentage-calculator', name: 'Percentage Calculator', description: 'Calculate percentages', status: 'live', isPopular: true },
      { slug: 'tip-calculator', name: 'Tip Calculator', description: 'Calculate restaurant tips', status: 'live' },
      { slug: 'discount-calculator', name: 'Discount Calculator', description: 'Calculate discounts', status: 'live' },
      { slug: 'tax-calculator', name: 'Tax Calculator', description: 'Calculate tax amounts', status: 'live' },
      { slug: 'mortgage-calculator', name: 'Mortgage Calculator', description: 'Home loan mortgage', status: 'live' },
      { slug: 'compound-interest', name: 'Compound Interest', description: 'Calculate compound interest', status: 'live' },
      { slug: 'simple-interest', name: 'Simple Interest', description: 'Calculate simple interest', status: 'live' },
      { slug: 'investment-calculator', name: 'Investment Calculator', description: 'Investment growth', status: 'live' },
      { slug: 'retirement-calculator', name: 'Retirement Calculator', description: 'Plan retirement', status: 'live' },
      { slug: 'salary-calculator', name: 'Salary Calculator', description: 'Salary and take-home', status: 'live' },
      { slug: 'gpa-calculator', name: 'GPA Calculator', description: 'Grade point average', status: 'live' },
      { slug: 'grade-calculator', name: 'Grade Calculator', description: 'Final grade calculator', status: 'live' },
      { slug: 'calorie-calculator', name: 'Calorie Calculator', description: 'Daily calorie needs', status: 'live' },
      { slug: 'body-fat-calculator', name: 'Body Fat Calculator', description: 'Body fat percentage', status: 'live' },
      { slug: 'water-intake', name: 'Water Intake Calculator', description: 'Daily water needs', status: 'live' },
      { slug: 'pregnancy-calculator', name: 'Pregnancy Calculator', description: 'Due date calculator', status: 'live' },
      { slug: 'age-calculator', name: 'Age Calculator', description: 'Exact age calculator', status: 'live' },
      { slug: 'date-calculator', name: 'Date Calculator', description: 'Days between dates', status: 'live' },
      { slug: 'time-calculator', name: 'Time Calculator', description: 'Time difference', status: 'live' },
      { slug: 'scientific-calculator', name: 'Scientific Calculator', description: 'Advanced calculator', status: 'live' },
      { slug: 'fraction-calculator', name: 'Fraction Calculator', description: 'Add, subtract fractions', status: 'live' },
      { slug: 'ratio-calculator', name: 'Ratio Calculator', description: 'Calculate ratios', status: 'live' },
      { slug: 'random-number', name: 'Random Number Generator', description: 'Generate random numbers', status: 'live' },
      { slug: 'probability-calculator', name: 'Probability Calculator', description: 'Calculate probability', status: 'live' },
      { slug: 'statistics-calculator', name: 'Statistics Calculator', description: 'Mean, median, mode', status: 'live' },
      { slug: 'area-calculator', name: 'Area Calculator', description: 'Calculate area of shapes', status: 'live' },
      { slug: 'volume-calculator', name: 'Volume Calculator', description: 'Calculate volumes', status: 'live' },
      { slug: 'currency-calculator', name: 'Currency Calculator', description: 'Currency conversion', status: 'live' },
    ]
  },

  developer: {
    slug: 'developer',
    name: 'Developer Tools',
    description: '35 essential dev tools',
    longDescription: 'Formatters, validators, converters, testers and more for developers.',
    icon: 'Code',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    totalTools: 35,
    liveTools: 35,
    status: 'live',
    phase: 'Phase 1',
    tools: [
      { slug: 'json-formatter', name: 'JSON Formatter', description: 'Format and beautify JSON', status: 'live', isPopular: true },
      { slug: 'json-minifier', name: 'JSON Minifier', description: 'Minify JSON code', status: 'live' },
      { slug: 'json-validator', name: 'JSON Validator', description: 'Validate JSON syntax', status: 'live', isPopular: true },
      { slug: 'json-to-csv', name: 'JSON to CSV', description: 'Convert JSON to CSV', status: 'live' },
      { slug: 'csv-to-json', name: 'CSV to JSON', description: 'Convert CSV to JSON', status: 'live' },
      { slug: 'json-to-xml', name: 'JSON to XML', description: 'Convert JSON to XML', status: 'live' },
      { slug: 'xml-to-json', name: 'XML to JSON', description: 'Convert XML to JSON', status: 'live' },
      { slug: 'json-to-yaml', name: 'JSON to YAML', description: 'Convert JSON to YAML', status: 'live' },
      { slug: 'yaml-to-json', name: 'YAML to JSON', description: 'Convert YAML to JSON', status: 'live' },
      { slug: 'html-beautifier', name: 'HTML Beautifier', description: 'Format HTML code', status: 'live' },
      { slug: 'css-beautifier', name: 'CSS Beautifier', description: 'Format CSS code', status: 'live' },
      { slug: 'css-minifier', name: 'CSS Minifier', description: 'Minify CSS code', status: 'live' },
      { slug: 'js-beautifier', name: 'JS Beautifier', description: 'Format JavaScript', status: 'live' },
      { slug: 'sql-formatter', name: 'SQL Formatter', description: 'Format SQL queries', status: 'live' },
      { slug: 'xml-formatter', name: 'XML Formatter', description: 'Format XML documents', status: 'live' },
      { slug: 'url-encoder', name: 'URL Encoder', description: 'Encode URLs', status: 'live' },
      { slug: 'url-decoder', name: 'URL Decoder', description: 'Decode URLs', status: 'live' },
      { slug: 'base64-encoder', name: 'Base64 Encoder', description: 'Encode text to Base64', status: 'live', isPopular: true },
      { slug: 'base64-decoder', name: 'Base64 Decoder', description: 'Decode Base64', status: 'live' },
      { slug: 'html-entities-encoder', name: 'HTML Entities Encoder', description: 'Encode HTML entities', status: 'live' },
      { slug: 'html-entities-decoder', name: 'HTML Entities Decoder', description: 'Decode HTML entities', status: 'live' },
      { slug: 'regex-tester', name: 'Regex Tester', description: 'Test regular expressions', status: 'live' },
      { slug: 'jwt-decoder', name: 'JWT Decoder', description: 'Decode JWT tokens', status: 'live' },
      { slug: 'html-preview', name: 'HTML Preview', description: 'Live HTML preview', status: 'live' },
      { slug: 'markdown-preview', name: 'Markdown Preview', description: 'Preview Markdown', status: 'live' },
      { slug: 'color-picker', name: 'Color Picker', description: 'Pick colors visually', status: 'live' },
      { slug: 'color-converter', name: 'Color Converter', description: 'Convert color formats', status: 'live' },
      { slug: 'gradient-generator', name: 'Gradient Generator', description: 'Create CSS gradients', status: 'live' },
      { slug: 'color-palette', name: 'Color Palette', description: 'Generate palettes', status: 'live' },
      { slug: 'contrast-checker', name: 'Contrast Checker', description: 'WCAG contrast check', status: 'live' },
      { slug: 'html-table-generator', name: 'HTML Table Generator', description: 'Create HTML tables', status: 'live' },
      { slug: 'uuid-generator', name: 'UUID Generator', description: 'Generate UUIDs', status: 'live' },
      { slug: 'hash-generator', name: 'Hash Generator', description: 'MD5, SHA hashing', status: 'live' },
      { slug: 'cron-generator', name: 'Cron Generator', description: 'Build cron expressions', status: 'live' },
      { slug: 'http-status-codes', name: 'HTTP Status Codes', description: 'HTTP reference', status: 'live' },
    ]
  },

  converters: {
    slug: 'converters',
    name: 'Unit Converters',
    description: '31 unit converters',
    longDescription: 'Convert between units instantly - length, weight, currency, time and more.',
    icon: 'Ruler',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    totalTools: 31,
    liveTools: 31,
    status: 'live',
    phase: 'Phase 1',
    tools: [
      { slug: 'length-converter', name: 'Length Converter', description: 'meter, feet, inches, miles', status: 'live', isPopular: true },
      { slug: 'weight-converter', name: 'Weight Converter', description: 'kg, lb, oz, gram', status: 'live', isPopular: true },
      { slug: 'temperature-converter', name: 'Temperature Converter', description: 'C, F, K, R', status: 'live', isPopular: true },
      { slug: 'volume-converter', name: 'Volume Converter', description: 'liter, gallon, cups', status: 'live' },
      { slug: 'area-converter', name: 'Area Converter', description: 'sqm, sqft, acre, hectare', status: 'live' },
      { slug: 'speed-converter', name: 'Speed Converter', description: 'mph, kph, m/s, knot', status: 'live' },
      { slug: 'time-converter', name: 'Time Converter', description: 'sec, min, hr, day, year', status: 'live' },
      { slug: 'angle-converter', name: 'Angle Converter', description: 'deg, rad, gradian', status: 'live' },
      { slug: 'pressure-converter', name: 'Pressure Converter', description: 'Pa, bar, PSI, atm', status: 'live' },
      { slug: 'energy-converter', name: 'Energy Converter', description: 'J, cal, kWh, BTU', status: 'live' },
      { slug: 'data-storage-converter', name: 'Data Storage Converter', description: 'bit, byte, KB, GB, TB', status: 'live' },
      { slug: 'power-converter', name: 'Power Converter', description: 'W, kW, HP, BTU/h', status: 'live' },
      { slug: 'force-converter', name: 'Force Converter', description: 'N, kN, kgf, lbf', status: 'live' },
      { slug: 'frequency-converter', name: 'Frequency Converter', description: 'Hz, kHz, MHz, RPM', status: 'live' },
      { slug: 'distance-converter', name: 'Distance Converter', description: 'km, mi, AU, light year', status: 'live' },
      { slug: 'fuel-economy-converter', name: 'Fuel Economy Converter', description: 'MPG, km/L, L/100km', status: 'live' },
      { slug: 'number-base-converter', name: 'Number Base Converter', description: 'Binary, Hex, Decimal', status: 'live' },
      { slug: 'roman-numeral-converter', name: 'Roman Numeral Converter', description: 'Roman and Number', status: 'live' },
      { slug: 'timezone-converter', name: 'Timezone Converter', description: 'Convert timezones', status: 'live' },
      { slug: 'unix-time-converter', name: 'Unix Time Converter', description: 'Unix timestamp', status: 'live' },
      { slug: 'date-format-converter', name: 'Date Format Converter', description: 'ISO, US, UK formats', status: 'live' },
      { slug: 'text-to-binary-converter', name: 'Text to Binary', description: 'Text to 0s and 1s', status: 'live' },
      { slug: 'binary-to-text-converter', name: 'Binary to Text', description: 'Binary to text', status: 'live' },
      { slug: 'text-to-ascii-converter', name: 'Text to ASCII', description: 'Get ASCII codes', status: 'live' },
      { slug: 'ascii-to-text-converter', name: 'ASCII to Text', description: 'ASCII to text', status: 'live' },
      { slug: 'morse-code-converter', name: 'Morse Code Converter', description: 'Text and Morse', status: 'live' },
      { slug: 'cooking-measurement-converter', name: 'Cooking Measurement', description: 'cups, tbsp, tsp', status: 'live' },
      { slug: 'shoe-size-converter', name: 'Shoe Size Converter', description: 'US, UK, EU sizes', status: 'live' },
      { slug: 'digital-storage-converter', name: 'Digital Storage', description: 'Advanced storage', status: 'live' },
      { slug: 'currency-converter', name: 'Currency Converter', description: '16 world currencies', status: 'live', isPopular: true },
      { slug: 'number-to-words-converter', name: 'Number to Words', description: 'Numbers to text', status: 'live' },
    ]
  },

  security: {
    slug: 'security',
    name: 'Security Tools',
    description: '20 security tools',
    longDescription: 'Password generators, hashing, encryption, JWT and more. Cryptographically secure.',
    icon: 'Shield',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    totalTools: 20,
    liveTools: 20,
    status: 'live',
    phase: 'Phase 1',
    tools: [
      { slug: 'password-generator', name: 'Password Generator', description: 'Strong custom passwords', status: 'live', isPopular: true },
      { slug: 'password-strength-checker', name: 'Password Strength Checker', description: 'Test password strength', status: 'live', isPopular: true },
      { slug: 'md5-hash-generator', name: 'MD5 Hash Generator', description: 'Generate MD5 hash', status: 'live' },
      { slug: 'sha1-hash-generator', name: 'SHA1 Hash Generator', description: 'Generate SHA1 hash', status: 'live' },
      { slug: 'sha256-hash-generator', name: 'SHA256 Hash Generator', description: 'Generate SHA256', status: 'live', isPopular: true },
      { slug: 'sha512-hash-generator', name: 'SHA512 Hash Generator', description: 'Generate SHA512', status: 'live' },
      { slug: 'random-string-generator', name: 'Random String Generator', description: 'Random strings', status: 'live' },
      { slug: 'uuid-generator', name: 'UUID Generator', description: 'Generate UUID v4', status: 'live' },
      { slug: 'pin-generator', name: 'PIN Generator', description: 'Generate numeric PINs', status: 'live' },
      { slug: 'passphrase-generator', name: 'Passphrase Generator', description: 'Memorable phrases', status: 'live' },
      { slug: 'jwt-decoder', name: 'JWT Decoder', description: 'Decode JWT tokens', status: 'live' },
      { slug: 'jwt-generator', name: 'JWT Generator', description: 'Create JWT tokens', status: 'live' },
      { slug: 'bcrypt-hash-generator', name: 'Bcrypt Hash Generator', description: 'Bcrypt hashing', status: 'live' },
      { slug: 'bcrypt-verifier', name: 'Bcrypt Verifier', description: 'Verify bcrypt hash', status: 'live' },
      { slug: 'hmac-generator', name: 'HMAC Generator', description: 'HMAC SHA256/512', status: 'live' },
      { slug: 'aes-text-encryptor', name: 'AES Text Encryptor', description: 'AES-256 encryption', status: 'live' },
      { slug: 'aes-text-decryptor', name: 'AES Text Decryptor', description: 'AES-256 decryption', status: 'live' },
      { slug: 'random-bytes-generator', name: 'Random Bytes Generator', description: 'Crypto random bytes', status: 'live' },
      { slug: 'hash-comparison-tool', name: 'Hash Comparison Tool', description: 'Compare 2 hashes', status: 'live' },
      { slug: 'base64-hex-converter', name: 'Base64 Hex Converter', description: 'Base64 and Hex', status: 'live' },
    ]
  },

  'qr-barcode': {
    slug: 'qr-barcode',
    name: 'QR and Barcode Tools',
    description: '15 QR and Barcode tools',
    longDescription: 'Generate and scan QR codes and barcodes. WiFi, vCard, Email, Code 128, EAN-13 and more.',
    icon: 'QrCode',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    totalTools: 15,
    liveTools: 15,
    status: 'live',
    phase: 'Phase 1',
    tools: [
      { slug: 'qr-code-generator', name: 'QR Code Generator', description: 'Generate QR for text/URL', status: 'live', isPopular: true },
      { slug: 'wifi-qr-generator', name: 'WiFi QR Generator', description: 'Auto-connect WiFi QR', status: 'live', isPopular: true },
      { slug: 'vcard-qr-generator', name: 'vCard QR Generator', description: 'Contact card QR', status: 'live' },
      { slug: 'email-qr-generator', name: 'Email QR Generator', description: 'Pre-filled email QR', status: 'live' },
      { slug: 'sms-qr-generator', name: 'SMS QR Generator', description: 'Pre-filled SMS QR', status: 'live' },
      { slug: 'phone-qr-generator', name: 'Phone QR Generator', description: 'One-tap call QR', status: 'live' },
      { slug: 'location-qr-generator', name: 'Location QR Generator', description: 'GPS location QR', status: 'live' },
      { slug: 'event-qr-generator', name: 'Event QR Generator', description: 'Calendar event QR', status: 'live' },
      { slug: 'bulk-qr-generator', name: 'Bulk QR Generator', description: 'Multiple QRs at once', status: 'live' },
      { slug: 'qr-code-reader', name: 'QR Code Reader', description: 'Scan QR from camera/image', status: 'live', isPopular: true },
      { slug: 'code128-barcode-generator', name: 'Code 128 Barcode', description: 'Code 128 barcodes', status: 'live' },
      { slug: 'ean13-barcode-generator', name: 'EAN-13 Barcode', description: 'Retail barcodes', status: 'live' },
      { slug: 'upca-barcode-generator', name: 'UPC-A Barcode', description: 'US retail barcodes', status: 'live' },
      { slug: 'code39-barcode-generator', name: 'Code 39 Barcode', description: 'Industrial barcodes', status: 'live' },
      { slug: 'barcode-reader', name: 'Barcode Reader', description: 'Scan any barcode', status: 'live' },
    ]
  },

  image: {
    slug: 'image',
    name: 'Image Tools',
    description: '25 image tools',
    longDescription: 'Compress, resize, convert, watermark, filter and more. All processing in browser.',
    icon: 'Image',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    totalTools: 25,
    liveTools: 25,
    status: 'live',
    phase: 'Phase 1',
    tools: [
      { slug: 'image-compressor', name: 'Image Compressor', description: 'Reduce image file size', status: 'live', isPopular: true },
      { slug: 'image-resizer', name: 'Image Resizer', description: 'Change image dimensions', status: 'live', isPopular: true },
      { slug: 'image-cropper', name: 'Image Cropper', description: 'Crop images precisely', status: 'live', isPopular: true },
      { slug: 'image-rotator', name: 'Image Rotator', description: 'Rotate images 90/180/270', status: 'live' },
      { slug: 'image-flipper', name: 'Image Flipper', description: 'Flip horizontal/vertical', status: 'live' },
      { slug: 'image-converter', name: 'Image Converter', description: 'JPG, PNG, WebP', status: 'live' },
      { slug: 'image-to-base64', name: 'Image to Base64', description: 'Encode to Base64', status: 'live' },
      { slug: 'base64-to-image', name: 'Base64 to Image', description: 'Decode Base64 to image', status: 'live' },
      { slug: 'favicon-generator', name: 'Favicon Generator', description: '9 favicon sizes', status: 'live' },
      { slug: 'image-color-picker', name: 'Image Color Picker', description: 'Pick color from image', status: 'live' },
      { slug: 'image-watermark', name: 'Image Watermark', description: 'Add text watermark', status: 'live' },
      { slug: 'image-filter', name: 'Image Filter', description: '12 preset filters', status: 'live' },
      { slug: 'image-brightness-contrast', name: 'Brightness and Contrast', description: 'Adjust image', status: 'live' },
      { slug: 'png-to-jpg', name: 'PNG to JPG', description: 'Convert PNG to JPG', status: 'live' },
      { slug: 'jpg-to-png', name: 'JPG to PNG', description: 'Convert JPG to PNG', status: 'live' },
      { slug: 'png-to-webp', name: 'PNG to WebP', description: 'Convert to WebP', status: 'live' },
      { slug: 'webp-to-png', name: 'WebP to PNG', description: 'Convert WebP to PNG', status: 'live' },
      { slug: 'image-border', name: 'Image Border', description: 'Add colored borders', status: 'live' },
      { slug: 'image-exif-viewer', name: 'Image EXIF Viewer', description: 'View image metadata', status: 'live' },
      { slug: 'image-placeholder-generator', name: 'Placeholder Generator', description: 'Dummy images', status: 'live' },
      { slug: 'image-blur-tool', name: 'Image Blur Tool', description: 'Adjustable blur', status: 'live' },
      { slug: 'svg-to-png-converter', name: 'SVG to PNG', description: 'Vector to raster', status: 'live' },
      { slug: 'image-merger', name: 'Image Merger', description: 'Combine images', status: 'live' },
      { slug: 'image-splitter', name: 'Image Splitter', description: 'Split into grid', status: 'live' },
      { slug: 'bulk-image-compressor', name: 'Bulk Image Compressor', description: 'Compress many', status: 'live' },
    ]
  },

  pdf: {
    slug: 'pdf',
    name: 'PDF Tools',
    description: 'Complete PDF toolkit',
    longDescription: 'Merge, split, compress, convert, protect and edit PDF files. All in browser.',
    icon: 'FileText',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    totalTools: 15,
    liveTools: 15,
    status: 'live',
    phase: 'Phase 1',
    tools: [
      { slug: 'pdf-merger', name: 'PDF Merger', description: 'Combine multiple PDFs', status: 'live', isPopular: true },
      { slug: 'pdf-splitter', name: 'PDF Splitter', description: 'Split PDF into parts', status: 'live', isPopular: true },
      { slug: 'pdf-compressor', name: 'PDF Compressor', description: 'Reduce PDF file size', status: 'live', isPopular: true },
      { slug: 'pdf-rotator', name: 'PDF Rotator', description: 'Rotate PDF pages', status: 'live' },
      { slug: 'pdf-to-image', name: 'PDF to Image', description: 'PDF pages to PNG', status: 'live' },
      { slug: 'image-to-pdf', name: 'Image to PDF', description: 'Images to PDF file', status: 'live', isPopular: true },
      { slug: 'pdf-password-protector', name: 'PDF Password Protector', description: 'Add password', status: 'live' },
      { slug: 'pdf-watermark', name: 'PDF Watermark', description: 'Add text watermark', status: 'live' },
      { slug: 'pdf-page-extractor', name: 'PDF Page Extractor', description: 'Extract specific pages', status: 'live' },
      { slug: 'pdf-to-text', name: 'PDF to Text', description: 'Extract text content', status: 'live' },
      { slug: 'pdf-page-deleter', name: 'PDF Page Deleter', description: 'Remove pages', status: 'live' },
      { slug: 'pdf-page-reorder', name: 'PDF Page Reorder', description: 'Rearrange pages', status: 'live' },
      { slug: 'pdf-metadata-editor', name: 'PDF Metadata Editor', description: 'Edit title, author', status: 'live' },
      { slug: 'pdf-page-counter', name: 'PDF Page Counter', description: 'Get PDF info', status: 'live' },
      { slug: 'pdf-password-remover', name: 'PDF Password Remover', description: 'Remove protection', status: 'live' },
    ]
  },

  video: {
    slug: 'video',
    name: 'Video Tools',
    description: 'Coming in Phase 3',
    longDescription: 'Video compressor, converter, trimmer, screen recorder and more.',
    icon: 'Video',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    totalTools: 30,
    liveTools: 0,
    status: 'coming-soon',
    phase: 'Phase 3',
    tools: []
  },

  audio: {
    slug: 'audio',
    name: 'Audio Tools',
    description: 'Coming in Phase 3',
    longDescription: 'Audio converter, editor, recorder, trimmer and more.',
    icon: 'Music',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    totalTools: 30,
    liveTools: 0,
    status: 'coming-soon',
    phase: 'Phase 3',
    tools: []
  },

  ai: {
    slug: 'ai',
    name: 'AI Tools',
    description: 'Coming in Phase 3',
    longDescription: 'AI text generator, chatbot, summarizer and more.',
    icon: 'Sparkles',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    totalTools: 30,
    liveTools: 0,
    status: 'coming-soon',
    phase: 'Phase 3',
    tools: []
  },

  seo: {
    slug: 'seo',
    name: 'SEO Tools',
    description: 'Coming in Phase 3',
    longDescription: 'SEO analysis, keyword research, SERP checker and complete toolkit.',
    icon: 'TrendingUp',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    totalTools: 25,
    liveTools: 0,
    status: 'coming-soon',
    phase: 'Phase 3',
    tools: []
  },
}

export function getCategory(slug: string): Category | undefined {
  return categories[slug]
}

export function getAllCategories(): Category[] {
  return Object.values(categories)
}

export function getLiveCategories(): Category[] {
  return Object.values(categories).filter(c => c.status === 'live')
}

export function getComingSoonCategories(): Category[] {
  return Object.values(categories).filter(c => c.status === 'coming-soon')
}