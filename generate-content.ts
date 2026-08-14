import "dotenv/config";
import { db } from "./src/lib/db";
import { tools } from "./src/lib/db/schema";
import { eq } from "drizzle-orm";

interface CategoryTemplate {
  intro: (name: string) => string;
  what: (name: string) => string;
  how: (name: string) => string;
  useCases: (name: string) => string[];
  bestPractices: (name: string) => string[];
  conclusion: (name: string) => string;
}

const TEMPLATES: Record<string, CategoryTemplate> = {
  text: {
    intro: (name) => `In today digital world, working with text efficiently is essential for writers, students, marketers, and developers. Our free online ${name} is designed to help you process text quickly and accurately without any installation, signup, or hidden costs. Whether you are proofreading a document, analyzing content for SEO, or preparing text for publication, this powerful ${name.toLowerCase()} tool delivers instant results directly in your browser.\n\nWith complete privacy protection, your text never leaves your device. All processing happens locally, ensuring your sensitive information remains secure. Join thousands of professionals who trust our ${name.toLowerCase()} for their daily text manipulation needs.`,
    
    what: (name) => `The ${name} is a specialized web-based utility that helps you perform text operations with precision and speed. Built with modern web technologies, it processes your input in real-time as you type, showing results instantly without page reloads or delays.\n\nUnlike desktop software that requires installation or paid subscriptions, our ${name.toLowerCase()} is completely free and works across all devices. From mobile phones to desktop computers, the responsive interface adapts perfectly to any screen size, giving you a seamless experience wherever you work.`,
    
    how: (name) => `Our ${name} uses advanced JavaScript algorithms that run entirely in your browser. When you input text, the tool immediately analyzes and processes it using optimized functions designed for speed and accuracy. No server communication is required, which means your data stays private and results appear instantly.\n\nThe processing engine handles various text formats including plain text, formatted content, special characters, and multiple languages. Whether you paste a short sentence or a lengthy document, the ${name.toLowerCase()} maintains consistent performance and delivers reliable results every time.`,
    
    useCases: (name) => [
      `<strong>Content Writers:</strong> Analyze articles, blog posts, and marketing copy to ensure optimal readability and engagement.`,
      `<strong>Students & Researchers:</strong> Format essays, research papers, and academic documents according to specific requirements.`,
      `<strong>Digital Marketers:</strong> Optimize content for SEO, social media, and email campaigns with precise text analysis.`,
      `<strong>Developers & Programmers:</strong> Prepare text data for applications, databases, and configuration files.`,
      `<strong>Editors & Proofreaders:</strong> Review and refine written content with detailed text insights.`,
      `<strong>Social Media Managers:</strong> Craft posts that fit platform character limits and maximize engagement.`
    ],
    
    bestPractices: (name) => [
      `Always double-check your input for accuracy before processing to ensure reliable results.`,
      `Use the ${name.toLowerCase()} in combination with grammar checkers for comprehensive text improvement.`,
      `Save important results by copying them to a document or note-taking app for future reference.`,
      `Test with sample text first if you are new to the tool to understand its capabilities.`,
      `Bookmark this page for quick access when you need text processing on the go.`,
      `Share the tool with colleagues who might benefit from similar text manipulation tasks.`
    ],
    
    conclusion: (name) => `Our free online ${name} makes text processing effortless, fast, and private. With no signup required and unlimited usage, it is the perfect solution for anyone who works with text regularly. Start using the ${name.toLowerCase()} now to save time, improve accuracy, and enhance your productivity. Bookmark this page and share it with others who might benefit from this powerful text utility.`
  },

  calculators: {
    intro: (name) => `Making accurate calculations quickly is crucial in both personal and professional life. Our free online ${name} eliminates the complexity of manual calculations, providing instant, accurate results at your fingertips. Whether you are managing finances, planning health goals, tracking academic progress, or solving math problems, this ${name.toLowerCase()} delivers precise answers using industry-standard formulas.\n\nDesigned for accuracy and ease of use, the ${name.toLowerCase()} works entirely in your browser with no installation required. Your data stays completely private, and calculations happen in real-time as you enter values. Trust our reliable ${name.toLowerCase()} for important decisions that require precision.`,
    
    what: (name) => `The ${name} is a professional-grade calculation tool designed to solve complex problems in seconds. Using verified mathematical formulas and calculation methods, it provides results that you can rely on for personal, educational, or business purposes.\n\nOur ${name.toLowerCase()} supports multiple input formats and units where applicable, making it flexible for users worldwide. The intuitive interface guides you through the calculation process, ensuring accurate inputs and clear, easy-to-understand results that help you make informed decisions.`,
    
    how: (name) => `The ${name} uses proven mathematical algorithms and formulas widely accepted in the relevant field. When you input your values, the calculator applies the appropriate formulas instantly, computing results with high precision. All calculations happen locally in your browser, ensuring privacy and lightning-fast performance.\n\nThe underlying calculation engine handles edge cases, unit conversions, and formatting automatically. This means you get accurate results regardless of your input format or measurement units, saving you time and eliminating the risk of calculation errors that can occur with manual computation.`,
    
    useCases: (name) => [
      `<strong>Personal Finance:</strong> Make informed decisions about loans, investments, savings, and budgeting.`,
      `<strong>Business Planning:</strong> Calculate profits, expenses, taxes, and financial projections accurately.`,
      `<strong>Health & Fitness:</strong> Track important health metrics and set achievable wellness goals.`,
      `<strong>Education:</strong> Solve academic problems and understand mathematical concepts practically.`,
      `<strong>Real Estate:</strong> Evaluate property values, mortgage payments, and investment returns.`,
      `<strong>Research & Analysis:</strong> Perform quick calculations for reports, studies, and presentations.`
    ],
    
    bestPractices: (name) => [
      `Verify your input values before calculating to ensure accurate results every time.`,
      `Use the ${name.toLowerCase()} for estimation purposes and consult professionals for critical decisions.`,
      `Save or screenshot important calculations for your records and future reference.`,
      `Try different scenarios to understand how various inputs affect the final results.`,
      `Compare results with alternative methods when making significant financial or health decisions.`,
      `Bookmark this calculator for quick access whenever you need reliable calculations.`
    ],
    
    conclusion: (name) => `Our free online ${name} takes the guesswork out of complex calculations, providing accurate results instantly. Whether for personal use, business decisions, or academic purposes, this ${name.toLowerCase()} is your reliable companion for quick, precise calculations. Start using it today to save time, avoid errors, and make better-informed decisions. Remember to bookmark this page for future calculations.`
  },

  converters: {
    intro: (name) => `In our interconnected global world, converting between different units and formats is a daily necessity. Our free online ${name} eliminates confusion and errors by providing instant, accurate conversions using internationally recognized standards. Whether you are traveling, cooking, working on international projects, or studying, this ${name.toLowerCase()} makes conversions effortless.\n\nDesigned with precision at its core, the ${name.toLowerCase()} handles conversions between multiple units instantly. No calculator needed, no formulas to remember - just enter your value and get accurate conversions in real-time. The tool works entirely in your browser, ensuring privacy and speed.`,
    
    what: (name) => `The ${name} is a comprehensive conversion utility that transforms values between different units, formats, or systems accurately. Built with precision conversion factors approved by international standards organizations, it delivers reliable results for professional, educational, and personal use.\n\nOur ${name.toLowerCase()} supports bidirectional conversion, meaning you can convert from any unit to any other supported unit with equal ease. The clean interface displays results immediately as you type, making it perfect for quick lookups or detailed conversion work.`,
    
    how: (name) => `The ${name} uses precise conversion factors and mathematical relationships between different units. When you enter a value and select the source and target units, the tool applies the correct conversion formula instantly, providing results accurate to multiple decimal places when needed.\n\nAll conversions happen locally in your browser using JavaScript, meaning no data is sent to servers. This ensures your inputs remain private, conversions happen at lightning speed, and the tool works even without an internet connection once loaded.`,
    
    useCases: (name) => [
      `<strong>International Travel:</strong> Convert between measurement systems used in different countries.`,
      `<strong>Cooking & Recipes:</strong> Adjust recipes from foreign sources to your preferred measurement system.`,
      `<strong>Engineering & Science:</strong> Perform accurate conversions for technical calculations and research.`,
      `<strong>Trade & Commerce:</strong> Convert units for international business, shipping, and logistics.`,
      `<strong>Education:</strong> Help students understand different measurement systems and their relationships.`,
      `<strong>DIY Projects:</strong> Convert measurements for construction, crafting, and home improvement.`
    ],
    
    bestPractices: (name) => [
      `Double-check unit selection before converting to avoid errors in critical measurements.`,
      `Round results appropriately based on the precision needed for your specific use case.`,
      `Save conversion results for reference in ongoing projects or repetitive tasks.`,
      `Understand the relationship between units to catch potential conversion errors.`,
      `Use standard notation and units when sharing results with international colleagues.`,
      `Bookmark this ${name.toLowerCase()} for instant access whenever conversions are needed.`
    ],
    
    conclusion: (name) => `Our free online ${name} eliminates the hassle of manual unit conversion, providing accurate results in seconds. Whether for personal, professional, or educational use, this reliable ${name.toLowerCase()} handles all your conversion needs. Start using it today to save time and ensure accuracy in your work. Bookmark this page for future conversion tasks.`
  },

  developer: {
    intro: (name) => `Developers spend countless hours working with code, data formats, and technical tasks that require precision tools. Our free online ${name} streamlines development workflows by providing instant, accurate results for common coding tasks. Whether you are debugging APIs, formatting data, or preparing content for production, this ${name.toLowerCase()} saves valuable development time.\n\nBuilt by developers for developers, the ${name.toLowerCase()} handles various inputs efficiently while maintaining code integrity. All processing happens in your browser, keeping your proprietary code and data completely private. Skip the desktop apps and command-line tools - use this ${name.toLowerCase()} directly in your browser for quick, reliable results.`,
    
    what: (name) => `The ${name} is a professional development utility designed to handle common coding tasks with precision. Whether you are working with JSON, XML, CSS, JavaScript, or other formats, this tool provides accurate processing that respects code structure and formatting standards.\n\nOur ${name.toLowerCase()} understands syntax rules, edge cases, and formatting conventions used in modern development. It handles nested structures, special characters, and various encoding schemes automatically, giving you reliable results that you can trust for production code and important projects.`,
    
    how: (name) => `The ${name} leverages proven parsing libraries and formatting algorithms to process your input accurately. When you provide code or data, the tool analyzes its structure, applies the requested operation, and returns properly formatted results that maintain semantic integrity.\n\nAll processing occurs in your browser using JavaScript, ensuring your code never leaves your device. This is crucial for developers working with proprietary code, sensitive data, or confidential projects where security is paramount. The tool is fast enough to handle large files while maintaining accuracy.`,
    
    useCases: (name) => [
      `<strong>API Development:</strong> Format, validate, and debug API requests and responses efficiently.`,
      `<strong>Data Processing:</strong> Transform data between different formats for various applications.`,
      `<strong>Code Debugging:</strong> Analyze and format code to identify issues quickly and accurately.`,
      `<strong>Documentation:</strong> Prepare code snippets and examples for technical documentation.`,
      `<strong>Configuration Management:</strong> Handle configuration files for various applications and services.`,
      `<strong>Learning & Testing:</strong> Experiment with code and data structures for educational purposes.`
    ],
    
    bestPractices: (name) => [
      `Always test with sample data before processing critical production files.`,
      `Validate the output structure and format meets your specific requirements.`,
      `Keep backups of original files before applying transformations to important data.`,
      `Use the tool alongside version control to track changes in your codebase.`,
      `Document any transformations applied to data for team members and future reference.`,
      `Bookmark this ${name.toLowerCase()} in your developer toolkit for quick access.`
    ],
    
    conclusion: (name) => `Our free online ${name} is an essential addition to any developer toolkit, providing fast and accurate processing for common development tasks. Save time on repetitive tasks and focus on what matters - building great software. Start using this ${name.toLowerCase()} today to streamline your workflow. Bookmark this page and share it with your development team.`
  },

  security: {
    intro: (name) => `In an era of increasing cyber threats and data breaches, protecting your digital information has never been more important. Our free online ${name} helps you enhance your security posture with professional-grade cryptographic tools. Whether you are securing passwords, generating secure tokens, or protecting sensitive data, this ${name.toLowerCase()} provides enterprise-level security for personal and professional use.\n\nBuilt with security-first principles, the ${name.toLowerCase()} performs all operations locally in your browser. This means your sensitive data, passwords, and cryptographic operations never leave your device. Trust our ${name.toLowerCase()} for your critical security needs with complete peace of mind.`,
    
    what: (name) => `The ${name} is a professional security tool implementing industry-standard cryptographic algorithms and security practices. Used by security professionals, developers, and privacy-conscious individuals, it provides reliable security operations that you can trust for important tasks.\n\nOur ${name.toLowerCase()} follows current security best practices and uses only proven, widely-accepted algorithms. Whether you need to generate secure credentials, hash sensitive data, or perform other security operations, the tool delivers results that meet or exceed industry standards for security applications.`,
    
    how: (name) => `The ${name} implements cryptographic algorithms using standard JavaScript libraries and Web Crypto API where available. When you use the tool, all operations happen entirely within your browser using well-tested implementations of security algorithms recognized by security professionals worldwide.\n\nBecause everything runs locally, your sensitive data never touches our servers or any third-party service. This complete privacy is essential for security operations where confidentiality is paramount. The tool is fast enough for practical use while maintaining the highest security standards.`,
    
    useCases: (name) => [
      `<strong>Password Management:</strong> Generate and manage strong, unique passwords for all your accounts.`,
      `<strong>Data Protection:</strong> Secure sensitive information with cryptographic hashing and encoding.`,
      `<strong>Development Security:</strong> Test security implementations and generate secure tokens for applications.`,
      `<strong>Personal Privacy:</strong> Protect your personal data and online privacy with security tools.`,
      `<strong>System Administration:</strong> Manage security tasks for websites, applications, and infrastructure.`,
      `<strong>Educational Purposes:</strong> Learn about cryptography and security concepts through practical use.`
    ],
    
    bestPractices: (name) => [
      `Never share sensitive security outputs like passwords or private keys through unsecured channels.`,
      `Use unique passwords for every account to minimize damage from potential breaches.`,
      `Enable two-factor authentication wherever possible for additional security layers.`,
      `Regularly update passwords for critical accounts, especially after security incidents.`,
      `Use a reputable password manager to store generated passwords securely.`,
      `Keep security tools bookmarked but always verify the URL to avoid phishing attempts.`
    ],
    
    conclusion: (name) => `Our free online ${name} empowers you with professional-grade security tools that were once available only to security experts. Take control of your digital security today with this reliable ${name.toLowerCase()}. Remember, good security practices combined with the right tools are your best defense against cyber threats. Bookmark this page and use it whenever you need to enhance your security.`
  },

  image: {
    intro: (name) => `Visual content dominates the modern web, and processing images efficiently is essential for photographers, designers, marketers, and content creators. Our free online ${name} makes image manipulation simple and accessible without expensive software or complex learning curves. Whether you are optimizing images for web, preparing photos for social media, or transforming visual content for various purposes, this ${name.toLowerCase()} delivers professional results instantly.\n\nAll image processing happens directly in your browser, ensuring your visual content remains completely private. No uploads to third-party servers, no watermarks on your images, and no limits on usage. Trust our ${name.toLowerCase()} for both personal projects and professional work.`,
    
    what: (name) => `The ${name} is a powerful browser-based image processing tool that handles various image formats and operations. Supporting popular formats like JPG, PNG, WEBP, and more, it provides professional image manipulation capabilities without requiring specialized software or plugins.\n\nOur ${name.toLowerCase()} uses modern web technologies including Canvas API and image processing libraries to deliver high-quality results. The intuitive interface makes complex image operations accessible to users of all skill levels, from beginners to professional designers and photographers.`,
    
    how: (name) => `The ${name} leverages your browser built-in image processing capabilities using JavaScript and the Canvas API. When you upload an image, the tool loads it into your browser memory, applies the requested transformations using optimized algorithms, and lets you download the result immediately.\n\nBecause processing happens locally, there are no upload speed limits or file size restrictions imposed by servers. Your images stay on your device throughout the entire process, ensuring complete privacy and eliminating concerns about unauthorized access to your visual content.`,
    
    useCases: (name) => [
      `<strong>Web Development:</strong> Optimize images for websites to improve loading speed and user experience.`,
      `<strong>Social Media:</strong> Prepare images for various social platforms with appropriate dimensions and formats.`,
      `<strong>Content Creation:</strong> Process images for blogs, articles, videos, and multimedia projects.`,
      `<strong>E-commerce:</strong> Prepare product photos with consistent formatting and optimization.`,
      `<strong>Personal Projects:</strong> Edit family photos, create memorabilia, and organize personal image collections.`,
      `<strong>Professional Design:</strong> Perform quick image tasks without opening heavy design software.`
    ],
    
    bestPractices: (name) => [
      `Always keep backups of original images before applying modifications or transformations.`,
      `Choose appropriate file formats based on image content and intended use.`,
      `Balance quality and file size for optimal web performance and user experience.`,
      `Test images across different devices and screen sizes to ensure compatibility.`,
      `Consider accessibility by maintaining sufficient contrast and clear visual elements.`,
      `Use descriptive filenames and metadata to organize your processed images effectively.`
    ],
    
    conclusion: (name) => `Our free online ${name} brings professional image processing capabilities directly to your browser. Save time, protect privacy, and get great results without the cost or complexity of desktop image editors. Start processing your images today with this reliable ${name.toLowerCase()}. Bookmark this page for quick access to your image processing needs.`
  },

  pdf: {
    intro: (name) => `PDF documents are the standard for professional document sharing, and having reliable PDF tools is essential for productivity. Our free online ${name} makes working with PDF files simple, fast, and secure without requiring expensive software subscriptions. Whether you are handling business contracts, academic papers, or personal documents, this ${name.toLowerCase()} provides the functionality you need instantly.\n\nAll PDF operations happen securely in your browser, ensuring your sensitive documents remain private. No uploads to unknown servers, no account creation, and no usage limits. Trust our ${name.toLowerCase()} for both personal document management and professional workflows requiring strict confidentiality.`,
    
    what: (name) => `The ${name} is a comprehensive PDF utility that handles common document operations with precision and speed. Built with modern PDF processing libraries, it provides professional-grade functionality that rivals expensive desktop applications, all accessible through your web browser.\n\nOur ${name.toLowerCase()} supports standard PDF features including text, images, forms, and metadata. It handles password-protected files, multi-page documents, and various PDF versions correctly, ensuring reliable results for both simple documents and complex professional files.`,
    
    how: (name) => `The ${name} uses established PDF processing libraries that run entirely in your browser using JavaScript. When you upload a PDF document, the tool loads it into your browser memory and performs the requested operation using proven algorithms that maintain document integrity and formatting.\n\nBecause everything happens locally, your documents never leave your device. This is essential for handling confidential business documents, legal papers, and personal information that require strict privacy. The processing is fast enough to handle large documents without frustrating delays.`,
    
    useCases: (name) => [
      `<strong>Business Operations:</strong> Handle contracts, reports, invoices, and business documentation efficiently.`,
      `<strong>Academic Work:</strong> Manage research papers, thesis documents, and academic publications.`,
      `<strong>Legal Documents:</strong> Process legal papers, agreements, and confidential documentation securely.`,
      `<strong>Personal Documents:</strong> Organize tax records, medical documents, and important personal papers.`,
      `<strong>Educational Materials:</strong> Prepare textbooks, study guides, and educational content for distribution.`,
      `<strong>Publishing:</strong> Prepare eBooks, magazines, and publications for digital distribution.`
    ],
    
    bestPractices: (name) => [
      `Always keep backup copies of original PDFs before applying any modifications.`,
      `Verify document integrity after processing to ensure content and formatting are preserved.`,
      `Use password protection for sensitive documents when sharing or storing them.`,
      `Optimize PDF file sizes when sharing via email or uploading to online platforms.`,
      `Keep track of document versions to avoid confusion in collaborative work.`,
      `Bookmark this ${name.toLowerCase()} for quick access to your PDF processing needs.`
    ],
    
    conclusion: (name) => `Our free online ${name} eliminates the need for expensive PDF software while providing all essential functionality for professional document management. Start managing your PDFs efficiently today with this reliable, secure ${name.toLowerCase()}. Bookmark this page and simplify your document workflows.`
  },

  "qr-barcode": {
    intro: (name) => `QR codes and barcodes bridge the physical and digital worlds, enabling instant information sharing across countless applications. Our free online ${name} helps you create and work with these codes efficiently for personal projects, business needs, and creative applications. Whether you are marketing a product, managing inventory, or sharing information, this ${name.toLowerCase()} makes code generation and processing simple.\n\nAll code generation happens in your browser with instant results and no watermarks. Your codes are yours to use freely for any purpose - personal, commercial, or educational. Trust our ${name.toLowerCase()} for professional-quality codes that work with any standard scanner or reader.`,
    
    what: (name) => `The ${name} is a professional-grade code generation and processing tool that produces scannable codes meeting international standards. Whether you need QR codes, various barcode formats, or specialized codes for specific applications, this tool delivers reliable results that work universally.\n\nOur ${name.toLowerCase()} supports customization options including size, error correction, colors, and embedded data. This flexibility allows you to create codes that match your branding while maintaining excellent scannability across different devices, apps, and physical media.`,
    
    how: (name) => `The ${name} uses established code generation libraries that implement international standards for QR codes and barcodes. When you input your data, the tool encodes it using the appropriate algorithm, adds error correction where needed, and generates a scannable image that any standard reader can decode accurately.\n\nAll generation happens in your browser using JavaScript libraries, meaning your data never touches external servers. This is crucial when generating codes for sensitive information, business URLs, or personal contact details that you want to keep completely private during the creation process.`,
    
    useCases: (name) => [
      `<strong>Marketing Campaigns:</strong> Create codes for advertisements, business cards, and promotional materials.`,
      `<strong>Business Operations:</strong> Manage inventory, track assets, and streamline warehouse operations.`,
      `<strong>Event Management:</strong> Distribute event information, tickets, and check-in codes efficiently.`,
      `<strong>Restaurant & Retail:</strong> Provide digital menus, product information, and contactless services.`,
      `<strong>Personal Use:</strong> Share contact information, WiFi credentials, and personal links easily.`,
      `<strong>Education:</strong> Create interactive learning materials with codes linking to online resources.`
    ],
    
    bestPractices: (name) => [
      `Test generated codes on multiple devices and scanning apps before printing or distributing.`,
      `Choose appropriate size based on scanning distance and print medium for optimal readability.`,
      `Include quiet zone (white space) around codes to ensure reliable scanning by all readers.`,
      `Use higher error correction for codes that will be printed on flexible or damaged surfaces.`,
      `Track code performance if used for marketing to measure engagement and effectiveness.`,
      `Update information that codes link to rather than reprinting when data changes.`
    ],
    
    conclusion: (name) => `Our free online ${name} provides professional-quality code generation for all your personal and business needs. Skip the complicated software and expensive services - use this reliable ${name.toLowerCase()} to create codes that just work. Start generating your codes today and bookmark this page for future use.`
  }
};

