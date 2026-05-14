import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Footer from "@/components/Footer";
import ShaderHero from "@/components/ShaderHero";
import StaggeredText from "@/components/react-bits/staggered-text";
import AuroraBlur from "@/components/react-bits/aurora-blur";
import { subtleOrangeAurora, blackSky } from "@/components/AuroraPresets";

export const metadata: Metadata = pageMetadata({
  path: "/privacy",
  title:
    "Privacy Policy | Talitrix",
  description:
    "How Talitrix collects, uses, and shares personal information through our website, mobile applications, wearable devices, and related services.",
});

const EFFECTIVE_DATE = "5/10/2022";

const sections: Array<{ id: string; title: string }> = [
  { id: "info-we-collect", title: "Information We Collect" },
  { id: "how-we-use", title: "How We Use Information We Collect" },
  { id: "how-we-secure", title: "How We Secure Information" },
  { id: "how-we-share", title: "How We Share Information" },
  { id: "your-choices", title: "What Choices Do I Have?" },
  { id: "updates", title: "Updates to Our Privacy Notice" },
  { id: "contact", title: "Contact Information" },
];

export default function PrivacyPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <ShaderHero
        eyebrow="Legal"
        title={
          <StaggeredText
            as="h1"
            text={"Privacy Policy."}
            className="text-4xl sm:text-5xl md:text-7xl leading-[1.05]"
            segmentBy="words"
            duration={0.7}
            delay={70}
            blur
          />
        }
        subtitle={
          <span>
            Effective Date:{" "}
            <span className="text-white">{EFFECTIVE_DATE}</span>
          </span>
        }
        body={
          <p>
            This Privacy Notice describes how Talitrix collects, uses, and
            shares personal information via its website, mobile applications,
            the wearable devices we sell or provide, and related services we
            provide (collectively, our &ldquo;Services&rdquo;).
          </p>
        }
        background={
          <AuroraBlur
            layers={subtleOrangeAurora}
            skyLayers={blackSky}
            speed={0.55}
            bloomIntensity={1.6}
            brightness={0.5}
            saturation={0.95}
            verticalFade={0.85}
            movementX={-1.2}
            movementY={-1.6}
          />
        }
      />

      <section className="relative px-6 md:px-16 py-16 md:py-24 border-b border-border-gray">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 max-w-7xl mx-auto">
          {/* Sticky table of contents */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 flex flex-col gap-5">
              <span className="text-xs uppercase tracking-[0.3em] text-primary">
                On This Page
              </span>
              <nav className="flex flex-col gap-2">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="text-sm text-white/65 hover:text-primary transition-colors py-1 border-l border-white/10 pl-3 hover:border-primary"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
              <div className="mt-4 border border-border-gray rounded-2xl p-5 bg-white/[0.02]">
                <p className="text-xs text-white/55 leading-relaxed">
                  Questions about this notice? Email us at{" "}
                  <a
                    href="mailto:compliance@talitrix.com"
                    className="text-primary hover:underline"
                  >
                    compliance@talitrix.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </aside>

          {/* Body */}
          <article className="lg:col-span-8 max-w-3xl text-white/75 leading-relaxed text-base sm:text-[17px]">
            <Prose>
              <p>
                This Privacy Notice describes how Talitrix collects, uses, and
                shares personal information via its website, mobile
                applications, the wearable devices we sell or provide, and
                related services we provide (collectively, our
                &ldquo;Services&rdquo;). This Privacy Notice also describes the
                choices Talitrix offers with respect to such data when you use
                our Service. Talitrix provides monitoring and case management
                services to federal, state and local jurisdictions and law
                enforcement. We provide devices and services that help
                individuals comply with their bail or other supervised release
                conditions. By the nature of our Services, information we
                collect is shareable with authorities. We also provide a mobile
                application for victims that notifies victims if a participant
                is in an exclusion or inclusion zone near them. We collect
                information you choose to give us and other information that
                may be automatically collected from your use of the Site and
                your device. We use that information to operate our business,
                and for a variety of other purposes set forth below.
              </p>
              <p>
                This Privacy Notice does not apply to third parties or their
                services. This Privacy Notice does not apply to information
                which cannot be identified to any individual, household, or
                their devices.
              </p>

              <H2 id="info-we-collect">Information We Collect</H2>
              <p>
                To provide Talitrix Services, we collect data by which you may
                be personally identified such as your first and last name,
                phone number, email address, and account information. We may
                also collect information about the devices and equipment you
                use to access our Service, and usage data.
              </p>
              <p>We collect this information from a variety of sources, including:</p>
              <ul>
                <li>
                  Directly from you when you provide it to us, including when
                  you enroll in our Service or when you communicate through
                  your device.
                </li>
                <li>Automatically as you utilize the Service.</li>
                <li>From third parties, including analytics providers.</li>
                <li>
                  From federal, state, and/or local authorities (who may, for
                  example, communicate to us regarding supervised release
                  conditions).
                </li>
              </ul>

              <H3>Information directly from you.</H3>
              <p>
                The information we collect on or through our Service may
                include information that you provide directly to us. While you
                are wearing a Talitrix band, watch, or similar device, we may
                continuously collect specific location data, biometric data
                (such as heart rate, blood pressure, blood oxygen, temperature,
                wrist temperature), the number of steps you take, and
                information about whether a device is active or in use. While
                you are using a Talitrix phone device, we may collect call logs
                and text messages, and other information about the use of the
                phone device. We also collect information provided at the time
                you fill out forms on our Service, register for an account,
                download our mobile applications, sign up for emails and
                newsletters, or communicate with us. If you make a purchase
                from us, we or our service provider may collect information
                regarding your purchase and payment information. If you
                download our mobile application for victims, we may collect
                information about you that relates you to an offender or
                alleged offender. Our mobile application for victims collects
                your location, compares it to the location of the offender or
                alleged offender, and provides related alerts and
                communications.
              </p>

              <H3>Information we collect through automatic data collection technologies.</H3>
              <p>
                We may collect data regarding your use of our Sites through
                cookies, web beacons, and other automatically collected
                information. This data may include your IP address; date and
                time you access the services and the pages and content you
                access during your visit; websites that you link to or from;
                emails from us that you open and the links you click on within
                those emails. We may also collect information about your
                mobile device and how you interact with our mobile application.
                Cookies are small identifiers sent from a web server that are
                stored on your device for the purpose of identifying your
                browser or storing information or settings in your browser.
                Cookies may also be used to personalize your visit by storing
                your preferences or displaying content based upon what you
                have viewed on the services and other websites. Web beacons or
                pixel tags connect web pages to web servers and their cookies.
                We and others may use these and similar technologies on our
                services and other websites.
              </p>
              <p>
                Other parties may collect personally identifiable information
                about your online activities over time and across third-party
                websites when you use our website or services. We do not
                respond to &ldquo;do not track&rdquo; signals or other
                mechanisms that provide consumers the ability to exercise
                choice regarding the collection of personally identifiable
                information about an individual consumer&rsquo;s online
                activities over time and across third-party websites or
                online services.
              </p>

              <H3>Information we collect from third party sources.</H3>
              <p>
                Advertisers, analytic services, and other third parties provide
                us information in connection with our Service and through tools
                they use to collect information about you when you use our
                services. The information they collect may be associated with
                your personal information or they may collect information
                about your online activities over time. They and we may use
                this information to provide you with interest-based
                advertising or other targeted content, and for other purposes
                (such as to better understand our Service&rsquo;s audience).
              </p>

              <H3>Information about you or from authorities.</H3>
              <p>
                We may collect contact information, information about the
                nature of your offense or alleged offense and the terms of
                your release and probation or parole, details regarding
                geographic inclusion and/or exclusion zones, and other
                information about you, including information received from
                federal, state or local authorities regarding offenses or
                alleged offenses, terms of release, your compliance with those
                terms, and identification of supervising agencies or
                individuals. We may receive copies of the bond order and court
                or other official records related to your case.
              </p>

              <H2 id="how-we-use">How We Use Information We Collect</H2>
              <p>We may use data we collect for a variety of purposes, including the following:</p>
              <ul>
                <li>
                  To operate our business, including fulfilling court orders
                  and providing our Services.
                </li>
                <li>
                  To maintain, analyze, customize, measure and improve our
                  Services.
                </li>
                <li>To monitor participant location.</li>
                <li>
                  To report on participant activity and use of our Services to
                  government authorities and others (such as victims or those
                  entitled or permitted to such notice under law).
                </li>
                <li>To provide customer support.</li>
                <li>
                  To communicate with you, including about products and/or
                  services you may be interested in.
                </li>
                <li>To monitor and enforce our legal terms or similar terms.</li>
                <li>To comply with law and satisfy our regulatory compliance obligations.</li>
                <li>
                  To detect and prevent fraud and other prohibited, illicit or
                  illegal activity, and to protect you, ourselves, and others.
                </li>
                <li>For other purposes permitted by law or to which you consent.</li>
              </ul>
              <p>
                Please note that we may combine the information we gather about
                you in identifiable form, including information from third
                parties. We may use this information, for example, to improve
                and personalize our services, content and advertising.
              </p>

              <H2 id="how-we-secure">How We Secure Information</H2>
              <p>
                We are committed to maintaining measures to protect the
                security of your information. Of course, despite these
                measures, no network or system is ever entirely secure and we
                cannot guarantee the security of networks and systems that we
                operate or that are operated on our behalf.
              </p>

              <H2 id="how-we-share">How We Share Information</H2>
              <p>
                We may share your information with third parties as permitted
                or required by law, or as directed or authorized by you. For
                example, we may share information about you:
              </p>
              <ul>
                <li>
                  With local law enforcement, officials, courts, or other
                  federal, state or local authorities to supervise and enforce
                  the terms of your release. We do not control the use of
                  information by these parties, and you should contact them to
                  understand how they may use information about you.
                </li>
                <li>
                  With vendors and service providers, with which we partner to
                  complete transactions or process payments you have
                  authorized. Please note that some of these vendors,
                  including our analytics and payments processing providers,
                  may store your personal information subject to their own
                  privacy policies and practices not subject to the terms of
                  this privacy policy.
                </li>
                <li>
                  To our professional advisors who provide legal, compliance,
                  accounting, banking, or consulting services. In order to
                  comply with our legal obligations or to protect the
                  interests, property or legal rights of you, ourselves, or
                  third parties.
                </li>
                <li>
                  To law enforcement, officials, or other third parties when we
                  are compelled to do so by a subpoena, court order, or
                  similar law enforcement request, or when we believe in good
                  faith that the disclosure of personal information is
                  necessary to prevent physical harm or financial loss, to
                  report suspected illegal activity, or to investigate
                  violations of this Privacy Notice or other applicable terms.
                </li>
                <li>
                  To companies or other entities in connection with, or during
                  the negotiation of, any merger, sale of company stock or
                  assets, financing, acquisition, divestiture or dissolution
                  of all or a portion of our business.
                </li>
                <li>
                  For other legal purposes, such as to enforce our legal
                  terms, or to exercise or defend legal claims.
                </li>
                <li>With your direction or consent.</li>
              </ul>

              <H2 id="your-choices">What Choices Do I Have?</H2>
              <H3>Update personal information.</H3>
              <p>
                If you are a member of a federal, state or local authority and
                have an account with us, you can log in to your account to
                review and change certain information about yourself, your
                agency, or participants who use our Services. In general,
                participants themselves are restricted from being able to
                access or update information provided to us by federal, state
                or local authorities. If you are a participant and believe
                that such information as provided to us or reflected in our
                system is incorrect, you should contact your relevant
                supervising authority. If you are a user of our mobile
                application for victims, you may access and modify your
                information by logging in to your account with us.
              </p>
              <H3>Marketing communications.</H3>
              <p>
                You may receive marketing information from Talitrix. You may
                opt out of receiving marketing emails, by following the
                unsubscribe link in each email, or by contacting us at{" "}
                <a
                  href="mailto:compliance@talitrix.com"
                  className="text-primary hover:underline"
                >
                  compliance@talitrix.com
                </a>
                . Please note that you may continue to receive non-marketing
                emails from us after you opt-out.
              </p>
              <H3>Cookies.</H3>
              <p>
                You have a number of choices regarding certain cookies. Most
                web browsers automatically accept cookies, but you may modify
                your browser&rsquo;s setting to notify you of cookie placement
                or decline cookies. If you choose to decline cookies, certain
                features of our website may not function properly as a result.
              </p>

              <H2 id="updates">Updates to Our Privacy Notice</H2>
              <p>
                We may update this Privacy Notice from time to time in order
                to provide clarification or notice of changes to our
                practices. If we make changes, we will revise the Effective
                Date at the top of this Privacy Notice. Changes to this
                Privacy Notice will be effective once they are posted unless
                otherwise indicated.
              </p>

              <H3>SMS/Mobile Information</H3>
              <p>
                Mobile information will not be shared with third
                parties/affiliates for marketing/promotional purposes. All the
                above categories exclude text messaging originator opt-in data
                and consent; this information will not be shared with any
                third parties. If you wish to be removed from receiving future
                communications, you can opt out by texting STOP.
              </p>

              <H3>Messaging Terms and Conditions</H3>
              <p>
                You agree to receive customer care and security alert messages
                from Talitrix. Message frequency varies. Message and data
                rates may apply. For help, reply HELP or call us at{" "}
                <a
                  href="tel:+16787997677"
                  className="text-primary hover:underline"
                >
                  678-799-7677
                </a>{" "}
                for support. You can opt out at any time by replying STOP and
                providing proof of release.
              </p>

              <H2 id="contact">Contact Information</H2>
              <p>
                If you have any questions or concern about this privacy notice
                or the privacy practices at Talitrix, please contact us at{" "}
                <a
                  href="mailto:compliance@talitrix.com"
                  className="text-primary hover:underline"
                >
                  compliance@talitrix.com
                </a>
                .
              </p>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-border-gray border border-border-gray rounded-2xl overflow-hidden not-prose">
                <div className="bg-background p-6 flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-primary">
                    Talitrix HQ
                  </span>
                  <p className="text-white/80 text-sm leading-relaxed mt-1">
                    3460 Preston Ridge Rd
                    <br />
                    Suite 125
                    <br />
                    Alpharetta, GA 30005
                  </p>
                </div>
                <div className="bg-background p-6 flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/45">
                      Onboarding & Participants
                    </span>
                    <a
                      href="tel:+16787997677"
                      className="text-primary hover:underline text-sm"
                    >
                      678-799-7677
                    </a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/45">
                      Sales
                    </span>
                    <a
                      href="mailto:Info@talitrix.com"
                      className="text-primary hover:underline text-sm"
                    >
                      Info@talitrix.com
                    </a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/45">
                      Compliance
                    </span>
                    <a
                      href="mailto:compliance@talitrix.com"
                      className="text-primary hover:underline text-sm"
                    >
                      compliance@talitrix.com
                    </a>
                  </div>
                </div>
              </div>
            </Prose>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const Prose = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-5 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_li]:marker:text-primary/60 [&_a]:underline-offset-2">
    {children}
  </div>
);

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2
    id={id}
    className="text-2xl sm:text-3xl text-white mt-10 sm:mt-14 mb-2 scroll-mt-32 leading-tight"
  >
    {children}
  </h2>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg sm:text-xl text-primary mt-6 mb-1 leading-snug">
    {children}
  </h3>
);
