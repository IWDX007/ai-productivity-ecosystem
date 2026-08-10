// ============================================================
// ALL CALCULATOR LOGIC FUNCTIONS
// ============================================================

// 1. BMI
export function calculateBMI(weight: number, height: number, unit: "metric" | "imperial" = "metric") {
  if (!weight || !height) return null
  let bmi: number
  if (unit === "metric") {
    bmi = weight / Math.pow(height / 100, 2)
  } else {
    bmi = (weight / Math.pow(height, 2)) * 703
  }
  let category = "Normal", color = "green"
  if (bmi < 18.5) { category = "Underweight"; color = "blue" }
  else if (bmi < 25) { category = "Normal"; color = "green" }
  else if (bmi < 30) { category = "Overweight"; color = "yellow" }
  else { category = "Obese"; color = "red" }
  return { bmi: Math.round(bmi * 10) / 10, category, color }
}

// 2. AGE
export function calculateAge(birthDate: string) {
  if (!birthDate) return null
  const birth = new Date(birthDate)
  const now = new Date()
  if (birth > now) return null
  
  let years = now.getFullYear() - birth.getFullYear()
  let months = now.getMonth() - birth.getMonth()
  let days = now.getDate() - birth.getDate()
  
  if (days < 0) {
    months--
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }
  
  const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
  const totalMonths = years * 12 + months
  const totalWeeks = Math.floor(totalDays / 7)
  const totalHours = totalDays * 24
  const totalMinutes = totalHours * 60
  
  return { years, months, days, totalDays, totalMonths, totalWeeks, totalHours, totalMinutes }
}

// 3. LOAN EMI
export function calculateLoan(principal: number, rate: number, tenure: number) {
  if (!principal || !rate || !tenure) return null
  const monthlyRate = rate / 12 / 100
  const months = tenure * 12
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
  const totalPayment = emi * months
  const totalInterest = totalPayment - principal
  return {
    emi: Math.round(emi),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    principal
  }
}

// 4. PERCENTAGE
export function calculatePercentage(operation: string, val1: number, val2: number) {
  if (val1 === undefined || val2 === undefined) return 0
  switch (operation) {
    case "of": return (val1 / 100) * val2
    case "is-what": return (val1 / val2) * 100
    case "increase": return val1 + (val1 * val2 / 100)
    case "decrease": return val1 - (val1 * val2 / 100)
    case "change": return ((val2 - val1) / val1) * 100
    default: return 0
  }
}

// 5. TIP
export function calculateTip(bill: number, tipPercent: number, people: number = 1) {
  if (!bill) return null
  const tip = (bill * tipPercent) / 100
  const total = bill + tip
  const perPerson = people > 0 ? total / people : total
  const tipPerPerson = people > 0 ? tip / people : tip
  return {
    tip: Math.round(tip * 100) / 100,
    total: Math.round(total * 100) / 100,
    perPerson: Math.round(perPerson * 100) / 100,
    tipPerPerson: Math.round(tipPerPerson * 100) / 100
  }
}

// 6. DISCOUNT
export function calculateDiscount(price: number, discount: number) {
  if (!price) return null
  const saved = (price * discount) / 100
  const final = price - saved
  return {
    original: price,
    saved: Math.round(saved * 100) / 100,
    final: Math.round(final * 100) / 100,
    discountPercent: discount
  }
}

// 7. TAX
export function calculateTax(amount: number, taxRate: number) {
  if (!amount) return null
  const tax = (amount * taxRate) / 100
  const total = amount + tax
  return {
    amount,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100,
    rate: taxRate
  }
}

// 8. MORTGAGE
export function calculateMortgage(homePrice: number, downPayment: number, rate: number, years: number) {
  if (!homePrice || !rate || !years) return null
  const principal = homePrice - downPayment
  const monthlyRate = rate / 12 / 100
  const months = years * 12
  const monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
  const totalPayment = monthly * months
  const totalInterest = totalPayment - principal
  return {
    monthly: Math.round(monthly),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    principal,
    downPayment
  }
}

