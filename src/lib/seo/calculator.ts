export interface SEOCheckResult {
  id: string;
  label: string;
  status: "pass" | "warn" | "fail";
  message: string;
  points: number;
}

export interface SEOAnalysis {
  score: number;
  checks: SEOCheckResult[];
  passed: number;
  warnings: number;
  failed: number;
  grade: "A" | "B" | "C" | "D" | "F";
}

export function analyzeSEO(data: {
  title: string;
  slug: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  content?: string;
}): SEOAnalysis {
  const checks: SEOCheckResult[] = [];
  const keyword = data.focusKeyword.toLowerCase().trim();
  const title = (data.metaTitle || data.title || "").toLowerCase();
  const description = (data.metaDescription || data.description || "").toLowerCase();
  const slug = data.slug.toLowerCase();
  const content = (data.content || "").toLowerCase();

  // 1. Focus Keyword Check
  if (!keyword) {
    checks.push({ id: "keyword", label: "Focus Keyword", status: "fail", message: "Set a focus keyword", points: 0 });
  } else {
    checks.push({ id: "keyword", label: "Focus Keyword", status: "pass", message: "Focus keyword is set", points: 10 });
  }

  // 2. Keyword in Meta Title
  if (keyword && title.includes(keyword)) {
    checks.push({ id: "keyword-title", label: "Keyword in Title", status: "pass", message: "Focus keyword found in title", points: 15 });
  } else if (keyword) {
    checks.push({ id: "keyword-title", label: "Keyword in Title", status: "fail", message: "Add focus keyword to meta title", points: 0 });
  } else {
    checks.push({ id: "keyword-title", label: "Keyword in Title", status: "warn", message: "Set focus keyword first", points: 0 });
  }

  // 3. Meta Title Length
  const titleLen = (data.metaTitle || data.title || "").length;
  if (titleLen === 0) {
    checks.push({ id: "title-length", label: "Meta Title Length", status: "fail", message: "Meta title is empty", points: 0 });
  } else if (titleLen < 30) {
    checks.push({ id: "title-length", label: "Meta Title Length", status: "warn", message: `Title too short (${titleLen}/30-60)`, points: 5 });
  } else if (titleLen > 60) {
    checks.push({ id: "title-length", label: "Meta Title Length", status: "warn", message: `Title too long (${titleLen}/30-60)`, points: 5 });
  } else {
    checks.push({ id: "title-length", label: "Meta Title Length", status: "pass", message: `Perfect length (${titleLen} chars)`, points: 10 });
  }

  // 4. Keyword in Meta Description
  if (keyword && description.includes(keyword)) {
    checks.push({ id: "keyword-desc", label: "Keyword in Description", status: "pass", message: "Keyword found in description", points: 10 });
  } else if (keyword) {
    checks.push({ id: "keyword-desc", label: "Keyword in Description", status: "fail", message: "Add keyword to meta description", points: 0 });
  } else {
    checks.push({ id: "keyword-desc", label: "Keyword in Description", status: "warn", message: "Set focus keyword first", points: 0 });
  }

  // 5. Meta Description Length
  const descLen = (data.metaDescription || data.description || "").length;
  if (descLen === 0) {
    checks.push({ id: "desc-length", label: "Meta Description Length", status: "fail", message: "Meta description is empty", points: 0 });
  } else if (descLen < 120) {
    checks.push({ id: "desc-length", label: "Meta Description Length", status: "warn", message: `Too short (${descLen}/120-160)`, points: 5 });
  } else if (descLen > 160) {
    checks.push({ id: "desc-length", label: "Meta Description Length", status: "warn", message: `Too long (${descLen}/120-160)`, points: 5 });
  } else {
    checks.push({ id: "desc-length", label: "Meta Description Length", status: "pass", message: `Perfect length (${descLen} chars)`, points: 10 });
  }

  // 6. Keyword in URL/Slug
  if (keyword && slug.includes(keyword.replace(/\s+/g, "-"))) {
    checks.push({ id: "keyword-url", label: "Keyword in URL", status: "pass", message: "Keyword found in URL slug", points: 10 });
  } else if (keyword) {
    checks.push({ id: "keyword-url", label: "Keyword in URL", status: "warn", message: "Consider adding keyword to URL", points: 3 });
  } else {
    checks.push({ id: "keyword-url", label: "Keyword in URL", status: "warn", message: "Set focus keyword first", points: 0 });
  }

  // 7. URL Length
  if (slug.length > 75) {
    checks.push({ id: "url-length", label: "URL Length", status: "warn", message: "URL is too long", points: 3 });
  } else {
    checks.push({ id: "url-length", label: "URL Length", status: "pass", message: "URL length is good", points: 5 });
  }

  // 8. Keyword Density (in content if available)
  if (content && keyword) {
    const keywordCount = (content.match(new RegExp(keyword, "g")) || []).length;
    const wordCount = content.split(/\s+/).length;
    const density = wordCount > 0 ? (keywordCount / wordCount) * 100 : 0;

    if (density === 0) {
      checks.push({ id: "density", label: "Keyword Density", status: "fail", message: "Keyword not found in content", points: 0 });
    } else if (density < 0.5) {
      checks.push({ id: "density", label: "Keyword Density", status: "warn", message: `Low density (${density.toFixed(2)}%)`, points: 3 });
    } else if (density > 3) {
      checks.push({ id: "density", label: "Keyword Density", status: "warn", message: `Too high (${density.toFixed(2)}%) - keyword stuffing`, points: 3 });
    } else {
      checks.push({ id: "density", label: "Keyword Density", status: "pass", message: `Perfect (${density.toFixed(2)}%)`, points: 10 });
    }
  } else {
    checks.push({ id: "density", label: "Keyword Density", status: "warn", message: "No content to analyze", points: 5 });
  }

  // 9. Title starts with keyword
  if (keyword && title.startsWith(keyword)) {
    checks.push({ id: "title-start", label: "Keyword at Start", status: "pass", message: "Keyword at start of title", points: 5 });
  } else if (keyword) {
    checks.push({ id: "title-start", label: "Keyword at Start", status: "warn", message: "Consider putting keyword at start", points: 2 });
  } else {
    checks.push({ id: "title-start", label: "Keyword at Start", status: "warn", message: "Set focus keyword first", points: 0 });
  }

  // 10. Unique Content (basic check)
  const uniqueDesc = data.metaDescription && data.metaDescription !== data.description;
  if (uniqueDesc) {
    checks.push({ id: "unique", label: "Unique Meta Description", status: "pass", message: "Custom meta description set", points: 10 });
  } else {
    checks.push({ id: "unique", label: "Unique Meta Description", status: "warn", message: "Consider custom meta description", points: 5 });
  }

  // Calculate score
  const totalScore = checks.reduce((sum, c) => sum + c.points, 0);
  const maxScore = 100;
  const finalScore = Math.min(100, Math.round((totalScore / maxScore) * 100));

  const passed = checks.filter(c => c.status === "pass").length;
  const warnings = checks.filter(c => c.status === "warn").length;
  const failed = checks.filter(c => c.status === "fail").length;

  let grade: "A" | "B" | "C" | "D" | "F" = "F";
  if (finalScore >= 90) grade = "A";
  else if (finalScore >= 75) grade = "B";
  else if (finalScore >= 60) grade = "C";
  else if (finalScore >= 40) grade = "D";

  return { score: finalScore, checks, passed, warnings, failed, grade };
}