"use client";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* ─── Types ─────────────────────────────────────────────────── */
export type Lang = "en" | "es" | "de";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  verified: boolean;
  passwordHash: string;
  language: Lang;
  createdAt: string;
};

export type TicketType = "standard" | "child" | "family" | "guided";

export type CartLine = {
  type: TicketType;
  qty: number;
};

export type Booking = {
  id: string;
  code: string;
  userId: string;
  email: string;
  guestName: string;
  date: string;
  time: string;
  lines: CartLine[];
  total: number;
  status: "confirmed" | "used" | "cancelled";
  createdAt: string;
};

export const TICKET_PRICES: Record<TicketType, number> = {
  standard: 10,
  child: 3,
  family: 22,
  guided: 18,
};

/* ─── Translations ───────────────────────────────────────────── */
const translations: Record<Lang, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.history": "History",
    "nav.gallery": "Gallery",
    "nav.tickets": "Book Tickets",
    "nav.audio": "Audio Guide",
    "nav.contact": "Contact",
    "nav.login": "Sign In",
    "nav.profile": "My Account",
    "nav.logout": "Sign Out",
    "hero.eyebrow": "Bien de Interés Cultural · Ronda, Andalusia",
    "hero.title": "Casa del Rey Moro",
    "hero.sub":
      "Eight centuries of Moorish heritage, one of Europe's earliest hanging gardens, and a secret water mine carved into the living rock — all above the El Tajo gorge.",
    "hero.cta": "Book Your Visit",
    "hero.cta2": "Discover the Heritage",
    "intro.title": "A Monument of Three Souls",
    "intro.p1":
      "A Nazarí water mine descending 100 metres through solid rock to the Guadalevín river, used to supply the Moorish city during sieges.",
    "intro.p2":
      "A neo-Mudéjar palace restored in the early 20th century, blending Islamic geometry with European refinement.",
    "intro.p3":
      "Terraced gardens by Jean-Claude Nicolas Forestier — a contemporary of the Alhambra gardens — cascading down the gorge face.",
    "highlights.title": "Three Heritage Experiences",
    "highlights.house": "The Palace",
    "highlights.houseDesc":
      "Explore the neo-Mudéjar architecture of this 18th-century palace, with its ornate tilework, carved plasterwork, and tranquil inner courtyards.",
    "highlights.mine": "La Mina",
    "highlights.mineDesc":
      "Descend 231 steps through the Nazarí water mine — a feat of medieval engineering — to the banks of the Guadalevín river.",
    "highlights.gardens": "The Gardens",
    "highlights.gardensDesc":
      "Stroll through Forestier's hanging gardens, a masterpiece of landscape design cascading over the edge of the El Tajo gorge.",
    "highlights.more": "Explore",
    "audio.title": "Audio Guide",
    "audio.subtitle":
      "An immersive audio journey through six stations, guiding you from the palace entrance to the river bed.",
    "audio.step1": "Select your preferred language",
    "audio.step2": "Walk up to any station beacon",
    "audio.step3": "The guide starts automatically",
    "tickets.title": "Book Your Visit",
    "tickets.subtitle":
      "Choose your tickets, date and time. All visits must be pre-booked online.",
    "tickets.standard": "General Admission",
    "tickets.standardDesc":
      "Full access to the palace, water mine and Forestier gardens. Includes self-guided map.",
    "tickets.child": "Child Ticket",
    "tickets.childDesc": "For children aged 4–12. Under 4 free.",
    "tickets.family": "Family Bundle",
    "tickets.familyDesc":
      "2 adults + up to 3 children. Best value for families.",
    "tickets.guided": "Guided Tour",
    "tickets.guidedDesc":
      "Expert English/Spanish/German guide included. Small groups of max 12.",
    "tickets.from": "from",
    "tickets.select": "Qty",
    "booking.title": "Your Booking",
    "booking.date": "Visit Date",
    "booking.time": "Entry Time",
    "booking.summary": "Summary",
    "booking.empty": "No tickets selected yet",
    "booking.total": "Total",
    "booking.checkout": "Proceed to Payment",
    "checkout.title": "Complete Your Booking",
    "checkout.subtitle": "Secure payment · Instant confirmation",
    "checkout.email": "Email Address",
    "checkout.name": "Full Name",
    "checkout.card": "Card Number",
    "checkout.expiry": "Expiry",
    "checkout.cvc": "CVC",
    "checkout.pay": "Pay",
    "checkout.processing": "Processing…",
    "checkout.success": "Booking Confirmed!",
    "checkout.qr": "Present this QR code at the entrance",
    "profile.code": "Booking Reference",
    "profile.tabBookings": "My Bookings",
    "profile.tabSettings": "Settings",
    "common.back": "Back",
    "footer.about":
      "A Bien de Interés Cultural above El Tajo gorge — preserving 800 years of Moorish, palace and garden heritage in the heart of Ronda.",
    "footer.explore": "Explore",
    "footer.help": "Plan Your Visit",
    "footer.legal": "Legal",
    "footer.faq": "FAQ",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms & Conditions",
    "footer.cookies": "Cookie Policy",
    "footer.rights": "All rights reserved",
    "contact.title": "Get In Touch",
    "contact.subtitle":
      "We'd love to hear from you. Our team will respond within 24 hours.",
    "contact.name": "Your Name",
    "contact.email": "Email Address",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.success": "Message sent! We'll reply shortly.",
    "auth.signin": "Sign In",
    "auth.signup": "Create Account",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.firstName": "First Name",
    "auth.lastName": "Last Name",
    "auth.verify": "Verify Email",
    "auth.verifyCode": "Enter the 6-digit code sent to your email",
    "auth.noAccount": "Don't have an account?",
    "auth.hasAccount": "Already have an account?",
    "history.title": "Our Heritage",
    "history.subtitle":
      "Eight centuries of Moorish, Arabic and Andalusian history preserved above the gorge.",
    "gallery.title": "Visual Journey",
  },
  es: {
    "nav.home": "Inicio",
    "nav.history": "Historia",
    "nav.gallery": "Galería",
    "nav.tickets": "Reservar Entradas",
    "nav.audio": "Audioguía",
    "nav.contact": "Contacto",
    "nav.login": "Iniciar Sesión",
    "nav.profile": "Mi Cuenta",
    "nav.logout": "Cerrar Sesión",
    "hero.eyebrow": "Bien de Interés Cultural · Ronda, Andalucía",
    "hero.title": "Casa del Rey Moro",
    "hero.sub":
      "Ocho siglos de patrimonio árabe, uno de los primeros jardines colgantes de Europa y una mina de agua secreta tallada en la roca viva — todo sobre el Tajo.",
    "hero.cta": "Reservar Visita",
    "hero.cta2": "Descubrir el Patrimonio",
    "intro.title": "Un Monumento de Tres Almas",
    "intro.p1":
      "Una mina de agua nazarí que desciende 100 metros a través de la roca viva hasta el río Guadalevín.",
    "intro.p2":
      "Un palacio neo-mudéjar restaurado a principios del siglo XX que fusiona geometría islámica con refinamiento europeo.",
    "intro.p3":
      "Jardines en terrazas de Jean-Claude Nicolas Forestier que caen por la cara del Tajo.",
    "highlights.title": "Tres Experiencias Patrimoniales",
    "highlights.house": "El Palacio",
    "highlights.houseDesc":
      "Explora la arquitectura neo-mudéjar de este palacio del siglo XVIII.",
    "highlights.mine": "La Mina",
    "highlights.mineDesc":
      "Desciende 231 peldaños a través de la mina de agua nazarí hasta el río Guadalevín.",
    "highlights.gardens": "Los Jardines",
    "highlights.gardensDesc":
      "Pasea por los jardines colgantes de Forestier, obra maestra del paisajismo.",
    "highlights.more": "Explorar",
    "audio.title": "Audioguía",
    "audio.subtitle":
      "Un viaje de audio inmersivo a través de seis estaciones.",
    "audio.step1": "Selecciona tu idioma",
    "audio.step2": "Acércate a cualquier baliza",
    "audio.step3": "La guía comienza automáticamente",
    "tickets.title": "Reservar Entrada",
    "tickets.subtitle":
      "Elige tus entradas, fecha y hora. Todas las visitas deben reservarse online.",
    "tickets.standard": "Entrada General",
    "tickets.standardDesc":
      "Acceso completo al palacio, mina de agua y jardines Forestier.",
    "tickets.child": "Entrada Infantil",
    "tickets.childDesc": "Para niños de 4 a 12 años. Menores de 4 gratis.",
    "tickets.family": "Bono Familiar",
    "tickets.familyDesc": "2 adultos + hasta 3 niños.",
    "tickets.guided": "Visita Guiada",
    "tickets.guidedDesc": "Guía experto incluido. Grupos de máx. 12 personas.",
    "tickets.from": "desde",
    "tickets.select": "Cant.",
    "booking.title": "Tu Reserva",
    "booking.date": "Fecha de Visita",
    "booking.time": "Hora de Entrada",
    "booking.summary": "Resumen",
    "booking.empty": "Ninguna entrada seleccionada",
    "booking.total": "Total",
    "booking.checkout": "Proceder al Pago",
    "checkout.title": "Completar Reserva",
    "checkout.subtitle": "Pago seguro · Confirmación inmediata",
    "checkout.email": "Correo Electrónico",
    "checkout.name": "Nombre Completo",
    "checkout.card": "Número de Tarjeta",
    "checkout.expiry": "Caducidad",
    "checkout.cvc": "CVC",
    "checkout.pay": "Pagar",
    "checkout.processing": "Procesando…",
    "checkout.success": "¡Reserva Confirmada!",
    "checkout.qr": "Presenta este código QR en la entrada",
    "profile.code": "Referencia de Reserva",
    "profile.tabBookings": "Mis Reservas",
    "profile.tabSettings": "Configuración",
    "common.back": "Volver",
    "footer.about":
      "Bien de Interés Cultural sobre el Tajo — conservando 800 años de patrimonio en el corazón de Ronda.",
    "footer.explore": "Explorar",
    "footer.help": "Planifica tu Visita",
    "footer.legal": "Legal",
    "footer.faq": "Preguntas Frecuentes",
    "footer.privacy": "Política de Privacidad",
    "footer.terms": "Términos y Condiciones",
    "footer.cookies": "Política de Cookies",
    "footer.rights": "Todos los derechos reservados",
    "contact.title": "Contáctanos",
    "contact.subtitle":
      "Nos encantaría saber de ti. Nuestro equipo responderá en 24 horas.",
    "contact.name": "Tu Nombre",
    "contact.email": "Correo Electrónico",
    "contact.subject": "Asunto",
    "contact.message": "Mensaje",
    "contact.send": "Enviar Mensaje",
    "contact.success": "¡Mensaje enviado! Te responderemos pronto.",
    "auth.signin": "Iniciar Sesión",
    "auth.signup": "Crear Cuenta",
    "auth.email": "Correo",
    "auth.password": "Contraseña",
    "auth.firstName": "Nombre",
    "auth.lastName": "Apellido",
    "auth.verify": "Verificar Email",
    "auth.verifyCode": "Introduce el código de 6 dígitos enviado a tu email",
    "auth.noAccount": "¿No tienes cuenta?",
    "auth.hasAccount": "¿Ya tienes cuenta?",
    "history.title": "Nuestro Patrimonio",
    "history.subtitle":
      "Ocho siglos de historia árabe y andaluza conservada sobre el Tajo.",
    "gallery.title": "Viaje Visual",
  },
  de: {
    "nav.home": "Startseite",
    "nav.history": "Geschichte",
    "nav.gallery": "Galerie",
    "nav.tickets": "Tickets",
    "nav.audio": "Audioguide",
    "nav.contact": "Kontakt",
    "nav.login": "Anmelden",
    "nav.profile": "Mein Konto",
    "nav.logout": "Abmelden",
    "hero.eyebrow": "Kulturdenkmal · Ronda, Andalusien",
    "hero.title": "Casa del Rey Moro",
    "hero.sub":
      "Acht Jahrhunderte maurisches Erbe, einer der ältesten Hängegärten Europas und eine geheime Wassermine — über der El Tajo-Schlucht.",
    "hero.cta": "Besuch Buchen",
    "hero.cta2": "Erbe Entdecken",
    "intro.title": "Ein Denkmal mit drei Seelen",
    "intro.p1":
      "Eine nasridische Wassermine, die 100 Meter durch massives Gestein bis zum Guadalevín hinabführt.",
    "intro.p2":
      "Ein neo-maurischer Palast aus dem frühen 20. Jahrhundert, der islamische Geometrie mit europäischer Raffinesse verbindet.",
    "intro.p3":
      "Terrassengärten von Jean-Claude Nicolas Forestier — ein Meisterwerk der Landschaftsgestaltung.",
    "highlights.title": "Drei Erfahrungen",
    "highlights.house": "Der Palast",
    "highlights.houseDesc":
      "Entdecken Sie die neo-maurische Architektur dieses Palastes aus dem 18. Jahrhundert.",
    "highlights.mine": "Die Mine",
    "highlights.mineDesc":
      "Steigen Sie 231 Stufen durch die nasridische Wassermine hinab.",
    "highlights.gardens": "Die Gärten",
    "highlights.gardensDesc":
      "Schlendern Sie durch Forestiers Hängegärten.",
    "highlights.more": "Entdecken",
    "audio.title": "Audioguide",
    "audio.subtitle":
      "Eine immersive Audioreise durch sechs Stationen.",
    "audio.step1": "Wählen Sie Ihre Sprache",
    "audio.step2": "Gehen Sie zu einer Station",
    "audio.step3": "Der Guide startet automatisch",
    "tickets.title": "Tickets Buchen",
    "tickets.subtitle":
      "Wählen Sie Tickets, Datum und Uhrzeit. Alle Besuche müssen online vorgebucht werden.",
    "tickets.standard": "Regulärer Eintritt",
    "tickets.standardDesc":
      "Vollständiger Zugang zu Palast, Wassermine und Forestier-Gärten.",
    "tickets.child": "Kinderticket",
    "tickets.childDesc": "Für Kinder von 4 bis 12 Jahren. Unter 4 kostenlos.",
    "tickets.family": "Familienpaket",
    "tickets.familyDesc": "2 Erwachsene + bis zu 3 Kinder.",
    "tickets.guided": "Führung",
    "tickets.guidedDesc": "Expertführer inklusive. Gruppen von max. 12 Personen.",
    "tickets.from": "ab",
    "tickets.select": "Anz.",
    "booking.title": "Ihre Buchung",
    "booking.date": "Besuchsdatum",
    "booking.time": "Einlasszeit",
    "booking.summary": "Zusammenfassung",
    "booking.empty": "Noch keine Tickets ausgewählt",
    "booking.total": "Gesamt",
    "booking.checkout": "Zur Zahlung",
    "checkout.title": "Buchung abschließen",
    "checkout.subtitle": "Sichere Zahlung · Sofortige Bestätigung",
    "checkout.email": "E-Mail-Adresse",
    "checkout.name": "Vollständiger Name",
    "checkout.card": "Kartennummer",
    "checkout.expiry": "Ablauf",
    "checkout.cvc": "CVC",
    "checkout.pay": "Bezahlen",
    "checkout.processing": "Verarbeitung…",
    "checkout.success": "Buchung bestätigt!",
    "checkout.qr": "Zeigen Sie diesen QR-Code am Eingang",
    "profile.code": "Buchungsreferenz",
    "profile.tabBookings": "Meine Buchungen",
    "profile.tabSettings": "Einstellungen",
    "common.back": "Zurück",
    "footer.about":
      "Ein Kulturdenkmal über der Tajo-Schlucht — 800 Jahre Erbe im Herzen von Ronda.",
    "footer.explore": "Entdecken",
    "footer.help": "Besuch Planen",
    "footer.legal": "Rechtliches",
    "footer.faq": "FAQ",
    "footer.privacy": "Datenschutz",
    "footer.terms": "AGB",
    "footer.cookies": "Cookie-Richtlinie",
    "footer.rights": "Alle Rechte vorbehalten",
    "contact.title": "Kontakt",
    "contact.subtitle":
      "Wir freuen uns auf Ihre Nachricht. Unser Team antwortet innerhalb von 24 Stunden.",
    "contact.name": "Ihr Name",
    "contact.email": "E-Mail-Adresse",
    "contact.subject": "Betreff",
    "contact.message": "Nachricht",
    "contact.send": "Nachricht Senden",
    "contact.success": "Nachricht gesendet! Wir antworten bald.",
    "auth.signin": "Anmelden",
    "auth.signup": "Konto Erstellen",
    "auth.email": "E-Mail",
    "auth.password": "Passwort",
    "auth.firstName": "Vorname",
    "auth.lastName": "Nachname",
    "auth.verify": "E-Mail Verifizieren",
    "auth.verifyCode": "Geben Sie den 6-stelligen Code ein, der an Ihre E-Mail gesendet wurde",
    "auth.noAccount": "Noch kein Konto?",
    "auth.hasAccount": "Bereits ein Konto?",
    "history.title": "Unser Erbe",
    "history.subtitle":
      "Acht Jahrhunderte maurische, arabische und andalusische Geschichte über der Schlucht.",
    "gallery.title": "Visuelle Reise",
  },
};

