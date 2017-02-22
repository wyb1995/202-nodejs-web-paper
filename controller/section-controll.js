const Section = require('../model/section');
const Paper = require('../model/paper');
const async = require('async');

class SectionControll {
  getAll(req, res, next) {
    async.series({
      totoalCount: (done) => {
        Section.count(done);
      },
      items: (done) => {
        Section.find({}, (err, docs) => {
          if (err) {
            return done(err, docs);
          }
          let sections = docs.map((section) => {
            let homework = buildUrl(section.homeworks.homework);
            let newData = section.toJSON();
            newData.homeworks.homework = homework;
            return newData;
          });
          done(null, sections);
        })
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }

      return res.status(200).send(result);
    })
  }

  getOne(req, res, next) {
    Section.findById(req.params.sectionId, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(404);
      }
      let homework = buildUrl(doc.homeworks.homework);
      let sections = doc.toJSON();
      sections.homeworks.homework = homework;

      return res.status(200).send(sections);
    })
  }

  create(req, res, next) {
    Section.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }

      return res.status(201).send(`/sections/${doc._id}`);
    })
  }

  update(req, res, next) {
    Section.findByIdAndUpdate(req.params.sectionId, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(404);
      }

      return res.sendStatus(204);
    })
  }

  delete(req, res, next) {
    async.waterfall([
      (done) => {
        Paper.findOne({'sections.section': req.params.sectionId}, done);
      },
      (doc, done) => {
        if (doc) {
          return done({status: 400}, null);
        }

        Section.findByIdAndRemove(req.params.sectionId, done);
      }
    ], (err, doc) => {
      if (err && err.status !== 400) {
        return next(err);
      }
      if (err && err.status === 400) {
        return res.sendStatus(400);
      }
      if (!doc) {
        return res.sendStatus(404);
      }
      return res.sendStatus(204);
    })
  }
}

function buildUrl(items) {
  return items.map((item) => {
    return `/homeworks/${item}`;
  });
}

module.exports = SectionControll;