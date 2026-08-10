// QR & Barcode Tools SEO Content

export interface QrBarcodeSEOContent {
  features: Array<{ icon: string; title: string; description: string }>
  howToSteps: Array<{ title: string; description: string }>
  faqs: Array<{ question: string; answer: string }>
  relatedTools: Array<{ name: string; description: string; href: string }>
}

export const qrBarcodeSEOContent: Record<string, QrBarcodeSEOContent> = {

  "qr-code-generator": {
    features: [
      { icon: "QrCode", title: "Instant Generation", description: "Generate QR codes in real-time as you type. See results immediately." },
      { icon: "Shield", title: "100% Private", description: "All generation happens in your browser. No data sent to any server." },
      { icon: "Palette", title: "Custom Colors", description: "Choose custom foreground and background colors for branded QR codes." },
      { icon: "Settings", title: "4 Error Levels", description: "Low (7%) to High (30%) error correction for damaged code recovery." },
      { icon: "Download", title: "PNG Download", description: "Download high-quality PNG images from 100px to 800px size." },
      { icon: "Copy", title: "Copy to Clipboard", description: "Copy QR image directly to clipboard for quick paste in documents." }
    ],
    howToSteps: [
      { title: "Enter Content", description: "Type or paste text, URL, or any content you want to encode." },
      { title: "Customize", description: "Choose size, colors and error correction level." },
      { title: "Preview", description: "See QR code update instantly with your changes." },
      { title: "Download", description: "Click download to save PNG file to your device." }
    ],
    faqs: [
      { question: "What is a QR code?", answer: "Quick Response code - 2D barcode that stores information readable by smartphone cameras. Can store URLs, text, contact info, WiFi passwords and more." },
      { question: "Which error correction level should I use?", answer: "L (7%) for clean environments, M (15%) standard, Q (25%) for outdoor/harsh conditions, H (30%) for maximum reliability. Higher levels create denser codes." },
      { question: "Can I customize colors?", answer: "Yes! Choose any foreground and background colors. Maintain high contrast (dark on light) for reliable scanning. Avoid inverting colors (light on dark)." },
      { question: "What's the maximum data QR can hold?", answer: "Up to 4,296 alphanumeric characters, 7,089 digits, or 2,953 bytes. But more data = denser code that may be harder to scan reliably." },
      { question: "Do QR codes expire?", answer: "Static QR codes (like ours) never expire. Dynamic QR codes (from paid services) can expire if the service stops. Content in URL stays as long as URL works." },
      { question: "Are custom-colored QR codes reliable?", answer: "Yes if you maintain contrast. Test with multiple scanners before printing. Traditional black-on-white is most reliable universally." }
    ],
    relatedTools: [
      { name: "WiFi QR Generator", description: "Generate WiFi QR codes", href: "/tools/qr-barcode/wifi-qr-generator" },
      { name: "vCard QR Generator", description: "Generate contact QR codes", href: "/tools/qr-barcode/vcard-qr-generator" },
      { name: "Email QR Generator", description: "Generate email QR codes", href: "/tools/qr-barcode/email-qr-generator" },
      { name: "Bulk QR Generator", description: "Generate multiple QR codes", href: "/tools/qr-barcode/bulk-qr-generator" },
      { name: "QR Code Reader", description: "Scan QR codes", href: "/tools/qr-barcode/qr-code-reader" },
      { name: "Phone QR Generator", description: "Generate phone QR codes", href: "/tools/qr-barcode/phone-qr-generator" }
    ]
  },

  "wifi-qr-generator": {
    features: [
      { icon: "Wifi", title: "WiFi Auto-Connect", description: "Guests scan and connect instantly - no password typing required." },
      { icon: "Shield", title: "100% Private", description: "WiFi credentials never leave your browser. Generated locally only." },
      { icon: "Lock", title: "All Security Types", description: "Supports WPA/WPA2/WPA3, WEP and open (no password) networks." },
      { icon: "Eye", title: "Hidden Network Support", description: "Toggle for hidden SSID networks that don't broadcast their name." },
      { icon: "Download", title: "PNG Download", description: "High-quality QR code image ready for printing or sharing." },
      { icon: "Zap", title: "Universal Format", description: "Works with iOS 11+, Android 10+ and most modern QR scanners." }
    ],
    howToSteps: [
      { title: "Enter Network Name", description: "Type your WiFi SSID (network name) exactly as it appears." },
      { title: "Choose Security", description: "Select WPA/WPA2/WPA3, WEP or 'No Password' for open networks." },
      { title: "Enter Password", description: "Type your WiFi password (case-sensitive)." },
      { title: "Download and Share", description: "Save PNG and print for guests, or share digitally." }
    ],
    faqs: [
      { question: "Which phones support WiFi QR scanning?", answer: "iOS 11+ (iPhone/iPad) and Android 10+ (most phones) support built-in WiFi QR scanning via camera app. Older phones need a QR reader app." },
      { question: "Is my WiFi password safe?", answer: "Yes! Everything happens in your browser. Password is only in the QR code image you download. However, anyone who scans the QR gets the password." },
      { question: "Where to place the WiFi QR?", answer: "Common spots: cafe walls, hotel rooms, offices, guest rooms, home entrances, printed on Airbnb welcome cards. Print in size 3+ inches for reliable scanning." },
      { question: "Can I change WiFi password later?", answer: "You'd need to generate a new QR code with new password. Old QR codes will stop working. Consider hidden network with QR access for guests." },
      { question: "WPA2 vs WPA3?", answer: "WPA3 is newer and more secure. WPA2 is older but still safe with strong password. Use whatever your router provides. Both work in our QR generator." },
      { question: "Why isn't my WiFi QR working?", answer: "Common issues: wrong password, wrong SSID spelling, wrong security type, weak/damaged print. Test with your own phone first before deploying." }
    ],
    relatedTools: [
      { name: "QR Code Generator", description: "Generate any QR code", href: "/tools/qr-barcode/qr-code-generator" },
      { name: "vCard QR Generator", description: "Generate contact QR codes", href: "/tools/qr-barcode/vcard-qr-generator" },
      { name: "Location QR Generator", description: "Generate GPS QR codes", href: "/tools/qr-barcode/location-qr-generator" },
      { name: "QR Code Reader", description: "Scan QR codes", href: "/tools/qr-barcode/qr-code-reader" },
      { name: "Password Generator", description: "Generate strong passwords", href: "/tools/security/password-generator" },
      { name: "Bulk QR Generator", description: "Generate multiple QR codes", href: "/tools/qr-barcode/bulk-qr-generator" }
    ]
  },

  "vcard-qr-generator": {
    features: [
      { icon: "User", title: "Complete Contact Info", description: "Include name, phone, email, company, job title, website and address." },
      { icon: "Shield", title: "100% Private", description: "Contact data never leaves your browser. Generated locally only." },
      { icon: "Smartphone", title: "Universal Format", description: "Uses vCard 3.0 standard - works with all iOS and Android phones." },
      { icon: "Zap", title: "Instant Add to Contacts", description: "Scan and tap 'Add Contact' - all details filled automatically." },
      { icon: "Download", title: "PNG for Business Cards", description: "Perfect for printing on business cards, name badges or email signatures." },
      { icon: "Briefcase", title: "Professional Networking", description: "Ideal for conferences, meetings and business card exchange." }
    ],
    howToSteps: [
      { title: "Enter Basic Info", description: "Add first name and last name (required for vCard format)." },
      { title: "Add Contact Details", description: "Include phone, email, company, job title as needed." },
      { title: "Add Optional Info", description: "Include website URL and address for complete contact profile." },
      { title: "Download and Print", description: "Save PNG and add to business cards or signatures." }
    ],
    faqs: [
      { question: "What is a vCard?", answer: "Virtual Contact File - standard format for electronic business cards. Contains contact info that can be imported to any address book or contacts app." },
      { question: "Does it work on iPhone and Android?", answer: "Yes! vCard 3.0 is universal. iOS and Android both natively support scanning and adding vCard QR codes to contacts app." },
      { question: "Can I include social media?", answer: "Basic vCard doesn't standardize social media. Include LinkedIn URL in website field. For multiple social links, use a bio.link or similar service and put URL there." },
      { question: "Where should I put vCard QR?", answer: "Business cards (perfect use!), email signatures, badges at conferences, portfolio websites, resume PDFs, phone lock screens for lost phone recovery." },
      { question: "How much info can vCard hold?", answer: "vCard has generous limits. Our tool supports common fields. For massive contact info, generate multiple QR codes or use vCard file directly." },
      { question: "Do all QR scanners recognize vCard?", answer: "Modern scanners (built-in on iOS 11+, Android 10+) recognize vCard format automatically. Older QR readers may show as text - copy and manually add." }
    ],
    relatedTools: [
      { name: "QR Code Generator", description: "Generate any QR code", href: "/tools/qr-barcode/qr-code-generator" },
      { name: "Phone QR Generator", description: "Generate phone QR codes", href: "/tools/qr-barcode/phone-qr-generator" },
      { name: "Email QR Generator", description: "Generate email QR codes", href: "/tools/qr-barcode/email-qr-generator" },
      { name: "WiFi QR Generator", description: "Generate WiFi QR codes", href: "/tools/qr-barcode/wifi-qr-generator" },
      { name: "QR Code Reader", description: "Scan QR codes", href: "/tools/qr-barcode/qr-code-reader" },
      { name: "Bulk QR Generator", description: "Generate multiple QR codes", href: "/tools/qr-barcode/bulk-qr-generator" }
    ]
  },

  "email-qr-generator": {
    features: [
      { icon: "Mail", title: "Pre-Filled Email", description: "Include recipient, subject and message body - ready to send." },
      { icon: "Shield", title: "100% Private", description: "Email content never leaves your browser. Generated locally." },
      { icon: "Zap", title: "One-Scan Email", description: "Scan opens default email app with everything filled - just hit send." },
      { icon: "Type", title: "Custom Subject/Body", description: "Pre-fill subject line and message body for consistent outreach." },
      { icon: "Download", title: "PNG Download", description: "High-quality QR code perfect for cards, posters and websites." },
      { icon: "Users", title: "Marketing Ready", description: "Great for feedback forms, support contacts, newsletter signups." }
    ],
    howToSteps: [
      { title: "Enter Email Address", description: "Add the recipient email address (required)." },
      { title: "Add Subject", description: "Optional - pre-fill the email subject line." },
      { title: "Add Message Body", description: "Optional - pre-fill email content." },
      { title: "Download and Use", description: "Save PNG for print materials or embed in websites." }
    ],
    faqs: [
      { question: "How does email QR work?", answer: "QR contains mailto: link. Scanning opens your default email app (Gmail, Outlook, Apple Mail) with To, Subject and Body fields pre-filled. User just clicks send." },
      { question: "Can I include multiple recipients?", answer: "Yes! Separate with commas in the To field. Or use cc/bcc syntax. Note that not all mail apps handle this same way." },
      { question: "What if user has no email app?", answer: "Modern phones always have email app (or Gmail web). If none installed, QR just shows text - user can manually copy email address." },
      { question: "Best uses for email QR?", answer: "Support/feedback forms, event RSVPs, job applications, business card contact, product returns, warranty registrations, newsletter signups." },
      { question: "Can I track scans?", answer: "Static QR codes (like ours) can't be tracked. For tracking, use dynamic QR services (usually paid) that redirect through their servers." },
      { question: "Character limit for email?", answer: "URLs including mailto: can be up to 2000 characters safely. Very long emails may create dense QR codes hard to scan. Keep body under 500 chars ideally." }
    ],
    relatedTools: [
      { name: "SMS QR Generator", description: "Generate SMS QR codes", href: "/tools/qr-barcode/sms-qr-generator" },
      { name: "Phone QR Generator", description: "Generate phone QR codes", href: "/tools/qr-barcode/phone-qr-generator" },
      { name: "vCard QR Generator", description: "Generate contact QR codes", href: "/tools/qr-barcode/vcard-qr-generator" },
      { name: "QR Code Generator", description: "Generate any QR code", href: "/tools/qr-barcode/qr-code-generator" },
      { name: "WiFi QR Generator", description: "Generate WiFi QR codes", href: "/tools/qr-barcode/wifi-qr-generator" },
      { name: "QR Code Reader", description: "Scan QR codes", href: "/tools/qr-barcode/qr-code-reader" }
    ]
  },

  "sms-qr-generator": {
    features: [
      { icon: "MessageSquare", title: "Pre-Filled SMS", description: "Include recipient number and message text - ready to send." },
      { icon: "Shield", title: "100% Private", description: "SMS data never leaves your browser. Generated locally only." },
      { icon: "Zap", title: "One-Scan Messaging", description: "Scan opens SMS app with recipient and message pre-filled." },
      { icon: "Smartphone", title: "Universal Compatibility", description: "Works with iOS Messages, Android SMS and all messaging apps." },
      { icon: "Download", title: "PNG Download", description: "High-quality QR image for cards, posters and marketing materials." },
      { icon: "Users", title: "Marketing Perfect", description: "Great for opt-ins, feedback requests, event confirmations." }
    ],
    howToSteps: [
      { title: "Enter Phone Number", description: "Add recipient number with country code (e.g., +1234567890)." },
      { title: "Add Message", description: "Optional - pre-fill the SMS message text." },
      { title: "Preview QR Code", description: "See generated QR code appear instantly." },
      { title: "Download", description: "Save PNG for print or digital use." }
    ],
    faqs: [
      { question: "How does SMS QR work?", answer: "QR contains sms: link with phone and body. Scanning opens SMS app with recipient number and message pre-filled. User just hits send." },
      { question: "Do I need country code?", answer: "Yes for international compatibility. Format: +[country code][number]. Example: +1 for US, +44 for UK, +91 for India. Improves reliability." },
      { question: "Best uses for SMS QR?", answer: "Marketing opt-ins ('Text JOIN to 12345'), event RSVPs, customer feedback, appointment reminders, contest entries, quick support requests." },
      { question: "Can I include emojis?", answer: "Yes, most modern phones support emojis in pre-filled SMS. Test with target phones first. Some older devices may show as text." },
      { question: "What's the character limit?", answer: "Standard SMS is 160 characters, but pre-filled SMS can be longer - will just split into multiple messages. Keep under 500 chars for reliability." },
      { question: "Can I add sender info?", answer: "SMS QR can only pre-fill To and Body. Sender is always the person who scans and sends. Use body to identify the QR source or campaign." }
    ],
    relatedTools: [
      { name: "Phone QR Generator", description: "Generate phone QR codes", href: "/tools/qr-barcode/phone-qr-generator" },
      { name: "Email QR Generator", description: "Generate email QR codes", href: "/tools/qr-barcode/email-qr-generator" },
      { name: "vCard QR Generator", description: "Generate contact QR codes", href: "/tools/qr-barcode/vcard-qr-generator" },
      { name: "QR Code Generator", description: "Generate any QR code", href: "/tools/qr-barcode/qr-code-generator" },
      { name: "WiFi QR Generator", description: "Generate WiFi QR codes", href: "/tools/qr-barcode/wifi-qr-generator" },
      { name: "Bulk QR Generator", description: "Generate multiple QR codes", href: "/tools/qr-barcode/bulk-qr-generator" }
    ]
  },

  "phone-qr-generator": {
    features: [
      { icon: "Phone", title: "One-Tap Calling", description: "Scan opens phone dialer with number ready - just tap to call." },
      { icon: "Shield", title: "100% Private", description: "Phone number never leaves your browser. Generated locally only." },
      { icon: "Globe", title: "International Support", description: "Include country codes for global reach and reliable calling." },
      { icon: "Zap", title: "Instant Generation", description: "See QR code appear instantly as you enter the phone number." },
      { icon: "Download", title: "PNG Download", description: "High-quality QR perfect for business cards, storefronts, ads." },
      { icon: "Briefcase", title: "Business Ready", description: "Ideal for restaurants, taxis, service businesses, hotlines." }
    ],
    howToSteps: [
      { title: "Enter Phone Number", description: "Type phone number with country code (e.g., +1 for US)." },
      { title: "Verify Format", description: "Ensure country code included for international scanning." },
      { title: "Preview", description: "QR code updates automatically as you type." },
      { title: "Download", description: "Save PNG for cards, signs, or digital use." }
    ],
    faqs: [
      { question: "How does phone QR work?", answer: "QR contains tel: link. Scanning opens phone dialer with number pre-entered. User just taps call button to place call. Simple and effective." },
      { question: "Is country code required?", answer: "Recommended! Without country code (e.g., +1), international scanners may not know how to dial. Format: +[country code][area code][number]." },
      { question: "Best uses for phone QR?", answer: "Business cards, storefronts (call for delivery), restaurants (reservations), taxis, real estate signs, service company vehicles, help desk posters." },
      { question: "Can I include extension?", answer: "Yes with 'p' pause (e.g., +1234567890p123). Different phones handle extensions differently. Test with target audience's phones before deploying." },
      { question: "Toll-free numbers work?", answer: "Yes! Format as +1-800-... for US toll-free. International toll-free (like +800) also works. Just include country code as usual." },
      { question: "SMS QR or Phone QR?", answer: "Phone QR opens dialer for calls. SMS QR opens messaging app for texts. Choose based on preferred customer contact method - or provide both!" }
    ],
    relatedTools: [
      { name: "SMS QR Generator", description: "Generate SMS QR codes", href: "/tools/qr-barcode/sms-qr-generator" },
      { name: "vCard QR Generator", description: "Generate contact QR codes", href: "/tools/qr-barcode/vcard-qr-generator" },
      { name: "Email QR Generator", description: "Generate email QR codes", href: "/tools/qr-barcode/email-qr-generator" },
      { name: "QR Code Generator", description: "Generate any QR code", href: "/tools/qr-barcode/qr-code-generator" },
      { name: "WiFi QR Generator", description: "Generate WiFi QR codes", href: "/tools/qr-barcode/wifi-qr-generator" },
      { name: "Location QR Generator", description: "Generate GPS QR codes", href: "/tools/qr-barcode/location-qr-generator" }
    ]
  },

  "location-qr-generator": {
    features: [
      { icon: "MapPin", title: "GPS Coordinates", description: "Encode exact latitude and longitude for precise location sharing." },
      { icon: "Shield", title: "100% Private", description: "Location data never leaves your browser. Generated locally." },
      { icon: "Navigation", title: "Opens in Maps App", description: "Scan opens Google Maps, Apple Maps or default navigation app." },
      { icon: "Zap", title: "One-Click My Location", description: "Use browser geolocation to auto-fill current coordinates." },
      { icon: "Download", title: "PNG Download", description: "High-quality QR perfect for event invitations and signage." },
      { icon: "Users", title: "Event Ready", description: "Perfect for weddings, parties, meetups and business locations." }
    ],
    howToSteps: [
      { title: "Enter Coordinates", description: "Add latitude and longitude, or click 'Use My Location'." },
      { title: "Verify Location", description: "Coordinates are decimal degrees (e.g., 40.7128, -74.0060)." },
      { title: "Preview QR", description: "See QR code update as coordinates change." },
      { title: "Share or Print", description: "Download PNG for invitations, business signage or event materials." }
    ],
    faqs: [
      { question: "How do I get coordinates?", answer: "Click 'Use My Location' for current position. Or find address on Google Maps, right-click, copy coordinates. Or use lat/long lookup services online." },
      { question: "What format for coordinates?", answer: "Decimal degrees: Latitude (-90 to 90), Longitude (-180 to 180). Example: 40.7128, -74.0060 (New York City). 6 decimal places for meter precision." },
      { question: "Which map app opens?", answer: "User's default: Google Maps on Android, Apple Maps on iOS, or whatever they've set. All support geo: protocol universally." },
      { question: "Best uses for location QR?", answer: "Wedding invitations, event flyers, business cards, real estate signs, tourist info, restaurant tables (for GPS reviews), hiking trail markers." },
      { question: "Does it include address?", answer: "No, only coordinates. Map app displays coordinates and user can search nearby. For address, consider adding to email or SMS QR instead." },
      { question: "How accurate is my location?", answer: "Browser geolocation accuracy: 5-100 meters typically. GPS-enabled phone gives ~5m. WiFi/IP based gives ~100m. Manual entry is exactly what you enter." }
    ],
    relatedTools: [
      { name: "QR Code Generator", description: "Generate any QR code", href: "/tools/qr-barcode/qr-code-generator" },
      { name: "Event QR Generator", description: "Generate event QR codes", href: "/tools/qr-barcode/event-qr-generator" },
      { name: "vCard QR Generator", description: "Generate contact QR codes", href: "/tools/qr-barcode/vcard-qr-generator" },
      { name: "WiFi QR Generator", description: "Generate WiFi QR codes", href: "/tools/qr-barcode/wifi-qr-generator" },
      { name: "Phone QR Generator", description: "Generate phone QR codes", href: "/tools/qr-barcode/phone-qr-generator" },
      { name: "QR Code Reader", description: "Scan QR codes", href: "/tools/qr-barcode/qr-code-reader" }
    ]
  },

  "event-qr-generator": {
    features: [
      { icon: "Calendar", title: "Calendar Event QR", description: "Generate QR codes that add events directly to phone calendars." },
      { icon: "Shield", title: "100% Private", description: "Event details never leave your browser. Generated locally only." },
      { icon: "Clock", title: "Start/End Date/Time", description: "Set exact date, time and duration for calendar entries." },
      { icon: "MapPin", title: "Location Support", description: "Include event location for map integration in calendar app." },
      { icon: "Download", title: "PNG for Invitations", description: "Perfect for wedding invitations, conference badges, event flyers." },
      { icon: "Users", title: "iCal Standard", description: "Uses standard iCalendar format - works with Google, Apple, Outlook." }
    ],
    howToSteps: [
      { title: "Enter Event Title", description: "Type the name of your event (required)." },
      { title: "Add Location and Description", description: "Optional but recommended for context." },
      { title: "Set Date and Time", description: "Choose start and end date/time for the event." },
      { title: "Download and Distribute", description: "Save PNG and share via invitation, poster or website." }
    ],
    faqs: [
      { question: "How does event QR work?", answer: "QR contains iCalendar (VEVENT) format. Scanning offers to add event to phone's default calendar with all details pre-filled." },
      { question: "Which calendars support it?", answer: "All modern calendars: Google Calendar, Apple Calendar, Outlook, Samsung Calendar. Uses iCal standard supported everywhere." },
      { question: "Best uses for event QR?", answer: "Wedding invitations, conference badges, product launches, webinar promos, class schedules, workshop flyers, sporting events." },
      { question: "Can I add multiple events?", answer: "One event per QR code (best practice). For multiple events, generate separate QRs. Print together on marketing materials." },
      { question: "What about timezone?", answer: "Times are in local timezone by default. For international events, mention timezone in description. Or use UTC and note it." },
      { question: "Include RSVP link?", answer: "Yes! Add RSVP URL in description field. When users add event to calendar, they'll see the link and can click to respond." }
    ],
    relatedTools: [
      { name: "Location QR Generator", description: "Generate GPS QR codes", href: "/tools/qr-barcode/location-qr-generator" },
      { name: "QR Code Generator", description: "Generate any QR code", href: "/tools/qr-barcode/qr-code-generator" },
      { name: "vCard QR Generator", description: "Generate contact QR codes", href: "/tools/qr-barcode/vcard-qr-generator" },
      { name: "Email QR Generator", description: "Generate email QR codes", href: "/tools/qr-barcode/email-qr-generator" },
      { name: "Bulk QR Generator", description: "Generate multiple QR codes", href: "/tools/qr-barcode/bulk-qr-generator" },
      { name: "QR Code Reader", description: "Scan QR codes", href: "/tools/qr-barcode/qr-code-reader" }
    ]
  },

  "bulk-qr-generator": {
    features: [
      { icon: "Layers", title: "Bulk Generation", description: "Generate hundreds of QR codes at once from a list. Save hours of time." },
      { icon: "Shield", title: "100% Private", description: "All processing happens in your browser. Nothing sent to servers." },
      { icon: "Download", title: "Download All at Once", description: "One-click download of all generated QR codes as PNG files." },
      { icon: "Type", title: "Line-Based Input", description: "Simply paste one URL or text per line - super easy input." },
      { icon: "Zap", title: "Fast Processing", description: "Generate 100+ QR codes in seconds with optimized processing." },
      { icon: "Grid", title: "Visual Preview", description: "See all QR codes in grid layout before downloading." }
    ],
    howToSteps: [
      { title: "Prepare Your List", description: "Create a list of URLs or text, one item per line." },
      { title: "Paste in Textarea", description: "Copy the list and paste in the input area." },
      { title: "Click Generate", description: "All QR codes generated at once with preview." },
      { title: "Download All", description: "Click Download All to save all QR codes as PNG files." }
    ],
    faqs: [
      { question: "How many QR codes can I generate?", answer: "Practically unlimited. Tested with 500+ codes. Browser memory is the only limit. For 1000+ codes, may need to process in batches." },
      { question: "Best uses for bulk QR?", answer: "Product batches (each unique URL), event tickets, promotional codes, table numbers, marketing campaigns, invitation batches, inventory management." },
      { question: "Can I customize all QR codes?", answer: "This tool uses default settings for speed. For individual customization (colors, sizes), generate one-by-one using our QR Code Generator." },
      { question: "How does download all work?", answer: "Browser downloads each PNG sequentially with 100ms delay. May need to enable multiple downloads in browser settings for large batches." },
      { question: "Can I add prefix/suffix?", answer: "Include in your input list. Example: 'https://mysite.com/item/001' pattern. Use spreadsheet to generate then paste. Full control over content." },
      { question: "Are QR codes numbered?", answer: "Yes! Each downloaded file is named qr-1.png, qr-2.png etc. Matches order in your input list for easy matching to source data." }
    ],
    relatedTools: [
      { name: "QR Code Generator", description: "Generate single QR codes", href: "/tools/qr-barcode/qr-code-generator" },
      { name: "QR Code Reader", description: "Scan QR codes", href: "/tools/qr-barcode/qr-code-reader" },
      { name: "WiFi QR Generator", description: "Generate WiFi QR codes", href: "/tools/qr-barcode/wifi-qr-generator" },
      { name: "vCard QR Generator", description: "Generate contact QR codes", href: "/tools/qr-barcode/vcard-qr-generator" },
      { name: "Email QR Generator", description: "Generate email QR codes", href: "/tools/qr-barcode/email-qr-generator" },
      { name: "Event QR Generator", description: "Generate event QR codes", href: "/tools/qr-barcode/event-qr-generator" }
    ]
  },

  "qr-code-reader": {
    features: [
      { icon: "Camera", title: "Camera Scanning", description: "Use device camera to scan QR codes in real-time. Front and back camera support." },
      { icon: "Upload", title: "Image Upload", description: "Upload QR code images from your device to decode instantly." },
      { icon: "Shield", title: "100% Private", description: "All scanning happens in your browser. No images uploaded anywhere." },
      { icon: "Zap", title: "Instant Decoding", description: "Automatic detection and decoding once QR code is in view." },
      { icon: "Link", title: "Auto Link Detection", description: "URLs automatically become clickable for one-tap opening." },
      { icon: "Copy", title: "One-Click Copy", description: "Copy decoded content to clipboard for use elsewhere." }
    ],
    howToSteps: [
      { title: "Choose Input Method", description: "Click 'Use Camera' for live scanning or 'Upload Image' for photos." },
      { title: "Point Camera or Select Image", description: "Aim camera at QR code or select image file with QR." },
      { title: "Wait for Detection", description: "QR code detected automatically - no button press needed." },
      { title: "Use Decoded Content", description: "Copy the content or click URLs to open them." }
    ],
    faqs: [
      { question: "Which browsers work?", answer: "Chrome, Edge and Opera (best support). Firefox and Safari have limited BarcodeDetector API support. iOS 14.5+ Safari now supports camera scanning." },
      { question: "Is camera access safe?", answer: "Yes! Camera access requires explicit permission. Video stream stays in your browser only - never sent anywhere. Stop button ends access immediately." },
      { question: "Why is scanning slow sometimes?", answer: "Depends on: lighting (bright is better), QR size (bigger scans faster), camera focus, code quality, phone speed. Try uploading a clearer image if camera struggles." },
      { question: "Can I scan barcodes too?", answer: "Currently QR only. Barcodes (Code128, EAN, UPC) require different detection. We'll add barcode support in future updates." },
      { question: "What data types are decoded?", answer: "All QR content types: URLs, plain text, WiFi credentials (WIFI:...), vCards (BEGIN:VCARD), phone (tel:), SMS (sms:), email (mailto:), location (geo:)." },
      { question: "Can I scan damaged QR codes?", answer: "Depends on error correction level of original code. High error correction (30%) can survive significant damage. Try different angles and lighting." }
    ],
    relatedTools: [
      { name: "QR Code Generator", description: "Generate QR codes", href: "/tools/qr-barcode/qr-code-generator" },
      { name: "WiFi QR Generator", description: "Generate WiFi QR codes", href: "/tools/qr-barcode/wifi-qr-generator" },
      { name: "vCard QR Generator", description: "Generate contact QR codes", href: "/tools/qr-barcode/vcard-qr-generator" },
      { name: "Bulk QR Generator", description: "Generate multiple QR codes", href: "/tools/qr-barcode/bulk-qr-generator" },
      { name: "Email QR Generator", description: "Generate email QR codes", href: "/tools/qr-barcode/email-qr-generator" },
      { name: "Phone QR Generator", description: "Generate phone QR codes", href: "/tools/qr-barcode/phone-qr-generator" }
    ]
  },

  "code128-barcode-generator": {
    features: [
      { icon: "Barcode", title: "Full Character Support", description: "Encode any alphanumeric text - letters, numbers, symbols and special characters." },
      { icon: "Shield", title: "100% Private", description: "All generation happens in your browser. Data never leaves your device." },
      { icon: "Palette", title: "Custom Colors", description: "Choose bar and background colors for branded barcodes." },
      { icon: "Settings", title: "Adjustable Size", description: "Customize width and height for different use cases and applications." },
      { icon: "Download", title: "PNG Download", description: "Download high-quality PNG images ready for printing or digital use." },
      { icon: "Package", title: "Industry Standard", description: "Perfect for shipping labels, logistics, inventory and product tracking." }
    ],
    howToSteps: [
      { title: "Enter Text", description: "Type or paste the text you want to encode as a barcode." },
      { title: "Customize", description: "Adjust width, height, colors and text display options." },
      { title: "Preview", description: "See barcode update instantly with your changes." },
      { title: "Download", description: "Save as PNG for printing labels or embedding in documents." }
    ],
    faqs: [
      { question: "What is Code 128?", answer: "Code 128 is a high-density barcode symbology that can encode all 128 ASCII characters. Widely used in shipping, logistics and general purpose applications." },
      { question: "How much data can Code 128 hold?", answer: "Practically unlimited. It is a variable-length barcode that can encode any amount of alphanumeric data. Common use is 8-16 characters for shipping labels." },
      { question: "Difference between Code 128 and QR?", answer: "Code 128 is 1D (linear) barcode - easier to scan with laser scanners. QR is 2D - holds more data. Code 128 for logistics, QR for URLs and complex data." },
      { question: "Can it encode special characters?", answer: "Yes! Code 128 supports all 128 ASCII characters including uppercase, lowercase, digits, punctuation and control characters." },
      { question: "What resolution to print?", answer: "Minimum 300 DPI for reliable scanning. Higher DPI (600 or more) for small barcodes. Keep quiet zones (white space) around barcode for scanner accuracy." },
      { question: "Best uses for Code 128?", answer: "Shipping labels (FedEx, UPS use it), inventory management, ID cards, medical charts, ticket systems and any application needing alphanumeric data." }
    ],
    relatedTools: [
      { name: "EAN-13 Barcode", description: "Generate retail barcodes", href: "/tools/qr-barcode/ean13-barcode-generator" },
      { name: "UPC-A Barcode", description: "Generate US retail barcodes", href: "/tools/qr-barcode/upca-barcode-generator" },
      { name: "Code 39 Barcode", description: "Generate industrial barcodes", href: "/tools/qr-barcode/code39-barcode-generator" },
      { name: "Barcode Reader", description: "Scan barcodes", href: "/tools/qr-barcode/barcode-reader" },
      { name: "QR Code Generator", description: "Generate QR codes", href: "/tools/qr-barcode/qr-code-generator" },
      { name: "Bulk QR Generator", description: "Generate multiple QR codes", href: "/tools/qr-barcode/bulk-qr-generator" }
    ]
  },

  "ean13-barcode-generator": {
    features: [
      { icon: "Barcode", title: "Retail Standard", description: "Generate EAN-13 barcodes - the international standard for retail products." },
      { icon: "Shield", title: "100% Private", description: "All generation happens in your browser. Product codes never leave your device." },
      { icon: "CheckCircle", title: "Auto Checksum", description: "Automatically calculates and validates the 13th check digit for accuracy." },
      { icon: "Globe", title: "International Format", description: "EAN-13 used worldwide except North America (which uses UPC-A)." },
      { icon: "Download", title: "PNG Download", description: "High-quality barcode images ready for product packaging and labels." },
      { icon: "AlertCircle", title: "Input Validation", description: "Validates 12-13 digit input and shows clear errors for invalid data." }
    ],
    howToSteps: [
      { title: "Enter Product Code", description: "Type 12 digits (checksum auto-added) or 13 digits (including checksum)." },
      { title: "Verify Format", description: "Only digits allowed. Non-digits are automatically removed." },
      { title: "Preview Barcode", description: "EAN-13 barcode appears with proper formatting and human-readable text." },
      { title: "Download for Print", description: "Save PNG at 300 DPI for reliable retail scanner reading." }
    ],
    faqs: [
      { question: "What is EAN-13?", answer: "European Article Number (13 digits) - international product code used on virtually all consumer products worldwide (except North America)." },
      { question: "How to get an EAN-13 code?", answer: "Purchase from GS1 (official body). Costs vary by country. Small businesses can also use resellers for individual codes. Never invent random codes for real products." },
      { question: "What do the 13 digits mean?", answer: "First 3: country code. Next 4-6: manufacturer code. Next 3-5: product code. Last 1: check digit (auto-calculated for validation)." },
      { question: "EAN-13 vs UPC-A?", answer: "EAN-13 (13 digits) used internationally. UPC-A (12 digits) used in US and Canada. EAN-13 is superset - includes UPC codes with 0 prefix." },
      { question: "Do I need barcode registration?", answer: "For retail sale: YES, must register with GS1. For internal use (inventory, tracking): NO, can use any format. Never use random codes on retail products." },
      { question: "What print size for EAN-13?", answer: "Standard is 37.29mm by 25.93mm at 100 percent magnification. Can scale 80 to 200 percent. Never below 80 percent for reliable scanning at checkouts." }
    ],
    relatedTools: [
      { name: "UPC-A Barcode", description: "Generate US retail barcodes", href: "/tools/qr-barcode/upca-barcode-generator" },
      { name: "Code 128 Barcode", description: "Generate Code 128 barcodes", href: "/tools/qr-barcode/code128-barcode-generator" },
      { name: "Code 39 Barcode", description: "Generate Code 39 barcodes", href: "/tools/qr-barcode/code39-barcode-generator" },
      { name: "Barcode Reader", description: "Scan barcodes", href: "/tools/qr-barcode/barcode-reader" },
      { name: "QR Code Generator", description: "Generate QR codes", href: "/tools/qr-barcode/qr-code-generator" },
      { name: "Bulk QR Generator", description: "Generate multiple QR codes", href: "/tools/qr-barcode/bulk-qr-generator" }
    ]
  },

  "upca-barcode-generator": {
    features: [
      { icon: "Barcode", title: "US Retail Standard", description: "Generate UPC-A barcodes - the standard for North American retail products." },
      { icon: "Shield", title: "100% Private", description: "All generation happens in your browser. Product codes stay on your device." },
      { icon: "CheckCircle", title: "Auto Checksum", description: "Automatically calculates and validates the 12th check digit." },
      { icon: "Store", title: "Retail Ready", description: "Perfect for US and Canadian retail products, groceries and consumer goods." },
      { icon: "Download", title: "PNG Download", description: "High-quality barcode images ready for packaging and labels." },
      { icon: "AlertCircle", title: "Input Validation", description: "Validates 11-12 digit input and shows clear errors for invalid data." }
    ],
    howToSteps: [
      { title: "Enter Product Code", description: "Type 11 digits (checksum auto-added) or 12 digits (including checksum)." },
      { title: "Verify Format", description: "Only digits allowed. Non-digits are automatically removed." },
      { title: "Preview Barcode", description: "UPC-A barcode appears with proper formatting and human-readable numbers." },
      { title: "Download for Print", description: "Save PNG at 300 DPI for reliable retail scanner reading." }
    ],
    faqs: [
      { question: "What is UPC-A?", answer: "Universal Product Code (12 digits) - standard barcode used on retail products in US, Canada and some other countries. Introduced in 1974." },
      { question: "UPC-A vs EAN-13?", answer: "UPC-A is 12 digits (US and Canada). EAN-13 is 13 digits (international). EAN-13 includes UPC-A codes with 0 prefix. Modern scanners read both." },
      { question: "How to get a UPC-A code?", answer: "Register with GS1 US (formerly Uniform Code Council). Get company prefix, then create product numbers. Costs 250 dollars initial fee plus annual renewal." },
      { question: "What do the digits mean?", answer: "First 1: number system (0 for regular, 2 for variable weight items like meat). Next 5: manufacturer code. Next 5: product code. Last 1: check digit." },
      { question: "Can I use random UPC codes?", answer: "NO for retail sale - major stores verify codes with GS1. Fake codes get products removed. YES for internal inventory or non-retail use." },
      { question: "What print size for UPC-A?", answer: "Standard is 37.29mm by 25.93mm at 100 percent. Can scale 80 to 200 percent. Always print with quiet zones (white margins) for scanner reliability." }
    ],
    relatedTools: [
      { name: "EAN-13 Barcode", description: "Generate retail barcodes", href: "/tools/qr-barcode/ean13-barcode-generator" },
      { name: "Code 128 Barcode", description: "Generate Code 128 barcodes", href: "/tools/qr-barcode/code128-barcode-generator" },
      { name: "Code 39 Barcode", description: "Generate Code 39 barcodes", href: "/tools/qr-barcode/code39-barcode-generator" },
      { name: "Barcode Reader", description: "Scan barcodes", href: "/tools/qr-barcode/barcode-reader" },
      { name: "QR Code Generator", description: "Generate QR codes", href: "/tools/qr-barcode/qr-code-generator" },
      { name: "Bulk QR Generator", description: "Generate multiple QR codes", href: "/tools/qr-barcode/bulk-qr-generator" }
    ]
  },

  "code39-barcode-generator": {
    features: [
      { icon: "Barcode", title: "Industrial Standard", description: "Generate Code 39 barcodes for industrial, government and military applications." },
      { icon: "Shield", title: "100% Private", description: "All generation happens in your browser. Data never leaves your device." },
      { icon: "Type", title: "Alphanumeric Support", description: "Supports A-Z, 0-9 and special characters." },
      { icon: "Settings", title: "Customizable Size", description: "Adjust width and height for different application needs." },
      { icon: "Download", title: "PNG Download", description: "High-quality barcode images for printing on labels and documents." },
      { icon: "Package", title: "Legacy Support", description: "Older standard but still widely used in inventory, healthcare and libraries." }
    ],
    howToSteps: [
      { title: "Enter Text", description: "Type uppercase text, numbers or supported special characters." },
      { title: "Auto Convert", description: "Lowercase automatically converted to uppercase (Code 39 requirement)." },
      { title: "Customize Size", description: "Adjust width and height for your specific use case." },
      { title: "Download PNG", description: "Save barcode image for printing on labels or documents." }
    ],
    faqs: [
      { question: "What is Code 39?", answer: "Code 39 (Code 3 of 9) is a variable-length barcode that encodes uppercase letters, digits and some special characters. Named because each character uses 9 elements (3 wide, 6 narrow)." },
      { question: "Code 39 vs Code 128?", answer: "Code 39 is older, simpler, lower density (fewer chars per inch). Code 128 is newer, higher density, supports all ASCII. Code 39 easier to print, more forgiving." },
      { question: "What characters does Code 39 support?", answer: "Uppercase A-Z, digits 0-9, and: space, hyphen, dot, dollar, slash, plus, percent. Also supports asterisk as start and stop character. Case-sensitive - lowercase not supported." },
      { question: "Why is Code 39 still used?", answer: "Simple to print, does not require checksum, self-checking (built-in error detection). Common in: military (LOGMARS), automotive (VIN), healthcare, libraries and government." },
      { question: "Can Code 39 encode lowercase?", answer: "Standard Code 39 only supports uppercase. Full ASCII Code 39 extension exists but requires special settings. Best to use only uppercase for compatibility." },
      { question: "What is Code 39 Extended?", answer: "Extended Code 39 uses double-character encoding to represent all 128 ASCII characters including lowercase. Not all scanners support it - stick to standard for compatibility." }
    ],
    relatedTools: [
      { name: "Code 128 Barcode", description: "Generate Code 128 barcodes", href: "/tools/qr-barcode/code128-barcode-generator" },
      { name: "EAN-13 Barcode", description: "Generate retail barcodes", href: "/tools/qr-barcode/ean13-barcode-generator" },
      { name: "UPC-A Barcode", description: "Generate US retail barcodes", href: "/tools/qr-barcode/upca-barcode-generator" },
      { name: "Barcode Reader", description: "Scan barcodes", href: "/tools/qr-barcode/barcode-reader" },
      { name: "QR Code Generator", description: "Generate QR codes", href: "/tools/qr-barcode/qr-code-generator" },
      { name: "Bulk QR Generator", description: "Generate multiple QR codes", href: "/tools/qr-barcode/bulk-qr-generator" }
    ]
  },

  "barcode-reader": {
    features: [
      { icon: "Camera", title: "Multi-Format Scanning", description: "Scans Code 128, Code 39, EAN-13, UPC-A, ITF and more barcode formats." },
      { icon: "Upload", title: "Camera + Image Upload", description: "Use device camera for live scanning or upload barcode images." },
      { icon: "Shield", title: "100% Private", description: "All scanning happens in your browser. No images uploaded anywhere." },
      { icon: "Zap", title: "Instant Detection", description: "Automatic format detection and decoding once barcode is in view." },
      { icon: "Type", title: "Shows Format", description: "Displays detected barcode type (Code 128, EAN-13, etc.) with result." },
      { icon: "Copy", title: "One-Click Copy", description: "Copy decoded content to clipboard for use in your applications." }
    ],
    howToSteps: [
      { title: "Choose Input Method", description: "Click Camera for live scanning or Upload Image for photos." },
      { title: "Point or Select", description: "Aim camera at barcode or select image with barcode." },
      { title: "Wait for Detection", description: "Barcode detected automatically - format and content shown." },
      { title: "Copy Result", description: "Copy decoded number for use in inventory or lookup systems." }
    ],
    faqs: [
      { question: "Which browsers support this?", answer: "Chrome, Edge and Opera (best support via BarcodeDetector API). Safari on iOS 16.4 or later has support. Firefox has limited support - use image upload as fallback." },
      { question: "What formats can it read?", answer: "Code 128, Code 39, EAN-13, EAN-8, UPC-A, UPC-E, Codabar, ITF (Interleaved 2 of 5). Also QR codes and Data Matrix in most browsers." },
      { question: "Is camera access safe?", answer: "Yes! Camera requires explicit permission. Video stays in your browser - never sent anywhere. Stop button ends camera access immediately." },
      { question: "Why scan slow sometimes?", answer: "Depends on: lighting (bright is better), barcode size (bigger scans faster), camera focus, barcode quality, phone speed. Try image upload if camera struggles." },
      { question: "Can I scan damaged barcodes?", answer: "Somewhat - depends on damage severity. Try different angles, better lighting, or use image upload with high-quality photo. Some formats have error correction." },
      { question: "How does it detect format?", answer: "BarcodeDetector API analyzes the pattern structure to identify format. Each barcode has unique bar patterns and start and stop characters that identify its type." }
    ],
    relatedTools: [
      { name: "QR Code Reader", description: "Scan QR codes", href: "/tools/qr-barcode/qr-code-reader" },
      { name: "Code 128 Barcode", description: "Generate Code 128 barcodes", href: "/tools/qr-barcode/code128-barcode-generator" },
      { name: "EAN-13 Barcode", description: "Generate retail barcodes", href: "/tools/qr-barcode/ean13-barcode-generator" },
      { name: "UPC-A Barcode", description: "Generate US retail barcodes", href: "/tools/qr-barcode/upca-barcode-generator" },
      { name: "Code 39 Barcode", description: "Generate Code 39 barcodes", href: "/tools/qr-barcode/code39-barcode-generator" },
      { name: "QR Code Generator", description: "Generate QR codes", href: "/tools/qr-barcode/qr-code-generator" }
    ]
  }

}

export function getQrBarcodeSEO(slug: string): QrBarcodeSEOContent | null {
  return qrBarcodeSEOContent[slug] || null
}