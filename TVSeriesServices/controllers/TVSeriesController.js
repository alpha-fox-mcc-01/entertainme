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
    
}

module.exports = TvSeriesController