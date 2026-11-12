// Videos shown on the site. The data lives in data/videos.json (edited at /admin).
//
// The video is a public YouTube video from the Rwandan channel ISIMBI TV, in Kinyarwanda. It
// plays from YouTube's privacy-friendly player, loaded only when a visitor clicks play.
// Owner decision (Nov 2026): show only this one video (sqjSPmyxTrI, "NAMUHAYE IMPYIKO NONE
// MBAYE UMUGORE WE | Muhire na Marie Reine BYABARENZE | Ubu baritegura UBUKWE"). Two others
// (_7TwZ2QfoEE and Qmg91xO26ms) were removed at his request.
//
// Notes that still apply to the data (JSON files cannot hold comments):
//  - PROVISIONAL: the English label is OUR reading of the Kinyarwanda title. It is a news-style
//    feature about Jean Claude and Marie Reine, not a stage talk, and is labelled honestly.
//    Marie Reine's agreement should be confirmed.
//  - `videoCredit` is shown under every video, linked to the original. The video belongs to the
//    channel, so the credit must stay visible. Remove a video at once if the channel asks.
//  - `cover` picks the YouTube-made still shown before play: "hqdefault" is the channel's own
//    thumbnail, "hq1", "hq2", "hq3" are frames from the video. It is loaded from YouTube.
//  - `start` and `end` (seconds) make the player open and stop at a chosen part. PROVISIONAL:
//    empty until the owner gives the times. Example: 130 and 170 play 2:10 to 2:50.
//  - The first video in the list is the one shown on Home.
import data from './data/videos.json'

export const videoCredit = data.videoCredit

export const videos = data.videos.map((v) => ({
  ...v,
  cover: v.cover || 'hqdefault',
  start: v.start || null,
  end: v.end || null,
}))

export const featuredVideo = videos[0]
export const videoSection = data.videoSection
