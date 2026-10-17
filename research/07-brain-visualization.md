# ADHD and the brain: what an honest visualization can show (2026-10-17)

Subagent report, condensed. [V] = the agent verified it via Crossref and the Europe PMC abstract. Main session re-checked via Crossref (all resolve, titles match): Hoogman 2017, Bernanke 2022, Norman 2022, Samea 2019, Cortese 2021, Brown 2012, Gloss 2016, Michael 2013.

## Bottom line
- Large studies find group differences of d ≈ 0.05-0.2. In children the distributions overlap ~92-96% (OVL = 2Φ(−d/2)). In adults the differences are mostly null.
- Two hypothesis-free meta-analyses found **no spatial convergence** across studies.
- Symptom-domain → network links rest on small task-fMRI meta-analyses and theory.
- A per-user "your brain" highlight is not defensible. Even a per-domain map is mostly theory.

## 1. Structure
- Hoogman 2017 Lancet Psychiatry doi:10.1016/S2215-0366(17)30049-4: 1,713 vs 1,529 participants. Accumbens d −0.15, amygdala −0.19, caudate −0.11, hippocampus −0.11, putamen −0.14, ICV −0.10. Children larger effects; **no adult difference survived** correction.
- Hoogman 2019 AJP doi:10.1176/appi.ajp.2019.18091033: children show lower surface area (frontal, cingulate, temporal); total surface area d −0.21. **Nothing in adolescents or adults.**
- Bernanke 2022 Lancet Psychiatry doi:10.1016/S2215-0366(21)00505-8: ABCD, 949 vs 9,787. d −0.11 to −0.06, surface area only. Preprint title: "Whither the ADHD brain?"
- Owens 2021 doi:10.1038/s41398-020-01192-8: morphometry R² ≈ 1%, which vanished with covariates. Working-memory-task activation R² ≈ 2%. Reward and inhibition tasks didn't generalize.
- Dall'Aglio 2022 eLife: socioeconomic and maternal confounders roughly halve effects. Marek 2022 Nature: brain-behaviour effects are tiny in general.
- Zhang-James 2021: adult ENIGMA classifier AUC .62.

## 2. Function and networks
- DMN: Sonuga-Barke & Castellanos 2007 (hypothesis). Norman 2022 Neuropsychopharmacology doi:10.1038/s41386-022-01408-z: 1,301 vs 1,301 participants, reduced DMN anticorrelation with salience (d .14), somatomotor (.14) and dorsal attention (.17). Trait analysis r=.06. **Replicated direction, tiny effect.**
- Cortese 2012 AJP: 55 task fMRI studies; frontoparietal/ventral attention under-activation; findings "largely reflected task features".
- **No convergence:** Samea 2019 doi:10.1016/j.neubiorev.2019.02.011 (96 studies); Cortese 2021 JAACAP doi:10.1016/j.jaac.2020.08.014 (30 resting-state studies, "no significant spatial convergence").
- Fronto-striatal inhibition: Hart 2013, Norman 2016 (weak to moderate).
- Reward/dopamine: Volkow 2009 JAMA (PET); Plichta & Scheres 2014 (ventral striatum d .48-.58, small studies); delay discounting d .43 (Jackson & MacKillop 2016). Behaviour moderate; neural evidence weak to moderate.

