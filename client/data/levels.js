const levels = [
  {
    title: 'Historic Low',
    percentile:'100%',
    description:'100% of all historic readings on this date were higher than the current reading. Please note: readings are provisional and subject to review.',
    class: 'overview --negative'
  },
  {
    title: 'Very Low',
    percentile:'90%',
    description:'90% of all readings on this date were higher than the current reading.',
    class: 'overview --negative'
  },
  {
    title: 'Low',
    percentile:'80%',
    description:'80% of all readings on this date were higher than the current reading.',
    class: 'overview --negative'
  },
  {
    title: 'Somewhat Low',
    percentile:'70%',
    description:'70% of all readings on this date were higher than the current reading.',
    class: 'overview --negative'
  },
  {
    title: 'Normal',
    percentile:'50%',
    description:'The current reading is similar to most historic readings on this day.',
    class: 'overview --normal'
  },
  {
    title: 'Somewhat High',
    percentile:'70%',
    description:'70% of all readings on this date were lower than the current reading.',
    class: 'overview --positive'
  },
  {
    title: 'High',
    percentile:'80%',
    description:'80% of all readings on this date were lower than the current reading.',
    class: 'overview --positive'
  },
  {
    title: 'Very High',
    percentile:'90%',
    description:'90% of all readings on this date were lower than the current reading.',
    class: 'overview --positive'
  },
  {
    title: 'Historic High',
    percentile:'100%',
    description:'100% of all readings on this date were lower than the current reading. Please note: readings are provisional and subject to review.',
    class: 'overview --positive'
  }
];

export default levels;
