const async = require('async');
const Paper = require('../model/paper');

class paperControll {
  getAll(req, res, next) {
    async.series({
      totalCount: (done) => {
        Paper.count(done);
      },
      items: (done) => {
        Paper.find({}, (err, docs) => {
          if (err) {
            return done(err, null);
          }
          let paper = docs.map((doc) => {
            let section = buildUrl(doc.sections.section);
            let newData = doc.toJSON();
            newData.sections.section = section;
            return newData;
          })
          done(null, paper);
        })
      }
    }, (err, paper) => {
      if (err) {
        return next(err);
      }

      return res.status(200).send(paper);
    })
  }

  getOne(req, res, next) {
    Paper.findById(req.params.paperId, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(404);
      }
      let section = buildUrl(doc.sections.section);
      let paper = doc.toJSON();
      paper.sections.section = section;
      return res.status(200).send(paper);
    })
  }

  create(req, res, next) {
    Paper.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(201).send(`/papers/${doc._id}`);
    })
  }

  update(req, res, next) {
    Paper.findByIdAndRemove(req.params.paperId, req.body, (err, doc) => {
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
    Paper.findByIdAndRemove(req.params.paperId, (err, doc) => {
      if (err) {
        return next(err);
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
    return `/sections/${item}`;
  });
}

module.exports = paperControll;