function generateContent(toolName: string, category: string): string {
  const template = TEMPLATES[category] || TEMPLATES.text;
  
  const useCasesHTML = template.useCases(toolName).map(uc => `<li>${uc}</li>`).join('\n');
  const bestPracticesHTML = template.bestPractices(toolName).map(bp => `<li>${bp}</li>`).join('\n');
  
  return `
<div class="tool-content">

<h2>Introduction</h2>
<p>${template.intro(toolName).replace(/\n\n/g, '</p>\n<p>')}</p>

<h2>What is ${toolName}?</h2>
<p>${template.what(toolName).replace(/\n\n/g, '</p>\n<p>')}</p>

<h2>How Does Our ${toolName} Work?</h2>
<p>${template.how(toolName).replace(/\n\n/g, '</p>\n<p>')}</p>

<h2>Popular Use Cases</h2>
<p>The ${toolName} serves diverse users across various industries and personal applications:</p>
<ul>
${useCasesHTML}
</ul>

<h2>Best Practices & Tips</h2>
<p>Get the most out of our ${toolName} by following these expert recommendations:</p>
<ul>
${bestPracticesHTML}
</ul>

<h2>Why Choose Our ${toolName}?</h2>
<p>With numerous online tools available, our ${toolName} stands out through its commitment to user experience, privacy, and performance. Every feature has been carefully designed to solve real problems efficiently while maintaining the highest standards of quality and security.</p>
<p>Unlike many free tools that compromise on features or bombard users with ads, our ${toolName} provides a clean, focused experience that lets you accomplish your tasks quickly. The tool is optimized for both speed and accuracy, ensuring you get professional-quality results every time.</p>

<h2>Conclusion</h2>
<p>${template.conclusion(toolName)}</p>

</div>
  `.trim();
}

async function generate() {
  console.log("\nGenerating content for all tools...\n");
  
  const allTools = await db.select().from(tools);
  console.log(`Found ${allTools.length} tools\n`);
  
  let success = 0;
  let errors = 0;
  
  for (const tool of allTools) {
    try {
      const content = generateContent(tool.name, tool.categorySlug);
      
      await db.update(tools)
        .set({
          seoContent: content,
          updatedAt: new Date()
        })
        .where(eq(tools.id, tool.id));
      
      success++;
      console.log(`  OK: ${tool.categorySlug}/${tool.slug} (${content.length} chars)`);
    } catch (err: any) {
      errors++;
      console.error(`  ERR: ${tool.slug} - ${err.message}`);
    }
  }
  
  console.log("\n=======================================");
  console.log("CONTENT GENERATION COMPLETE!");
  console.log("=======================================");
  console.log(`Success: ${success}`);
  console.log(`Errors:  ${errors}`);
  console.log(`Total:   ${allTools.length}`);
  console.log("=======================================\n");
  
  process.exit(0);
}

generate().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});