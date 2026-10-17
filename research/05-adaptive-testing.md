# Adaptive testing (CAT/IRT) without breaking validity (2026-10-17)

Subagent report. DOIs verified by the agent via Crossref/PubMed; main session re-checked Levis 2020, Tseng 2026, Givon-Schaham 2026, Sparle Christensen 2025 and AI-GENIE 2026 (all resolve). [memory]/[unverified] = not confirmed.

## Bottom line
- For ADHD alone, CAT gains little over the 6-item ASRS screener.
- Adaptivity pays in **gating across conditions** (short screeners decide which longer scales to show).
- True item-level CAT is valid only on items with **published calibrations, used unmodified, with permission**.
- A self-calibrated bank can estimate θ but **cannot produce diagnostic cutoffs** without a clinician/structured-interview criterion subsample.

## 1. CAT in psychiatry
- CAT-DI: 389-item bifactor bank; ~12 items reach SE 0.3, r=.95 vs full bank; sens .92 / spec .88 (patients vs controls, which inflates accuracy). Gibbons 2012 Arch Gen Psychiatry doi:10.1001/archgenpsychiatry.2012.14. Critique by Carroll; reply JAMA Psychiatry 2013;70(7):763.
- CAT-ANX: n=1,614, sens/spec .86 for GAD. Gibbons 2014 AJP doi:10.1176/appi.ajp.2013.13020178.
- CAT-MANIA: Achtyes 2015 Psychiatr Serv doi:10.1176/appi.ps.201400390.
- CAT-SUD: AUC .85. Gibbons 2020 Addiction doi:10.1111/add.14938.
- Primary care: CAT-MH depression AUC .85 vs **PHQ-9 .84**. CAT did not beat a free 9-item form. Graham 2019 Ann Fam Med doi:10.1370/afm.2316.
- K-CAT youth (incl. ADHD): ~7 items/domain, AUC .83-.92. Gibbons 2020 JAACAP doi:10.1016/j.jaac.2019.08.009.
- CAT-Autism (caregiver): ~13 items vs >420, AUC .94-.95, not yet prospective. Tseng 2026 JAMA Netw Open doi:10.1001/jamanetworkopen.2026.22227.
- **Adult CAT-ADHD**: vendor lists it; **no peer-reviewed validation found**.
- Bifactor method: Gibbons & Hedeker 1992 doi:10.1007/BF02295430; Gibbons 2008 doi:10.1176/ps.2008.59.4.361.
- **All CAT-MH products are proprietary** (Adaptive Testing Technologies / Pearson). Banks and parameters are not public.
- PROMIS: Cella 2010 doi:10.1016/j.jclinepi.2010.04.011; Pilkonis 2011 doi:10.1177/1073191111411667 (has parameter tables; CRAN PROsetta `anchor_dep`). Depression CAT ~4.8 items. **No PROMIS ADHD bank.** Terms: embedding in your own CAT/app/web portal needs **written approval**, possibly fees; modified items aren't PROMIS. Contact help@healthmeasures.net.

## 2. Published IRT calibrations of adult ADHD items
**No clean, permissively licensed, general-population GRM calibration of the ASRS-18 exists.**

| Source | Items / sample | Usability |
|---|---|---|
| Gomez 2011 Assessment doi:10.1177/1073191110386341 | Barkley CSS, N=852, GRM | Barkley's wording, licensing unclear |
| Nitta 2020 Arch Clin Neuropsychol doi:10.1093/arclin/acaa041 | BAARS-IV, clinical, GRM | BAARS is commercial (Guilford) |
| Givon-Schaham & Shalev 2026 medRxiv doi:10.64898/2026.04.06.26350233 | ASRS-18, N=600 ages 20-80, bifactor GRM, categories collapsed 5→4 | Preprint; collapsed categories |
| Sanchez-Garcia 2015 Psychol Assess doi:10.1037/pas0000064 | ASRS-18 Rasch, n=170 SUD | Special sample |
| Sparle Christensen 2025 J Atten Disord doi:10.1177/10870547241312575 | ASRS-5 Rasch, n=714 DK; gender DIF items 3,4,6 | 6 items, so CAT is pointless |
| Polanczyk 2010 IJMPR doi:10.1002/mpr.319 | ASRS screener Rasch, Brazil | Poor fit |

ASRS v1.1 Part A was chosen by stepwise logistic regression (Kessler 2005 doi:10.1017/S0033291704002892); ASRS-5 by a sparse integer risk model (Ustun 2017). Licensing: ASRS-6 free with notice; ASRS-18 and ASRS-5 via Dr. Lenard Adler (NYU), per rckessler.scholars.harvard.edu.

