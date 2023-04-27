const express = require('express');
const ctrl = require('../../controllers/contacts');
const router = express.Router();
const { schemas } = require('../../models/contact');
const { isValidId, validateBody, authenticate } = require('../../midlewares');

router.get('/', authenticate, ctrl.getAll);

router.get('/:id', authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.add);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete('/:id', authenticate, isValidId, ctrl.deleteById);

router.delete('/', authenticate, ctrl.deleteAll);

module.exports = router;
