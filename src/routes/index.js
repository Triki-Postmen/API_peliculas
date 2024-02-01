const { Router } = require('express');
const router = Router();


router.get('/', (req, res) => {
    res.json({"titulo": "Hola mundo"});
});


module.exports = router;