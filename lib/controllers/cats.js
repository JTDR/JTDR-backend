const { Router } = require('express');
const Cat = require('../models/Cat');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newCat = await Cat.insert(req.body);
      res.json(newCat);
    } catch (error) {
      next (error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const cats = await Cat.getAll();
      res.json(cats);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const CatId = await Cat.getById(id);
      res.json(CatId);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const cat = await Cat.delete(req.params.id);
      res.json(cat);
    } catch (e) {
      next(e);
    }
  })
  
  .put('/:id', async (req, res, next) => {
    try {
      const cat = await Cat.updateById(req.params.id, req.body);
      res.json(cat);
    } catch (e) {
      next(e);
    }
  });
