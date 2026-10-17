# ADHD as a continuum, and Bayesian adaptive scoring (2026-10-17)

Subagent report, condensed. [V] = the agent verified it via Crossref/search. [M] = from memory, unchecked. Main session re-checked via Crossref (all resolve): Haslam 2006, Haslam 2020, Lubke 2009, Brevik 2020, Song 2021, Finkelman 2012, Shwartz 2020, Michelini 2024.

## 1. Continuum or category
- Taxometrics (tests for a hidden category) find a **continuum**:
  - Haslam 2006 ANZJP doi:10.1111/j.1440-1614.2006.01863.x: ~3,000 youth. Threshold should be set "on pragmatic grounds (e.g. impairment or need for treatment)".
  - Frazier 2007 doi:10.1037/0894-4105.21.1.45.
  - Marcus & Barry 2011 doi:10.1037/a0021405: dimensional scores predicted outcomes better than yes/no splits.
  - Marcus 2012 doi:10.1016/j.jpsychires.2012.03.010: 600 adults, dimensional.
- Meta-analysis of taxometric research: Haslam 2020 Psychol Med doi:10.1017/S003329172000183X: 317 findings, mean CCFI .392. ADHD is not among the "possibly taxonic" constructs.
- Model comparison: Lubke 2009 JAACAP doi:10.1097/CHI.0b013e3181ba3dbb: about 8,000 twins. Continuous models fit better; two correlated continua (inattention and hyperactivity-impulsivity).
- Genetics:
  - Larsson 2012 doi:10.1111/j.1469-7610.2011.02467.x: heritability ~.60 at both the diagnostic cutoff and the subthreshold cutoff.
  - Martin 2014 doi:10.1016/j.biopsych.2014.02.013: polygenic scores from clinical cases predict population traits.
  - Demontis 2019/2023: large genome-wide studies.
  - Brikell doi:10.1038/s41380-018-0109-2: ADHD polygenic risk also loads on general psychopathology (not specific to ADHD).
- Distributions: Brevik 2020 doi:10.1002/brb3.1605: ASRS-18 means 45.0 (SD 12.6) in cases vs 23.0 (SD 9.8) in controls, AUC .904. The paper has an overlap figure. No published general-population ASRS histogram was found; the right-skew/floor shape is [M].
- Prevalence: Song 2021 doi:10.7189/jogh.11.04009: persistent adult ADHD 2.58%, symptomatic 6.76%. Steep age gradient: ~5% at 18-24, 0.8% at 60+.
- Beyond a single continuum:
  - Bifactor models: g is reliable, the specific factors are "elusive" (Wagner doi:10.1007/s00787-015-0709-1).
  - Karalunas 2014 temperament profiles (retracted and replaced; cite the replacement).
  - Kessler 2010 doi:10.1001/archgenpsychiatry.2010.146: executive-function items add information.
  - These findings show more dimensions, not a hidden category.

**Design implication:** "probability of having ADHD" is ill-defined. Define either (a) θ / a percentile, or (b) P(a clinician would diagnose | answers). Option (b) also depends on onset, impairment and exclusions, which symptom items cannot measure. Use 2 dimensions plus g; don't promise reliable subscale profiles.

## 2. Bayesian CAT: settled method
- GRM: Samejima 1969 doi:10.1007/BF03372160.
- Owen 1975 doi:10.1080/01621459.1975.10479871: Bayesian sequential adaptive test.
- Bock & Mislevy 1982 doi:10.1177/014662168200600405: EAP on a grid; each answer adds one log-likelihood term; posterior SD ≈ standard error.
- Item selection:
  - van der Linden 1998 doi:10.1007/BF02294775: posterior-weighted information, minimum expected posterior variance.
  - Chang & Ying 1996 doi:10.1177/014662169602000303: KL information, better early in the test.
  - Choi & Swartz 2009 doi:10.1177/0146621608327801: polytomous items.
  - Wang & Chang 2011 doi:10.1007/s11336-010-9186-0: multidimensional KL.
