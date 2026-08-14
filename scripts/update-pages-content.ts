import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

const pagesContent: Record<string, { title: string; metaTitle: string; metaDescription: string; content: string }> = {
  about: {
    title: "About Us",
    metaTitle: "About Us - Get All In One Tools | Free Online Tools Hub",
    metaDescription: "Learn about Get All In One Tools - your trusted destination for 200+ free online tools. Our mission, values, and commitment to providing the best free tools.",
    content: `<h2>Welcome to Get All In One Tools</h2>
<p>Founded in 2025, <strong>Get All In One Tools</strong> is a comprehensive online platform dedicated to providing free, fast, and reliable tools for everyone. Whether you are a student, professional, developer, or content creator, our tools are designed to simplify your daily tasks and boost your productivity.</p>

<h2>Our Mission</h2>
<p>Our mission is simple: to make powerful online tools accessible to everyone, completely free of charge. We believe that essential utilities like text processors, calculators, converters, and developer tools should be available without paywalls, subscriptions, or hidden fees.</p>

<h2>What We Offer</h2>
<p>Get All In One Tools provides a growing collection of <strong>200+ free online tools</strong> across multiple categories:</p>
<ul>
<li><strong>Text Tools (30+):</strong> Word counter, case converter, text formatter, lorem ipsum generator, and more</li>
<li><strong>Calculators (30+):</strong> BMI calculator, loan calculator, age calculator, percentage calculator, and more</li>
<li><strong>Converters (31+):</strong> Unit converters, currency converter, temperature converter, and more</li>
<li><strong>Developer Tools (35+):</strong> JSON formatter, Base64 encoder, regex tester, color picker, and more</li>
<li><strong>Image Tools (25+):</strong> Image compressor, resizer, converter, cropper, and more</li>
<li><strong>PDF Tools (15+):</strong> PDF merger, splitter, compressor, converter, and more</li>
<li><strong>QR & Barcode (15+):</strong> QR code generator, barcode generator, reader, and more</li>
<li><strong>Security Tools (20+):</strong> Password generator, hash generator, encryption tools, and more</li>
<li><strong>AI Prompts Library:</strong> Curated prompts for ChatGPT, Midjourney, DALL-E, and more</li>
</ul>

<h2>Why Choose Us?</h2>
<p>Here is what makes Get All In One Tools different from other online tool websites:</p>
<ul>
<li><strong>100% Free:</strong> Every tool is completely free with no signup required</li>
<li><strong>Privacy First:</strong> All processing happens in your browser. We never store, upload, or share your data</li>
<li><strong>No Installation:</strong> Works directly in your browser on any device - desktop, tablet, or mobile</li>
<li><strong>Lightning Fast:</strong> Optimized for speed with instant results</li>
<li><strong>Always Updated:</strong> We continuously add new tools and improve existing ones</li>
<li><strong>Mobile Friendly:</strong> Fully responsive design that works perfectly on all screen sizes</li>
</ul>

<h2>Our Story</h2>
<p>Get All In One Tools was born from a simple frustration: the need to visit multiple websites for basic online tasks. We wanted to create a single destination where users could find every tool they need, without dealing with ads-heavy, slow-loading websites that compromise on quality.</p>
<p>Starting with just a handful of text tools, we have grown to offer over 200 tools across 8 categories. Our team is committed to expanding this collection to 900+ tools, ensuring that whatever utility you need, you will find it here.</p>

<h2>Our Commitment</h2>
<p>We are committed to:</p>
<ul>
<li>Keeping all tools <strong>free forever</strong></li>
<li>Maintaining the <strong>highest quality standards</strong></li>
<li>Protecting your <strong>privacy and data security</strong></li>
<li>Providing <strong>regular updates and new tools</strong></li>
<li>Offering <strong>responsive customer support</strong></li>
</ul>

<h2>Contact Us</h2>
<p>We love hearing from our users! Whether you have feedback, feature requests, bug reports, or partnership inquiries, feel free to reach out at <a href="mailto:support@getallinonetools.com">support@getallinonetools.com</a>. We typically respond within 24 hours.</p>

<p>Thank you for choosing Get All In One Tools. We are excited to help you be more productive!</p>`,
  },

  contact: {
    title: "Contact Us",
    metaTitle: "Contact Us - Get All In One Tools | Get in Touch",
    metaDescription: "Contact Get All In One Tools for support, feedback, or partnership inquiries. We respond within 24 hours.",
    content: `<h2>Get in Touch</h2>
<p>We would love to hear from you! Whether you have a question about our tools, need technical support, want to report a bug, or have a feature request, our team is here to help.</p>

<h2>Email Support</h2>
<p>For all inquiries, please reach out to us at:</p>
<p><strong>Email:</strong> <a href="mailto:support@getallinonetools.com">support@getallinonetools.com</a></p>
<p>We aim to respond to all emails <strong>within 24 hours</strong> during business days.</p>

<h2>What Can We Help With?</h2>
<ul>
<li><strong>Technical Support:</strong> Having trouble with a tool? Let us know and we will fix it</li>
<li><strong>Feature Requests:</strong> Have an idea for a new tool? We would love to hear it</li>
<li><strong>Bug Reports:</strong> Found a bug? Help us improve by reporting it</li>
<li><strong>Partnership Inquiries:</strong> Interested in collaborating? Let us talk</li>
<li><strong>Feedback:</strong> Your feedback helps us make better tools</li>
<li><strong>Business Inquiries:</strong> For advertising or business-related questions</li>
</ul>

<h2>Before You Contact Us</h2>
<p>You might find your answer in our <a href="/faq">Frequently Asked Questions</a> page. We have compiled answers to the most common questions about our tools and services.</p>

<h2>Business Information</h2>
<p><strong>Website:</strong> <a href="https://getallinonetools.com">getallinonetools.com</a></p>
<p><strong>Email:</strong> <a href="mailto:support@getallinonetools.com">support@getallinonetools.com</a></p>
<p><strong>Business Type:</strong> Online Digital Services</p>
<p><strong>Founded:</strong> 2025</p>`,
  },

  "privacy-policy": {
    title: "Privacy Policy",
    metaTitle: "Privacy Policy - Get All In One Tools | Your Privacy Matters",
    metaDescription: "Read our privacy policy to understand how Get All In One Tools handles your data. We prioritize your privacy and security.",
    content: `<h2>Privacy Policy</h2>
<p><strong>Last Updated:</strong> January 2026</p>
<p>At <strong>Get All In One Tools</strong> (https://getallinonetools.com), we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you visit our website and use our tools.</p>

<h2>1. Information We Collect</h2>
<h3>1.1 Information You Provide</h3>
<p>When you contact us through our contact form, we collect:</p>
<ul>
<li>Your name</li>
<li>Email address</li>
<li>Message content</li>
</ul>

<h3>1.2 Information Collected Automatically</h3>
<p>When you visit our website, we may automatically collect:</p>
<ul>
<li>Browser type and version</li>
<li>Operating system</li>
<li>IP address (anonymized)</li>
<li>Pages visited and time spent</li>
<li>Referring website</li>
<li>Device information</li>
</ul>

<h3>1.3 Tool Usage Data</h3>
<p><strong>Important:</strong> All our tools process data entirely in your browser. We do NOT store, upload, transmit, or have access to any data you input into our tools. Your text, files, images, and calculations stay on your device.</p>

<h2>2. How We Use Your Information</h2>
<p>We use collected information to:</p>
<ul>
<li>Respond to your inquiries and support requests</li>
<li>Improve our website and tools</li>
<li>Analyze website traffic and usage patterns</li>
<li>Prevent fraud and abuse</li>
<li>Comply with legal obligations</li>
</ul>

<h2>3. Cookies and Tracking</h2>
<p>We use cookies for:</p>
<ul>
<li><strong>Essential Cookies:</strong> Required for basic website functionality (theme preference, favorites)</li>
<li><strong>Analytics Cookies:</strong> Google Analytics to understand how visitors use our site</li>
<li><strong>Advertising Cookies:</strong> Google AdSense to display relevant advertisements</li>
</ul>
<p>You can control cookies through your browser settings. Please see our <a href="/cookie-policy">Cookie Policy</a> for more details.</p>

<h2>4. Third-Party Services</h2>
<p>We use the following third-party services:</p>
<ul>
<li><strong>Google Analytics:</strong> For website analytics (<a href="https://policies.google.com/privacy">Google Privacy Policy</a>)</li>
<li><strong>Google AdSense:</strong> For displaying advertisements (<a href="https://policies.google.com/privacy">Google Privacy Policy</a>)</li>
<li><strong>Vercel:</strong> For website hosting (<a href="https://vercel.com/legal/privacy-policy">Vercel Privacy Policy</a>)</li>
</ul>

<h2>5. Data Security</h2>
<p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>

<h2>6. Your Rights</h2>
<p>You have the right to:</p>
<ul>
<li>Access the personal data we hold about you</li>
<li>Request correction of inaccurate data</li>
<li>Request deletion of your data</li>
<li>Opt out of analytics tracking</li>
<li>Withdraw consent at any time</li>
</ul>

<h2>7. Children's Privacy</h2>
<p>Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children.</p>

<h2>8. Changes to This Policy</h2>
<p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated revision date.</p>

<h2>9. Contact Us</h2>
<p>If you have any questions about this Privacy Policy, please contact us at:</p>
<p><strong>Email:</strong> <a href="mailto:support@getallinonetools.com">support@getallinonetools.com</a></p>
<p><strong>Website:</strong> <a href="https://getallinonetools.com">getallinonetools.com</a></p>`,
  },

  terms: {
    title: "Terms of Service",
    metaTitle: "Terms of Service - Get All In One Tools | Usage Terms",
    metaDescription: "Terms and conditions for using Get All In One Tools. Read our terms of service before using our free online tools.",
    content: `<h2>Terms of Service</h2>
<p><strong>Last Updated:</strong> January 2026</p>
<p>Welcome to <strong>Get All In One Tools</strong> (https://getallinonetools.com). By accessing or using our website and tools, you agree to be bound by these Terms of Service.</p>

<h2>1. Acceptance of Terms</h2>
<p>By using our website, you confirm that you have read, understood, and agree to these terms. If you do not agree, please do not use our services.</p>

<h2>2. Description of Services</h2>
<p>Get All In One Tools provides free online utilities including text tools, calculators, converters, developer tools, image tools, PDF tools, QR code generators, and security tools. All tools are provided as-is for personal and commercial use.</p>

<h2>3. Free Usage</h2>
<p>All tools on our platform are <strong>free to use</strong> without registration. We do not require sign-up, payment, or subscription for any of our tools.</p>

<h2>4. Acceptable Use</h2>
<p>You agree to use our tools responsibly and not to:</p>
<ul>
<li>Use our services for any illegal or unauthorized purpose</li>
<li>Attempt to interfere with the proper working of our website</li>
<li>Use automated scripts to access our tools in a way that impacts performance</li>
<li>Reverse engineer, decompile, or attempt to extract source code</li>
<li>Use our services to transmit malware or harmful content</li>
</ul>

<h2>5. Intellectual Property</h2>
<p>All content, design, code, and branding on Get All In One Tools are owned by us and protected by intellectual property laws. You may not copy, modify, or distribute our content without permission.</p>

<h2>6. Disclaimer of Warranties</h2>
<p>Our tools are provided "as is" and "as available" without any warranties of any kind, either express or implied, including but not limited to:</p>
<ul>
<li>Accuracy of calculations or conversions</li>
<li>Fitness for a particular purpose</li>
<li>Uninterrupted or error-free operation</li>
</ul>

<h2>7. Limitation of Liability</h2>
<p>Get All In One Tools shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.</p>

<h2>8. Privacy</h2>
<p>Your use of our services is also governed by our <a href="/privacy-policy">Privacy Policy</a>, which is incorporated into these terms by reference.</p>

<h2>9. Modifications</h2>
<p>We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.</p>

<h2>10. Governing Law</h2>
<p>These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.</p>

<h2>11. Contact</h2>
<p>For questions about these terms, contact us at <a href="mailto:support@getallinonetools.com">support@getallinonetools.com</a>.</p>`,
  },

  faq: {
    title: "Frequently Asked Questions",
    metaTitle: "FAQ - Get All In One Tools | Common Questions Answered",
    metaDescription: "Find answers to frequently asked questions about Get All In One Tools. Learn about our free tools, privacy, features, and more.",
    content: `<h2>Frequently Asked Questions</h2>
<p>Here are answers to the most common questions about Get All In One Tools.</p>

<h2>General Questions</h2>

<h3>What is Get All In One Tools?</h3>
<p>Get All In One Tools is a free online platform offering 200+ tools for text processing, calculations, conversions, developer utilities, image editing, PDF manipulation, QR code generation, and security. All tools work directly in your browser with no installation required.</p>

<h3>Are all tools really free?</h3>
<p>Yes! Every single tool on our platform is completely free to use. There are no hidden fees, premium tiers, or subscription requirements. We sustain our platform through non-intrusive advertisements.</p>

<h3>Do I need to create an account?</h3>
<p>No, you do not need to create an account or sign up. All tools are immediately accessible without any registration.</p>

<h2>Privacy & Security</h2>

<h3>Do you store my data?</h3>
<p>No. All processing happens entirely in your browser (client-side). Your text, files, images, and calculations are never uploaded to our servers. We have zero access to your data.</p>

<h3>Is it safe to use your tools?</h3>
<p>Absolutely. Since all processing happens locally in your browser, your data never leaves your device. This makes our tools safe for handling sensitive information.</p>

<h3>Do you use cookies?</h3>
<p>We use minimal cookies for essential functionality (like dark mode preference), analytics (Google Analytics), and advertising (Google AdSense). You can manage cookie preferences in your browser settings. See our <a href="/cookie-policy">Cookie Policy</a> for details.</p>

<h2>Tool Usage</h2>

<h3>Can I use these tools for commercial purposes?</h3>
<p>Yes! All our tools are free for both personal and commercial use. There are no restrictions on how you use the results from our tools.</p>

<h3>Do the tools work on mobile devices?</h3>
<p>Yes, all tools are fully responsive and work perfectly on smartphones, tablets, and desktop computers. No app download needed.</p>

<h3>What browsers are supported?</h3>
<p>Our tools work on all modern browsers including Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, and Opera. We recommend keeping your browser updated for the best experience.</p>

<h3>Is there a limit on how many times I can use a tool?</h3>
<p>No, there are no usage limits. You can use any tool as many times as you want, completely free.</p>

<h3>Can I suggest a new tool?</h3>
<p>Absolutely! We love getting suggestions from our users. Please contact us at <a href="mailto:support@getallinonetools.com">support@getallinonetools.com</a> with your tool idea and we will consider adding it.</p>

<h2>Technical Questions</h2>

<h3>Why is a tool not working?</h3>
<p>If a tool is not working properly, try these steps: (1) Refresh the page, (2) Clear your browser cache, (3) Try a different browser, (4) Disable browser extensions. If the issue persists, please <a href="/contact">contact us</a>.</p>

<h3>How accurate are the calculations?</h3>
<p>Our calculators and converters use standard mathematical formulas and up-to-date conversion factors. However, for critical financial, medical, or legal decisions, we recommend verifying results with professional tools or advisors.</p>

<h3>Can I embed your tools on my website?</h3>
<p>Currently, we do not offer embeddable tools. However, you are welcome to link to our tools from your website.</p>

<h2>Still Have Questions?</h2>
<p>If you cannot find the answer you are looking for, please do not hesitate to <a href="/contact">contact us</a>. We typically respond within 24 hours.</p>`,
  },

  disclaimer: {
    title: "Disclaimer",
    metaTitle: "Disclaimer - Get All In One Tools | Legal Notice",
    metaDescription: "Legal disclaimer for Get All In One Tools. Important information about the use of our free online tools and services.",
    content: `<h2>Disclaimer</h2>
<p><strong>Last Updated:</strong> January 2026</p>

<h2>General Information</h2>
<p>The information and tools provided by <strong>Get All In One Tools</strong> (https://getallinonetools.com) are for general informational and utility purposes only. While we strive to provide accurate and up-to-date tools, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the tools or information.</p>

<h2>No Professional Advice</h2>
<p>The tools and results provided on our platform do not constitute professional advice. Specifically:</p>
<ul>
<li><strong>Financial Tools:</strong> Our calculators (loan, mortgage, investment, tax) provide estimates only. Consult a qualified financial advisor for financial decisions.</li>
<li><strong>Health Tools:</strong> Our health calculators (BMI, calorie, body fat) are for informational purposes. Consult a healthcare professional for medical advice.</li>
<li><strong>Legal Tools:</strong> No tool on our platform provides legal advice. Consult a qualified attorney for legal matters.</li>
<li><strong>Developer Tools:</strong> While our developer tools aim for accuracy, always validate results in your development environment.</li>
</ul>

<h2>Accuracy</h2>
<p>We make every effort to ensure the accuracy of our tools and calculations. However:</p>
<ul>
<li>Results may contain rounding errors</li>
<li>Currency exchange rates may not reflect real-time rates</li>
<li>Unit conversion factors are based on standard references but may vary in specific contexts</li>
<li>File processing tools depend on browser capabilities and may have limitations</li>
</ul>

<h2>External Links</h2>
<p>Our website may contain links to external websites. We are not responsible for the content, privacy policies, or practices of any third-party websites.</p>

<h2>Limitation of Liability</h2>
<p>In no event shall Get All In One Tools, its owners, or contributors be liable for any loss or damage including without limitation, indirect or consequential loss or damage, arising from the use of our tools or website.</p>

<h2>Changes</h2>
<p>We reserve the right to modify this disclaimer at any time without prior notice. Your continued use of the website constitutes acceptance of any changes.</p>

<h2>Contact</h2>
<p>If you have questions about this disclaimer, contact us at <a href="mailto:support@getallinonetools.com">support@getallinonetools.com</a>.</p>`,
  },

  "cookie-policy": {
    title: "Cookie Policy",
    metaTitle: "Cookie Policy - Get All In One Tools | How We Use Cookies",
    metaDescription: "Learn about how Get All In One Tools uses cookies. Detailed information about cookie types, purposes, and your choices.",
    content: `<h2>Cookie Policy</h2>
<p><strong>Last Updated:</strong> January 2026</p>
<p>This Cookie Policy explains how <strong>Get All In One Tools</strong> (https://getallinonetools.com) uses cookies and similar technologies when you visit our website.</p>

<h2>What Are Cookies?</h2>
<p>Cookies are small text files that are stored on your device (computer, smartphone, tablet) when you visit a website. They help the website remember your preferences and improve your browsing experience.</p>

<h2>Types of Cookies We Use</h2>

<h3>1. Essential Cookies</h3>
<p>These cookies are necessary for the basic functionality of our website:</p>
<ul>
<li><strong>Theme Preference:</strong> Remembers your dark/light mode choice</li>
<li><strong>Favorites:</strong> Stores your favorite tools list</li>
<li><strong>Session:</strong> Maintains your browsing session</li>
</ul>
<p>These cookies cannot be disabled as they are essential for the website to function properly.</p>

<h3>2. Analytics Cookies</h3>
<p>We use <strong>Google Analytics</strong> to understand how visitors interact with our website:</p>
<ul>
<li>Pages visited and time spent on each page</li>
<li>Traffic sources (how you found us)</li>
<li>Browser and device information</li>
<li>Geographic location (country level)</li>
</ul>
<p>This data is anonymized and used solely to improve our website and tools.</p>

<h3>3. Advertising Cookies</h3>
<p>We use <strong>Google AdSense</strong> to display advertisements on our website. These cookies may be used to:</p>
<ul>
<li>Show you relevant advertisements based on your interests</li>
<li>Limit the number of times you see an ad</li>
<li>Measure the effectiveness of advertising campaigns</li>
</ul>

<h2>Managing Cookies</h2>
<p>You can control and manage cookies in several ways:</p>
<ul>
<li><strong>Browser Settings:</strong> Most browsers allow you to refuse or delete cookies through their settings menu</li>
<li><strong>Google Ad Settings:</strong> Visit <a href="https://adssettings.google.com">Google Ad Settings</a> to manage ad personalization</li>
<li><strong>Opt-Out:</strong> Visit <a href="https://tools.google.com/dlpage/gaoptout">Google Analytics Opt-Out</a> to opt out of Google Analytics tracking</li>
</ul>
<p>Note: Disabling cookies may affect the functionality of our website.</p>

<h2>Third-Party Cookies</h2>
<p>Some cookies on our website are set by third-party services:</p>
<ul>
<li><strong>Google Analytics</strong> - Web analytics service</li>
<li><strong>Google AdSense</strong> - Advertising service</li>
</ul>
<p>These services have their own privacy and cookie policies. We encourage you to review them.</p>

<h2>Updates to This Policy</h2>
<p>We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>

<h2>Contact Us</h2>
<p>If you have questions about our use of cookies, please contact us at <a href="mailto:support@getallinonetools.com">support@getallinonetools.com</a>.</p>`,
  },
};

async function updatePages() {
  console.log("Updating all pages with AdSense-ready content...\n");
  const client = await pool.connect();
  
  try {
    for (const [slug, data] of Object.entries(pagesContent)) {
      await client.query(
        `UPDATE pages SET title = $1, meta_title = $2, meta_description = $3, content = $4, show_in_footer = true, updated_at = NOW() WHERE slug = $5`,
        [data.title, data.metaTitle, data.metaDescription, data.content, slug]
      );
      console.log(`Updated: ${slug}`);
    }
  } finally {
    client.release();
    await pool.end();
  }
  
  console.log("\nAll pages updated!");
  process.exit(0);
}

updatePages();