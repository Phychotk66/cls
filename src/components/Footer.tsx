"use client";
import { useApp } from "@/contexts/AppContext";
import Logo from "./Logo";

export default function Footer() {
  const { t, navigate } = useApp();
  return (
    <footer className="mt-0 bg-[#0f0e0c] text-[#faf6ee]">
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Logo variant="light" size="md" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#faf6ee]/60">
              {t("footer.about")}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <SocialLink href="#" label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
                </svg>
              </SocialLink>
              <SocialLink href="#" label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 22v-8h3l1-4h-4V7.5c0-1 .3-1.5 1.7-1.5H17V2.2C16.5 2.1 15.4 2 14.3 2 11.7 2 10 3.5 10 6.7V10H7v4h3v8h3z" />
                </svg>
              </SocialLink>
              <SocialLink href="#" label="Tripadvisor">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="7" cy="13" r="3" />
                  <circle cx="17" cy="13" r="3" />
                  <path d="M12 8c2-2 5-2 7 0M12 8c-2-2-5-2-7 0" stroke="currentColor" strokeWidth="1.6" fill="none" />
                </svg>
              </SocialLink>
            </div>
          </div>

          <Column title="Visit">
            <FootLink onClick={() => navigate("/the-places")}>The Places</FootLink>
            <FootLink onClick={() => navigate("/water-mine")}>La Mina</FootLink>
            <FootLink onClick={() => navigate("/gardens")}>Gardens</FootLink>
            <FootLink onClick={() => navigate("/history")}>{t("nav.history")}</FootLink>
            <FootLink onClick={() => navigate("/gallery")}>{t("nav.gallery")}</FootLink>
            <FootLink onClick={() => navigate("/audio-guide")}>{t("nav.audio")}</FootLink>
          </Column>

          <Column title={t("footer.help")}>
            <FootLink onClick={() => navigate("/tickets")}>{t("nav.tickets")}</FootLink>
            <FootLink onClick={() => navigate("/contact")}>{t("nav.contact")}</FootLink>
            <FootLink onClick={() => navigate("/contact")}>{t("footer.faq")}</FootLink>
            <FootLink onClick={() => navigate("/login")}>{t("nav.login")}</FootLink>
          </Column>

          <Column title={t("footer.legal")}>
            <FootLink onClick={() => {}}>{t("footer.privacy")}</FootLink>
            <FootLink onClick={() => {}}>{t("footer.terms")}</FootLink>
            <FootLink onClick={() => {}}>{t("footer.cookies")}</FootLink>
          </Column>
        </div>

        {/* Visit info bar */}
        <div className="mt-12 grid gap-6 rounded-xl border border-[#faf6ee]/10 bg-[#faf6ee]/[0.03] p-5 sm:p-6 md:grid-cols-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9a84c]">Address</p>
            <p className="mt-1 text-sm text-[#faf6ee]/70">Calle Cuesta de Santo Domingo, 9<br />29400 Ronda, Málaga</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9a84c]">Opening Hours</p>
            <p className="mt-1 text-sm text-[#faf6ee]/70">Daily 10:00 – 19:00<br />Last entry 18:00</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9a84c]">Contact</p>
            <p className="mt-1 text-sm text-[#faf6ee]/70">info@casadelreymoro.com<br />+34 952 187 200</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-[#faf6ee]/10 pt-6 text-xs text-[#faf6ee]/40 md:flex-row">
          <div>© {new Date().getFullYear()} Casa del Rey Moro · {t("footer.rights")}</div>
          <div className="flex items-center gap-3">
            <span>Bien de Interés Cultural</span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rotate-45 bg-[#1d3a8a] inline-block" />
              <span className="h-2 w-2 rotate-45 bg-[#8e1d2c] inline-block" />
              <span className="h-2 w-2 rotate-45 bg-[#1f6f4a] inline-block" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9a84c]">
        {title}
      </h4>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FootLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="text-[#faf6ee]/60 transition hover:text-[#c9a84c]"
      >
        {children}
      </button>
    </li>
  );
}

function SocialLink({ children, href, label }: { children: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-[#faf6ee]/15 text-[#faf6ee]/60 transition hover:border-[#c9a84c] hover:text-[#c9a84c]"
    >
      {children}
    </a>
  );
}
