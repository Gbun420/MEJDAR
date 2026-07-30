export const brand = {
  name: "MEJDAR",
  tagline: "Your restaurant. Your customers. Your ordering channel.",
  description:
    "MEJDAR gives restaurants their own branded ordering, reservation and analytics system with local support and predictable monthly pricing.",
  primaryCta: "Book a demo",
  secondaryCta: "Preview the platform",
  demoUrl: "/demo",
  contactEmail: "hello@mejdar.com",
  contactPhone: "+356 2123 4567",
  address: {
    street: "123 Harbour Street",
    city: "Valletta",
    country: "Malta",
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },
} as const;

export const pricing = {
  currency: "EUR",
  currencySymbol: "\u20AC",
  disclaimer:
    "Prices are indicative and exclude VAT. Payment provider and optional third-party fees are separate. A Maltese accountant must validate tax and invoice requirements.",
  plans: [
    {
      id: "starter",
      name: "Starter",
      tagline: "Everything you need to start taking orders",
      setupPrice: { min: 650, max: 850 },
      monthlyPrice: { min: 69, max: 149 },
      features: [
        "Direct online ordering",
        "Collection orders",
        "Full menu setup",
        "Cash and online payment configuration",
        "Branded website",
        "Basic reporting",
      ],
    },
    {
      id: "growth",
      name: "Growth",
      tagline: "For restaurants ready to scale",
      setupPrice: { min: 1000, max: 1500 },
      monthlyPrice: { min: 69, max: 149 },
      features: [
        "Everything in Starter",
        "Delivery zones",
        "Reservations",
        "Coupons",
        "Bilingual content",
        "Enhanced reporting",
        "Priority support",
      ],
    },
  ],
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Ordering", href: "/ordering" },
  { label: "Reservations", href: "/reservations" },
  { label: "Analytics", href: "/analytics" },
  { label: "Pricing", href: "/pricing" },
  { label: "Demo", href: "/demo" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const legal = {
  companyName: "MEJDAR Ltd",
  companyRegNo: "C-1234567",
  registeredAddress: "123 Harbour Street, Valletta, VLT 1234, Malta",
  dpo: "dpo@mejdar.com",
  jurisdiction: "Malta",
  lastUpdated: "2026-07-30",
} as const;
