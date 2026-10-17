<!-- Subagent report, saved verbatim. Main session re-checked 2026-10-18: PMIDs 29050505 (Sibley 2018), 32164655 (Beheshti 2020), 37366274 (Harrison & Edwards 2023), 33126147 (Groen 2020), 27255536 (Mowlem 2019) all resolve with matching titles via Europe PMC. Ustun 2017 (PMC5470397) confirms ASRS-5 uses unequal per-option integer weights ("each response option a whole number in the range of 0-5"), so flat 0-4 scoring is wrong; the exact weight values sit in a figure not extracted here. The article has a 2019 correction (JAMA Psychiatry 76(11):1213). -->

# Adult ADHD self-screen crosswalk: what existing tests ask (2026-10-17)

I looked at about 25 instruments: 9 validated scales and about 17 public quizzes, five of which are verbatim ASRS copies. The overall picture:

- **Most quizzes are the ASRS.** About two-thirds of the public quizzes reproduce or lightly edit ASRS v1.1, so their DSM coverage is mostly the ASRS's coverage.
- **Diagnostic gating is almost never asked.** Only the validated tools (DIVA-5, BAARS-IV, WFIRS, CAARS 2) cover childhood onset, cross-setting impairment, other explanations and substance use. Among popular sites, one asks about comorbidity, two ask about impairment and two ask about childhood. None asks about substance use.
- **Popular-only constructs don't separate ADHD from other conditions.** RSD, hyperfocus, time blindness and sensory items show up only on non-ASRS sites. Where they've been studied, they are raised in ADHD compared with healthy people but not specific to ADHD versus anxiety, depression, borderline personality disorder (BPD), bipolar disorder or autism.

**How the data was gathered**
- Four parallel research agents fetched pages, PDFs, embedded page data and public quiz APIs.
- No quiz was submitted, no data was entered, and nothing was written to the project.
- Proprietary items are paraphrased in 12 words or fewer. ASRS v1.1 items are referenced by number; the full text is in the PDF linked under Sources.
- Item numbers are each site's own order. Mapping items to DSM criteria is the agents' judgment, not the sites' claims.
- Web search ran out partway through for three agents. Anything marked "memory" or "secondary" was not checked against a primary source.

## Sources (column keys)

**Validated scales**

| Key | Source |
|---|---|
| DSM | DSM-5-TR. Manual not accessed; paraphrase via https://thrivingwithadhd.com.au/dsm-5-diagnostic-criteria/ cross-checked against DIVA-5 |
| ASRS | ASRS v1.1, 18 items: https://add.org/wp-content/uploads/2015/03/adhd-questionnaire-ASRS111.pdf (the Harvard URL returned 503) |
| A5 | ASRS-5, Ustun 2017: https://npsych-rehab.com/wp-content/uploads/2025/05/ASRS-V5.pdf and https://psychiatryonline.org/doi/10.1176/appi.pn.2017.5b22 |
| WURS | WURS-25: https://novopsych.com/wp-content/uploads/2025/07/ADHD-rating-scale-for-adults.pdf |
| BAARS | BAARS-IV: https://www.guilford.com/excerpts/barkley19.pdf?t=1 and https://doctorlavine.com/add-adhd-counseling/baars-iv-self-report-online-test/ |
| CAARS | CAARS / CAARS 2, subscales only: https://cdn.mhs.com/mhsdocs/Marketing_Files/ClinEd/CAARS2/CAARS2_Comparing_HUB_2024.pdf |
| DIVA | DIVA-5: https://www.divacenter.eu/diva-5/about-diva-5/ plus a clinic transcription at https://hellodoc.com.au/wp-content/uploads/2025/10/HelloDoc-DIVA-5.0.pdf |
| WF | WFIRS-S, 69 items: https://www.caddra.ca/wp-content/uploads/WFIRS-S.pdf |

**Popular quizzes**

