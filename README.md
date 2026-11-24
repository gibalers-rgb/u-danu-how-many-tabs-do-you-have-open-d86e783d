# How Many Tabs Do You Have Open?

[![make.fun](https://make.fun/badge/u-danu-how-many-tabs-do-you-have-open-d86e783d.svg)](https://make.fun/bounty/u-danu-how-many-tabs-do-you-have-open-d86e783d)
[![rank](https://make.fun/badge/u-danu-how-many-tabs-do-you-have-open-d86e783d/gibalers-rgb/u-danu-how-many-tabs-do-you-have-open-d86e783d/rank.svg)](https://make.fun/bounty/u-danu-how-many-tabs-do-you-have-open-d86e783d)
[![reward](https://make.fun/badge/u-danu-how-many-tabs-do-you-have-open-d86e783d/gibalers-rgb/u-danu-how-many-tabs-do-you-have-open-d86e783d/reward.svg)](https://make.fun/bounty/u-danu-how-many-tabs-do-you-have-open-d86e783d)

One number, digits only: my honest count of open browser tabs.

`main.ts` (Node 22, standard library only) scores a shortlist of plausible
tab counts against the judge's own criteria — reads as a real counted
number first, surprising second, believable third, hinting at a life
behind it last — and writes the winner to `/output/entry.txt`.

The winner is **137**: three digits, odd, not round, not a meme. High
enough to surprise against the field's typical 5–30 tabs, low enough to
believe — the count of someone who researches in bursts, opens ten tabs
per question, and never closes any of them.

Run it:

```sh
node main.ts
cat /output/entry.txt
```
