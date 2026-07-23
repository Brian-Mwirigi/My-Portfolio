---
title: "spec-probe"
excerpt: "vLLM only gives you a macro acceptance rate. I shipped token-level diagnostics so you can see why a draft token died."
date: "2026-07-24"
week: 4
phase: "GPU systems"
tags: ["vllm", "speculative-decoding", "inference"]
---

vLLM's `/metrics` reports one number: `spec_decode_draft_acceptance_rate`. Fine for a dashboard. Useless when that number tanks and you don't know if it's indent drift, a domain boundary, or the draft being overconfident.

I shipped [spec-probe](https://github.com/brian-mwirigi/spec-probe). It hooks `RejectionSampler.forward`, dumps `p_draft` / `p_target` per token, writes JSONL off the CUDA hot path, and renders a verification lane so you can watch rejects instead of guessing. Side-by-side n-gram vs EAGLE on the same prompt is the point.

Local UI runs on demo traces with no GPU:

```bash
git clone https://github.com/brian-mwirigi/spec-probe.git
cd spec-probe
npm install && npm run dev
```

Live fire needs a real vLLM process or the Colab notebook. Patch goes on with `SPECPROBE_PATCH=1`. Bridge on `:8787`. PyPI package is `spec-probe` (`import specprobe_hook`). npm has the frontend.

This is the SpecProbe line from the tooling writeup — after triton-blackhole. Early. One star. The week-4 artifact is the hook + the lane + a public shape for traces, not a claim that every draft stack is solved.

If your acceptance rate is a shrug, point the JSONL here and look at the token that died.
