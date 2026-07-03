const main = {
  name: 'Olabamiji Oyetubo',
  mail: 'oyetubobamiji@gmail.com',
  img: './Olabamiji_Linkedin_pic.png',
  role: 'Software Engineer · Technical Consultant · Open Source Contributor',

  // Short intro shown under the name. Use {placeholders} that map to the
  // `introLinks` below to render inline links inside the sentence.
  intro:
    'I build reliable software systems, AI-powered workflows, and document the tools and ideas behind them.',
  introLinks: {
    opensource: { label: 'open source', link: 'https://github.com/bigboybamo' }
  },

  about: [
    `I'm a software engineer focused on building reliable, 
    scalable systems that solve real business problems. 
    My work has centered around enterprise software, 
    banking systems, and backend services, with experience turning complex workflows into clean, 
    maintainable applications.`,
    `I'm also exploring the intersection of software engineering and AI, 
    particularly agentic AI, AI evaluations, 
    and how teams can build AI-powered systems that are reliable, 
    testable, and useful in real-world workflows.`
  ],

  // "Interesting things" — a mix of my own projects, professional work, and
  // contributions to other people's open source. `type` is 'Project' (something
  // I built), 'Work' (professional/paid engagement), or 'Contribution' (work I
  // shipped into someone else's project). For 'Work'/'Contribution', set the
  // optional `repo` to show where it landed (e.g. 'owner/repo').
  interesting: [
    {
      name: 'Shesha',
      type: 'Work',
      repo: 'shesha-io/docs.shesha',
      description: 'Owned and expanded the official documentation for Shesha, an open-source low-code application framework, writing and maintaining guides, references, and examples.',
      link: 'https://github.com/shesha-io/docs.shesha'
    },
    {
      name: 'Text2Speech',
      type: 'Project',
      description: 'App that turns text and documents (.txt, .docx, .pdf) into speech, with voice selection and audio export.',
      link: 'https://github.com/bigboybamo/Text2speeech'
    },
    {
      name: 'JobSearchBuilder',
      type: 'Project',
      description: 'A desktop tool that builds targeted Google queries across multiple ATS job portals, with saved search profiles and AI-powered role parsing.',
      link: 'https://github.com/bigboybamo/JobSearchBuilder'
    },
    {
      name: 'Word Picture Placeholder Add-in',
      type: 'Project',
      description: 'A C#/VSTO add-in for Microsoft Word that manages numbered image placeholders while drafting — auto-numbered insertion, listing, and removal with renumbering.',
      link: 'https://github.com/bigboybamo/WordPicturePlaceholderAddin'
    },
    {
      name: 'GitHub',
      type: 'Contribution',
      repo: 'github/docs',
      description: 'Spotted and fixed a gap in GitHub’s official documentation, clarifying that source code is automatically attached as an asset when you create a release.',
      link: 'https://github.com/github/docs/pull/31352',
      issue: { label: 'Raised as issue #31147', link: 'https://github.com/github/docs/issues/31147' }
    },
    {
      name: 'Microsoft .NET',
      type: 'Contribution',
      repo: 'dotnet/docs',
      description: '20+ merged pull requests improving Microsoft’s official .NET documentation, fixing errors, clarifying guidance, and updating code samples.',
      link: 'https://github.com/dotnet/docs/pulls?q=is%3Apr+author%3Abigboybamo+is%3Amerged'
    }
  ],

  // Writing pulled live from the Dev.to API, newest first
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
