import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with MEJDAR. Book a demo or ask us about restaurant ordering and reservation systems.",
};

export default function ContactPage() {
  return <ContactForm />;
}
