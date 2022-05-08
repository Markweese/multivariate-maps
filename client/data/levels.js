const levels = [
  {
    title: 'Historic Low',
    percentile:'100%',
    description:'100% of all historic readings on this date were higher than the current reading. Please note: readings are provisional and subject to review.',
    class: 'overview --negative',
    color: '#8a120a'
  },
  {
    title: 'Very Low',
    percentile:'90%',
    description:'90% of all readings on this date were higher than the current reading.',
    class: 'overview --negative',
    color: '#b5180d'
  },
  {
    title: 'Low',
    percentile:'80%',
    description:'80% of all readings on this date were higher than the current reading.',
    class: 'overview --negative',
    color: '#e63c30'
  },
  {
    title: 'Somewhat Low',
    percentile:'70%',
    description:'70% of all readings on this date were higher than the current reading.',
    class: 'overview --negative',
    color: '#eb6d65'
  },
  {
    title: 'Normal',
    percentile:'50%',
    description:'The current reading is similar to most historic readings on this day.',
    class: 'overview --normal',
    color: '#95aded'
  },
  {
    title: 'Somewhat High',
    percentile:'70%',
    description:'70% of all readings on this date were lower than the current reading.',
    class: 'overview --positive',
    color: '#4e7aed'
  },
  {
    title: 'High',
    percentile:'80%',
    description:'80% of all readings on this date were lower than the current reading.',
    class: 'overview --positive',
    color: '#1348d4'
  },
  {
    title: 'Very High',
    percentile:'90%',
    description:'90% of all readings on this date were lower than the current reading.',
    class: 'overview --positive',
    color: '#8e51e8'
  },
  {
    title: 'Historic High',
    percentile:'100%',
    description:'100% of all readings on this date were lower than the current reading. Please note: readings are provisional and subject to review.',
    class: 'overview --positive',
    color: '#591bc4'
  }
];

export default levels;
