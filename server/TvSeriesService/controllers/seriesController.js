const Series = require("../models/Series");

module.exports = {
  fetchSeries(req, res, next) {
    Series.find()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  },
  addSeries(req, res, next) {
    let { title, overview, poster_path, popularity, tags } = req.body;
    if (
      !poster_path ||
      poster_path == "" ||
      poster_path.slice(0, 3).toLowerCase() !== "htt" ||
      poster_path.slice(0, 3).toLowerCase() !== "www"
    )
      poster_path =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTb481OSt5pyxs0sDiBLtbJSYBqQDFijRlhf74kfk4Wtz5Qo5-z";
    Series.create({
      title,
      overview,
      poster_path,
      popularity,
      tags
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  },
  editSeries(req, res, next) {
    let { title, overview, poster_path, popularity, tags } = req.body;
    if (
      !poster_path ||
      poster_path == "" ||
      poster_path.slice(0, 3).toLowerCase() !== "htt" ||
      poster_path.slice(0, 3).toLowerCase() !== "www"
    )
      poster_path =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTb481OSt5pyxs0sDiBLtbJSYBqQDFijRlhf74kfk4Wtz5Qo5-z";
    Series.findByIdAndUpdate(
      req.params.id,
      {
        title,
        overview,
        poster_path,
        popularity,
        tags
      },
      { new: true }
    )
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  },
  deleteSeries(req, res, next) {
    Series.findByIdAndDelete(req.params.id)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  }
};
