# Open ADHD and mental-health self-screen: research report (2026-10-18)

Consolidates 01-09. Each section points to its detail file. Confidence markers: **verified** = main session re-checked against a primary page or Crossref/Europe PMC; otherwise it's subagent-reported. Not legal or medical advice.

## 1. Are online tests paid? (01, 02)
- The premise that "most are paid after you finish" does **not** hold for what a generic search returns. Of ~18 sites from generic searches, none paywalled results. ~30-40% were fully free; ~60-70% were free with upsell (telehealth funnel, affiliate, ads), and a quarter of those gate results behind email.
- Paid/paywalled sites form a **separate cluster**, found via complaint searches and probably reached via social ads. The shape: a $1-2 "results fee" that turns into a $20-50 per 4-week subscription, usually on an unnamed proprietary test, and these are the long ones (100 Qs, 15-40 min). Verified:
  - adhdtestcenter.org terms: "$2.00 USD" 48h trial, then "$19.00 and $39.00 USD per month".
  - multitests.org: €1.25 then €49.95/28 days. Disclosed on the start page, so not "hidden until after".
  - personality.cc: "24-hour trial or subscription".
  - BBB 1281743 TestLibrary complaint: $1.99 then "$39.99 every month", reached via Facebook.
  - FTC v. Genesis Tech (Wisey), June 2026: deceptive auto-renew.
- Not verified: adhdassessment.org (JS-rendered, user reports only).
- Truly free ASRS with the score shown already exists (MHA Screening, Embrace Autism, Psychology-Tools, adhdtests.net, freeadhdtest.org). **The gap is not "a free ASRS".** It is: no gates, local-only processing, transparent scoring, multi-condition, honest base rates, and outranking the subscription funnels (a distribution problem).

## 2. What existing tests ask (03)
- About two-thirds of popular quizzes are ASRS v1.1, verbatim or lightly edited, often with errors: reversed scale, no "Never", 2-week windows, Part B unscored.
- Almost none ask DSM gating questions: childhood onset (2 sites), 2+ settings (1), impairment (2), other explanations (1, Done), **substance use (0)**.
- Popular-only domains (RSD, hyperfocus, time blindness, sensory) are raised in ADHD vs healthy people but **not specific** vs anxiety, depression, BPD, bipolar or autism. Mind wandering (MEWS) is the most promising extra, but evidence is thin.
- Dated examples exist ("meetings", "checkbook", "on hold"); 03 §5 lists modern wordings, all unvalidated.

## 3. Are the questions outdated or profession-specific? (04)
- Partly a false premise: DSM-5 (2013) already added phones, bills and forms; ASRS-5 (2017) is DSM-5-based. ASRS v1.1 (2005) and WURS (1993) are the old ones.
- Measured bias is by **age and gender**, not tech cohort. **No occupation-DIF study exists.** Occupation changes impairment (Kessler 2005: lost workdays 12-56/yr by job type), not shown to change symptoms.
- Phone items likely **hurt** specificity: notifications raise ADHD-like reports in non-ADHD adults (Kushlev 2016, verified).
- The bigger accuracy problem is base rate and confounders: ~20% screen positive online; PPV 21-26% in depressed/SUD samples; ~95% of apparent late-onset positives excluded on full assessment (Sibley 2018, verified).
- AI: no evidence AI masks ADHD; there is evidence ChatGPT helps people feign it (Fuermaier & Niesten 2025).

## 4. ADHD as a distribution, and Bayesian updating (06)
- Taxometric studies say ADHD is a **continuum** (Haslam 2006, 2020; Marcus 2011/2012; Lubke 2009, two correlated dimensions). The cutoff is a pragmatic choice.
- So "probability you have ADHD" needs defining: either θ/percentile, or P(a clinician would diagnose | answers), which also depends on onset, impairment and exclusions that symptom items can't measure.
- The math loop is solved (GRM, EAP on a grid, min expected posterior variance, stop at PSD<0.3 or classification certainty; 06 "The loop"). **Item parameters are the hard part:** no open adult ADHD calibration against diagnosis exists.
- Score → probability via likelihood ratios: ASRS-5 ≥14 in general population LR+ ~23, LR− 0.09; in a specialty clinic LR+ ~3.5. Visitor base rate is unknown, so show several, as natural frequencies plus an icon array.

