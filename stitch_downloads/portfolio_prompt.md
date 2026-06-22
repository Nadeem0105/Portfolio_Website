# 🧑‍💻 Personal Portfolio Website — Full Build Prompt

---

## OVERVIEW

Build a **stunning, production-ready personal portfolio website** as a single HTML file with embedded CSS and JavaScript. This is NOT a generic AI-generated portfolio — it must feel like a custom-crafted developer workspace: dark, precise, warm-toned, and deeply technical. The design must be immediately memorable and stand out from the typical blue/purple gradient portfolios.

---

## 🎨 DESIGN SYSTEM

### Color Palette

```
--bg-base:        #0A0A0B    /* near-black obsidian — primary background */
--bg-surface:     #111114    /* card/panel backgrounds */
--bg-elevated:    #1A1A1E    /* hover states, modal backgrounds */
--bg-terminal:    #0D1117    /* terminal window background */
--border-subtle:  #252528    /* dividers, card borders */
--border-active:  #3A3A3E    /* focused element borders */

--accent-gold:    #D4961A    /* PRIMARY accent — warm amber/gold */
--accent-copper:  #B86B2E    /* SECONDARY accent — burnt copper */
--accent-green:   #39D353    /* terminal text + code highlights */
--accent-red:     #E05252    /* error states in terminal */

--text-primary:   #F0EAD6    /* warm cream — primary text */
--text-secondary: #8A8A96    /* muted gray — body text */
--text-dim:       #555560    /* very dim — timestamps, labels */
--text-code:      #39D353    /* monospace green — inline code */
```

**Why this palette works:** The obsidian + gold combination evokes precision engineering and premium craftsmanship — think high-end watchmaking meets developer tooling. The green is used exclusively for the terminal, creating a clear visual language that makes the terminal feel native and authentic.

---

### Typography

```
Display Font:   "Syne" (Google Fonts) — weights 700, 800
                Used for: name, section headings
                Character: bold, geometric, slightly condensed — highly distinctive

Body Font:      "DM Sans" (Google Fonts) — weights 400, 500
                Used for: paragraphs, descriptions, labels
                Character: modern, clean, readable at all sizes

Mono Font:      "JetBrains Mono" (Google Fonts) — weights 400, 500
                Used for: terminal, code snippets, skill tags, badge labels
                Character: crisp, technical, authentic developer feel
```

Import all three from Google Fonts in the `<head>`.

**Type Scale:**
- `--text-xs: 0.75rem`
- `--text-sm: 0.875rem`
- `--text-base: 1rem`
- `--text-lg: 1.125rem`
- `--text-xl: 1.25rem`
- `--text-2xl: 1.5rem`
- `--text-3xl: 2rem`
- `--text-4xl: 2.75rem`
- `--text-5xl: 3.75rem`
- `--text-hero: clamp(3rem, 8vw, 6rem)` — hero name, fluid

---

### Layout System

- Max content width: `1200px`, centered
- Section padding: `120px 0` on desktop, `80px 0` on mobile
- Grid gap: `2rem` standard, `3rem` for major sections
- Border radius: `8px` for cards, `4px` for tags/badges, `0px` for terminal
- No rounded pills anywhere — sharp/precise aesthetic

---

## 🧭 NAVIGATION

### Sticky top navigation bar:
- Background: `rgba(10, 10, 11, 0.85)` with `backdrop-filter: blur(20px)` and a bottom border `1px solid #252528`
- Logo on left: `[YourName]` in Syne 600, followed by a blinking cursor `_` in `--accent-gold`
- Nav links on right: Home · About · Skills · Projects · Experience · Achievements · Profiles · Resume · Contact
- Each nav link: `text-sm`, `--text-secondary` color, uppercase letter-spacing `0.08em`
- **Active link:** `--accent-gold` color + a 2px bottom line in `--accent-gold`
- **Hover animation:** the `--accent-gold` underline slides in from left to right over `0.25s ease`
- A `>_` terminal button on far right in `--accent-gold` that opens the terminal overlay
- On mobile: hamburger icon that opens a slide-in drawer with same links

