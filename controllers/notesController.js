import Note from '../models/note.js'; // Import Note model

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(400).json({ message: 'Title and body are required' });
    }

    const newNote = new Note({
      title,
      body,
      created_at: new Date(),
      updated_at: new Date()
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch a note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Query notes by title substring
export const queryNotesByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({ message: 'Query parameter "title" is required' });
    }

    const notes = await Note.find({ title: new RegExp(title, 'i') }); // Case-insensitive search
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an existing note
export const updateNote = async (req, res) => {
  try {
    const { title, body } = req.body;
    if (!title && !body) {
      return res.status(400).json({ message: 'At least one of "title" or "body" is required' });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        body, 
        updated_at: new Date() 
      },
      { new: true } // Return the updated document
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