## 3. Gating / multi-condition
- PHQ-2≥2 → PHQ-9≥10: sens .82 vs .86, spec .87 vs .85, AUC .90 vs .92, with fewer items answered. Levis 2020 JAMA doi:10.1001/jama.2020.6504 (IPD meta-analysis, 44,318 participants). Every gate loses some true cases.
- ASRS Part A → Part B (Part B has no separate validated cutoff).
- Transdiagnostic: Moore 2019 "p" CAT doi:10.1016/j.jpsychires.2019.05.028; Sunderland 2019 internalizing bifactor CAT doi:10.1177/1073191117707817; Seo & Weiss 2015 doi:10.1177/0013164415575147; HiTOP Kotov 2017 doi:10.1037/abn0000258; p factor Caspi 2014 doi:10.1177/2167702613497473. No adult HiTOP-wide CAT.
- **Recommendation**: gated battery: PHQ-2, GAD-2, ASRS-6, AQ-10 → full PHQ-9, GAD-7, ASRS-18.

## 4. Open-source engines
| Engine | License | GRM? | Browser? |
|---|---|---|---|
| catR (JSS 2012/2017) | GPL-3 | GRM [memory], unidimensional | webR binary exists, untested |
| mirt / mirtCAT | GPL-3 | Yes, multidimensional, bifactor; reference for calibration | webR binaries; Shiny GUI |
| jsCAT (@bdelab/jscat; Ma 2025 BRM) | ISC/MIT | **Dichotomous only** (4PL) | Yes |
| catjs-irt | GPL-3 | 4PL | Yes, immature |
| catsim (Python) | BSD-3 | 4PL | No |
| Concerto | Apache-2.0 | via R | No (server) |
| Firestar | ? | Simulation | No |

**No mature JS GRM-CAT exists.** Recommendation: calibrate and simulate in R (mirt/mirtCAT), ship a small TypeScript GRM engine (category probabilities, information, EAP on a quadrature grid, max-info selection, SE stop), and golden-test it against mirtCAT/catR to ~1e-3.

## 5. Pitfalls
- Barnum/Forer: Forer 1949 doi:10.1037/h0059240; Dickson & Kelly 1985 doi:10.2466/pr0.1985.57.2.367. Personalized prose feels accurate regardless of validity.
- Cutoffs (PHQ-9≥10, ASRS-6≥4 shaded) belong to the **complete fixed form**. Skip logic within a scale creates a new, unvalidated instrument.
- Exposure: content balancing matters more than Sympson-Hetter/a-stratification (Chang & Ying 1999 doi:10.1177/01466219922031338).
- DIF: ASRS age DIF on 5/18 items (preprint); ASRS-5 gender DIF. A CAT magnifies DIF.
- Calibration n: GRM ≥500 (Reise & Yu 1990 doi:10.1111/j.1745-3984.1990.tb00738.x); MGRM 500-1,000 (Jiang 2016 doi:10.3389/fpsyg.2016.00109); practical target ~1,000-2,000+ for bifactor + DIF (agent's judgment). **Calibration ≠ validation**: you need a SCID/MINI/DIVA criterion subsample.
- Self-selection biases norms.
- Privacy: GDPR Art. 9; FTC Health Breach Notification Rule; Washington's My Health My Data Act [memory, verify]; IRB before collecting; no IP/timestamps; client-side scoring by default; data donation only as a separate opt-in.

## 6. LLMs
- AIG works as a candidate generator, not a validator: Hommel 2022 Psychometrika doi:10.1007/s11336-021-09823-9; Götz 2024 Psychol Methods doi:10.1037/met0000540; Lee 2023 J Bus Psychol doi:10.1007/s10869-022-09864-6; Hernandez & Nie 2023 doi:10.1111/peps.12543; AI-GENIE 2026 BRM doi:10.3758/s13428-026-03082-1 (embedding-space structure only). **Evidence is for personality, not clinical screening.**
- Synthetic respondents are poor: Petrov 2024 arXiv:2405.07248.
- Conversational: HopeBot GPT-4o PHQ-9 ICC .92 but LoA ±4.2 points (flips classifications), Guo 2026 PLOS Digit Health doi:10.1371/journal.pdig.0001446; BDI-FS-GPT κ=.72, Jin 2026 doi:10.2196/78401; MAQuA arXiv:2508.07279 (vs random baseline). **No LLM adult ADHD screening study vs clinician.**
- Don't let an LLM choose, reword or score items at runtime. Offline drafting + calibration only; template-constrained explanations at most.

## Architecture ladder
| Level | What | Validity | Notes |
|---|---|---|---|
| L0 | Fixed validated scales verbatim | Fully evidence-backed | License check; base-rate wording; crisis resources |
| **L1** | **Gated multi-condition** | Evidence-backed for PHQ-2→9 | **Recommended first release**; offer a "show all scales" override |
| L2 | CAT on published params | θ only; PROMIS needs approval; **no open adult ADHD calibration** | TS GRM engine + golden tests |
| L3 | Self-calibrated bank, opt-in data | Not validated until proven; needs criterion subsample | Multi-year, IRB, legal review |