---

## 📄 SECTIONS

---

### 1. HOME (Hero Section)

**Layout:** Full viewport height (`100vh`). Content centered vertically and slightly left-aligned on desktop.

**Background:**
- Animated particle constellation using `<canvas>`. Render 80–100 small dots (`radius: 1.5px`, color `rgba(212, 150, 26, 0.35)`) scattered randomly across the canvas. Connect any two dots within 120px distance with a line (`rgba(212, 150, 26, 0.08)`). Animate every dot with slow, random floating movement (velocity ±0.3px/frame). Redraw each frame via `requestAnimationFrame`.
- Subtle radial gradient overlay centered on the content: `radial-gradient(ellipse 60% 70% at 40% 50%, rgba(212, 150, 26, 0.05) 0%, transparent 70%)`.

**Content (left side, ~55% width):**

```
[eyebrow label — JetBrains Mono, --accent-green, text-sm]
  > Hello, World! I'm

[HUGE name — Syne 800, --text-primary, text-hero fluid size]
  YourName
  [glitch animation — see ANIMATIONS section]

[animated typewriter subtitle — DM Sans 400, --text-secondary, text-2xl]
  Cycling through: "Full Stack Developer", "Open Source Contributor",
  "Problem Solver", "Competitive Programmer", "CS Student"
  [Typewriter types each phrase, deletes it, types the next. Cursor blinks.]

[short bio — 2–3 lines max, DM Sans, --text-secondary, text-base, max-width 520px]
  Brief, confident one-liner about who you are and what you build.

[CTA buttons row]
  Primary: "View My Work"  → solid --accent-gold bg, #0A0A0B text, Syne 700
  Secondary: "Download CV" → transparent bg, 1px --accent-gold border, --accent-gold text
  Both: padding 14px 28px, border-radius 4px, hover lifts 2px + shadow

[social links row — icon buttons for GitHub, LinkedIn, Twitter/X, LeetCode, Email]
  Each: 42px circle, border 1px solid --border-subtle, --text-secondary icon
  Hover: border color → --accent-gold, icon color → --accent-gold, rotate 8deg over 0.3s
```