## 5. Adaptive design (05, 06)
- CAT beats a 6-item ASRS by little. Adaptivity pays in **gating across conditions**: PHQ-2 → PHQ-9 loses little (Levis 2020 IPD, 44k people).
- Skipping items inside a validated scale breaks its cutoff. **Curtailment** (stop once the full-form decision can't change) keeps it, with 100% agreement and up to 22% fewer items (Finkelman 2012).
- No mature JS GRM-CAT engine; plan a small TS engine golden-tested against R mirtCAT.
- LLMs: offline item drafting only, never runtime choose/reword/score.

**Architecture ladder**
| Level | What | Status |
|---|---|---|
| L0 | Fixed validated scales verbatim | Fully evidence-backed |
| **L1** | **Gated multi-condition + curtailment** | **Recommended first release** |
| L2 | CAT on published parameters | No open adult ADHD calibration |
| L3 | Own item bank, opt-in data, criterion subsample | Multi-year, IRB, legal |

## 6. Answer format (09)
- Premise correction: ADHD scales use **frequency** ("Never ... Very often"), not agree/disagree. Only AQ and pop quizzes use agree/disagree.
- Gains plateau at 5-7 categories (Simms 2019, verified: no gain beyond 6, VAS no better).
- Drag sliders raise break-off 6.9× (Funke 2011, verified); point-and-click VAS ≈ radio buttons (Funke 2016, verified).
- -100..+100 is the wrong shape: frequency has a floor, not an opposite, and 0 reads as "neutral".
- Changing the format voids published cutoffs (ISPOR, Coons 2009, verified).
- **Recommendation:** validated scales exactly as published, radio buttons. New items: 5-7 time-anchored buttons ("0 / 1-2 / 3-5 / 6-9 / 10+ of the last 14 days") under GRM. Optional A/B arm with a unipolar tap-to-place VAS scored by beta IRT.
- ASRS-5 uses unequal per-option integer weights 0-5 (Ustun 2017, verified in PMC5470397); flat 0-4 copies online are wrong. Exact weights not yet transcribed.

## 7. Brain visualization (07)
- Group brain differences are tiny (d 0.05-0.2, null in adults); two meta-analyses found **no spatial convergence**; no scan or EEG can diagnose ADHD.
- Mapping a user's answers to lobes would be neurorealism, not science.
- **Recommendation:** no "your brain" view. Show an overlap plot (d=0.2 ≈ 92% overlap) plus an optional separate education panel ("systems research has studied", with evidence badges). Open assets: NiiVue (BSD-2), Yeo/Schaefer (MIT).

## 8. Licensing and legal (08)
- Free to use as-is: ASRS-6 (attribution, no modification), PHQ-9/2, GAD-7, PCL-5 (public domain), K6/K10. NC only: RAADS-R, AQ. Permission/paid: ASRS-5, BAARS, CAARS, DIVA, MDQ, PROMIS, DSM Level 1.
- Freely modifiable: IPIP and your own items. Copyright covers wording, not symptoms, so original items on DSM constructs are legal (India section in 08, unverified, from memory).
- US FDA: likely enforcement discretion if published scoring and no "diagnose" claims. **EU MDR**: MDCG says depression-scoring software is class IIb; get EU advice before targeting EU.
- Privacy: client-side scoring, no pixels/analytics on test pages, no answers in URLs, no accounts. Crisis resources on results pages.

## 9. Open checks
- Transcribe ASRS-5 weights (Ustun 2017 figure); ASRS-6 shading rule from the official PDF; Kessler's reported Dec 2023 memo withdrawing ASRS v1.1 DSM-5 rescoring.
- Kessler 2007 graded band LRs (PMC full text).
- Whether ASRS-18 is freely usable (ask NYU/Kessler).
- WFIRS: email Dr. Weiss before posting.
- India: CDSCO software status, DPDP Act. EU: legal advice.
- Not researched: AISRS, ADHD-RS, BDEFS details; UK MHRA.

## 10. Proposed first release (for brainstorming, not decided)
L1: PHQ-2, GAD-2, ASRS-6 gate → full PHQ-9, GAD-7, ASRS-18 (if permitted), with curtailment; plus onset, settings, impairment, sleep and substance questions as competing explanations; LR-based results with selectable base rates; no gates, no tracking, open source. Own modern item bank as an unscored research arm from day one, so L3 calibration data accrues (needs IRB and consent design).

## Decisions
- 2026-10-18: user decided licensing is not a design constraint. Verbatim and reworded instrument text are both allowed; user owns the legal risk. Validity is still a constraint: reworded or reformatted items lose published cutoffs until recalibrated.
- 2026-10-18: user wants a large adaptive bank, not a fixed 18. Test length varies per person (roughly 30-100+), set by which domains the answers open up and when each domain's uncertainty is low enough, not by a fixed count. Items should also capture personality, context, goals. Length costs (verified via Crossref, findings from memory): careless responding rises within a questionnaire (Bowling 2020 doi:10.1177/1094428120947794); longer stated length lowers starts and answer quality (Galesic & Bosnjak 2009 doi:10.1093/poq/nfp031).
- 2026-10-18: "Give me results now" button available at every question; ends the test and shows results with current uncertainty. Long sessions stay available for those who want them.
- 2026-10-18: v1 scope = broad: ADHD, depression, anxiety, autism traits, PTSD, bipolar screen, OCD, each with its own result.
- 2026-10-18: audience = English, India first (Indian examples, Indian helplines first; neutral core wording + regional variants so others can be added).
- 2026-10-18: results = layered: severity band headline; tap for percentile + interval, opt-in probability view with base-rate selector + icon array, drivers, competing explanations; early stop shows wider ranges + per-condition "keep going" prompt.
- 2026-10-18: data = static client-side site at launch; opt-in anonymous donation path designed in, switched on only after ethics approval.
- 2026-10-18: scoring = multiple modes: Validated (published scoring, own items context-only), Experimental (full Bayesian, provisional params for own items, labelled), with per-condition auto-promotion of own items once donated data passes threshold + check vs published scale. Same engine.
- 2026-10-18: default mode = Validated; Experimental opt-in with one-line explanation; results page toggle re-scores same answers, badges per band.
- 2026-10-18: safety = tiered: footer help link always; any risk answer >0 -> persistent banner (Indian helplines first); highest answers -> dismissible pause screen; results lead with support if any risk answer. Helplines verified against official sources, re-checked on schedule.
- 2026-10-18: governance (clinician review, cognitive interviews, ethics approval, legal, helpline sign-off) is owned by the user; build proceeds without blocking on it. Own items stay labelled experimental until user signs off.
- 2026-10-18: tech: SvelteKit static build, TypeScript, host-agnostic (Cloudflare Pages or Vercel; user owns DevOps and the remote repo). PWA with offline support. Save/resume in browser storage. Results download as both PDF and image; no share links. English only, no i18n layer (Indian regional wording variants still allowed). Item bank format left to Claude. Code license: user said "PGL", pending confirm GPL-3.0 vs AGPL-3.0.
- 2026-10-18: no database and no donation path in v1 (a database comes later). Consequence: per-condition auto-promotion has no data source in v1; Experimental mode runs on literature-seeded provisional parameters only.
