const Homework = require('../model/homework');
const Section = require('../model/section');
const async = require('async');

export default class HomeContorller {
  getAll(req, res, next) {
    async.series({
      totalCount: (done) => {
        Homework.count(done);
      },
      items: (done) => {
        Homework.find({}, done);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }

      return res.status(200).send(result);
    });
  }

  getOne(req, res, next) {
    Homework.findById(req.params.homeworkId, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(404);
      }
      return res.status(200).send(doc);
    })
  }

  create(req, res, next) {
    console.log(req.body)
    Homework.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }

      return res.status(201).send(`/homeworks/${doc._id}`);
    })
  }

  update(req, res, next) {
    Homework.findByIdAndUpdate(req.params.homeworkId, req.body, (err, doc) => {
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
        Section.findOne({'homeworks.homework': req.params.homeworkId}, done);
      },
      (doc, done) => {
        if (doc) {
          return done({status: 400}, null);
        }

        Homework.findByIdAndRemove(req.params.homeworkId, done);
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
    });
  }
}
