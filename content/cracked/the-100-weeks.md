---
title: "The 100 Weeks"
excerpt: "Foundations → GPU systems → open-source inference → global proof. The plan. Read every Sunday."
date: "2026-07-01"
phase: "Roadmap"
pinned: true
tags: ["plan", "ml-systems", "100-weeks"]
---

**Brian Munene Mwirigi — started July 2026, ends ~June 2028.**

One line, walked without scattering: **foundations → GPU systems → open-source inference → global proof.**

Read this every Sunday. When a shiny new project idea appears, reread the rules below before deciding anything.

---

## THE RULES (non-negotiable, all 100 weeks)

1. **No new projects.** The itch to start something new is the failure mode that kept you at depth level 1 across seven projects. It will disguise itself as inspiration. It is the enemy.
2. **One public artifact every week.** A technical post with numbers/code on X + GitHub. Finished work and honest lessons only — never plans, never motivation posts. Failure posts with numbers count and build the most trust.
3. **Breon Studio capped at 8 hrs/week.** It pays rent. It does not get your identity. No new clients if they breach the cap.
4. **Sleep 7+ hours.** 100 weeks is an endurance event. Every burnout costs a month. Trading sleep for hours is arithmetic you lose.
5. **Exam weeks: drop to 10 maintenance hours, never to zero.** The streak surviving matters more than the volume.
6. **Sunday review (30 min):** What shipped? What's blocked? What is the ONE goal for next week? Log it in the tracker at the bottom.
7. **Compare yourself only to Brian from 4 weeks ago.** Never to Stanford.

**Target hours:** 40–50/week around school (aggressive track). Minimum viable week: 25 hours + 1 artifact.

---

## PHASE 0 — CLEAR THE DECKS (Week 0, this week)

- [ ] Finish Metumi and all open Breon commitments. Clients paid; you deliver.
- [ ] Write the "graveyard" README: Corvux (dormant), CropChain, Sentinel-OT, CostHQ, Slop Blocker (maintenance mode) — one line each + links. You never explain them again; you point.
- [ ] Set up the public log: one X/Twitter handle + GitHub profile that will carry every weekly artifact for 2 years. Same handle everywhere.
- [ ] Start Karpathy *Zero to Hero* Lesson 1 **tonight**.

---

## PHASE 1 — FOUNDATIONS (Weeks 1–16)

**Goal: build GPT from scratch and understand every line. No copy-paste, ever. If you can't explain it out loud to a skeptical stranger, it isn't done.**

Resources: Andrej Karpathy's *Neural Networks: Zero to Hero* (YouTube), Stanford **CS336** assignments (free online), 3Blue1Brown for math *only when the code confuses you* — no separate "math phase."

| Week | Work | Artifact to post |
|------|------|------------------|
| 1 | Zero to Hero L1: micrograd. Type every line. Then rebuild the autograd engine **from memory** without the video. | Your micrograd repo + what backprop actually is, in your own words |
| 2 | L2 + L3: makemore (bigram model, then MLP). 3B1B linear algebra chapters as needed. | Bigram vs MLP results on a dataset you chose |
| 3 | L4: becoming a backprop ninja — manual backprop through batchnorm, cross-entropy, all of it. Hardest week of the phase. | The gradient derivation that broke your brain + how you fixed it |
| 4 | L5: WaveNet/CNN-ification. Consolidate weeks 1–3: redo anything you can't explain. | Writeup: "4 weeks of building neural nets from scratch — what I actually learned" |
| 5 | L6: GPT from scratch (nanoGPT video). Build it line by line. | Your GPT repo, attention explained in your own diagrams |
| 6 | L7: tokenizers. Build your own BPE tokenizer (minBPE) from scratch. | Your BPE implementation + why tokenization causes half of all LLM weirdness |
| 7–8 | **Capstone: train YOUR OWN GPT** on a dataset you choose (Swahili corpus is a great, differentiating pick). Fight real training bugs. | Full writeup: dataset, loss curves, sample outputs, every bug and what it cost you |
| 9–10 | CS336 Assignment 1: BPE + transformer + training loop from scratch, their test suite, no ML libraries. | What CS336's test suite exposed that Karpathy didn't |
| 11–12 | CS336 Assignment 2: systems — profiling, memory, a Flash-Attention-style kernel, distributed basics. This is your bridge to Phase 2. | Profiling results: where the milliseconds actually go in a transformer |
| 13 | CS336 Assignment 3: scaling laws. | Scaling-law experiments at your tiny compute scale |
| 14–15 | CS336 Assignment 4 (data) or 5 (alignment/RL) — pick ONE, finish it fully. | Writeup with numbers |
| 16 | **GATE WEEK.** Redo weak spots. Big retrospective post. | "16 weeks: from web dev to GPT from scratch" — full honest retrospective |

