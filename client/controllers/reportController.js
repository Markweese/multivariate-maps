const mongoose = require('mongoose');
const Tag = mongoose.model('Tag');
const User = mongoose.model('User');
const Station = mongoose.model('Station');
const Report = mongoose.model('Report');

exports.validateReport = (req, res, next) => {
  req.checkBody('stationNumber', 'your report was not submitted in association with a usgs station').notEmpty();
  req.checkBody('author', 'no author provided').notEmpty();
  req.checkBody('authorId', 'no author provided').notEmpty();
  req.checkBody('activity', 'no author provided').notEmpty();

  req.sanitize('author').blacklist('<>\{\}\$:\(\);\'\"\/');
  req.sanitize('authorId').blacklist('<>\{\}\$:\(\);\'\"\/');
  req.sanitize('stationNumber').blacklist('<>\{\}\$:\(\);\'\"\/');
  req.sanitize('name').blacklist('<>\{\}\$:\(\);\'\"\/');
  req.sanitize('comment').blacklist('<>\{\}');
  req.sanitize('watercraft').blacklist('<>\{\}');
  req.sanitize('watercraftwritein').blacklist('<>\{\}');
  req.sanitize('watercraftmake').blacklist('<>\{\}');
  req.sanitize('watercraftmodel').blacklist('<>\{\}');
  req.sanitize('watercraftlength').blacklist('<>\{\}');
  req.sanitize('putInName').blacklist('<>\{\}');
  req.sanitize('takeOutName').blacklist('<>\{\}');
  req.sanitize('state').blacklist('<>\{\}\$:\(\);\'\"\/');
  req.sanitize('activity').blacklist('<>\{\}\$:\(\);\'\"\/');
  req.sanitize('activitywritein').blacklist('<>\{\}');
  req.sanitize('numCaught').blacklist('<>\{\}\$:\(\);\'\"\/');
  req.sanitize('endDate').blacklist('<>\{\}\$:\(\);\'\"\/');
  req.sanitize('startDate').blacklist('<>\{\}\$:\(\);\'\"\/');

  req.checkBody('isPrivate', 'issue with privacy settings').isBoolean();
  req.checkBody('rememberBoat', 'issue saving boat settings').isBoolean();
  req.checkBody('created', 'unexpected date provided').isDate();

  if (req.body.fish.length > 0) {
    req.sanitize('flys.*.method').blacklist('<>\{\}\$:\(\);\'\"\/');
    req.sanitize('flys.*.name').blacklist('<>\{\}\$:\(\);\'\"\/');
    req.sanitize('flys.*.color').blacklist('<>\{\}\$:\(\);\'\"\/');
    req.sanitize('flys.*.size').blacklist('<>\{\}\$:\(\);\'\"\/');
  }

  if (req.body.fish.length > 0) {
    req.sanitize('fish.*.species').blacklist('<>\{\}\$:\(\);\'\"\/');
    req.sanitize('fish.*.specieswritein').blacklist('<>\{\}\$:\(\);\'\"\/');
    req.sanitize('fish.*.length').blacklist('<>\{\}\$:\(\);\'\"\/');
    req.sanitize('fish.*.weight').blacklist('<>\{\}\$:\(\);\'\"\/');
  }

  if (req.body.obstacles.length > 0) {
      req.sanitize('obstacles.*.name').blacklist('<>\{\}\$:\(\);\'\"\/');
      req.sanitize('obstacles.*.type').blacklist('<>\{\}\$:\(\);\'\"\/');
      req.sanitize('obstacles.*.writein').blacklist('<>\{\}\$:\(\);\'\"\/');
      req.sanitize('obstacles.*.description').blacklist('<>\{\}\$:\(\);\'\"\/');
  }

  if (req.body.conditions && req.body.conditions.cfs) {
    req.checkBody('conditions.cfs', 'issue writing cfs data').isFloat();
  }

  if (req.body.conditions && req.body.conditions.temp) {
    req.checkBody('conditions.*.temp', 'issue writing temp data').isFloat();
  }

  if (req.body.conditions && req.body.conditions.ph) {
    req.checkBody('conditions.*.ph', 'issue writing ph data').isFloat();
  }

  if (req.body.conditions && req.body.conditions.conductance) {
    req.checkBody('conditions.*.conductance', 'issue writing conductance data').isFloat();
  }

  if (req.body.date) {
    req.checkBody('date', 'invalid start date provided').isDate();
  }

  if (req.body.endDate) {
    req.checkBody('endDate', 'invalid end date provided').isDate();
  }

  const errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.json({status: 500, errors});
    return;
  }

  next();
}

