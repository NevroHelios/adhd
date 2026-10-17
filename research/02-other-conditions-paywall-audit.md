# Non-ADHD self-screening sites: monetization audit (2026-10-17)

Raw subagent report, pending main-session re-verification (see 00-report.md when written).

Method: WebFetch, plus curl/grep of page source for ad networks, BetterHelp affiliate links and price strings, plus Trustpilot and regulator articles. No forms submitted, no test completed, so post-quiz screens are inferred, not seen. HealthCentral/Psycom returned 403. The search budget ran out, so dyslexia funnels, apps and mental-age funnels are thin.

## Bottom line
- Validated public-domain screeners (PHQ-9, GAD-7, MDQ, OCI-R, AQ, RAADS-R, CAT-Q, LSAS) are mostly free with the score shown. They make money from ads, BetterHelp affiliate links, or assessment leads.
- Pay-after clusters in: (1) IQ test sites, (2) social-ad "personality test" sites that also sell ADHD/autism/depression reports, (3) autism/ADHD "test center" sites wrapping free instruments like RAADS-R.
- The typical shape is a ~$1-2 "result fee" that silently starts a ~$25-50 per 4 weeks subscription (subscription trap, not plain pay-after).
- The funnels were not obviously 50-200 items (unverified).

Categories: a fully free · b free score + upsell/lead-gen/ads · c pay-after · d paid upfront · e subscription trap · f unknown

| Site | Conditions | Instruments | Cat | Price | Evidence | Conf |
|---|---|---|---|---|---|---|
| embrace-autism.com | Autism, alexithymia, PDA, LSAS, ADHD | AQ, RAADS-R (80), CAT-Q (25), TAS | b | Score free; subscales/PDF $3.50 | RAADS-R/CAT-Q page source: "receiving your score are free… subscales for $3.50"; no ad scripts | High |
| psychology-tools.com | Dep, anx, autism, bipolar, OCD, PTSD, ED | PHQ-9, GAD-7, AQ, OCI | b (~a) | Free | About: "free to use", "BetterHelp Affiliate", "do not collect or retain any records" | High |
| screening.mhanational.org | Broad | PHQ-9, GAD-7, MDQ, PC-PTSD, OCI-R | a | Free | "Free mental health tests"; optional demographics; nonprofit | High |
| idrlabs.com | Hundreds | Mostly proprietary | b (ads) | Free | "view your results for free"; Raptive/AdThrive in source | High |
| openpsychometrics.org | Personality, little clinical | IPIP-based | a | Free | Publishes anonymous data, used in 25+ papers; no ads | Med-high |
| mind-diagnostics.org | 100+ incl. ADHD | Mixed | b (affiliate) | Free | FAQ "entirely for free"; BetterHelp aff_id links | High |
| psychologytoday.com/us/tests | Many | New in-house 20-item quizzes | b (therapist directory) | Free | numberOfItems: 20; no price strings; result screen not seen | Med |
| testyourself.psychtests.com | Personality, EQ, some MH | Proprietary, often 100+ items | c-lite | Full report $8.95-11.95 | "Snapshot report: Free / Full report: $11.95"; MERLOT review | High |
| queendom.com | Same company | Proprietary | c-lite | $6.95-9.95 | FAQ: free Snapshot; no refunds after report accessed | High |
| truity.com | Personality, career | Proprietary, 130 items | b | $19-29 | "brief, free report… unlock your full report" | Med-high |
| 16personalities.com | Personality | Proprietary | b | €29 | "you've only seen around 5%" | High |
| 123test.com IQ | IQ | Proprietary | b/d | $12.99 pro upfront | Page source; AdSense | Med-high |
| iqtest.com | IQ | Proprietary | b | Optional analysis | Trustpilot 1.6, company blames copycat domains | Med |
| test.mensa.no | IQ | Matrices | a | Free | No ad/price strings | Med |
| clinical-partners.co.uk | Autism | 30-item AQ-based | b (lead-gen) | Free | No email needed | Med |
| patient.info PHQ-9 | Dep | PHQ-9 | a/b | Free | Embedded calculator | Med |
| NHS Every Mind Matters | Wellbeing | 5-q Mind Plan | a | Free | Old self-assessment URL redirects | Med/low |
| rdos.net Aspie Quiz | Autism traits | Proprietary research | a | Free | Research storage, no ads | Med |
| psychcentral.com quizzes | Dep etc. | Proprietary/adapted | b (ads) | Free | DoubleClick | Med |
| healthcentral/psycom | Various | ? | f | ? | 403 | Low |
| brght.org | IQ | Proprietary adaptive | c/e | "from $19.95"; $1 trial then $24.99-49.99 | Trustpilot 3.0 (162) quotes | Med-high |
| myiq.com family | IQ | Proprietary | e | ~£1 then £24.99-29.99/mo | Which? 16 Jul 2026 (one victim: 31 payments, £464); Trustpilot | High |
| multitests.org | Autism + others | Undisclosed | e | €1.25 3-day trial, then €49.95/28 days | Own start page (first-party) | High |
| autismtestcenter.com | Autism | Reportedly RAADS-R | c/e | $1/30p then £29.95/$53.73 | Trustpilot 1.2 (138) | Med |
| personality.co | Personality (+ADHD reports?) | Proprietary | e | €1.95/7d, then €49.95/4wk | Trustpilot 4.0 (24k) but complaints; mypassion.ai (competitor) | Med-high |
| personality.cc | Personality, ADHD/autism | ? | e | £1.95 then £29.95/mo | Trustpilot 1.1 (332) | Med |
| testlibrary.com | Hub | ? | e? | "40.00 every 4 weeks" | Trustpilot reviews | Low-med |
| brainhealthassessment.com (Amen) | "Brain type" | Proprietary | b? (email gate?) | Free | Homepage only | Low |
| arealme.com | Mental age etc. | Proprietary | b (AdSense) | Free | Source | Med |
| bdadyslexia.org.uk checklist | Dyslexia | BDA checklist | a | Free | Page text | Med |

## Patterns
1. Funnel mechanics: social ad, no price shown, quiz, €0.50-1.95 "assessment fee", fine print converts it to a €25-50/4wk subscription, cancellation is hard.
2. Trustpilot averages are inflated by invited reviews; read the text.
3. Copycat domains blur per-site attribution.
4. Free validated instruments get resold behind paywalls (RAADS-R).
5. Good actors drift (Embrace Autism subscales now $3.50).

## Regulatory
- FTC v. Genesis Tech, 17 Jun 2026: ROSCA case. Products include Wisey, which "claims it can diagnose and treat ADHD symptoms". ftc.gov/news-events/news/press-releases/2026/06/ftc-sues-stop-sprawling-enterprise-operating-unlawful-subscription-schemes
- Which? 16 Jul 2026 on MyIQ; UK DMCC Act gives CMA fining powers; no CMA quiz case found.
- Norway Forbrukertilsynet (~2018-2024) on IQ tests sold via Snapchat; Nets blocked payments.
- Austria Watchlist Internet 2021: offiziell-qi-test.com gave above-average results regardless of answers.
- FTC click-to-cancel rule reportedly vacated 2025, rulemaking restarted 2026 (unverified).

## Free competitors / collaborators
MHA Screening, Psychology-Tools, Embrace Autism, Open Psychometrics, IDRlabs, Aspie Quiz, Mensa Norway, BDA checklist, Patient.info.

Niche: one ad-free, affiliate-free, open-source hub that shows all subscales, explains them, and stores nothing.
