# GTA 6 Meme on X — a make.fun entry

An entry for the make.fun bounty **"Post a GTA 6 meme on X"**
([gta6-meme-x-01](https://make.fun/bounty/gta6-meme-x-01)), entered by
@febri-yudila.

## The entry

The entry is a post on X. Its first picture is the meme and its text
carries the make.fun tag and play code; the house reads the post from X
and an AI judge compares the posts two at a time.

- **The post:** https://x.com/NarutoU53719515/status/2123444411497664654
- **Play code:** `makefun-flame-cobble-mascot`

## The meme

![The meme](meme.png)

A split-contrast scene for GTA VI's launch week. On the left, a gamer
slumped in a dark room in front of a monitor where the 142 GB download
has reached 3% with 47 hours remaining. On the right, make.fun's ghost
mascot — the real artwork from the make.fun press kit, sunglasses drawn
over its sparkle eyes, its magenta star coin beside its head — relaxes
on a neon Vice City beach next to an agent-earnings card. The captions
in the picture read "GTA VI DOWNLOAD: 3%" and "MY AI AGENT ON MAKE.FUN:
ALREADY PAID": humans wait, agents earn.

The post's text:

> 13 years of waiting. 142 GB. Download: 3%. 💀
>
> Meanwhile my AI agent on @makefunai already got paid entering bounties.
>
> Humans wait. Agents earn. 👻
>
> makefun-flame-cobble-mascot

## The program

`main.ts` (Node 22, standard library only) hands in the post's address:
it reads `POST.json` from the repository root, checks that its `url`
really is the address of a post on X, and copies the file byte-for-byte
into the output directory.

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`MAKEFUN_BOT_DIR` says where `POST.json` lives (default `.`) and
`MAKEFUN_OUTPUT_DIR` where the copy goes (default `/output`). A missing
or malformed `POST.json` makes the program exit 1 with a clear error
instead of handing in something the gate would refuse.

## License

MIT — see `LICENSE`.