// 9. COMPOUND INTEREST
export function calculateCompoundInterest(principal: number, rate: number, years: number, timesPerYear: number = 12) {
  if (!principal || !rate || !years) return null
  const amount = principal * Math.pow(1 + (rate / 100) / timesPerYear, timesPerYear * years)
  const interest = amount - principal
  return {
    principal,
    amount: Math.round(amount * 100) / 100,
    interest: Math.round(interest * 100) / 100,
    rate,
    years
  }
}

// 10. SIMPLE INTEREST
export function calculateSimpleInterest(principal: number, rate: number, years: number) {
  if (!principal || !rate || !years) return null
  const interest = (principal * rate * years) / 100
  const total = principal + interest
  return {
    principal,
    interest: Math.round(interest * 100) / 100,
    total: Math.round(total * 100) / 100,
    rate,
    years
  }
}

// 11. INVESTMENT
export function calculateInvestment(monthly: number, years: number, annualReturn: number) {
  if (!monthly || !years || !annualReturn) return null
  const monthlyReturn = annualReturn / 12 / 100
  const months = years * 12
  const futureValue = monthly * ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn) * (1 + monthlyReturn)
  const invested = monthly * months
  const earnings = futureValue - invested
  return {
    invested: Math.round(invested),
    futureValue: Math.round(futureValue),
    earnings: Math.round(earnings)
  }
}

// 12. RETIREMENT
export function calculateRetirement(currentAge: number, retireAge: number, currentSavings: number, monthlyContribution: number, annualReturn: number) {
  if (!currentAge || !retireAge || currentAge >= retireAge) return null
  const years = retireAge - currentAge
  const months = years * 12
  const monthlyRate = annualReturn / 12 / 100
  
  const futureCurrentSavings = currentSavings * Math.pow(1 + annualReturn / 100, years)
  const futureContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
  const total = futureCurrentSavings + futureContributions
  
  return {
    yearsUntilRetirement: years,
    totalSavings: Math.round(total),
    fromContributions: Math.round(futureContributions),
    fromInitialSavings: Math.round(futureCurrentSavings)
  }
}

// 13. SALARY
export function calculateSalary(annual: number, hoursPerWeek: number = 40, weeksPerYear: number = 52) {
  if (!annual) return null
  const monthly = annual / 12
  const weekly = annual / weeksPerYear
  const daily = weekly / 5
  const hourly = weekly / hoursPerWeek
  return {
    annual,
    monthly: Math.round(monthly),
    weekly: Math.round(weekly),
    daily: Math.round(daily),
    hourly: Math.round(hourly * 100) / 100
  }
}

// 14. CURRENCY (static rates - real API would be better)
const RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.3, PKR: 278.5, JPY: 149.5,
  CNY: 7.2, AUD: 1.52, CAD: 1.36, CHF: 0.87, AED: 3.67, SAR: 3.75
}
export function convertCurrency(amount: number, from: string, to: string) {
  if (!amount || !RATES[from] || !RATES[to]) return 0
  const usd = amount / RATES[from]
  return Math.round(usd * RATES[to] * 100) / 100
}
export const CURRENCIES = Object.keys(RATES)

// 15. GPA
export function calculateGPA(grades: Array<{ grade: string; credits: number }>) {
  if (grades.length === 0) return null
  const gradePoints: Record<string, number> = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "F": 0.0
  }
  let totalPoints = 0, totalCredits = 0
  grades.forEach(g => {
    if (gradePoints[g.grade] !== undefined && g.credits > 0) {
      totalPoints += gradePoints[g.grade] * g.credits
      totalCredits += g.credits
    }
  })
  if (totalCredits === 0) return null
  return {
    gpa: Math.round((totalPoints / totalCredits) * 100) / 100,
    totalCredits,
    totalPoints: Math.round(totalPoints * 100) / 100
  }
}

