import {
  CreditCard,
  Headset,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  FaCcMastercard,
  FaCcVisa,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import NewsletterForm from "./newsletter-form";

export default async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="relative w-full bg-card/95 text-card-foreground border-t border-border/80 pt-10 pb-8 transition-colors duration-300 mt-12 overflow-hidden shadow-2xl">
      {/* Decorative Subtle Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 mb-10 border-b border-border/60">
          {/* Delivery Feature */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 hover:bg-muted/80 border border-border/40 transition-all duration-300 group shadow-xs hover:shadow-md">
            <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform shadow-xs">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-title text-sm md:text-md tracking-tight">
                {t("features.deliveryTitle")}
              </h4>
              <p className="text-caption text-xs mt-0.5">
                {t("features.deliveryDesc")}
              </p>
            </div>
          </div>

          {/* Original Product Feature */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 hover:bg-muted/80 border border-border/40 transition-all duration-300 group shadow-xs hover:shadow-md">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 group-hover:scale-110 transition-transform shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-title text-sm md:text-md tracking-tight">
                {t("features.originalTitle")}
              </h4>
              <p className="text-caption text-xs mt-0.5">
                {t("features.originalDesc")}
              </p>
            </div>
          </div>

          {/* Support Feature */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 hover:bg-muted/80 border border-border/40 transition-all duration-300 group shadow-xs hover:shadow-md">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 group-hover:scale-110 transition-transform shadow-xs">
              <Headset className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-title text-sm md:text-md tracking-tight">
                {t("features.supportTitle")}
              </h4>
              <p className="text-caption text-xs mt-0.5">
                {t("features.supportDesc")}
              </p>
            </div>
          </div>

          {/* Payment Feature */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 hover:bg-muted/80 border border-border/40 transition-all duration-300 group shadow-xs hover:shadow-md">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 group-hover:scale-110 transition-transform shadow-xs">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-title text-sm md:text-md tracking-tight">
                {t("features.paymentTitle")}
              </h4>
              <p className="text-caption text-xs mt-0.5">
                {t("features.paymentDesc")}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border/60">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block group">
              <span className="text-2xl font-black tracking-tight text-title">
                Daily<span className="text-primary">Shop</span>
              </span>
              <span className="h-0.5 w-full bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 mt-0.5 block" />
            </Link>
            <p className="text-description text-sm md:text-md leading-relaxed max-w-md">
              {t("description")}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 pt-1 text-sm md:text-md text-description">
              <div className="flex items-center gap-3.5 group/item">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="group-hover/item:text-title transition-colors">
                  {t("address")}
                </span>
              </div>
              <div className="flex items-center gap-3.5 group/item">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <span
                  dir="ltr"
                  className="group-hover/item:text-title transition-colors"
                >
                  {t("phone")}
                </span>
              </div>
              <div className="flex items-center gap-3.5 group/item">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="group-hover/item:text-title transition-colors">
                  {t("email")}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-title tracking-wide uppercase text-xs opacity-90">
              {t("linksSection.quickLinks")}
            </h3>
            <ul className="space-y-2.5 text-sm md:text-md">
              <li>
                <Link
                  href="/about"
                  className="text-description hover:text-primary transition-colors inline-block group"
                >
                  <span>{t("linksSection.aboutUs")}</span>
                  <span className="h-0.5 w-full bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 mt-0.5 block" />
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-description hover:text-primary transition-colors inline-block group"
                >
                  <span>{t("linksSection.allProducts")}</span>
                  <span className="h-0.5 w-full bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 mt-0.5 block" />
                </Link>
              </li>
              <li>
                <Link
                  href="/offers"
                  className="text-description hover:text-primary transition-colors inline-block group"
                >
                  <span>{t("linksSection.offers")}</span>
                  <span className="h-0.5 w-full bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 mt-0.5 block" />
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-description hover:text-primary transition-colors inline-block group"
                >
                  <span>{t("linksSection.blogs")}</span>
                  <span className="h-0.5 w-full bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 mt-0.5 block" />
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-description hover:text-primary transition-colors inline-block group"
                >
                  <span>{t("linksSection.contact")}</span>
                  <span className="h-0.5 w-full bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 mt-0.5 block" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-4">
            <h3 className="font-bold text-title text-base tracking-wide uppercase opacity-90">
              {t("careSection.customerCare")}
            </h3>
            <ul className="space-y-2.5 text-sm md:text-md">
              <li>
                <Link
                  href="/faq"
                  className="text-description hover:text-primary transition-colors inline-block group"
                >
                  <span>{t("careSection.faq")}</span>
                  <span className="h-0.5 w-full bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 mt-0.5 block" />
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-description hover:text-primary transition-colors inline-block group"
                >
                  <span>{t("careSection.privacyPolicy")}</span>
                  <span className="h-0.5 w-full bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 mt-0.5 block" />
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-description hover:text-primary transition-colors inline-block group"
                >
                  <span>{t("careSection.terms")}</span>
                  <span className="h-0.5 w-full bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 mt-0.5 block" />
                </Link>
              </li>
              <li>
                <Link
                  href="/return-policy"
                  className="text-description hover:text-primary transition-colors inline-block group"
                >
                  <span>{t("careSection.returnPolicy")}</span>
                  <span className="h-0.5 w-full bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 mt-0.5 block" />
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="text-description hover:text-primary transition-colors inline-block group"
                >
                  <span>{t("careSection.trackOrder")}</span>
                  <span className="h-0.5 w-full bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 mt-0.5 block" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Social */}
          <div className="space-y-4">
            <h3 className="font-bold text-title tracking-wide uppercase text-xs opacity-90">
              {t("newsletter.title")}
            </h3>
            <p className="text-description text-xs leading-relaxed">
              {t("newsletter.desc")}
            </p>

            <NewsletterForm placeholder={t("newsletter.placeholder")} />

            {/* Social Icons */}
            <div className="pt-2">
              <span className="block text-xs font-semibold text-subtitle mb-2.5">
                {t("socialTitle")}
              </span>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-xl bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-xs"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-xl bg-[#E4405F]/10 text-[#E4405F] hover:bg-[#E4405F] hover:text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-xs"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-xl bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000] hover:text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-xs"
                >
                  <FaYoutube className="w-4 h-4" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-xs"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Official Payment Gateways */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-caption text-xs">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-title">Daily Shop</span>.{" "}
            {t("rights")}
          </p>

          {/* Payment Gateway Badges */}
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            <span className="text-xs text-caption">{t("paymentPartner")}</span>

            <div
              className="px-3 py-1.5 bg-background border border-border/80 rounded-lg flex items-center gap-1 shadow-xs hover:border-primary transition-colors"
              title="bKash"
            >
              <span className="text-xs font-black text-[#E2136E]">bKash</span>
            </div>

            <div
              className="px-3 py-1.5 bg-background border border-border/80 rounded-lg flex items-center gap-1 shadow-xs hover:border-primary transition-colors"
              title="Nagad"
            >
              <span className="text-xs font-black text-[#F6921E]">নগদ</span>
            </div>

            <div
              className="px-2.5 py-1.5 bg-background border border-border/80 rounded-lg flex items-center justify-center shadow-xs hover:border-primary transition-colors"
              title="SSLCommerz"
            >
              <span className="text-[11px] font-extrabold text-[#003366]">
                SSLCOMMERZ
              </span>
            </div>

            <div
              className="px-2.5 py-1.5 bg-background border border-border/80 rounded-lg flex items-center justify-center shadow-xs hover:border-primary transition-colors"
              title="Visa"
            >
              <FaCcVisa className="w-6 h-5 text-[#1434CB]" />
            </div>

            <div
              className="px-2.5 py-1.5 bg-background border border-border/80 rounded-lg flex items-center justify-center shadow-xs hover:border-primary transition-colors"
              title="Mastercard"
            >
              <FaCcMastercard className="w-6 h-5 text-[#EB001B]" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