/* ─── Storage helpers ────────────────────────────────────────── */
const KEY_USERS = "crm_db_users";
const KEY_SESSION = "crm_db_session";
const KEY_BOOKINGS = "crm_db_bookings";
const KEY_LANG = "crm_lang";
const KEY_PENDING_VERIFY = "crm_pending_verify";
const KEY_PENDING_RESET = "crm_pending_reset";
const KEY_THEME = "crm_theme";

function load<T>(key: string, fallback: T): T {
  try {
    if (typeof window === "undefined") return fallback;
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function save<T>(key: string, value: T) {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* noop */
  }
}

function fauxHash(pw: string) {
  let h = 0;
  for (let i = 0; i < pw.length; i++) h = (h << 5) - h + pw.charCodeAt(i);
  return "h$" + Math.abs(h).toString(36);
}
function uid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      Number(c) ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
    ).toString(16)
  );
}
function generateCode() {
  return Array.from({ length: 8 }, () =>
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]
  ).join("");
}

/* ─── Context type ───────────────────────────────────────────── */
export type Theme = "light" | "dark";

type AppCtx = {
  // theme
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;

  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string>) => string;
  user: User | null;
  signup: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => { ok: true; verifyCode: string } | { ok: false; error: string };
  verifyEmail: (
    email: string,
    codeInput: string
  ) => { ok: boolean; error?: string };
  resendCode: (email: string) => string;
  activateAccount: (email: string) => { ok: boolean; verifyCode?: string; error?: string };
  login: (
    email: string,
    password: string
  ) => { ok: boolean; error?: string; needsVerify?: boolean };
  logout: () => void;
  requestPasswordReset: (
    email: string
  ) => { ok: boolean; resetCode?: string; error?: string };
  resetPassword: (
    email: string,
    code: string,
    newPassword: string
  ) => { ok: boolean; error?: string };
  changePassword: (
    current: string,
    next: string
  ) => { ok: boolean; error?: string };
  updateProfile: (
    patch: Partial<Pick<User, "firstName" | "lastName" | "language">>
  ) => void;
  cart: CartLine[];
  setCart: (c: CartLine[]) => void;
  addToCart: (type: TicketType, qty?: number) => void;
  setQty: (type: TicketType, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  bookingDate: string;
  setBookingDate: (s: string) => void;
  bookingTime: string;
  setBookingTime: (s: string) => void;
  bookings: Booking[];
  confirmBooking: (email: string, name: string) => Booking;
  route: string;
  navigate: (to: string) => void;
};