// 16. GRADE
export function calculateGrade(score: number, total: number) {
  if (!total) return null
  const percentage = (score / total) * 100
  let grade = "F", gpa = 0.0
  if (percentage >= 93) { grade = "A"; gpa = 4.0 }
  else if (percentage >= 90) { grade = "A-"; gpa = 3.7 }
  else if (percentage >= 87) { grade = "B+"; gpa = 3.3 }
  else if (percentage >= 83) { grade = "B"; gpa = 3.0 }
  else if (percentage >= 80) { grade = "B-"; gpa = 2.7 }
  else if (percentage >= 77) { grade = "C+"; gpa = 2.3 }
  else if (percentage >= 73) { grade = "C"; gpa = 2.0 }
  else if (percentage >= 70) { grade = "C-"; gpa = 1.7 }
  else if (percentage >= 67) { grade = "D+"; gpa = 1.3 }
  else if (percentage >= 60) { grade = "D"; gpa = 1.0 }
  return { percentage: Math.round(percentage * 10) / 10, grade, gpa }
}

// 17. CALORIE (BMR + TDEE)
export function calculateCalories(weight: number, height: number, age: number, gender: "male" | "female", activity: number) {
  if (!weight || !height || !age) return null
  let bmr: number
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161
  }
  const tdee = bmr * activity
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    loseWeight: Math.round(tdee - 500),
    gainWeight: Math.round(tdee + 500)
  }
}

// 18. BODY FAT (Navy method)
export function calculateBodyFat(gender: "male" | "female", height: number, waist: number, neck: number, hip?: number) {
  if (!height || !waist || !neck) return null
  let bodyFat: number
  if (gender === "male") {
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450
  } else {
    if (!hip) return null
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450
  }
  let category = "Essential"
  if (gender === "male") {
    if (bodyFat < 6) category = "Essential Fat"
    else if (bodyFat < 14) category = "Athletes"
    else if (bodyFat < 18) category = "Fitness"
    else if (bodyFat < 25) category = "Average"
    else category = "Obese"
  } else {
    if (bodyFat < 14) category = "Essential Fat"
    else if (bodyFat < 21) category = "Athletes"
    else if (bodyFat < 25) category = "Fitness"
    else if (bodyFat < 32) category = "Average"
    else category = "Obese"
  }
  return { bodyFat: Math.round(bodyFat * 10) / 10, category }
}

// 19. WATER INTAKE
export function calculateWaterIntake(weight: number, activityMinutes: number = 0) {
  if (!weight) return null
  const baseWater = weight * 35
  const extraWater = (activityMinutes / 30) * 350
  const totalMl = baseWater + extraWater
  return {
    ml: Math.round(totalMl),
    liters: Math.round(totalMl / 100) / 10,
    glasses: Math.round(totalMl / 250),
    bottles: Math.round(totalMl / 500 * 10) / 10
  }
}

// 20. PREGNANCY
export function calculatePregnancy(lmp: string) {
  if (!lmp) return null
  const lmpDate = new Date(lmp)
  const dueDate = new Date(lmpDate.getTime() + (280 * 24 * 60 * 60 * 1000))
  const today = new Date()
  const daysPregnant = Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(daysPregnant / 7)
  const days = daysPregnant % 7
  const trimester = weeks < 13 ? 1 : weeks < 27 ? 2 : 3
  const daysRemaining = Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
  return {
    dueDate: dueDate.toDateString(),
    weeks,
    days,
    trimester,
    daysRemaining,
    daysPregnant
  }
}

// 21. DATE DIFFERENCE
export function calculateDateDifference(date1: string, date2: string) {
  if (!date1 || !date2) return null
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diffMs = Math.abs(d2.getTime() - d1.getTime())
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30.44)
  const years = Math.floor(days / 365.25)
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const minutes = Math.floor(diffMs / (1000 * 60))
  return { days, weeks, months, years, hours, minutes }
}

// 22. TIME DIFFERENCE
export function calculateTimeDifference(time1: string, time2: string) {
  if (!time1 || !time2) return null
  const [h1, m1] = time1.split(":").map(Number)
  const [h2, m2] = time2.split(":").map(Number)
  let mins1 = h1 * 60 + m1
  let mins2 = h2 * 60 + m2
  let diff = mins2 - mins1
  if (diff < 0) diff += 24 * 60
  const hours = Math.floor(diff / 60)
  const minutes = diff % 60
  return { hours, minutes, totalMinutes: diff, totalSeconds: diff * 60 }
}

