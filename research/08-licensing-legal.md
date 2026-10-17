# Instrument licensing, existing open-source projects, legal notes (2026-10-17)

Subagent report, condensed. Not legal advice. The main session re-checked these verbatim:
- the NYU ASRS-6 terms
- the phqscreeners.com "no permission is required" statement
- the RAADS-R CC BY-NC license on PMC3134766
- the MDCG 2019-11 rev.1 class IIb depression-scoring example (EU PDF)

Harvard HCP was down (503) during the session.

## Instruments
Verdict key: PD = public domain · Free+attr = free with attribution · NC = non-commercial only · Perm = permission required · Paid = commercial license

| Instrument | Verdict for a free OSS public site | Key quote / source | Conf |
|---|---|---|---|
| **ASRS v1.1 6Q screener** | **Free+attr, no modification** (electronic versions OK) | NYU: "freely available for clinical and non-clinical use, including commercial use, but does require attribution... no other modifications, other than creating electronic versions" license.tov.med.nyu.edu/product/asrs6Qscreener | High (re-checked) |
| ASRS v1.1 18Q | Unclear, lean Perm | Form says to ask Kessler; APA Services copy says free (third party) | Med |
| ASRS-5 | Perm/Paid beyond academic research | NYU portal: "educational and research use only", 1-year expiry, institutional signatory | High |
| WURS | Perm (unresolved) | "Public domain" claims online cite no release | Low-med |
| BAARS-IV | Paid | Guilford photocopy license covers purchasers only | High |
| CAARS / Conners (MHS) | Paid, effectively impossible | Items and scoring are trade secrets | High |
| DIVA-5 | Paid; clinician interview, out of scope | Forbids chatbot/automated conversion | High |
| Vanderbilt, SNAP-IV | Perm; parent/teacher forms for children | AAP/NICHQ ©; Swanson © ("public domain" labels are wrong) | Med-high |
| **WFIRS** | Free, but **email Dr. Weiss before posting online** | "can be posted on the Internet... Please contact Dr. Weiss" | High |
| **PHQ-9 / PHQ-2 / GAD-7** | **PD** | "no permission is required to reproduce, translate, display or distribute them" | High (re-checked) |
| **PCL-5** | **PD** | VA: "in the public domain and not copyrighted" | High |
| MDQ | Perm / likely Paid | Jones & Bartlett: password-protected sites only, invoiced | Med |
| OCI-R | Perm (APA) | APA requires permission for measures | Med-low |
| AQ / AQ-10 | NC research + no modification; ask ARC | "research purposes and not for commercial use"; IT companies "fees may apply" | High |
| **RAADS-R** | **Free+attr, NC** | Article is CC BY-NC (Embrace Autism's CC BY claim is wrong) | High (re-checked) |
| RAADS-14 | Treat as NC (derived from RAADS-R) | | Med-high |
| CAT-Q | Likely Free+attr (CC BY 4.0 article; items in supplement) | No clinical cutoff in the 2019 paper | Med |
| **K6 / K10** | **Free+attr** | "free and does not require any formal permission" (Wayback) | High |
| DSM-5 Level 1 cross-cutting | Perm | Clinicians with their own patients only | High |
| **IPIP** | **PD**, modifiable | "copy, edit, translate, or use them for any purpose" | High |
| PROMIS | Perm | Embedding in web portals needs written approval | High |

Gotchas:
- A repo code license does not relicense instrument text. Keep each instrument's text in its own directory with a per-instrument rights file.
- No-modification terms forbid "friendlier" rewording. This directly conflicts with the user's "modernized questions" idea for those instruments.
- **Free + modifiable** (and so usable for new or modernized items) = IPIP and the user's own newly written items. PHQ/GAD/PCL are PD, but altering them breaks their validity anyway.

## Existing projects (GitHub/npm API, 2026-10-17)
Nothing established: no open-source public site covering broad screeners, and nothing above ~125 stars.
- **psytools** (MIT code, per-instrument SOURCES.md; 27 instruments; library only). Best starting point for scoring and data.
- nivlab/jspsych-demos: **CC BY-NC-SA**, ~50 surveys.
- ReproNim/reproschema-library: Apache-2.0, JSON-LD.
- jmandel/fhir-questionnaires-from-the-web: MIT, FHIR.
- LHNCBC/lforms: NLM license, LOINC panels. LOINC inclusion "does not imply permission".
- gitlab pierros/inner-weather: MIT, PHQ-9/GAD-7 in 52 languages, no tracking. Closest in spirit.
- Many small single-instrument repos; those without a license file are all rights reserved.
- Frameworks: jsPsych (MIT), SurveyJS (MIT), formr, LimeSurvey.

## Legal
- **US FDA:** likely a device under **enforcement discretion**: "a checklist of common signs and symptoms to provide a list of possible medical conditions..." (Device Software Functions guidance, App. B).
  - General Wellness exemption excluded: it doesn't cover interfaces referencing "specific diseases... diagnostic thresholds".
  - CDS exemption doesn't help for patient-facing software.
  - Avoid "diagnose / detect / find out if you have"; use published scoring only.
  - Cognoa questionnaire-based autism tool (DEN200069) = Class II precedent for novel algorithms.
- **EU MDR (biggest risk):** MDCG 2019-11 rev.1: "Diagnostic MDSW intended for scoring depression based on inputted data on a patient's symptoms (e.g. mood, anxiety) should be classified as class IIb under Rule 11(a)". Possible escape via the Art. 2(27) "commercial activity" wording for a truly non-commercial site, but this is **unsettled**. Get EU advice before targeting EU users. UK MHRA not researched.
- **Privacy:**
  - HIPAA doesn't apply.
  - FTC HBNR (2024) covers mental-health symptom trackers; the GoodRx/BetterHelp cases were about ad pixels.
  - Washington MHMDA has no revenue threshold and a private right of action; server logs pairing IP with /phq-9 are arguably health data.
  - GDPR Art. 9; EDPB 2/2023 para 44: in-browser processing is fine "as long as the information does not leave the device".
  - Rules: no analytics/pixels on test pages, no answers in URLs, self-hosted assets, minimal logs, no accounts, localStorage only on explicit save.
- **Disclaimers:** MHA model wording "not diagnostic instruments"; attribute cutoffs to the instruments' authors.
- **Crisis resources:** not legally required for this kind of site (per agent, partly from memory), but best practice: 988 and Samaritans 116 123 on every results page, prominent when PHQ-9 item 9 > 0. findahelpline embedding needs ThroughLine's permission.

## Not verified
Harvard ASRS page, NYU ASRS-18 page, WURS holder statement, OCI-R PsycTests field, CAT-Q author terms, Conners 4 terms, SB 243 text.

## India angle (2026-10-18, from memory: Indian gov sites unreachable from this machine, so **nothing below is verified**)
- **Idea vs expression.** Copyright covers the exact sentences and scoring keys, not the medical fact or the symptom ("trouble finishing tasks"). Indian courts follow this (R.G. Anand v Delux Films, SC 1978; Eastern Book Co v D.B. Modak, SC 2008). The DSM criteria as concepts are free to measure; APA owns its text.
- **Compulsory licensing for medicine is a Patents Act tool** (s.84, Natco v Bayer/Nexavar 2012). It covers patented drugs, not questionnaires.
- Copyright Act compulsory licences (s.31 withheld works, s.31A orphan/unpublished, s.31B disability formats, s.32 translations, s.32A unavailable editions) have no "medical necessity" route. s.31B might cover accessible-format versions for disabled users only.
- s.52 fair dealing (private use/research, teaching per the Delhi HC DU photocopy case 2016) is unlikely to cover a public website for everyone.
- Art. 21 "right to health" binds the state; it doesn't license private copying.
- Jurisdiction: a public site is used worldwide. India protects foreign works under Berne. Indian law doesn't shield infringement where the site is hosted or used abroad.
- Unresearched: CDSCO Medical Devices Rules 2017 status of screening software; DPDP Act 2023 (health data).
- **Practical exit:** write original items on the same symptom constructs. That is legal everywhere, and validity, not law, is the real cost: new wording has no validated cutoff until calibrated.
