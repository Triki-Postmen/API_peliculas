const { Router } = require('express');
const router = Router();
const _ = require('underscore')

const movies = require('../sample.json');


router.get('/',(req, res) => {
    res.json(movies);
});

    router.get('/id/:id', (req, res) => {
        const movieid = movies.filter(m => m.id === req.params.id);
        if (movieid.length === 0) return res.status(404).send('No movies found for this id');
        res.json(movieid);
      });
  
router.post('/', (req, res) =>{
    const{title, director, year, rating} = req.body;

    if(title && director && year && rating){
        const id = movies.length + 1;
        const newMovie = {...req.body, id}
        movies.push(newMovie);
        res.json(movies);
    }else{
        res.status(500).json({error: 'there was an error'});
    }
    
});


router.put('/:id', (req, res) =>{
    const {id} = req.params
    const{title, director, year, rating} = req.body;
    if(title && director && year && rating){
        _.each(movies,(movie, i) => {

            if(movie.id == id){
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.rating = rating;
            }
        });
        res.json(movies);

    }else{
        res.status(500).json({error: 'there was an error'})
    }


})

router.delete('/:id', (req, res) =>{
    const{id} = req.params
    _.each(movies,(movie, i) =>{
        if (movie.id == id){
            movies.splice(i, 1);
        }
    })
    res.send(movies);
})

// GET movies by year
router.get('/year/:year', (req, res) => {
    const moviesByYear = movies.filter(m => m.year.toLowerCase() === req.params.year.toLowerCase());
    if (moviesByYear.length === 0) return res.status(404).send('No movies found for this year');
    res.json(moviesByYear);
  });

  
// PUT update movie by year
router.put('/year/:year', (req, res) => {
    const movieIndex = movies.findIndex(m => m.year === req.params.year);
    if (movieIndex === -1) return res.status(404).send('Movie not found');
  
    movies[movieIndex].genre = req.body.genre || movies[movieIndex].genre;
    movies[movieIndex].year = req.body.year || movies[movieIndex].year;
  
    res.json(movies[movieIndex]);
  });

  // DELETE movie by year
router.delete('/year/:year', (req, res) => {
    const movieIndex = movies.findIndex(m => m.year === req.params.year);
    if (movieIndex === -1) return res.status(404).send('Movie not found');
  
    const deletedMovie = movies.splice(movieIndex, 1);
    res.json(deletedMovie);
  });

module.exports = router;