## 3. Domain → system table (group-level only)
| Domain | Systems | Strength | Key cites |
|---|---|---|---|
| Overall structure (children) | Surface area; accumbens, amygdala, caudate, putamen, hippocampus | Moderate that differences exist; d .1-.2; adults null | Hoogman 2017/2019; Bernanke 2022 |
| Lapses / mind-wandering | DMN fails to anticorrelate with dorsal attention / salience | Moderate replication, tiny d | Norman 2022 |
| Sustained attention (task) | Frontoparietal, ventral attention | Weak (no omnibus convergence) | Cortese 2012; contra Samea 2019 |
| Hyperactivity / inhibition | rIFC, SMA, ACC, striatum | Weak | Hart 2013; Norman 2016; Shaw 2011 |
| Working memory | Frontoparietal, less DMN deactivation | Weak to moderate (R² ≈ 2%) | Owens 2021 |
| Reward / delay aversion | Ventral striatum, dopamine | Behaviour moderate; neural weak to moderate | Jackson & MacKillop 2016; Plichta & Scheres 2014; Volkow |
| Timing | L IFC/insula, cerebellum, parietal | Weak (n=150) | Hart 2012; Sonuga-Barke 2010 |
| Emotional dysregulation | Amygdala, ventral striatum, mPFC/rACC | Weak | Shaw 2014; Hulvershorn 2014 |
| **Any domain, for one person** | None | **Strong evidence of no diagnostic utility** | Brown 2012; Pulini 2019; Gloss 2016 |

Note: inattention and hyperactivity have **never** been shown to map to distinct circuits in large replicated samples.

## 4. No individual diagnosis from brains
- ADHD-200 contest: the winning entry used **no imaging** (site, age, sex, IQ; 62.5%). Brown 2012 doi:10.3389/fnsys.2012.00069.
- Pulini 2019: 69 studies; circular analysis in 16%; accuracy falls as N grows.
- Parlatini 2024: "no promising biomarkers".
- EEG theta/beta: Arns 2013 calls the reported effect "an overestimation". NEBA (FDA de novo, 2013) is cleared only as an adjunct. AAN advisory Gloss 2016 doi:10.1212/WNL.0000000000003265: "unacceptably high false-positive" rate.

## 5. Does a brain picture persuade?
- Original findings: Weisberg 2008 (neuroscience text); McCabe & Castel 2008 (images).
- Failed replications: Michael 2013 doi:10.3758/s13423-013-0391-6 (10 experiments, ~2,000 people, "little to no influence"); Hook & Farah 2013; Gruber & Dickerson 2012; Schweitzer 2011.
- What survives: Fernandez-Duque 2015 (the text effect is "conceptual rather than pictorial"); Bennett & McLaughlin 2023 preprint meta-analysis, g=.25 with publication bias.
- The real risk is **neurorealism** (Racine 2005): reifying a self-report score as "your brain is like this". Reverse inference: Poldrack 2006.

## 6. Open assets (licenses per agent; verify)
| Asset | License | Note |
|---|---|---|
| NiiVue | BSD-2 | WebGL2; GIfTI/annot/NIfTI. **Recommended** |
| Yeo-7/17, Schaefer (CBIG) | MIT | Network colouring; in TemplateFlow |
| Harvard-Oxford | CC BY-SA 4.0 | Subcortical |
| fsaverage5/41k | FreeSurfer license (bundle the text) | Clinical use "not advised" |
| Neurosynth | ODbL 1.0 | Literature term maps, mostly healthy participants, **not ADHD maps** |
| NeuroQuery | BSD-3 | Same caveat |
| nilearn / brainsprite | BSD-3 / MIT | Pre-render HTML |
| AAL3 / BrainBrowser | GPL / AGPL | Avoid |

Yeo "Limbic" = orbitofrontal/temporal pole, not amygdala/striatum. Cerebellum and subcortex need separate atlases.

## Recommendations
1. **No "your brain lights up" view driven by scores.**
2. If a brain appears, make it an education panel separate from results: "brain systems ADHD research has studied". Use neutral styling for every domain, with evidence badges.
3. Wording to use: "group studies found small average differences", "theories propose", "no brain scan or EEG can diagnose ADHD". Avoid: "your brain", "ADHD brain", "dopamine deficiency", hot colours.
4. **Show an overlap plot at d=0.2** (~92% overlap), captioned with sample size and the adult null. It does more honest work than the brain.
5. Show disagreement: cite Samea 2019 and Cortese 2021 (no convergence); adult effects null.
6. Simplest defensible option: no brain at all, just the overlap plot plus a "what research has / hasn't found" panel.