**GATE 1 (end of week 16) — all must be true, or repeat up to 4 weeks before advancing:**
- [ ] From-scratch GPT trained on your own dataset, with published loss curves
- [ ] Can explain attention, backprop, tokenization, and why your loss plateaued — out loud, no notes
- [ ] 16 consecutive weekly artifacts, zero missed

---

## PHASE 2 — GPU SYSTEMS (Weeks 17–40)

**Goal: become dangerous at the layer that survives any bubble — making inference fast and cheap.**

Resources: *Programming Massively Parallel Processors* (PMPP) book, official Triton tutorials, Simon Boehm's "How to optimize a CUDA matmul" post, GPU-MODE lectures (YouTube/Discord), the FlashAttention and PagedAttention papers.

GPU access on a budget: Google Colab (free tier to start), then Kaggle's free GPUs, then rent cheap hourly GPUs (Vast.ai / RunPod) once kernels demand it. Budget ~$20–40/month from Breon income from week 21 on.

| Weeks | Work | Artifacts |
|-------|------|-----------|
| 17–18 | C++ crash course (you need reading fluency, not mastery). PMPP ch. 1–4. First CUDA kernels: vector add, naive matmul. | First kernel + the mental model of threads/blocks/warps |
| 19–20 | Matmul optimization ladder: memory coalescing, shared-memory tiling. Benchmark every step vs cuBLAS. | The classic post: "my matmul vs cuBLAS, step by step" — this post type always travels |
| 21–22 | Triton: rewrite your kernels in Triton. Fused softmax, layernorm. | CUDA vs Triton comparison with numbers |
| 23–25 | Read FlashAttention paper properly. Implement a simplified fused attention kernel. Weekly progress posts. | Your fused attention: memory and speed vs naive, honest numbers |
| 26–27 | Read PagedAttention paper. Study vLLM's architecture — read the actual source. Build vLLM and llama.cpp from source, run them, profile them. | "How vLLM actually works" explainer — teaching posts build audience fastest |
| 28–34 | **THE PROJECT: KV cache compression, for real this time.** Implement your Zenodo idea on nanoGPT scale (wks 28–30), then on a small Llama (wks 31–33). Benchmark honestly: memory saved, latency, perplexity cost. Week 34: polish repo + full writeup. Honest mediocre numbers beat inflated claims — this is where the Zenodo instinct gets redeemed properly. | Weekly progress with numbers; week 34 = the flagship writeup. Post it in vLLM/EleutherAI Discords and ask for methodology critique — expert correction is the fastest learning loop |
| 35–36 | Pick your ONE repo: **vLLM, llama.cpp, or SGLang** (choose whichever your project made you understand best). Read contributor guide, triage issues, fix docs. Submit 2–3 tiny PRs. | "My first PR to X: what the maintainers taught me" — rejection posts count double |
| 37–40 | First real code PRs: small bug fixes, test coverage, a minor feature. Target: **first merged code PR by week 40.** | Each PR journey, honestly told |

**GATE 2 (end of week 40):**
- [ ] KV cache project public with honest benchmarks
- [ ] First merged PR (code, not just docs) in a major inference engine
- [ ] Can explain paged attention, quantization, and speculative decoding from memory
- [ ] 40 consecutive weekly artifacts

---

## PHASE 3 — PROOF & NETWORK (Weeks 41–70)

**Goal: convert skill into public, global credibility. Artifacts first, then network — networks only transmit proof that already exists.**

