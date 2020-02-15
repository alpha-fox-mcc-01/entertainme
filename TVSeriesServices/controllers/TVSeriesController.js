const TvSeries = require('../models/tvseries')

class TvSeriesController {
    static createSeries(req, res, next) {
        const { title, overview, poster_path, popularity, tags } = req.body;
        let tagInput = [];
        if (tags) {
          tagInput = tags.split(",");
        }
        TvSeries.create({
          title,
          overview,
          poster_path,
          popularity,
          tags: tagInput
        })
          .then( result => {
              console.log(result)
            res.status(201).json({ result });
          })
          .catch(err => {
            next(err);
          });
      }
    
      static getAllSeries(req, res, next) {
          TvSeries.find()
               .then(result => {
                   res.status(200).json(result)  
               })
               .catch(err => {
                   next(err)
               })
      }

      static editSeries(req, res, next) {
        const { title, overview, poster_path, popularity, tags } = req.body;
        TvSeries.findOneAndUpdate({ _id: req.params.id}, {  title, overview, poster_path, popularity, tags}) 
             .then(_ => {
               res.status(200).json({ result: req.body})
             }) 
             .catch(err => {
               next(err)
             })
      }
    
      static deleteSeries(req, res, next) {
        TvSeries.deleteOne({ _id: req.params.id})
             .then(_ => {
               res.status(200).json({ result: req.params.id })
             })
             .catch(err => {
               next(err)
             })
      }
    
}

module.exports = TvSeriesController