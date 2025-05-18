const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

router.use(authMiddleware);

// Create Task
router.post('/',  async (req, res) => {
  const { title, description, dueDate, priority, assignedTo } = req.body;
if (!title || !description || !dueDate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const task = new Task({
      ...req.body,
      createdBy: req.userId,
    
    });

    await task.save();
     //  Send notification
    if (assignedTo) {
      const user = await User.findById(assignedTo);
      if (user) {
       
        if (!user.notifications) user.notifications = [];
        user.notifications.push({
          message: `You have been assigned a new task: ${title}`,
           createdAt: new Date()
        });
        await user.save();
      }
    }

    res.status(201).json(task);//return to created task
  } catch (err) {
    console.error(err);
  
    res.status(500).json({ message: 'Server error' });
  }
});
// Dashboard Route
router.get('/dashboard', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const userId = req.userId;
    const now = new Date();

    const assignedTasks = await Task.find({ assignedTo: userId })
    .skip((page - 1) * limit)
      .limit(Number(limit));

    const createdTasks = await Task.find({ createdBy: userId })
    .skip((page - 1) * limit)
      .limit(Number(limit));
    const overdueTasks = await Task.find({
      assignedTo: userId,
      dueDate: { $lt: now },
      status: { $ne: 'Completed' },
    })
     .skip((page - 1) * limit)
      .limit(Number(limit));
 // Combine and de-duplicate tasks by _id
    const combinedTasks = [...assignedTasks, ...createdTasks, ...overdueTasks];
    const uniqueTasksMap = new Map();
    combinedTasks.forEach(task => uniqueTasksMap.set(task._id.toString(), task));
    const uniqueTasks = Array.from(uniqueTasksMap.values());

    res.json(uniqueTasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search and Filter Route
router.get('/search', async (req, res) => {
  const { title, description, status, priority, dueDate ,assignedTo} = req.query;
  const query = {};

  if (title) query.title = { $regex: title, $options: 'i' };
  if (description) query.description = { $regex: description, $options: 'i' };
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (dueDate) query.dueDate = { $lte: new Date(dueDate) };
// SAFELY convert assignedTo
  if (assignedTo && mongoose.Types.ObjectId.isValid(assignedTo)) {
    query.assignedTo = new mongoose.Types.ObjectId(assignedTo);
  }
 
      
 console.log('Generated Query:', query);
  try {
    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (err) {
    console.error('Search route error:',err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Tasks assigned to user
router.get('/assigned', async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.userId });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// Get single task by ID
router.get('/:taskId', async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    console.error('Error fetching task:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



// Update Task
router.put('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { title, description, dueDate, priority, status } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(taskId, {
      title,
      description,
      dueDate,
      priority,
      status,
    }, { new: true });

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

 


// Delete Task
router.delete('/:taskId', async (req, res) => {
  const { taskId } = req.params;

  try {
    await Task.findByIdAndDelete(taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
        