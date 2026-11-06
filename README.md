# Grief Calendar 🪶

A gentle note for every day of the year, for anyone carrying grief.

**Live app:** [griefcalendar.monicasweb.co.uk](https://griefcalendar.monicasweb.co.uk/)

## Why I made this

I lost my mum three years ago, and for a long time afterwards I felt like I couldn't breathe. I lost my stepdad ten years ago. I love him and I still miss him every day.

Grief changes your whole world, while everyone around you carries on as if nothing has changed. I made this calendar for the days that feel like that: one small note at a time, to remind you that what you're feeling is real, and that you're not alone in it.

## What it does

- **A note for every day.** 366 notes, one for each day of the year (including 29 February). Some are reflections, some are small, gentle things to do.
- **A painting for every month.** A watercolour landscape changes with the months, drifting slowly with soft mist floating across it.
- **Opens on today.** Move between days with Previous and Next, jump to any month, or tap Today to come back.
- **Works like an app.** It can be added to a phone's home screen (with a white feather icon) and opens without internet once it has been visited.
- **Support is always one tap away.** The white feather button opens UK bereavement and crisis support (Cruse, Samaritans, AtaLoss.org), plus a note on why the calendar exists.
- **Calm for everyone.** All movement switches off for people who have turned on "reduce motion" on their device.

## Built with

- [React](https://react.dev/) and [Vite](https://vite.dev/)
- A hand-written service worker and web app manifest (no PWA plugin)
- Hosted on GitHub Pages, deployed automatically by GitHub Actions on every push to `main`

## Project structure

```
src/
  components/
    GriefCalendar.jsx       the calendar: date, note, month and day buttons
    PaintingBackground.jsx  the moving watercolour background
    HelpPopup.jsx           the white feather button and support pop-up
  data/
    notes.js                the 366 daily notes
  main.jsx                  starts the app and registers the service worker
public/
  backgrounds/              01.jpg (January) to 12.jpg (December)
  icons/                    app icons for phones
  manifest.webmanifest      app name, icon and colours
  sw.js                     service worker (offline support)
```

## Running it locally

```bash
npm install       # first time only
npm run dev       # development server
```

To test the installable, offline version (the service worker only runs in the built app):

```bash
npm run build
npm run preview
```

## Updating things

- **Notes:** edit `src/data/notes.js`.
- **Paintings:** replace a file in `public/backgrounds/`, keeping the same name (for example `04.jpg` for April).
- **Support services:** edit the `SUPPORT` list at the top of `src/components/HelpPopup.jsx`.
- **After replacing any file that keeps the same name** (a painting, an icon or the manifest), change `CACHE_NAME` in `public/sw.js` (for example `v1` to `v2`), so installed apps fetch the new version.

## Support

If you're struggling, you don't have to carry it alone:

- **Cruse Bereavement Support:** 0808 808 1677, [cruse.org.uk](https://www.cruse.org.uk/)
- **Samaritans:** 116 123, free, any time, day or night
- **AtaLoss.org:** [find bereavement support near you](https://www.ataloss.org/)
- If you or someone else is in danger right now, call **999**.

## Credits

Made with care by [Monica | Web Developer](https://www.monica-webdeveloper.com/).

If this helps you, you can [buy me a coffee](https://buymeacoffee.com/monicasweb) ☕

## Copyright

© 2026 Monica Thomas. All rights reserved.

The watercolour paintings are licensed from iStock and are not available for reuse.
