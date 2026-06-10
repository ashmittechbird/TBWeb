import ServicePageLayout from '../../components/ServicePageLayout';

export default function AnimationPage() {
  return (
    <ServicePageLayout
      accentColor="#fbbf24"
      eyebrow="2D & 3D Animation"
      title="Immersive Visual Storytelling — 2D, 3D, CGI, VFX, AR & VR"
      subtitle="Animation, modelling, CGI, VFX and AR/VR experiences for global brands that demand production quality and stop-scroll impact."
      breadcrumbLabel="2D & 3D Animation"
      metrics={[
        { number: '500+', label: 'Productions delivered across formats' },
        { number: '4K', label: 'Maximum resolution output standard' },
        { number: '30+', label: 'Global brand and agency clients' },
      ]}
      introParagraphs={[
        'Static imagery no longer captures attention in a world of infinite scrolling. Brands that communicate through motion — whether a 30-second explainer, a photorealistic product render or an augmented reality experience — earn more engagement, higher recall and stronger emotional connection with their audience.',
        'Animation is not just about making things move; it is about telling a story that serves a business objective. Every production at TechBird starts with the brief, not the medium. We recommend the right format for your goal, audience and distribution channel — then we build it to the standards that make people stop scrolling.',
      ]}
      sections={[
        {
          icon: 'M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
          color: '#fbbf24',
          heading: '2D Animation',
          paragraphs: [
            '2D animation remains one of the most effective formats for explaining complex ideas simply. We produce explainer videos that distil product features into clear narratives, brand story animations that build emotional connection, motion graphics for social media and advertising, and animated infographics that turn data into compelling visual stories.',
          ],
          useCases: 'Product explainer videos, Onboarding animations, Social media content, Animated logos, Presentation visuals',
        },
        {
          icon: 'M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9',
          color: '#f472b6',
          heading: '3D Modelling & Animation',
          paragraphs: [
            '3D animation creates experiences that 2D cannot. Photorealistic product visualisations that let customers examine every detail before purchase. Architectural walkthroughs that communicate spatial design before a brick is laid. Character animation with natural motion that feels alive. We work in Blender, Cinema 4D and 3ds Max, and deliver assets optimised for web, broadcast and real-time engines.',
          ],
          useCases: 'Product visualisation, Architectural renders, Character animation, Game assets, Brand mascots',
        },
        {
          icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z',
          color: '#38bdf8',
          heading: 'CGI & VFX',
          paragraphs: [
            'CGI allows you to show what cannot be filmed — molecular interactions, infrastructure at scale, product concepts that don\'t exist yet, historical reconstructions. VFX allows you to enhance what was filmed — compositing digital elements with live footage, adding environment extensions, creating the impossible. We produce CGI and VFX for commercial advertising, documentary, corporate communications and social media.',
          ],
          useCases: 'Commercial advertising, Product concept visualisation, VFX compositing, Documentary CGI, Corporate films',
        },
        {
          icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
          color: '#a78bfa',
          heading: 'AR & VR Experiences',
          paragraphs: [
            'Augmented reality overlays digital content on the physical world — product try-ons, assembly instructions, interactive brand experiences. Virtual reality creates fully immersive environments for training simulations, virtual showrooms, architectural visualisation and experiential marketing. We build AR/VR experiences for iOS (ARKit), Android (ARCore) and standalone VR headsets.',
          ],
          useCases: 'AR product try-on, VR training simulations, Virtual showrooms, Interactive packaging, Immersive brand events',
        },
      ]}
      stackTitle="Production tools and platforms we use"
      stackItems={[
        { label: '3D & Modelling', tech: 'Blender, Cinema 4D, 3ds Max, ZBrush, Maya' },
        { label: '2D & Motion', tech: 'After Effects, Adobe Animate, Moho, Toon Boom' },
        { label: 'VFX & Compositing', tech: 'Nuke, DaVinci Resolve, Fusion, Houdini' },
        { label: 'AR / VR', tech: 'Unity, Unreal Engine, ARKit, ARCore, WebXR' },
        { label: 'Output Formats', tech: 'MP4, ProRes, WebM, USDZ, glTF, FBX, OBJ' },
      ]}
      faqItems={[
        {
          q: 'How long does an animated video take to produce?',
          a: 'Timeline depends on length, complexity and revision cycles. A 60-second 2D explainer typically takes 4–6 weeks from approved script to final delivery: 1 week for storyboard approval, 2–3 weeks for animation, 1 week for revisions and sound. 3D and CGI productions take longer due to modelling, rigging and rendering time. We provide a detailed production schedule after the brief is approved.',
        },
        {
          q: 'What is your production process?',
          a: 'Our production process: (1) Brief and objectives — understanding the goal, audience and channel; (2) Script and storyboard — written narrative and visual frame-by-frame layout for approval; (3) Style frames — key visual moments to establish look and feel before full production; (4) Animation production; (5) Sound design and voiceover; (6) Review and revisions; (7) Final delivery in required formats.',
        },
        {
          q: 'Do you provide voiceover and sound design?',
          a: 'Yes. We work with professional voice talent across languages — English, Hindi and regional Indian languages, plus international English accents. Sound design, music licensing and audio mix are included as standard in all video productions. We can also source custom music composition for productions that require an original score.',
        },
        {
          q: 'Can you animate our existing brand assets?',
          a: 'Yes. Animating existing logos, illustrations, product photography and brand elements is a standard request. We work from your brand guidelines and existing asset library. If your assets are not in vector or high-resolution format, we can recreate them for animation.',
        },
        {
          q: 'What formats do you deliver in?',
          a: 'Standard delivery includes MP4 (H.264) for web and social, ProRes or DNxHD for broadcast, and transparent PNG sequences or WebM for animated overlays. For 3D assets, we deliver FBX, OBJ, glTF and USDZ depending on the use case. For AR/VR, we deliver integrated Unity or Unreal packages or standalone app builds.',
        },
      ]}
      ctaHeading="Start a Production"
      ctaText="Share your brief — what you want to communicate, who it is for and where it will run. We will recommend the right format and scope the production."
    />
  );
}
