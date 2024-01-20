import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { handleInputErrors } from './modules/middleware';
import { createProduct, getOneProduct, getProducts } from './handlers/product';

const router = Router()

/**
 * Product Router
 */


router.get('/products', getProducts)
router.get('/product/:id', () => {}) //:id è un parametro del router, possiamo impostare quello che vogliamo
router.put('/product/:id', body('name').isString(), handleInputErrors, (req, res) => {}) //handleInputErrors è una callback 


router.post('/product', body('name').isString(), handleInputErrors, createProduct);
router.delete('/product/:id', () => {}) 

/**
 * Update Product Router
 */

router.get('/updates', () => {})
router.get('/update/:id', () => {}) //:id è un parametro del router, possiamo impostare quello che vogliamo
router.put('/update/:id', 
    body('title').optional(), 
    body('body').optional(), 
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']), 
    body('version').optional(),  
() => {
}) 
router.post('/update/', 
    body('title').exists().isString(), 
    body('body').exists().isString(), 
() => {}
) 

router.delete('/update/:id', () => {}) 

/**
 * Update Points
 */

router.get('/updatepoints', () => {})
router.get('/updatepoint/:id', () => {}) //:id è un parametro del router, possiamo impostare quello che vogliamo
router.put('/updatepoint/:id', 
body('name').optional().isString(),
body('description').optional().isString(),


() => {}) 
router.post('/updatepoint/',
body('name').isString(),
body('description').isString(),
body('updateId').exists().isString(),
() => {}) 
router.delete('/updatepoint/:id', () => {})

export default router