- Classification stops: Eggen 1999 doi:10.1177/01466219922031365 (SPRT); Spray & Reckase 1996 doi:10.3102/10769986021004405 (sequential Bayes); Thompson 2009 doi:10.1177/0013164408324460.
- **Curtailment** (stop a fixed form once the decision can't change):
  - Finkelman 2011 doi:10.1002/sim.4231.
  - Finkelman 2012 doi:10.1177/0146621612451647: CES-D up to 22% shorter with 100% agreement with the full form. Stochastic curtailment saved about as many items as CAT with more agreement.
  - Smits 2016 doi:10.1177/0146621615592294.
  - Finkelman 2021 doi:10.1007/s10862-020-09853-0 (SCQ autism screen).
  - **Relevance: curtailment keeps validated cutoffs valid while still feeling adaptive. Probably the best fit for L1.**
- Precision targets (Gibbons, from a secondary summary): SE 0.4 for surveys, 0.3 for screening, 0.2 for trials.
- Software: mirt (JSS 48(6)), mirtCAT (JSS 71(5)), catR (JSS 76(1)).

**The algorithm is solved; the item parameters are the hard part.**

## 3. Score → probability
Likelihood ratios computed by the agent (LR+ = sens/(1−spec); LR− = (1−sens)/spec):

| Source | Setting | Sens | Spec | LR+ | LR− |
|---|---|---|---|---|---|
| Kessler 2005 ASRS-6 | n=154, oversampled | 68.7 | 99.5 | ~137 (unstable) | 0.31 |
| Ustun 2017 ASRS-5 ≥14 | general population, 8.2% prevalence | 91.4 | 96.0 | ~23 | 0.09 |
| Ustun 2017 | specialty clinic, 57.7% prevalence | 91.9 | 74 | ~3.5 | 0.11 |
| Brevik 2020 ASRS-18 | case-control | 80 | 88 | ~6.7 | 0.23 |

- Ustun 2017: PPV 67.3% at ≥14, but 34.9% at ≥13.
- Kessler 2007 doi:10.1002/mpr.208: 4-band screener (0-9, 10-13, 14-17, 18-24), AUC .90. The **graded LRs** per band are in the PMC full text; not yet extracted.
- Specificity falls against clinical controls (SUD spec ~.66 [M]). Case-control designs inflate accuracy (Lijmer 1999 JAMA).
- Worked PPVs: 3% base rate with LR+ 6.7 gives ~17%; with LR+ 23, ~41%. A 50% base rate with LR+ 6.7 gives ~87%.
- **The base rate among site visitors is unknown.** Show several base rates.
- Youngstrom 2013 doi:10.1080/15374416.2012.736358: diagnostic likelihood ratios and nomograms.
- Risk communication: Gigerenzer & Hoffrage 1995 (natural frequencies); Galesic 2009 doi:10.1037/a0014474 (icon arrays); Zipkin 2014; Trevena 2013.
- Harms:
  - Kazda 2021 JAMA Netw Open: overdiagnosis.
  - Suhr 2008: symptom-validity failures in referred adults.
  - Sibley 2018: apparent late-onset cases mostly explained by other causes.
  - Lahey 2022 doi:10.1002/jcv2.12108: dimensions less stigmatizing.
  - **No study measures the harm of online self-screens.**

**Design:** the main output is a percentile with a credible interval. A diagnosis probability appears only with an explicit base rate, shown as natural frequencies plus an icon array.

## 4. Profiles and confounders
- Networks: Silk 2019 PLoS ONE: centrality-weighted counts were no better than plain counts. Network models add little for screening.
- HiTOP: Kotov 2017 (ADHD in disinhibited externalizing); Michelini 2024 World Psychiatry doi:10.1002/wps.21225 (proposed neurodevelopmental spectrum).
- Emotional dysregulation: Shaw 2014 AJP. Sluggish cognitive tempo: Becker 2016 JAACAP.
- **Shwartz 2020 doi:10.1093/arclin/acaa024: BRIEF-A self-report tracks emotional distress, not executive dysfunction.** Direct evidence that self-reported "EF problems" are confounded.
- Design: correlated factors (IA, HI, emotional dysregulation) plus short anxiety/depression/sleep scales as **competing explanations**. If these are high, flag that they may explain the ADHD-like answers. **Don't subtract** (no validated adjustment exists).

## 5. Existing probabilistic/adaptive ADHD tools
- K-CAT (youth, commercial); CAT-MH adult ADHD (no independent validation).
- IRT seeds: Gomez 2011, Nitta 2020, the 2026 ASRS preprint.
- Duda 2016 (ML separating autism from ADHD, small sample); QbTest/CPT accuracy limited (Hall 2016).
- **No validated, open, adaptive, probabilistic adult ADHD self-screen exists.**

## The loop (math)
1. GRM: P*_jk(θ) = 1/(1+exp(−a_j(θ−b_jk))); P_jk = P*_jk − P*_j,k+1.
2. Grid θ ∈ [−4, 4], step 0.05; prior N(0, 1) normed on the **general population**. Optional mixture prior π·f₁ + (1−π)·f₀.
3. After each answer: log w_g += log P_{j,x}(θ_g); normalize. EAP = Σwθ; PSD = sqrt(Σw(θ−EAP)²).
4. Next item: minimize expected posterior variance Σ_k p_k·Var(θ | x_j=k), with p_k = Σ_g w_g P_jk(θ_g). For classification, maximize information at θ_c. Add content balancing.
5. Stop when PSD < 0.3, or after ~20 items, or once P(θ > θ_c) > .95 or < .05.
6. Output: percentile Σ w_g Φ(θ_g) with a credible interval. P(D | data) = Σ w_g P(D | θ_g), where the link is fit against **structured interviews**. Prevalence shift: logit += logit(π_t) − logit(π_s). This assumes P(θ | D) is the same across settings, which is doubtful for self-selected visitors.

**Gaps:**
- No open bank calibrated against diagnosis.
- Self-reported diagnosis is a noisy label.
- Specificity against anxiety, depression, sleep problems and substance use is weak.
- No evidence on how users react to probabilistic ADHD results.
- Symptoms alone can't capture onset, impairment or exclusions.
