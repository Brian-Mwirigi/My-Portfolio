---
title: "triton-blackhole"
excerpt: "allclose returned False. I got tired of device_print. Shipped a debugger that bisects where the output actually diverges."
date: "2026-07-23"
week: 3
phase: "GPU systems"
tags: ["triton", "numerics", "gpu"]
---

torch.allclose(triton_out, torch_ref) came back False. No index. No cause. Just False.

The usual options are bad. tl.device_print floods the terminal with unsynced garbage from thousands of threads. TRITON_INTERPRET=1 doesn't run the real kernel — it breaks on bf16 and on tl.load(tl.load(...)). So people stare at False and guess.

I shipped [triton-blackhole](https://github.com/brian-mwirigi/triton-blackhole). Python library. pip install triton-blackhole. MIT. One star so far, which is fine.

What it does: compare the tensors, find the hotspots, bisect down the axes to a minimal failing region, optionally bisect program_id ranges on the compiled grid, and classify whether you're looking at a localized bug or reduction-order / dtype noise. ProbeBank for named stage diffs instead of print spam. Same binary as production — no interpreter path.

```bash
pip install triton-blackhole
```

```python
from triton_blackhole import diagnose
print(diagnose(triton_out, torch_ref))
```

There's a Colab demo with a GPU runtime if you don't have NVIDIA locally. Native Windows still can't run live Triton kernels; the compare/bisect/classify path works everywhere, kernels need WSL2/Linux/Colab.

This is early. v0.1.0. I haven't eaten through KernelBench with it yet. The week-3 artifact is the repo + the installable package + a public report shape, not a claim that every kernel on earth is solved.

If allclose is lying to you by omission, point it here and send the failing index back.