**Right side (~45%):** A terminal window widget (decorative but styled like a real terminal).
- Window chrome: dark bar with 3 colored circles (red #E05252, yellow #D4961A, green #39D353) + "bash — portfolio" label in --text-dim
- Terminal body in `--bg-terminal`, showing a fake `$ ls -la` output listing your sections/projects, with green text and realistic spacing.
- Add a slow scanline animation (subtle horizontal lines that drift downward at 1% opacity).

**Scroll indicator at bottom center:** Arrow chevron that bounces vertically every 2s (CSS keyframe), fades out after user scrolls 100px.

---

### 2. ABOUT

**Layout:** Two columns on desktop (50/50 split), stacked on mobile.

**Left column — Image block:**
- A `420px × 420px` image container with border `2px solid --accent-gold`, border-radius `8px`
- Corner accent: a gold `+` shape (made with CSS pseudo-elements) positioned offset at top-right and bottom-left corners of the image — this is the **signature detail** of the design
- Below the image: a small stat row with 3 numbers (e.g., `3+ Years Experience`, `20+ Projects`, `5+ Hackathons`) — each number in Syne 700 `--accent-gold`, label in DM Sans `--text-secondary`

**Right column — Text block:**
- Eyebrow: `> about_me.md` in JetBrains Mono `--accent-green` text-sm
- Section title: `Who I Am` in Syne 800 text-4xl `--text-primary`
- 3–4 paragraph blocks about yourself, each paragraph max 3 lines
- A row of "fun fact" chips: small rounded tags with `--bg-elevated` background and `--text-secondary` text. Example: `☕ Coffee Addict`, `🎮 Gamer`, `📖 Avid Reader`, `🚀 Open Source`
- At the bottom: two labeled detail rows using a small grid:
  ```
  Name:     [YourName]       Location: [City, Country]
  Email:    you@email.com    Degree:   B.Tech CS / [Year]
  ```

---

### 3. SKILLS

**Layout:** Full width section. Two visual zones: a top filter bar + a grid below.

**Top filter bar:**
- Tags for categories: `All · Frontend · Backend · Languages · Tools · DevOps`
- Active tag: solid `--accent-gold` bg with dark text
- Inactive: `--bg-elevated` bg, `--text-secondary` text
- Clicking a tag filters the skill cards with a fade+scale transition (0.3s)

**Skill Cards Grid (4 columns desktop, 2 tablet, 1 mobile):**
Each card (`--bg-surface`, border `1px solid --border-subtle`, padding `1.5rem`, border-radius `8px`):
- Skill icon (devicon SVG or emoji fallback) — 40px
- Skill name in DM Sans 500 `--text-primary` text-base
- A custom progress bar:
  - Track: `--bg-elevated` height 4px, border-radius 2px
  - Fill: `--accent-gold` → `--accent-copper` gradient, animates width from 0% to actual% when card scrolls into viewport (triggered by IntersectionObserver, ease-out 1.2s)
  - Label: percentage shown in JetBrains Mono `--accent-green` text-xs, right-aligned
- Category tag in JetBrains Mono text-xs `--text-dim`

**Hover on card:** border color → `--accent-gold` (0.2s), card lifts `translateY(-4px)`, box-shadow `0 16px 40px rgba(212, 150, 26, 0.12)`

---

### 4. PROJECTS

**Layout:** Featured project on top (full width card), then a 3-column grid below.

**Featured Project Card:**
- Full-width, dark card with a mock browser window on the right showing a screenshot/gradient preview
- Left side: tag `FEATURED PROJECT`, project title in Syne 700 text-3xl, description, tech stack badges, two buttons: "Live Demo" (primary) + "GitHub" (outlined)
- Right side: browser window mockup with a gradient screenshot placeholder (or real screenshot)

**Project Grid Cards:**
Each card:
- Top image area (200px high): project screenshot or a unique gradient per project using `--accent-gold`, `--accent-copper`, and dark tones
- Image has a hover overlay that reveals "View Project →" text (fade in 0.3s)
- Card body: project name Syne 700 text-xl, 2-line description, tech stack chips (JetBrains Mono text-xs, `--bg-elevated` background), GitHub + Live links
- **3D hover tilt effect:** on `mousemove` over card, apply `perspective(800px) rotateX()` and `rotateY()` based on cursor position (max ±8deg). Smooth transition back to flat on `mouseleave` (0.5s ease-out)

---

### 5. EXPERIENCE

**Layout:** Vertical timeline, center line on desktop, left-aligned on mobile.

**Timeline line:** `2px solid --border-subtle` running vertically. Each entry's dot is a `12px` circle with `--accent-gold` fill and `4px` ring of `rgba(212, 150, 26, 0.25)`.

**Timeline Entry card (alternating left/right on desktop):**
- Card: `--bg-surface`, border `1px solid --border-subtle`, padding `2rem`, border-radius `8px`
- Top row: company name Syne 700 text-xl `--text-primary` + date badge in JetBrains Mono text-xs `--accent-gold` `--bg-elevated` padding `4px 10px`
- Job title: DM Sans 500 text-base `--accent-copper` with a small `◈` icon prefix
- Bullet points: DM Sans 400 text-sm `--text-secondary`, each starting with a `→` in `--accent-gold`
- Tech stack row at bottom: small chips same as Projects

**Scroll animation:** Each timeline entry slides in from its respective side (left entries from left, right entries from right) + opacity 0→1, triggered by IntersectionObserver, staggered 150ms delay.

---

### 6. ACHIEVEMENTS

**Layout:** Two-part section: metric counters on top, achievement cards below.

**Metric Counters Row (4 counters in a flex row):**
- Each counter: large number in Syne 800 `--accent-gold` text-5xl that **counts up** from 0 to the target value over 2 seconds when scrolled into view (use `requestAnimationFrame` with easing). Add `+` suffix.
- Label below in DM Sans text-sm `--text-secondary`
- Separated by vertical `1px solid --border-subtle` dividers

**Achievement Cards Grid (2–3 columns):**
Each card:
- Left: a gold medal/trophy emoji or SVG icon (48px) on `--bg-elevated` square background
- Right: achievement title Syne 700 text-lg `--text-primary`, organization DM Sans `--accent-gold` text-sm, description DM Sans `--text-secondary` text-sm, date in JetBrains Mono `--text-dim`
- On hover: left icon block slides slightly right (8px), card border → `--accent-gold`

---

### 7. CODING PROFILES

**Layout:** A unique "profile card" grid — 2–3 columns.

Each platform card:
- Platform logo/icon (40px) + platform name in Syne 700 text-xl
- Handle/username in JetBrains Mono `--accent-green`
- Stats in a mini-grid: Rating, Problems Solved, Contest Rank, Badges (whichever apply per platform)
- Stats use Syne 700 for numbers `--accent-gold`, DM Sans for labels `--text-secondary`
- A "View Profile →" link at bottom right in `--accent-gold` that opens the profile in new tab
- Card border: `1px solid --border-subtle` → `1px solid --accent-gold` on hover
- Background: subtle radial gradient of the platform's brand color (very muted, ~3% opacity) on the card

**Platforms to include:** LeetCode, Codeforces, HackerRank, GeeksForGeeks, GitHub, CodeChef (add/remove as needed)

---

### 8. RESUME

**Layout:** Centered card, full-width on mobile.

- A large card with `--bg-surface` background and `1px solid --border-subtle` border
- A stylized document preview thumbnail on the right side
- Left side: "Download My Resume" Syne 700 text-3xl, short description DM Sans `--text-secondary`
- A prominent download button: `--accent-gold` background, dark text, left-padded download icon, Syne 700
- Below: "Last Updated: [Month Year]" in JetBrains Mono `--text-dim` text-sm
- "Or view online →" text link in `--accent-gold`
- The card has a shimmer animation running across it on hover (CSS gradient animation, subtle)

---

### 9. CONTACT

**Layout:** Two columns: left is a message form, right is contact details.

**Left — Contact Form:**
- Label: `> send_message.sh` in JetBrains Mono `--accent-green`
- Section title: `Get In Touch` Syne 800 text-4xl
- Each input field:
  - Label: DM Sans text-sm `--text-secondary` above field
  - Input: `--bg-elevated` background, `1px solid --border-subtle` border, `--text-primary` text, JetBrains Mono font, padding `14px 16px`, border-radius `4px`
  - On focus: border → `--accent-gold`, subtle box-shadow `0 0 0 3px rgba(212, 150, 26, 0.15)`
- Fields: Name, Email, Subject, Message (textarea, 5 rows)
- Submit button: full-width, `--accent-gold` background, Syne 700, "Send Message →"
- On submit: button shows a loading spinner, then success state with `✓ Message Sent!` in `--accent-green`

**Right — Contact Details:**
- Each detail: icon (40px circle `--bg-elevated`) + label + value
- Social links: same icon buttons as hero but larger (48px)
- A "Currently available for:" section listing options with green `◉` dot indicators: Freelance Work · Full-time Roles · Open Source Collaboration · Internships

---

## ⌨️ TERMINAL FEATURE

### Trigger
- Click the `>_` button in the nav to **open the terminal as a full-screen overlay**
- Also triggered by pressing the keyboard shortcut `` Ctrl + ` `` (backtick)
- Press `Escape` or click outside to close

### Overlay UI
- Background: `rgba(0, 0, 0, 0.92)` backdrop
- Terminal window centered: `max-width: 800px`, `height: 65vh`, border-radius `8px`
- Window chrome bar: `#1A1A1E` with 3 dots + title `portfolio@[YourName]: ~`
- Body: `--bg-terminal` background, `12px` padding all sides, `overflow-y: auto`, `font-family: JetBrains Mono`
- Green text `--accent-green`, red errors `--accent-red`, gold highlights `--accent-gold`
- Input prompt: `[user@portfolio ~]$ ` in `--accent-green` + blinking cursor

### Supported Commands

Implement a full command parser that handles:

#### Navigation Commands
```
home        → smooth scrolls to Hero section
about       → smooth scrolls to About
skills      → smooth scrolls to Skills
projects    → smooth scrolls to Projects
experience  → smooth scrolls to Experience
achievements → smooth scrolls to Achievements
profiles    → smooth scrolls to Coding Profiles
resume      → smooth scrolls to Resume
contact     → smooth scrolls to Contact
```

#### Info Commands
```
whoami
  → Output: Full Name / Role / Location / University / Email

ls
  → Output: Lists all sections like a file system
    home/  about/  skills/  projects/  experience/
    achievements/  profiles/  resume.pdf  contact/

cat about.txt
  → Output: Multi-line text version of About section content

cat skills.json
  → Output: Pretty-printed JSON of your skills by category

ls projects/
  → Output: Lists all project names with one-line descriptions

cat projects/[project-name]
  → Output: Full description, tech stack, links for that project

ls achievements/
  → Output: Lists all achievements

pwd
  → Output: /home/portfolio/[YourName]

date
  → Output: Current date and time

uname -a
  → Output: Funny fake OS info: "PortfolioOS 2.0.0 [YourName]-kernel"
```

#### Fun / Easter Egg Commands
```
help
  → Output: Formatted table of ALL available commands

clear
  → Clears terminal history

history
  → Shows last 20 commands entered this session

sudo rm -rf /
  → "Nice try. Permission denied. Also, please don't."

coffee
  → ASCII art of a coffee cup + "Fueled by ☕ and late nights."

skills --verbose
  → Detailed breakdown of all skills with proficiency percentages

github
  → Output: "Opening GitHub profile..." then opens link in new tab

linkedin
  → Output: "Opening LinkedIn profile..." then opens link in new tab

resume
  → Output: "Downloading resume..." + triggers actual PDF download

contact
  → Output: All contact details formatted neatly

matrix
  → Triggers a 3-second Matrix-style falling characters animation in the terminal

banner
  → Output: Large ASCII art of your name/initials

echo [any text]
  → Echoes back the text

theme dark / theme light
  → Toggles terminal between dark and light mode (just for fun)

exit / quit
  → Closes the terminal overlay
```

#### Tab Autocomplete
Implement pressing `Tab` to autocomplete commands. If one match → completes. If multiple matches → shows options below the prompt.

#### Command History Navigation
Pressing `↑` / `↓` arrow keys cycles through command history (store last 50 commands in an array).

#### Welcome Banner
When terminal opens, display:
```
 ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗
 ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
 ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
 ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
 ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝

 Welcome to [YourName]'s Portfolio Terminal v2.0.0
 Type 'help' to see available commands. Type 'clear' to reset.
 ─────────────────────────────────────────────────────────────────────────
```

---

## ✨ ANIMATIONS — DETAILED SPEC

### A. Custom Cursor
Replace the default cursor entirely. Create a `<div id="cursor">` (14px circle, `--accent-gold` border 1.5px, transparent fill) and a `<div id="cursor-dot">` (4px solid `--accent-gold` filled circle).

- Both follow mouse position using `mousemove` listener with `requestAnimationFrame`
- The outer ring lags behind the dot with lerp smoothing: `x += (targetX - x) * 0.12` each frame
- On hovering links/buttons: outer ring scales to `2.5×` and changes border to `--accent-gold` with fill `rgba(212, 150, 26, 0.1)` (magnetic feel)
- On clicking: both elements briefly scale down to `0.7×` (40ms) then snap back (200ms ease-out)
- Hide the default cursor: `cursor: none` on `body`
- Show default cursor on mobile (detect touch devices)

### B. Glitch Effect on Hero Name
Apply to the hero `<h1>` name. Use `data-text` attribute = the name string.

CSS `@keyframes glitch`:
- At 2%, 64%, 100%: `clip-path: none`, `transform: none`
- At 4%: `clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%)`, `transform: skew(-0.5deg)`, text-shadow: `-4px 0 --accent-copper`
- At 6%: `clip-path: polygon(0 33%, 100% 33%, 100% 66%, 0 66%)`, `transform: skew(0.5deg)`, text-shadow: `4px 0 --accent-green`

Run animation irregularly — trigger via JavaScript every 4–8 seconds (random) for 300ms duration, then remove. This makes it feel organic, not looping.

Also add a `::before` and `::after` pseudo-element version offset by ±4px horizontally for the classic RGB-split look.

### C. Typewriter Effect
For the hero subtitle:
- Use a JS array of strings to type through
- Type at 80ms per character
- Delete at 40ms per character (deleting is faster)
- Pause 2000ms after fully typing a string before deleting
- Show a blinking `|` cursor that blinks at 530ms interval

### D. Scroll-triggered Reveals (IntersectionObserver)
Apply to all section headings, cards, timeline entries, and skill cards.

Default hidden state: `opacity: 0; transform: translateY(32px);`
Triggered state: `opacity: 1; transform: translateY(0); transition: opacity 0.6s ease, transform 0.6s ease;`

For grids and lists: stagger each child element's transition by `index × 100ms` using `transitionDelay`.

Observe with `threshold: 0.15` (trigger when 15% visible) and `rootMargin: "0px 0px -60px 0px"`.

### E. Skill Bar Animations
When a skill card enters the viewport:
- Progress bar fill starts at `width: 0%`
- Animate to `width: [target]%` using CSS transition `1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Simultaneously, count the percentage label from 0 to target using `requestAnimationFrame`

### F. Counter Animations (Achievements)
When the metrics row enters viewport:
- Each counter runs from `0` to its target value
- Duration: 2000ms, easing: `easeOutCubic` `t => 1 - Math.pow(1 - t, 3)`
- Use `requestAnimationFrame` to update the DOM every frame

### G. 3D Project Card Tilt
On each project card:
```javascript
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 to 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5;   // -0.5 to 0.5
  card.style.transform = `
    perspective(800px)
    rotateY(${x * 16}deg)
    rotateX(${-y * 16}deg)
    translateZ(8px)
  `;
});
card.addEventListener('mouseleave', () => {
  card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateZ(0)';
  card.style.transition = 'transform 0.6s ease-out';
});
```

Also add a spotlight effect: a radial gradient overlay that follows the cursor within the card, creating a subtle "lit" effect from the cursor position.

### H. Timeline Entry Slide-in
Left-side entries slide from `translateX(-50px)` to `translateX(0)`.
Right-side entries slide from `translateX(50px)` to `translateX(0)`.
Both with `opacity: 0 → 1`, triggered by IntersectionObserver. Stagger 200ms per entry.

### I. Navigation Active Highlight
As the user scrolls, update the active nav link based on which section is currently in viewport. Use IntersectionObserver on each `<section>` with `threshold: 0.5`. Animate the `--accent-gold` underline sliding smoothly.

### J. Page Load Sequence
1. `0ms`: Black screen, nothing visible
2. `0ms–400ms`: A horizontal loading bar in `--accent-gold` grows from 0% to 100% width at top of screen
3. `400ms`: Loading bar disappears, content fades in from bottom (`translateY(20px) → 0`, opacity 0→1)
4. `600ms`: Nav slides down from top (`translateY(-60px) → 0`)
5. `800ms`: Hero text elements appear one by one with 150ms stagger (eyebrow → name → subtitle → bio → buttons → socials)

### K. Particle Canvas Background
In the hero section:
- Canvas fills the full section
- Draw 80 particles at random positions
- Each particle moves slowly in a random direction, bouncing off canvas edges
- Connect particles within 120px with thin `--accent-gold` lines (opacity scales inversely with distance)
- On mouse movement near a particle (within 100px), it gently repels away from the cursor

### L. Terminal Typing Animation
When terminal opens:
- The welcome banner appears character by character at 5ms per character
- Commands typed by user: add characters one by one in real-time
- Output text: appears line by line with 30ms delay between lines
- Error messages: flash once (opacity 0→1→0.8 in 200ms) before settling

### M. Smooth Section Scrolling
When clicking nav links or terminal navigation commands:
- Use `element.scrollIntoView({ behavior: 'smooth' })` with a 72px offset for the nav height
- Add a brief highlight flash to the target section's heading (background briefly pulses `rgba(212, 150, 26, 0.08)` for 600ms)

---

## 📱 RESPONSIVENESS

- Mobile breakpoint: `< 768px`
- Tablet breakpoint: `768px – 1024px`
- Desktop: `> 1024px`

On mobile:
- Hide custom cursor
- Hero becomes single column, terminal widget hidden
- Navigation becomes hamburger → slide drawer from right
- Project grid → single column
- Timeline → left-aligned single column
- Skills grid → 2 columns
- Terminal accessible via floating button (bottom-right `>_` FAB)

---

## ♿ ACCESSIBILITY + PERFORMANCE

- All images have `alt` text
- Color contrast ratios ≥ 4.5:1 for all text
- `prefers-reduced-motion` media query: disable all animations when active, only show instant state changes
- `focus-visible` styles on all interactive elements (1px `--accent-gold` outline, offset 2px)
- Semantic HTML: use `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, ARIA labels on interactive elements
- Terminal: `role="application"`, `aria-label="Portfolio Terminal"`, announce output to screen readers via `aria-live="polite"`