| Weeks | Work | Milestones |
|-------|------|------------|
| 41–46 | Sustained OSS on your one repo. Pick ONE subsystem (e.g., KV cache management, quantization, a hardware backend) and aim to know it better than almost anyone. PR cadence: one every 1–2 weeks. | 5+ merged PRs total by week 46 |
| 45–48 | **GSoC application window (Feb–Apr 2027):** apply with an ML-systems org — your OSS record is exactly what they select for. Also apply to **IndabaX Kenya / Deep Learning Indaba 2027** with your KV cache work. | Applications out. Whether accepted or not, the proposals become artifacts |
| 47–54 | One **substantial** feature PR in your repo — something with your name on it that users benefit from. Join and become known in the repo's Discord and EleutherAI / Cohere Labs open science community: answer questions, review others' PRs. | The feature ships. People in the community know your handle |
| 55–58 | **Money transition:** build a one-page portfolio (PRs, benchmarks, writeups). Reach out to AI infra startups (Together AI, Fireworks, Baseten, Modal, etc.) for part-time remote contract work — proven OSS contributors get these. Target $2–4k/month, which replaces Breon at Nairobi cost of living. | First global income. Breon winds down or stays at pure maintenance |
| 59–64 | Deepen: implement speculative decoding or a quantization method (GPTQ/AWQ-style) end to end. If GSoC accepted, this slot is your GSoC summer. | Another flagship writeup with benchmarks |
| 65–70 | Present: Indaba/IndabaX talk or poster on your inference work. Around here, expect one post to finally travel — everything before it becomes your back catalog. | First conference-room presentation. Known handle in at least one major OSS community |

**GATE 3 (end of week 70):**
- [ ] 10+ merged PRs, at least one substantial feature
- [ ] Global remote income (or GSoC completed)
- [ ] Presented work in a real room (Indaba or equivalent)
- [ ] 70 consecutive weekly artifacts

---

## PHASE 4 — THE FORK (Weeks 71–100)

**By now you've earned an actual choice. Weeks 71–80 you keep building while deciding. Choose by week 80 based on evidence, not mood.**

| Weeks | Work |
|-------|------|
| 71–78 | Maintainer-track work in your repo: own your subsystem, review PRs, keep contract income. Finish your degree on schedule — it's what makes visas tractable (UK Global Talent rewards open-source impact; US O-1 rewards documented ability). Dropping out helps people with safety nets; it would hurt you. |
| 79–80 | **DECISION WEEKS.** Write a one-page memo, pick the fork, tell your public log. |
| 81–92 | **Path A — Frontier lab / elite infra startup:** applications to inference and systems teams (Together, Fireworks, Groq, Anyscale, the labs). Your file: from-scratch depth, merged PRs, benchmarks, community vouchers, 80+ weeks of public record. Interview prep: GPU puzzles, systems design, your own PRs explained deeply. **Path B — Founder, round two:** Corvux revived as *the engineer who builds the inference stack*, not the student with a deck. Reference implementation first, one pilot deployment (a SACCO before a bank), then YC application — YC funds international founders, and now you'd apply with proof. |
| 93–99 | Execute the fork: offers negotiated, or pilot running. Keep the weekly artifact cadence — it's now your leverage in every negotiation. |
| 100 | **Final retrospective post: "100 weeks."** Then close this file. The plan ends; the career begins. |

---

## CATCH-UP PROTOCOL (you will fall behind — this is the plan for that)

- Fell behind a week? Cut **scope**, never **stages**. Do the smaller version of the same week; never skip ahead to feel fast.
- Missed an artifact? Post a short honest one ("this week beat me — here's the bug I'm stuck on") within 3 days. The streak is the asset; protect it above pride.
- Two dead weeks in a row? Reread this file top to bottom, do a 10-hour minimum week to restart momentum, resume at the week you left.
- Around weeks 4–6 and again ~20, the work stops being rewarding and nobody is clapping. **That is the filter that removes everyone else.** It is not a sign the plan is wrong.

## KILL CRITERIA (honesty clause)

If by **week 8** the work itself — making models train, making code fast — feels like pure tax with zero pull, stop and reassess the field honestly. Grinding a decade at something you hate is the actual bad outcome. (Expected result: you'll be too deep in a training bug to remember this clause exists.)

---

## WEEKLY TRACKER

Copy a row every Sunday. An empty column is a red light, not a footnote.

| Wk | Dates | Hours | Shipped | Artifact link | Next week's ONE goal |
|----|-------|-------|---------|---------------|----------------------|
| 1  |       |       |         |               |                      |
| 2  |       |       |         |               |                      |
| 3  |       |       |         |               |                      |

---

*The difference between you-now and you-cracked is not talent, not Stanford, not luck, and not this document. It is whether the week that's starting gets its hours and its artifact. 100 times.*