| Key | Source |
|---|---|
| MD | Mind Diagnostics, 6 items: https://www.mind-diagnostics.org/adhd-test (items from GET /api/screener/3/web) |
| PT | Psychology Today, 20 items: https://www.psychologytoday.com/us/tests/health/adhdattention-deficit-disorder-test (the old PsychTests pages return 404) |
| ADa | ADDitude adult test, 6 items: https://www.additudemag.com/adhd-symptoms-test-adults/ |
| ADw | ADDitude women's test, 18 items: https://www.additudemag.com/self-test-adhd-symptoms-women-girls/ |
| ADi | ADDitude "inattentive" test, 15 items: https://www.additudemag.com/add-inattentive-adhd-symptom-test-adults/ |
| PC | Psycom, 10 items: psycom.net/adhd-test redirects to https://www.healthcentral.com/quiz/adhd-test?legacy=psycom |
| Done | Done, 6 symptom items plus 7 screening questions: portal.donefirst.com/assessment |
| CLN | ASRS 1-18 verbatim or near-verbatim. Cerebral (https://www.cerebral.com/screeners/adhd-self-test), Talkiatry (https://www.talkiatry.com/adhd-test), Psychology-Tools (https://psychology-tools.com/test/adult-adhd-self-report-scale), Klarity (https://helloklarity.com/tests/adhd-test/), Exceptional Individuals (https://exceptionalindividuals.com/candidates/neurodiversity-resources/neurodiversity-quizzes/adhd-quiz-test/) |
| SLS | SLS Psychiatry, ASRS 1-10 verbatim: https://slspsychiatry.com/quiz/adhd |
| IDa | IDRlabs Adult ADHD, 18 items: https://www.idrlabs.com/adult-adhd/test.php |
| IDb | IDRlabs ADHD Test, 18 items: https://www.idrlabs.com/adhd/test.php |
| ID3 | IDRlabs 3-minute test, 10 items: https://www.idrlabs.com/3-minute-adhd/test.php |
| IDs | IDRlabs ADHD Spectrum, 35 items: https://www.idrlabs.com/adhd-spectrum/test.php |
| A360 | Autism360, 40 items: https://autism360.com/adhd-test-online-quiz-for-adults-and-children/ |
| FAT | freeadhdtest.org, 18 items, one per DSM criterion: https://freeadhdtest.org/adhd-quiz |
| AR | Arealme, 21 scored items: https://www.arealme.com/adhd-test/en/ |

**Could not access items, or no test exists**
- Psych Central / Healthline (https://psychcentral.com/quizzes/adhd-quiz): items not visible without completing (loaded by script, which returned 403).
- ADHD Online (adhdonline.com): paid evaluation and free "Snapshot" are both behind an account.
- Done's forms after signup: not visible.
- adhd-test.org: an empty app shell; its code was not extracted.
- Truity: no ADHD test.
- IDRlabs: no separate ASRS page (404).
- Psychology-Tools: no WURS (redirects to the homepage).
- Embrace Autism: ASRS and WURS pages are 404.
- HealthyPlace (503), Verywell Mind (402); adhdtest.org, adhd-test.com and testmyadhd.com did not connect.
- No quiz with 50+ questions was confirmed. Autism360's banner says "50 Questions" but the page has 40. The longest found are A360 (40), IDs (35) and PT (20). After search ran out, the agent could only guess URLs, so long quizzes may exist that weren't found.
- AISRS, the expanded ASRS and ADHD-RS were not researched. BDEFS details are from memory.

## 1. Crosswalk

- Numbers are item numbers. Y = covered (for BAARS, CAARS and DIVA, which mirror DSM symptom by symptom). p = partial or loose fit. R = reverse-keyed. fc = forced-choice item. "–" = not covered.
- BAARS, CAARS and DIVA symptom rows are inferred from their DSM-aligned structure; individual items were not checked one by one.
- Two sources from the brief have no column. CAARS appears only through its subscale names. The BDEFS (Barkley's executive-function rating scale) appears only in the time-management row, from memory.

### 1a. DSM-5 A criteria

| Domain | DSM | ASRS | A5 | WURS | BAARS | CAARS | DIVA | WF | MD | PT | ADa | ADw | ADi | PC | Done | CLN | SLS | IDa | IDb | ID3 | IDs | A360 | FAT | AR |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A1a careless mistakes | Y | 7 | – | – | Y | Y | Y | – | – | 1 | – | – | – | 3 | – | 7 | 7 | 7 | 1 | 8 | 1 | 5,9 | 2 | – |
| A1b sustaining attention | Y | 8 | – | 1p | Y | Y | Y | – | – | 3p | – | – | – | – | – | 8 | 8 | 8,9 | 5 | – | 2 | 1R,33R | 1 | 16fc |
| A1c not listening | Y | 9 | 1 | 4p | Y | Y | Y | – | – | 3 | 1 | – | – | 7 | – | 9 | 9 | 4 | 6 | – | 3 | 4 | 3 | 10,11 |
| A1d follow-through | Y | 1 | – | 7 | Y | Y | Y | – | 5 | 6R,12 | – | – | 9 | 2 | 1 | 1 | 1 | 1 | 3R | 1 | 5 | 7 | 4 | 5 |
| A1e organizing | Y | 2 | 6p | – | Y | Y | Y | – | 6 | – | 2p | 4,5,8,13 | – | – | 2 | 2 | 2 | 2 | 9R | 2 | – | 8 | 5 | 17p |
| A1f avoids effortful tasks | Y | 4 | 5p | – | Y | Y | Y | – | 3 | 7 | 4p | – | – | 1 | 4 | 4 | 4 | 6 | 8 | 4 | 22 | 3 | 6 | 8 |
| A1g loses things | Y | 10 | – | – | Y | Y | Y | – | – | 8 | – | – | 14 | 8 | – | 10 | 10 | 5 | 7R | – | 6 | 6 | 7 | 19 |
| A1h distractible | Y | 11 | – | 1 | Y | Y | Y | – | – | 12,13 | – | 10,15p | 3 | 9 | – | 11 | – | 9 | 4 | – | 4 | 2 | 8 | 3 |
| A1i forgetful | Y | 3 | – | – | Y | Y | Y | – | 4 | – | – | 1 | – | 5 | 3 | 3 | 3 | 3 | 2 | 3 | 7,9,10 | – | 9 | 7(child),9 |
| A2a fidgets | Y | 5 | – | 3 | Y | Y | Y | – | 1 | 17 | – | – | 10,15 (duplicate) | 4 | 5 | 5 | 5 | 11 | 16 | 5 | 13,15 | 22 | 10 | – |
| A2b leaves seat | Y | 12 | 2 | – | Y | Y | Y | – | – | 5R | 6 | – | 2 | – | – | 12 | – | 17 | 14 | – | 11 | 18,27 | 11 | 14 |
| A2c restless | Y | 13 | – | 3 | Y | Y | Y | – | – | – | – | – | 11 | 4 | – | 13 | – | 12 | 12 | – | 12,35(child) | 21 | 12 | – |
| A2d leisure quietly | Y | 14p | 3p | – | Y | Y | Y | – | – | 19R | 5p | – | – | 6 | – | 14 | – | 18 | 17R | – | – | 15R | 13 | – |
| A2e "driven by a motor" | Y | 6 | – | – | Y | Y | Y | – | 2 ("autopilot") | – | – | 12p | 11 | 6 | 6 | 6 | 6 | 10 | 18 | 6 | – | 17 | in 12 | 4 |
| A2f talks excessively | Y | 15 | – | – | Y | Y | Y | – | – | 2 | – | – | 5 | – | – | 15 | – | 14 | 13R | – | 14 | 23 | 14 | 2 |
| A2g blurts / finishes sentences | Y | 16 | 4 | – | Y | Y | Y | – | – | 10 | 3 | – | 12 | – | – | 16 | – | – | 15 | 9 | 32 | 19 | 15 | 16fc |
| A2h waiting turn | Y | 17 | – | – | Y | Y | Y | – | – | 9 | – | – | – | 10 | – | 17 | – | 15 | 10 | 7 | 33 | 16,26 | 16 | 16fc |
| A2i interrupts | Y | 18 | – | – | Y | Y | Y | – | – | 20 | – | – | – | – | – | 18 | – | 13 | 11 | – | 34 | 20,28 | 17 | 15fc |

### 1b. DSM gating criteria and extra domains

| Domain | DSM | ASRS | A5 | WURS | BAARS | CAARS | DIVA | WF | MD | PT | ADa | ADw | ADi | PC | Done | CLN | SLS | IDa | IDb | ID3 | IDs | A360 | FAT | AR |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| B childhood onset | Y | clinician note | – | whole scale | childhood form + onset age | not found | Y | – | – | – | – | – | – | – | – | – | – | – | – | – | 16-20,35 | – | – | 7 |
| C 2+ settings | Y | clinician note | – | – | settings checklist | – | Y | domains | – | – | – | – | – | – | – | – | – | – | – | 10p | – | – | – | – |
| D impairment | Y | clinician note | 6p | – | Y | Y (CAARS 2) | Y | all 69 items | – | 4p,16p | – | 6,17,18 | 6,8 | – | – | – | – | – | – | 10 | 21 | – | – | – |
| E rule-out / comorbidity | Y | – | – | 2,9,11,17 (mood) | – | anxiety/sadness screeners, suicide items (CAARS 2) | clinician | – | – | – | – | – | – | – | 7-12 (exclusion) | – | – | – | – | – | – | 30p | – | – |
| Substance use | – | – | – | – | – | – | – | Risk domain (tobacco, cannabis, alcohol, drugs) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| General impulsivity / risk-taking | – | – | – | 15,18 | – | Impulsivity scale | – | Risk domain | – | 11,18 | – | – | 12 | – | – | – | – | 16 | – | – | 31 | 25,35 | 18 | 1 |
| Emotional dysregulation | associated feature only | – | – | 5,6,12,13,14,18,19 | – | Emotional Lability / Dysregulation scale | – | p (Family, Self-Concept) | – | 14 | – | 2,3 | 1 | – | – | – | – | – | – | – | 24,26-30 | 36,38R,39,40R | – | 13,20 |
| Rejection sensitivity / RSD | – | – | – | – | – | – | – | – | – | – | intro only, no item | – | – | – | – | – | – | – | – | – | – | – | – | 12,15fc |
| Time management / "time blindness" | in A1e | – | 5p | – | – | – | p (double-booking) | lateness items | – | 4 | – | 7 | 4 | – | – | – | – | – | – | – | 9 | 13R | – | – |
| Hyperfocus | – | – | – | – | – | – | p (interest exception) | – | – | 15 | – | – | – | – | – | – | – | – | – | – | – | 11,34 | – | – |
| Sleep | – | – | – | – | SCT 2p | p (CAARS 2 impairment) | – | bed / sleeping items | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| Procrastination | p (A1f) | 4p | 5 | – | – | – | – | – | 3 | 4 | 4 | – | – | 1 | 4 | 4 | 4 | 6 | 8 | 4 | 22 | 3 | – | 8 |
| Executive function / working memory | – | – | 6 | – | SCT 3,9 | Inattention/Executive Dysfunction (CAARS 2) | – | – | – | – | 2 | 13,16 | 6 | – | – | – | – | – | – | – | 23 | 12R,31 | – | 11,17 |
| SCT / cognitive disengagement | – | – | – | 4p | 9 items | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| Money / impulsive spending | p (A1i bills) | – | – | – | – | p (CAARS 2) | – | money item | – | 16R | – | 7,9 | 13 | – | – | – | – | – | – | – | 8 | 14R,20,25 | – | 18 |
| Boredom / novelty-seeking | – | – | – | – | SCT 4 | – | – | – | – | – | – | – | 8 | 2 | – | – | – | – | – | – | – | 10 | – | 6 |
| Self-esteem / self-concept | – | – | – | 11,17 | – | Self-Concept scale | self-image domain | Self-Concept domain | – | – | – | 4,6,11,14 | 7 | – | – | – | – | – | – | – | 27 | – | – | – |
| Relationships / social | – | – | – | 20,21 | – | – | Y | Family, Social domains | – | – | – | 1,5 | 4 | – | – | – | – | – | – | – | – | 24,28 | – | – |
| Sensory overload | – | – | – | – | – | – | – | – | – | – | – | 2,10,15 | – | – | – | – | – | – | – | – | 19 | 37 | – | – |
| Autism-like / motor-coordination (DCD) items | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 16-18,20,25 | 29,32 | – | – |

**Reading the tables**
- **Pure ASRS clones.** CLN, Done (Part A), SLS, IDa, IDb, ID3 and FAT are essentially DSM-only. Done's six symptom items are ASRS Part A verbatim. Its seven yes/no screening questions (bipolar, psychosis, schizophrenia, suicide attempt, cardiac condition, hospitalization, over 18) make it the only popular site that touches comorbidity.
- **Non-ASRS quizzes add new domains.** PT, ADw, ADi, IDs, A360 and AR bring in the extra domains, and IDs and A360 also bring in autism and motor-coordination items.
- **WURS-25 is mostly not about attention.** Only about 6 of its 25 items are core attention or hyperactivity; 16 are mood, conduct, self-esteem or social.
- **ASRS-5 items 5 and 6 aren't DSM symptoms.** "Puts things off until the last minute" and "depends on others to keep life in order" were picked by machine learning from a pool of 29 candidates.

## 2. Domains on popular sites but not in core validated screeners

The verdicts come from the evidence agent. It checked citations via Europe PMC and searches; "verified" means it saw the abstract, not the full paper.

| Domain | Where it appears | In any validated tool? | Verdict on the evidence |
|---|---|---|---|
| Rejection sensitive dysphoria (RSD) | AR 12, 15; ADDitude intro (no item) | No. The agent found no validated RSD measure. | **Mostly popular media.** Evidence for RSD itself: Dodson et al. 2024 (*Acta Scientific Neurology*, 4 cases from the author's practice); qualitative studies with n=5 and n=43. Downey-style rejection sensitivity is modestly raised with ADHD symptoms (Bondü & Esser 2015, PMID 24878677; Babinski 2019, PMID 30155685; both youth community samples). It correlates about .33-.41 with depression, anxiety and BPD (Gao 2017, PMID 28841457), so it isn't specific. The "99% of ADHD have RSD" figure traces to a newsletter. |
| Hyperfocus | PT 15; A360 11, 34 | No | **Mixed even vs healthy controls; not specific.** Hupfeld et al. 2019 (PMID 30267329): linked to symptom levels, mostly non-clinical samples. Groen et al. 2020 (PMID 33126147): ADHD and matched controls "did not differ" on hyperfocus. Dwyer et al. 2024 (*Neurodiversity*): raised equally in autistic and ADHD adults. |
| Time blindness | PT 4, ADw 7, ADi 4, A360 13 | Partly. BDEFS has a time-management subscale (memory); WFIRS asks about lateness; DSM A1e mentions time management. | **Raised but not specific.** Marx 2022 (PMID 34923055): broad timing deficits. Zheng 2022: effect sizes g≈.4-.66, child data only, shrinking with age. Timing deficits also occur in schizophrenia, bipolar, depression and autism. "Time blindness" is a media label; the research term is "timing deficits". |
| Emotional dysregulation | PT, ADw, ADi, IDs, A360, AR | Yes: CAARS, WURS. DSM-5-TR lists it as an associated feature, not a criterion. | **Raised but not specific.** Large effect vs controls (g=1.17; Beheshti 2020, PMID 32164655). Levels are similar to or lower than in BPD (Rüfenacht 2019; Cavelti 2019) and comparable to bipolar disorder (Richard-Lepouriel 2016, PMID 27031290). |
| Sensory overload; autism and motor-coordination items | ADw, IDs, A360 | No (in these ADHD tools) | These items screen for autism or developmental coordination disorder, not ADHD. They will inflate scores in autistic users. |
| Money / spending, boredom, risk-taking | PT, ADi, IDs, A360, AR | Yes, as impairment or associated features: WFIRS, CAARS 2, BAARS SCT ("easily bored") | No discrimination studies found. Better treated as impairment questions than as symptom questions. |
| Procrastination | Most sites, through ASRS 4 or ASRS-5 item 5 | Yes: ASRS-5 item 5 | Correlates about .43 with ADHD symptoms in undergraduates (Niermann & Scheres 2014). A scoping review found 96% of studies used non-clinical samples. Also tied to depression and anxiety (a 2025 meta-analysis, known only from a search summary). Not specific. |
| Sleep | No popular item (ADHD Online's snapshot claims sleep but its items weren't visible) | Yes: WFIRS | Delayed sleep phase in 36-78% of adults with ADHD (Bijlenga 2019; van der Ham 2024, PMID 39354860). Largely driven by comorbidity (Weibel 2017). Longer time to fall asleep is the one partly specific signal. |
| Mind wandering (no site uses it) | – | Research scale: MEWS | **The most promising candidate here, but thin.** Mowlem 2019 (PMID 27255536): sensitivity and specificity both about .90, but against healthy controls only. Moukhtarian 2020: ADHD stayed above BPD after adjusting for anxiety and depression (groups of 19-29). |

**Self-report validity cuts across all of the above.**
- Screeners rule ADHD out better than they rule it in: negative predictive value above 96%, but in clinical samples positive predictive value "at best ... 61%, but most fell below 20%" (Harrison & Edwards 2023, PMID 37366274).
- ASRS positive predictive value is 21% in major depression (Dunlop 2018) and 26% in substance-use treatment (van de Glind 2013).
- Of the top 100 TikTok ADHD videos, 52% were misleading (Yeung et al. 2022, PMID 35196157).

## 3. What popular sites leave out

1. **Childhood onset (criterion B).** Only IDs (with a motor and sensory slant) and AR (one homework item) ask. Psycom and Mind Diagnostics discuss it in page text but have no item. This is a high-value omission: in the MTA comparison group, about 95% of positive adult checklist screens were excluded after full history, substance use and other disorders were considered (Sibley 2018, PMID 29050505). The late-onset debate is contested: Moffitt 2015 (PMID 25998281) and Agnew-Blais 2016 found apparent late onset in cohort studies.
2. **Symptoms in two or more settings (criterion C).** Only ID3 item 10 touches it. No site asks for each setting separately the way DIVA (5 adult domains) or BAARS (school, home, work, social) do.
3. **Impairment (criterion D).** Rare. Nearly every ASRS clone scores symptom frequency alone. Even the ASRS form tells clinicians to assess impairment separately; the clones drop that instruction.
4. **Ruling out other explanations (criterion E).** Only Done (as eligibility exclusions). SLS and Psycom mention anxiety, depression and sleep in result text only.
5. **Substance use.** No popular site asks; only WFIRS does among the validated tools.
6. **ASRS Part B and response-validity checks.** Cerebral asks Part B but scores it 0. No site has inconsistency or over-reporting checks like those in CAARS 2.
7. **Symptom duration of 6 months.** Lost wherever the time frame is shortened (see section 4).
8. **Lopsided symptom coverage.** A2i (interrupting) and A2f (talking too much) are absent from ADa, ADw, PC and MD. ADDitude's "inattentive" test contains mostly hyperactive and impulsive items.

## 4. Response formats, time frames, impairment and onset

| Source | Format | Time frame | Impairment asked? | Onset asked? |
|---|---|---|---|---|
| ASRS v1.1 | Never to Very Often (5 points); Part A uses shaded thresholds (see below) | Past 6 months | Clinician note only | Clinician note: "some" childhood symptoms needed |
| ASRS-5 | 0-4, total 0-24; cutoff ≥14 (secondary sources) | Past 6 months | No | No |
| WURS-25 | 0-4 severity, starting "As a child I was…"; cutoff 36 (or 46 to separate ADHD from depression/anxiety) | Childhood | No | Whole scale is retrospective |
| BAARS-IV | 1-4 (Never/rarely to Very often); a symptom counts at 3-4 | Past 6 months; childhood ages 5-12 | Settings checklist | Onset-age question |
| CAARS 2 | Proprietary, online scoring | Not found | Yes, item-level | Not found |
| DIVA-5 | Interview; yes/no per criterion with examples | Adult ≥6 months; child 5-12 | Yes, 5 adult domains, ≥2 required | Yes, every symptom |
| WFIRS-S | 0-3 plus "not applicable" | Last month | Entirely impairment | No |
| MD | Never to Always; ASRS Part A-style cutoffs | 6 months | No | No |
| PT, A360, IDb, IDs | Agree/disagree with reverse-keyed items | None | Indirect | IDs only |
| ADa, ADw, ADi, PC | Frequency scale (ADw puts it on "Have you ever…" questions; ADi mixes two scales; ADa's footer says "if you answer yes") | None; PC "past few months" | ADw, ADi indirect | No |
| Done, CLN, SLS, FAT | Never to Very Often (Cerebral reverses the order; Exceptional Individuals has no "Never") | Cerebral and Klarity 6 months; **SLS 2 weeks**; others none | No | No |
| ID3 | PHQ-style ("Several days" … "Nearly every day") | **"The past weeks"** | Item 10 | No |
| AR | Mixed: yes/no/occasionally plus forced-choice scenarios | None | No | Item 7 |

**Format observations**
- **Short windows mismeasure ADHD.** Two-week and "past weeks" windows are depression-screener conventions. They measure states (stress, burnout, a bad month) rather than ADHD's lifelong pattern.
- **Missing "Never" biases scores upward.** On Exceptional Individuals, the lowest possible answer still partly endorses the symptom.
- **ASRS Part A thresholds.** Items 1-3 count from "Sometimes" up; items 4-6 count from "Often" up; 4 or more marks is a positive screen. (Secondary sources also put items 9, 12, 16 and 18 at the Sometimes level; those are Part B.) This comes from secondary sources (Blueprint, CoralEHR) because the shading doesn't survive text extraction.
- **Two scoring issues to check before you build.**
  - Kessler reportedly withdrew the DSM-5 rescoring of ASRS v1.1 in a December 2023 memo (seen only in a search summary).
  - One secondary source says ASRS-5 uses proprietary item weights, which conflicts with the plain 0-4 form. Check Table 2 of Ustun 2017 before implementing.
- **ASRS-5 licensing.** It is © NYU/Harvard and permission-based. That matters for an open-source site; ASRS v1.1 is the freely distributed one.

## 5. Dated examples and suggested modern equivalents (UNVALIDATED)

These rewordings have **not been validated**. Changing wording changes how people answer, so any reworded item needs its own psychometric testing before you use the original cutoffs.

| Original (source) | Construct | Suggested modern wording (unvalidated) | Caveat |
|---|---|---|---|
| "leave your seat in meetings" (ASRS 12, A5 2, ADa 6, IDb 14, EI) | A2b, leaving when expected to stay put | "...get up or leave when you're expected to stay put (class, in-person meetings, long meals, staying on camera in video calls)" | Remote work removes the constraint, so the behavior may simply not occur. Consider a "not applicable" option. |
| "returning calls", "paying bills" (DSM A1i, DIVA) | A1i, daily forgetfulness | "replying to messages or emails you meant to answer; renewing, cancelling or paying things on time" | Autopay and reminders mask the symptom (see the compensation note below). |
| "preparing reports, completing forms, reviewing lengthy papers" (DSM A1f) | A1f, avoiding effortful tasks | "long emails, online forms, tax or benefit portals, long documents" | – |
| agenda/diary; "loses notes, lists or telephone numbers" (DIVA) | A1e / A1g | "doesn't keep a calendar app or to-do list going; loses passwords, notes or files" | – |
| "forget to send a card / phoning" (DIVA); thank-you notes (ADw 1) | A1i / relationships | "forgets birthdays or to check in with friends by message" | – |
| "balance checkbook" (ADw 9); "paper" (ADw 7) | Money and organization | "keeping track of accounts and subscriptions"; "documents and digital clutter" | – |
| "unable to watch TV or films quietly" (DIVA) | A2d | "struggles to watch a film or show without needing to do something else at the same time" | Second-screening is now near-universal, so this item may lose its ability to separate ADHD from everyone else. |
| "wait in queue or on hold"; "waiting in line 30 min" (A360, AR) | A2h | Keep queues; add "waiting for others to finish speaking in calls or meetings" | – |
| "interrupt others when they are busy" (ASRS 18) | A2i | Add "repeatedly messaging people who are busy" | This adds a new behavior, so it may not measure the same construct. |
| "internet, video games or TV"; "cigarettes" (WFIRS) | Impairment / risk | Add "phone, social media, short-form video"; "vaping" | – |
| "put your ideas on paper" (EI); "taking notes" (WFIRS) | Writing / school | "put your ideas in writing" | – |
| "visits to principal's office"; "stick-to-it-tiveness" (WURS) | Childhood conduct / persistence | "sent out of class or to the head teacher"; "sticking with things" | US-centric idioms. |
| "homework assignments" (AR) | Childhood A1i | Fine as a childhood item; just label it as retrospective. | – |

**Compensation masking.** Phone reminders, autopay and Find-My trackers can lower a person's frequency score while the underlying deficit stays the same. Two existing items already capture this: ASRS-5 item 6 ("depend on others") and AR item 17 ("rely on reminders"). One option is to ask "how often would this happen without reminders or tools?" That is also unvalidated, and it relies on people imagining a counterfactual, which they may do inaccurately.

## Open questions before you build

- **ASRS-5 licensing.** Do you want permission-based ASRS-5 content on an open-source site, or only ASRS v1.1, which is freely distributed?
- **Childhood items.** Will you add a childhood section? WURS-25 is mostly mood and conduct items; the BAARS-IV childhood form is closer to DSM.
- **Settings and impairment.** Will you add DIVA-style per-setting impairment questions? They're the biggest coverage gap on popular sites.
- **Items worth reading in full:** DSM-5-TR from the manual itself, Table 2 of Ustun 2017 (ASRS-5 weights), and the BDEFS manual.

## Sources

- [ASRS v1.1 (add.org)](https://add.org/wp-content/uploads/2015/03/adhd-questionnaire-ASRS111.pdf)
- [ASRS-5 form](https://npsych-rehab.com/wp-content/uploads/2025/05/ASRS-V5.pdf)
- [ASRS-5 article, Psychiatric News](https://psychiatryonline.org/doi/10.1176/appi.pn.2017.5b22)
- [DSM-5-TR criteria summary](https://thrivingwithadhd.com.au/dsm-5-diagnostic-criteria/)
- [WURS-25 (NovoPsych)](https://novopsych.com/wp-content/uploads/2025/07/ADHD-rating-scale-for-adults.pdf)
- [BAARS-IV excerpt (Guilford)](https://www.guilford.com/excerpts/barkley19.pdf?t=1)
- [BAARS-IV online form](https://doctorlavine.com/add-adhd-counseling/baars-iv-self-report-online-test/)
- [CAARS vs CAARS 2 (MHS)](https://cdn.mhs.com/mhsdocs/Marketing_Files/ClinEd/CAARS2/CAARS2_Comparing_HUB_2024.pdf)
- [DIVA-5 overview](https://www.divacenter.eu/diva-5/about-diva-5/)
- [DIVA-5 transcription (HelloDoc)](https://hellodoc.com.au/wp-content/uploads/2025/10/HelloDoc-DIVA-5.0.pdf)
- [WFIRS-S (CADDRA)](https://www.caddra.ca/wp-content/uploads/WFIRS-S.pdf)
- ASRS shading: [Blueprint](https://ebchelp.blueprint.ai/en/articles/3273474-adult-adhd-self-report-scale-asrs-v1-1), [CoralEHR](https://www.coralehr.com/blog/asrs-shaded-boxes-scoring-guide/)
- Popular-quiz URLs are in the source table at the top.
- Papers are cited inline by PMID or journal.