---

## 🔧 TECHNICAL STACK

Use a **single HTML file** with:
- Embedded `<style>` block for all CSS (CSS variables, no framework)
- Embedded `<script>` block for all JavaScript (vanilla JS, no jQuery)
- Google Fonts loaded via `<link>` tags in `<head>`
- Devicons loaded via CDN for skill icons: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css`
- No external JS frameworks or CSS libraries — pure vanilla

---

## 🗂 FOOTER

- Dark footer, same `--bg-base` background, top border `1px solid --border-subtle`
- Left: copyright `© 2025 [YourName]. All rights reserved.`
- Center: "Built with ♥ and ☕" in DM Sans `--text-dim`
- Right: back-to-top button (arrow up, `--accent-gold`, smooth scrolls to top)
- Social icon row centered below

---

## 📋 FINAL CHECKLIST

Before considering the build complete:

- [ ] All 9 sections are fully built with real placeholder content
- [ ] Custom cursor works on desktop, hidden on mobile
- [ ] Glitch animation fires irregularly on hero name (not constantly)
- [ ] Typewriter cycles through 5+ phrases
- [ ] Particle canvas fills hero, reacts to mouse
- [ ] All scroll animations trigger only once when entering viewport
- [ ] Skill progress bars animate on scroll
- [ ] Counter animations work in Achievements
- [ ] 3D card tilt works on project cards
- [ ] Terminal opens with Ctrl+` and the nav button
- [ ] Terminal handles all listed commands
- [ ] Terminal supports Tab autocomplete and arrow history
- [ ] Terminal navigation smooth-scrolls to sections
- [ ] Page load sequence fires correctly
- [ ] Mobile: all sections stack correctly, hamburger works
- [ ] `prefers-reduced-motion` disables all animations
- [ ] Resume download button links to actual PDF (replace `resume.pdf` path)
- [ ] Contact form shows loading + success state
- [ ] All social links open in new tabs

---

*Prompt crafted for a personal portfolio that feels like a developer's actual workspace — professional, technical, and distinctly yours.*
