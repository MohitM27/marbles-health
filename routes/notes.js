import express from 'express';
import { createNote, getNoteById, queryNotesByTitle, updateNote } from '../controllers/notesController.js';

const router = express.Router();

/**
 * @openapi
 * /notes:
 *   post:
 *     summary: Create a new note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created
 */
router.post('/', createNote);

/**
 * @openapi
 * /notes/{id}:
 *   get:
 *     summary: Fetch a note by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note found
 */
router.get('/:id', getNoteById);

/**
 * @openapi
 * /notes:
 *   get:
 *     summary: Query notes by title substring
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notes found
 */
router.get('/', queryNotesByTitle);

/**
 * @openapi
 * /notes/{id}:
 *   put:
 *     summary: Update an existing note
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated
 */
router.put('/:id', updateNote);

export default router;