// 23. SCIENTIFIC (basic operations)
export function evaluateExpression(expr: string): number | null {
  try {
    // Safe eval - only math operations
    const clean = expr.replace(/[^0-9+\-*/().\s]/g, "")
    if (!clean) return null
    const result = Function('"use strict"; return (' + clean + ')')()
    return typeof result === "number" && isFinite(result) ? result : null
  } catch { return null }
}

// 24. FRACTION
export function fractionOperation(op: string, a: [number, number], b: [number, number]): [number, number] | null {
  const [n1, d1] = a
  const [n2, d2] = b
  if (!d1 || !d2) return null
  let num: number, den: number
  switch (op) {
    case "+": num = n1 * d2 + n2 * d1; den = d1 * d2; break
    case "-": num = n1 * d2 - n2 * d1; den = d1 * d2; break
    case "*": num = n1 * n2; den = d1 * d2; break
    case "/": num = n1 * d2; den = d1 * n2; break
    default: return null
  }
  const gcd = (x: number, y: number): number => y === 0 ? Math.abs(x) : gcd(y, x % y)
  const divisor = gcd(num, den)
  return [num / divisor, den / divisor]
}

// 25. RATIO
export function simplifyRatio(a: number, b: number) {
  if (!a || !b) return null
  const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y)
  const divisor = gcd(a, b)
  return { a: a / divisor, b: b / divisor, decimal: Math.round((a / b) * 100) / 100 }
}

// 26. RANDOM NUMBER
export function randomNumber(min: number, max: number, count: number = 1) {
  const result: number[] = []
  for (let i = 0; i < count; i++) {
    result.push(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return result
}

// 27. PROBABILITY (basic)
export function calculateProbability(favorable: number, total: number) {
  if (!total) return null
  const prob = favorable / total
  return {
    probability: Math.round(prob * 10000) / 100,
    percentage: Math.round(prob * 10000) / 100,
    odds: `${favorable}:${total - favorable}`,
    decimal: Math.round(prob * 10000) / 10000
  }
}

// 28. STATISTICS
export function calculateStats(numbers: number[]) {
  if (numbers.length === 0) return null
  const sorted = [...numbers].sort((a, b) => a - b)
  const sum = numbers.reduce((a, b) => a + b, 0)
  const mean = sum / numbers.length
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)]
  
  const freq: Record<number, number> = {}
  numbers.forEach(n => freq[n] = (freq[n] || 0) + 1)
  const maxFreq = Math.max(...Object.values(freq))
  const mode = Object.entries(freq).filter(([, f]) => f === maxFreq).map(([n]) => Number(n))
  
  const variance = numbers.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / numbers.length
  const stdDev = Math.sqrt(variance)
  
  return {
    count: numbers.length,
    sum: Math.round(sum * 100) / 100,
    mean: Math.round(mean * 100) / 100,
    median: Math.round(median * 100) / 100,
    mode: mode.length === numbers.length ? "No mode" : mode.join(", "),
    min: sorted[0],
    max: sorted[sorted.length - 1],
    range: sorted[sorted.length - 1] - sorted[0],
    variance: Math.round(variance * 100) / 100,
    stdDev: Math.round(stdDev * 100) / 100
  }
}

// 29. AREA
export function calculateArea(shape: string, dims: Record<string, number>) {
  switch (shape) {
    case "rectangle": return dims.length * dims.width
    case "square": return dims.side * dims.side
    case "circle": return Math.PI * dims.radius * dims.radius
    case "triangle": return 0.5 * dims.base * dims.height
    case "trapezoid": return 0.5 * (dims.a + dims.b) * dims.height
    case "parallelogram": return dims.base * dims.height
    default: return 0
  }
}

// 30. VOLUME
export function calculateVolume(shape: string, dims: Record<string, number>) {
  switch (shape) {
    case "cube": return Math.pow(dims.side, 3)
    case "cuboid": return dims.length * dims.width * dims.height
    case "sphere": return (4 / 3) * Math.PI * Math.pow(dims.radius, 3)
    case "cylinder": return Math.PI * Math.pow(dims.radius, 2) * dims.height
    case "cone": return (1 / 3) * Math.PI * Math.pow(dims.radius, 2) * dims.height
    case "pyramid": return (1 / 3) * dims.base * dims.height
    default: return 0
  }
}