const ReportValidator = {
  methods: {
    validateReport(data) {
      let issues = [];
      const allTypes = {
        title: 'string',
        author: 'string',
        activity: 'string',
        activitywritein: 'string',
        numCaught: 'number',
        fish: 'object',
        flys: 'object',
        comment: 'string',
        watercraft: 'string',
        watercraftwritein: 'string',
        watercraftmake: 'string',
        watercraftmodel: 'string',
        watercraftlength: 'string',
        putInName: 'string',
        putInLocation: 'object',
        obstacles: 'object',
        takeOutName: 'string',
        takeOutLocation: 'object',
        isPrivate: 'boolean',
        rememberBoat: 'boolean',
        deepcheck: {
          fish: {
            id: 'string',
            species: 'string',
            specieswritein: 'string',
            length: 'number',
            weight: 'number'
          },
          flys: {
            id: 'string',
            method: 'string',
            name: 'string',
            size: 'number',
            color: 'string'
          },
          obstacles: {
            id: 'string',
            type: 'string',
            obstaclewritein: 'string',
            description: 'string',
            incidentOccurred: 'boolean',
            location: {
              0: 'number',
              1: 'number'
            }
          },
          putInLocation: {
            0: 'number',
            1: 'number'
          },
          takeOutLocation: {
            0: 'number',
            1: 'number'
          }
        }
      };

      for (field in data) {
        if (typeof data[field] === allTypes[field]) {
          continue;
        } else {
          issues.push({field: field});
        }

        if (typeof data[field] === 'object') {
          for (subfield in data[field]) {
            if (typeof subfield === )
          }
        }
      }
    }
  }
};

export {
  ReportValidator
};
