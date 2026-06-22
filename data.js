const main = {
  name: 'Olabamiji Oyetubo',
  mail: 'oyetubobamiji@gmail.com',
  img: './Olabamiji_Linkedin_pic.png',
  role: 'Software Engineer · Technical Consultant · Open Source Contributor',

  // Short intro shown under the name. Use {placeholders} that map to the
  // `introLinks` below to render inline links inside the sentence.
  intro:
    'I build software, advise teams on the systems behind it, and contribute to {opensource} along the way.',
  introLinks: {
    opensource: { label: 'open source', link: 'https://github.com/bigboybamo' }
  },

  about: [
    `I'm a software engineer who enjoys turning fuzzy problems into reliable
     systems. My work spans building products, consulting with teams on
     architecture and delivery, and contributing back to the tools I use.`,
    `Outside of shipping features, I care about developer experience, clean
     interfaces, good docs, and code that the next person can actually read.`
  ],

  // Writing — pulled live from the Dev.to API, newest first. No manual edits
  // needed; new posts appear automatically. `posts` below is only a fallback
  // used if the API request fails (e.g. offline).
  writing: {
    username: 'bigboybamo',
    limit: 3,
    profile: { label: 'Read more on Dev.to', link: 'https://dev.to/bigboybamo' },
    posts: [
      // { title: 'Post title', link: 'https://dev.to/bigboybamo/...', date: '2025' }
    ]
  },

  // Social / contact links shown in the footer.
  connects: [
    {
      name: 'GitHub',
      slug: 'github',
      link: 'https://github.com/bigboybamo'
    },
    {
      name: 'LinkedIn',
      slug: 'linkedin',
      link: 'https://www.linkedin.com/in/olabamiji-o-9a5538162/'
    },
    {
      name: 'Dev.to',
      slug: 'devdotto',
      link: 'https://dev.to/bigboybamo'
    },
    {
      name: 'Stack Overflow',
      slug: 'stackoverflow',
      link: 'https://stackoverflow.com/users/13279710/bamiji-o'
    },
    {
      name: 'Email',
      slug: 'gmail',
      link: 'mailto:oyetubobamiji@gmail.com?Subject=Hello'
    }
  ]
};