exports.postReport = async (req, res) => {
  if (req.body.rememberBoat === true) {

    try {
      await User.findOneAndUpdate({_id: req.user._id}, {$set: { waterCraft: {
            category: req.body.watercraft,
            writein: req.body.watercraftwritein,
            make: req.body.watercraftmake,
            model: req.body.watercraftmodel,
            length: req.body.watercraftlength
          }
         }
       });
     } catch(e) {
       console.log(e);
     }
  }

  if (req.user && req.user._id.toString() === req.body.authorId) {
    await (new Report(
      {
        title: req.body.title,
        isPrivate: req.body.isPrivate,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        stationNumber: req.body.stationNumber,
        activity: req.body.activity,
        activitywritein: req.body.activitywritein,
        conditions: req.body.conditions,
        author: req.body.author,
        authorId: req.user._id,
        state: req.body.state,
        created:  req.body.created,
        flys: req.body.flys,
        waterCraft: {
          category: req.body.watercraft,
          writein: req.body.watercraftwritein,
          make: req.body.watercraftmake,
          model: req.body.watercraftmodel,
          length: req.body.watercraftlength,
        },
        putIn: {
          name: req.body.putInName,
          coordinates: req.body.putInLocation
        },
        takeOut: {
          name: req.body.takeOutName,
          coordinates: req.body.takeOutLocation
        },
        obstacles: req.body.obstacles,
        numCaught: req.body.numCaught,
        fish: req.body.fish,
        comment: req.body.comment
    })).save(function (err) {
        if (err) {
          res.json({status: 500, errors: [{msg: 'there, was an issue logging your report, please try again later'}]});
        } else {
          res.json({status: 200});
        }
    });
  } else {
    res.json({status: 500, errors: [{msg: 'please log in before trying to log a report'}]});
  }
}

exports.getStationReports = async (req, res) => {
  if (req.params.station) {
    const reports = await Report.find({stationNumber: req.params.station, isPrivate: false});
    const promises = await reports.map(async report => {
      const user = await User.findOne({_id: mongoose.Types.ObjectId(report.authorId)}, {photo: 1});
      report.photo = user.photo;

      return report;
    })

    const reportsEnhanced = await Promise.all(promises)
    res.json({status: 200, data: reportsEnhanced});
  }
}

exports.upvoteReport = async (req, res) => {
  if (req.user) {
    const vote = { vote: 1, userId: req.user._id};
    const report = await Report.findOne({_id: mongoose.Types.ObjectId(req.params.report)}, {_id: 1, votes: 1});

    if (report.votes.filter(v => v.userId === req.user._id.toString()).length) {
      res.json({status: 401, msg: 'vote already recorded'});
    } else {
      await report.update({$push: {votes: vote}, $inc: {score: 1}});
      res.json({status: 200, msg: 'vote recorded'});
    }
  } else {
    res.json({status: 401, msg: 'you need to <a href="/login">log in</a> to vote'});
  }
}

exports.downvoteReport = async (req, res) => {
  if (req.user) {
    const vote = { vote: -1, userId: req.user._id};
    const report = await Report.findOne({_id: mongoose.Types.ObjectId(req.params.report)}, {_id: 1, votes: 1});

    if (report.votes.filter(v => v.userId === req.user._id.toString()).length) {
      res.json({status: 401, msg: 'user already voted'});
    } else {
      await report.update({$push: {votes: vote}, $inc: {score: -1}});
      res.json({status: 200, msg: 'vote recorded'});
    }
  } else {
    res.json({status: 401, msg: 'you need to <a href="/login">log in</a> to vote'});
  }
}