const Ctx = createContext<AppCtx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [lang, setLangState] = useState<Lang>(() => load<Lang>(KEY_LANG, "en"));
  const [users, setUsers] = useState<User[]>(() => load<User[]>(KEY_USERS, []));
  const [sessionId, setSessionId] = useState<string | null>(() =>
    load<string | null>(KEY_SESSION, null)
  );
  const [bookingsAll, setBookingsAll] = useState<Booking[]>(() =>
    load<Booking[]>(KEY_BOOKINGS, [])
  );
  const [cart, setCart] = useState<CartLine[]>([]);
  const [bookingDate, setBookingDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });
  const [bookingTime, setBookingTime] = useState<string>("11:00");
  const [route, setRoute] = useState<string>("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRoute(window.location.hash.replace("#", "") || "/");
    }
  }, []);

  useEffect(() => save(KEY_LANG, lang), [lang]);
  useEffect(() => save(KEY_USERS, users), [users]);
  useEffect(() => save(KEY_SESSION, sessionId), [sessionId]);
  useEffect(() => save(KEY_BOOKINGS, bookingsAll), [bookingsAll]);

  /* ─── Theme bootstrap & sync ─── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = load<Theme | null>(KEY_THEME, null);
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initial: Theme = stored ?? (prefersDark ? "dark" : "light");
    setThemeState(initial);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    save(KEY_THEME, theme);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () =>
    setThemeState((p) => (p === "dark" ? "light" : "dark"));

  useEffect(() => {
    const onHash = () =>
      setRoute(window.location.hash.replace("#", "") || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Sync with DB on mount
  useEffect(() => {
    const sync = async () => {
      try {
        const [uRes, bRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/bookings"),
        ]);
        const { users: dbUsers } = await uRes.json();
        const { bookings: dbBookings } = await bRes.json();

        if (dbUsers) {
          setUsers((prev) => {
            const merged = [...prev];
            dbUsers.forEach((du: any) => {
              if (!merged.find((u) => u.id === du.id || u.email === du.email)) {
                merged.push(du);
              }
            });
            return merged;
          });
        }

        if (dbBookings) {
          setBookingsAll((prev) => {
            const merged = [...prev];
            dbBookings.forEach((db: any) => {
              if (!merged.find((b) => b.id === db.id || b.code === db.code)) {
                // Map DB booking to App Booking (DB might have different field names or total as string)
                merged.push({
                  ...db,
                  total: Number(db.total),
                });
              }
            });
            return merged;
          });
        }
      } catch (e) {
        console.error("Sync error:", e);
      }
    };
    sync();
  }, [setUsers, setBookingsAll]);

  const navigate = (to: string) => {
    window.location.hash = to;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const user = useMemo(
    () => users.find((u) => u.id === sessionId) || null,
    [users, sessionId]
  );

  const t = useMemo(() => {
    const dict = translations[lang];
    return (key: string, vars?: Record<string, string>) => {
      let str = dict[key] ?? translations.en[key] ?? key;
      if (vars)
        for (const [k, v] of Object.entries(vars)) str = str.replace(`{${k}}`, v);
      return str;
    };
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (user) {
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, language: l } : u))
      );
    }
  };

  /* ─── Auth ─── */
  const signup: AppCtx["signup"] = ({ firstName, lastName, email, password }) => {
    email = email.trim().toLowerCase();
    if (!email || !password || !firstName)
      return { ok: false, error: "All fields are required." };
    if (users.find((u) => u.email === email))
      return { ok: false, error: "Email already registered." };
    if (password.length < 6)
      return { ok: false, error: "Password must be at least 6 characters." };
    const newUser: User = {
      id: uid(),
      firstName,
      lastName,
      email,
      verified: false,
      passwordHash: fauxHash(password),
      language: lang,
      createdAt: new Date().toISOString(),
    };
    setUsers((p) => [...p, newUser]);
    // Persist to DB
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    }).catch(console.error);

    const verifyCode = String(Math.floor(100000 + Math.random() * 900000));
    save(KEY_PENDING_VERIFY, { email, code: verifyCode });

    // Send verification email via Gmail SMTP
    fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "verify",
        to: email,
        name: firstName,
        code: verifyCode,
      }),
    }).catch(console.error);

    return { ok: true, verifyCode };
  };

  const verifyEmail: AppCtx["verifyEmail"] = (email, codeInput) => {
    const pending = load<{ email: string; code: string } | null>(
      KEY_PENDING_VERIFY,
      null
    );
    if (!pending || pending.email !== email.toLowerCase())
      return { ok: false, error: "No verification pending." };
    if (pending.code !== codeInput.trim())
      return { ok: false, error: "Invalid code." };
    setUsers((prev) =>
      prev.map((u) =>
        u.email === email.toLowerCase() ? { ...u, verified: true } : u
      )
    );
    const u = users.find((x) => x.email === email.toLowerCase());
    if (u) {
      setSessionId(u.id);
      // Persist to DB
      fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...u, verified: true }),
      }).catch(console.error);
    }
    localStorage.removeItem(KEY_PENDING_VERIFY);
    return { ok: true };
  };

  const resendCode: AppCtx["resendCode"] = (email) => {
    const verifyCode = String(Math.floor(100000 + Math.random() * 900000));
    save(KEY_PENDING_VERIFY, { email: email.toLowerCase(), code: verifyCode });

    const u = users.find((x) => x.email === email.toLowerCase());
    fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "verify",
        to: email.toLowerCase(),
        name: u?.firstName || "Visitor",
        code: verifyCode,
      }),
    }).catch(console.error);

    return verifyCode;
  };

  /* Reactivate / resend activation for an existing unverified user */
  const activateAccount: AppCtx["activateAccount"] = (email) => {
    const norm = email.trim().toLowerCase();
    const u = users.find((x) => x.email === norm);
    if (!u) return { ok: false, error: "No account found for this email." };
    if (u.verified) return { ok: false, error: "Account is already activated." };
    const verifyCode = String(Math.floor(100000 + Math.random() * 900000));
    save(KEY_PENDING_VERIFY, { email: norm, code: verifyCode });

    fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "activation",
        to: norm,
        name: u.firstName,
        code: verifyCode,
      }),
    }).catch(console.error);

    return { ok: true, verifyCode };
  };

  /* Password reset flow */
  const requestPasswordReset: AppCtx["requestPasswordReset"] = (email) => {
    const norm = email.trim().toLowerCase();
    const u = users.find((x) => x.email === norm);
    if (!u) return { ok: false, error: "No account found for this email." };
    const resetCode = String(Math.floor(100000 + Math.random() * 900000));
    save(KEY_PENDING_RESET, { email: norm, code: resetCode });

    fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "password-reset",
        to: norm,
        name: u.firstName,
        code: resetCode,
      }),
    }).catch(console.error);

    return { ok: true, resetCode };
  };

  const resetPassword: AppCtx["resetPassword"] = (email, code, newPassword) => {
    const pending = load<{ email: string; code: string } | null>(
      KEY_PENDING_RESET,
      null
    );
    const norm = email.trim().toLowerCase();
    if (!pending || pending.email !== norm)
      return { ok: false, error: "No reset request pending for this email." };
    if (pending.code !== code.trim())
      return { ok: false, error: "Invalid or expired reset code." };
    if (newPassword.length < 6)
      return { ok: false, error: "Password must be at least 6 characters." };

    const u = users.find((x) => x.email === norm);
    setUsers((prev) =>
      prev.map((u) =>
        u.email === norm ? { ...u, passwordHash: fauxHash(newPassword) } : u
      )
    );
    if (typeof localStorage !== "undefined")
      localStorage.removeItem(KEY_PENDING_RESET);

    // Persist to DB
    if (u) {
      const updated = { ...u, passwordHash: fauxHash(newPassword) };
      fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      }).catch(console.error);
    }

    // Send password changed notification
    fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "password-changed",
        to: norm,
        name: u?.firstName || "Visitor",
      }),
    }).catch(console.error);

    return { ok: true };
  };

  const login: AppCtx["login"] = (email, password) => {
    const u = users.find((x) => x.email === email.trim().toLowerCase());
    if (!u || u.passwordHash !== fauxHash(password))
      return { ok: false, error: "Invalid email or password." };
    if (!u.verified)
      return { ok: false, needsVerify: true, error: "Please verify your email first." };
    setSessionId(u.id);
    setLangState(u.language);
    return { ok: true };
  };

  const logout = () => setSessionId(null);

  const changePassword: AppCtx["changePassword"] = (current, next) => {
    if (!user) return { ok: false, error: "Not signed in." };
    if (user.passwordHash !== fauxHash(current))
      return { ok: false, error: "Current password is incorrect." };
    if (next.length < 6)
      return { ok: false, error: "Password must be at least 6 characters." };
    const updated = { ...user, passwordHash: fauxHash(next) };
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? updated : u
      )
    );

    // Persist to DB
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    }).catch(console.error);

    // Send password changed notification email
    fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "password-changed",
        to: user.email,
        name: user.firstName,
      }),
    }).catch(console.error);

    return { ok: true };
  };

  const updateProfile: AppCtx["updateProfile"] = (patch) => {
    if (!user) return;
    const updated = { ...user, ...patch };
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? updated : u))
    );
    // Persist to DB
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    }).catch(console.error);
  };

  /* ─── Cart ─── */
  const addToCart = (type: TicketType, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((l) => l.type === type);
      if (existing)
        return prev.map((l) => (l.type === type ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { type, qty }];
    });
  };
  const setQty = (type: TicketType, qty: number) => {
    setCart((prev) => {
      const filtered = prev.filter((l) => l.type !== type);
      if (qty <= 0) return filtered;
      return [...filtered, { type, qty }];
    });
  };
  const clearCart = () => setCart([]);
  const cartTotal = cart.reduce(
    (s, l) => s + TICKET_PRICES[l.type] * l.qty,
    0
  );
  const cartCount = cart.reduce((s, l) => s + l.qty, 0);

  const confirmBooking = (email: string, name: string): Booking => {
    const booking: Booking = {
      id: uid(),
      code: generateCode(),
      userId: user?.id ?? "guest",
      email,
      guestName: name,
      date: bookingDate,
      time: bookingTime,
      lines: cart,
      total: cartTotal,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    setBookingsAll((p) => [booking, ...p]);
    setCart([]);
    // Persist to DB via API
    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    }).catch(console.error);

    // Send booking confirmation email
    fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "booking-confirmation",
        to: email,
        name,
        booking: {
          code: booking.code,
          date: booking.date,
          time: booking.time,
          lines: booking.lines,
          total: booking.total,
        },
      }),
    }).catch(console.error);

    return booking;
  };

  const bookings = useMemo(
    () =>
      bookingsAll.filter(
        (b) => !user || b.userId === user.id || b.userId === "guest"
      ),
    [bookingsAll, user]
  );

  const value: AppCtx = {
    theme,
    setTheme,
    toggleTheme,
    lang,
    setLang,
    t,
    user,
    signup,
    verifyEmail,
    resendCode,
    activateAccount,
    login,
    logout,
    requestPasswordReset,
    resetPassword,
    changePassword,
    updateProfile,
    cart,
    setCart,
    addToCart,
    setQty,
    clearCart,
    cartTotal,
    cartCount,
    bookingDate,
    setBookingDate,
    bookingTime,
    setBookingTime,
    bookings,
    confirmBooking,
    route,
    navigate,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp must be used within AppProvider");
  return c;
}
