/**
 * PEEK Website 2.0 — Central Media & Contact Configuration
 * =========================================================================
 * SINGLE VIDEO SWAP POINT (50s PEEK Film):
 * To swap the 50s film placeholder to the next approved cut,
 * edit ONLY `PEEK_FILM_SRC` on line 10 below.
 * =========================================================================
 */
export const MEDIA_CONFIG = {
  PEEK_FILM_SRC: '../assets/film/skull_peek_v39_3_en_crf18_r1.mp4',
  PEEK_FILM_POSTER: '../assets/film/film_poster.jpg',
  MODEL_GLB_SRC: '../assets/model/peek-model.glb',
  MODEL_POSTER: '../assets/views/oblique.jpg',
  VIEWS: {
    oblique: '../assets/views/oblique.jpg',
    front: '../assets/views/front.jpg',
    side: '../assets/views/side.jpg',
  },
  SIM: {
    bone: '../assets/sim/sim-bone.webp',
    profile: '../assets/sim/sim-profile.webp',
    front: '../assets/sim/sim-front.webp',
  },
};

export const CONTACT_CONFIG = {
  brandName: 'Allevia Advanced Aesthetics',
  brandShort: 'Allevia',
  email: 'a2445406836@gmail.com',
  // Leave blank until official WhatsApp number is confirmed; uses wa.me/?text=... handoff
  whatsappNumber: '',
  whatsappPrefill:
    'Hello Allevia, I would like to ask a question and learn more about planning a PEEK or aesthetic journey in Shanghai.',
  replySla: 'We reply within 2 working days.',
};