exports.validateComment = (req, res, next) => {
  req.checkBody('date', 'improper date format').isDate();
  req.checkBody('author', 'no author provided').notEmpty();
  req.checkBody('authorId', 'no author provided').notEmpty();

  req.sanitize('author').blacklist('<>\{\}');
  req.sanitize('authorId').blacklist('<>\{\}');
  req.sanitize('comment').blacklist('<>\{\}');
  req.sanitize('replyTo').blacklist('<>\{\}');

  if (req.body.hashTags > 0) {
    req.sanitize('hashTags.*').blacklist('<>\{\}\'\'\"\"\`\`\(\)#@$%^&*!?/\\[]:;|~');
  }

  if (req.body.userTags > 0) {
    req.sanitize('userTags.*').blacklist('<>\{\}');
  }

  const errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.json({status: 500, errors});
    return;
  }

  next();
}

exports.addComment = async (req, res) => {
  if (req.user) {
    await Report.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.report)}, {$push: {comments: {
      date: req.body.date,
      author: req.body.author,
      authorId: req.body.authorId,
      replyTo: req.body.replyTo,
      comment: req.body.comment,
      hashTags: req.body.hashTags,
      userTags: req.body.userTags
    }}});

    res.json({status: 200, errors: [{msg: 'comment recorded'}]});
  } else {
    res.json({status: 401, errors: [{msg: 'you need to <a href="/login">log in</a> to comment'}]});
  }
}

exports.cleanTags = async (req, res, next) => {
  if (req.body.tags > 0) {
    req.sanitize('tags.*').blacklist('<>\{\}\'\'\"\"\`\`\(\)#@$%^&*!?/\\[]:;|~');
    next();
  } else {
    return;
  }
}

// needs for loop solve

// exports.registerTags = async (req, res) => {
//   if (req.user) {
//     req.body.tags.forEach(tag => {
//       const tagFound = await Tag.findOne({tag: tag});
//
//       if (tagFound) {
//         await tagFound.update({$inc: {instances: 1}});
//       } else {
//         await (new Tag({
//           tag: tag,
//           instances: 1
//         })).save(function (err) {
//             if (err) {
//               console.log(err);
//               return;
//             } else {
//               return;
//             }
//         });
//       }
//     });
//   } else {
//     console.log('unauthorized tag submission');
//   }
// }
//
// exports.cleanNotification async (req, res, next) => {
//   if (req.body.userTags) {
//     req.sanitize('userTags.*.id').blacklist('<>\{\}$');
//     req.sanitize('userTags.*.notificationType').blacklist('<>\{\}$');
//     req.sanitize('userTags.*.reportId').blacklist('<>\{\}$');
//     req.sanitize('userTags.*.commentId').blacklist('<>\{\}$');
//     next();
//   }
// }
//
// exports.notifyTaggedUsers = async (req, res) => {
//   if (req.user) {
//     req.body.userTags.forEach(user => {
//       User.findOneAndUpdate({_id: mongoose.Types.ObjectId(user.id}, {$push: {notifications: {
//         notificationType: 'tag',
//         fromUser: req.user.name,
//         reportId: req.body.reportId,
//         commentId: req.body.commentId
//       }}})
//     });
//
//   } else {
//     console.log('unauthorized user notification attempt');
//   }
// }
//
// exports.notifyCommentedUser = async (req, res) => {
//   if (req.user) {
//     User.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body.authorId}, {$push: {notifications: {
//       notificationType: 'comment',
//       fromUser: req.user.name,
//       reportId: req.body.reportId,
//       commentId: req.body.commentId
//     }}})
//   } else {
//     console.log('unauthorized user notification attempt');
//   }
// }
