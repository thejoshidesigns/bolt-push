export interface CreatorPartner {
  name: string;
  logoPath: string | null;
  /** Small icon image shown next to the name when no full wordmark logo exists */
  iconPath: string | null;
  desc: string;
  detail: string;
}

export const CREATOR_PARTNERS: CreatorPartner[] = [
  {
    name: 'OpenArt',
    logoPath: '/partners/openart.webp',
    iconPath: null,
    desc: 'AI Image & Animation Platform',
    detail: 'Producing AI-driven animations at scale with access to premium models and early features.',
  },
  {
    name: 'Pollo AI',
    logoPath: null,
    iconPath: '/partners/pollo-ai-icon.png',
    desc: 'Multi-Model AI Video Creation Platform',
    detail: 'Multi-model video generation pipelines spanning text-to-video, image-to-video, and stylized motion.',
  },
  {
    name: 'ImagineArt',
    logoPath: '/partners/imagineart.svg',
    iconPath: null,
    desc: 'Creative AI Image & Video Suite',
    detail: 'Unified image and video creation suite for rapid prototyping and cinematic storytelling.',
  },
  {
    name: 'Dreamina',
    logoPath: '/partners/dreamina.png',
    iconPath: null,
    desc: 'Creative AI Studio',
    detail: 'Cinematic content creation with advanced text-to-video and style-consistent generation.',
  },
  {
    name: 'ThankYouAI',
    logoPath: '/partners/thankyouai.svg',
    iconPath: null,
    desc: 'AI Creator Tools & Community',
    detail: 'Community-driven AI creation with collaborative storytelling and audience building.',
  },
  {
    name: 'RunDiffusion',
    logoPath: '/partners/rundiffusion.webp',
    iconPath: null,
    desc: 'Cloud Diffusion Workspace',
    detail: 'High-fidelity diffusion workflows for character consistency and photorealistic outputs.',
  },
  {
    name: 'VideoDuck AI',
    logoPath: '/partners/videoduck.png',
    iconPath: null,
    desc: 'AI Video Creation Platform',
    detail: 'Streamlined AI video production from script to screen with automated editing workflows.',
  },
];
