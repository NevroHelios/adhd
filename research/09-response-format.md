# Answer formats: Likert, frequency, sliders, continuous (2026-10-17)

Subagent report, condensed. Main session re-checked via Crossref (all resolve, titles match): Simms 2019, Funke 2011 (online 2010), Funke 2016 (online 2015), Bosch 2019 (online 2018), Bradburn & Miles 1979, Coons 2009. The agent's first Funke 2011 DOI (...376542) did not resolve; the correct one is below.

## 1. What existing tools actually use
**Premise correction:** ADHD scales mostly do not use agree/disagree. They use **frequency** anchors (unipolar: "how often").

| Tool | Format |
|---|---|
| ASRS v1.1 | Never / Rarely / Sometimes / Often / Very Often (0-4); screener uses a shading rule per item |
| ASRS-5 | Same anchors, **unequal integer weights per item** (RiskSLIM; e.g. item 3 scored 0/1/3/5/6, item 4 0/1/1/2/2 per agent), cutoff ≥14 |
| BAARS-IV, ADHD-RS | 4-point frequency |
| CAARS | 0-3 frequency |
| WURS | 0-4 (childhood recall) |
| PHQ-9 / GAD-7 | Day counts over 2 weeks (Not at all / Several days / More than half / Nearly every day) |
| AQ | Agree/disagree 4-point, **scored 0/1** |
| RAADS-R | Temporal ("true now and when young" / "only now" / ...) |
| Popular quizzes (Psychology Today etc.) | 5-point agree/disagree, often reworded ASRS (see 03) |

**Open check:** the ASRS-5 weights above must be verified against Ustun 2017 (JAMA Psychiatry doi:10.1001/jamapsychiatry.2017.0298) Table 2 before use. Secondary copies that score it flat 0-4 are likely wrong.

## 2. How many categories
- Preston & Colman 2000 doi:10.1016/S0001-6918(99)00050-5: reliability/validity rise to ~7-10 options, then flatten.
- Lozano 2008: 4-7 options optimal.
- **Simms 2019 Psychol Assess doi:10.1037/pas0000648**: N=1,358; no gain beyond 6 options, and a VAS did not beat them.
- Maydeu-Olivares 2017: at least 5 for IRT.
- Counterexample: Alwin 1997 (11-point did better for some attitude items).
- Sun 2025 (arXiv): VAS can lower reliability.
- Agent's simulation (normal latent, optimal thresholds): 5 categories keep ~92% of continuous Fisher information, 7 keep ~96%, 11 keep ~98%. A VAS with its own report noise SD ≈ 0.3 (in latent units) already loses that edge (1/(1+s²) ≈ 0.92). This is a toy model, not data.

## 3. Sliders and VAS
Distinguish **drag sliders** (handle you move) from **point-and-click VAS** (tap a line, mark appears).
- Couper 2006: sliders more missing data, slower.
- **Funke, Reips & Thomas 2011 SSCR doi:10.1177/0894439310376896**: break-off odds 6.9× higher with sliders, worse for less-educated respondents.
- **Funke 2016 SSCR doi:10.1177/0894439315575477**: drag sliders hurt, especially on mobile; point-and-click VAS performed like radio buttons.
- Toepoel & Funke 2018: similar.
- **Bosch, Revilla et al. 2019 SSCR doi:10.1177/0894439317750089**: slider vs radio quality similar, "no need to shift".
- Maineri 2019: the handle's start position biases answers.
- Liu & Conrad 2016: heaping on round numbers (0, 50, 100).
- Kuhlmann 2017: VAS ≈ Likert in validity.
- Haslbeck 2025: VAS affect items correlated more strongly with psychopathology (single study).
- **No ADHD-specific slider study exists.**
- Accessibility: WCAG 2.2 SC 2.5.7 (Dragging Movements) needs a non-drag alternative, so any slider must accept tap-to-place.

## 4. Why -100..+100 (bipolar) is the wrong shape
- Frequency is unipolar: "never" is a floor, not the opposite of "very often". A bipolar scale invents a negative half with no meaning.
- Its 0 reads as "neutral", and respondents use midpoints for "it depends" or "don't know" (Kulas), not for a middle frequency.
- Response styles (extreme/midpoint) carry over to VAS: Vollbracht 2026 ρ=.76. Continuous does not remove style bias.
- ADHD positive illusory bias (Owens 2007): people with ADHD underrate their own problems. Concrete behavioural items help; finer scales don't.
- Vague quantifiers mean different amounts to different groups (Bradburn & Miles 1979 doi:10.1086/268494; Schaeffer 1991). A "70" means even less. **Time anchors** ("on how many of the last 14 days...") fix this better than resolution does.

## 5. Continuous answers in IRT (if ever used)
- Samejima 1973 continuous response model; Müller 1987; Ferrando (continuous factor models).
- **Beta IRT**: Noel & Dauvier 2007, fits bounded 0-1 answers with floor/ceiling mass.
- García-Pérez 2023: Likert steps are psychologically unequal (supports GRM thresholds over equal spacing).
- Martinez 2025 Beta-Bernoulli CAT (preprint).
- **No empirical evidence that VAS answers shorten a CAT** in practice.
- Fuzzy/interval answers ("between 30 and 60"): no validity evidence; Ellerby 2022 shows interval overconfidence.

## 6. Format changes void cutoffs
- ISPOR ePRO task force (Coons 2009 Value Health doi:10.1111/j.1524-4733.2008.00470.x; Gwaltney 2008 meta-analysis): paper→screen with the same response options is a minor change; **changing the response scale is a moderate/substantial change needing a new equivalence study**.
- No slider-equivalence study exists for ASRS, PHQ or AQ. Turning them into sliders produces a new, unvalidated instrument (and breaks ASRS/AQ no-modification licenses, see 08).

## Recommendation
1. **Validated core** (ASRS-6, PHQ, GAD...): exact wording, exact options, radio buttons, no skipping inside a scale. Feed the **band** result into the Bayesian layer as a likelihood ratio. Don't multiply LRs from correlated scales as if independent.
2. **New items** (own wording, IPIP-style): 5-7 unipolar buttons with concrete time anchors ("0 / 1-2 / 3-5 / 6-9 / 10+ of the last 14 days"), scored by GRM.
3. **Optional experiment:** an A/B arm with a unipolar point-and-click VAS (no handle until first tap, WCAG tap-to-place, 0 = never), scored by beta IRT, compared on reliability, completion, and time.
4. **Drop:** bipolar -100..+100, drag sliders, pre-placed handles, fuzzy/interval answers.

## Open checks
- ASRS-5 per-item weights: Ustun 2017 (PMC5470397) confirms unequal integer weights 0-5 per option; exact values are in a figure, still to transcribe. (Table 2 there is operating characteristics, not weights.)
- ASRS-6 shading rule (which items count at "Sometimes").
- Whether any published cutoff is stated for continuous scoring of any screener ([R] none found).
- Hilbert 2016 (cited by agent, not verified).
