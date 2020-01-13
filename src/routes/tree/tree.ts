import { Router } from 'express';
const mongoose = require('mongoose');
import requires from '../../middleware/requires';
const _ = require('lodash');
import { TreeModel, UserModel } from '../../models';
const { validationResult } = require('express-validator/check');
const cloudinary = require('cloudinary').v2;
const upload = require('../../config/multer');
// get the router
const app = Router();

/**
 * GET: Get all trees `/tree`
 */
app.get('/', async (req, res) => {
  const trees = await TreeModel.find({ deleted: false }).populate({
    path: 'owner',
    match: { deleted: false },
  });
  // sanity check for user
  if (trees.length === 0) {
    return res.status(400).json({ success: false, message: 'Tree do not exist in the Database' });
  }
  // send the user back
  return res.json({ trees, success: true, message: 'Success' });
});

/**
 * GET: Get tree by id `/tree/:id`
 */
app.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tree = await TreeModel.findOne({ _id: id, deleted: false }).populate({
      path: 'owner',
      match: { deleted: false },
    });
    // sanity check for user
    if (!tree) {
      return res.status(400).json({ success: false, message: 'Tree can not found' });
    }
    // send the user back
    return res.json({ tree, success: true, message: 'Success' });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

/**
 * GET: Get tree by user `/tree/user/:id`
 */
app.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOne({ _id: id, deleted: false });
    const allTrees = await TreeModel.find({ deleted: false });
    // filter tree by user
    const trees = allTrees.filter(tree => {
      return tree.owner == id;
    });
    // sanity check for user
    if (trees.length === 0) {
      return res.status(400).json({ success: false, message: 'User never plant any tree' });
    }
    // send the user back
    return res.json({ trees, success: true, message: 'Success' });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

/**
 * POST: Create a tree `/tree`
 */
app.post(
  '/',
  requires({ body: ['name', 'photo', 'location', 'description', 'owner'] }),

  async (req, res) => {
    try {
      // get this piece of info
      const { name, photo, location, description, owner } = req.body;

      const treeProperties = {
        name,
        photo,
        location,
        description,
        owner,
      };
      const tree = new TreeModel(treeProperties);
      // save new tree
      await tree.save();
      // return success
      return res.json({
        tree,
        success: true,
        message: 'Tree created',
      });
    } catch (e) {
      return res.status(500).json({ success: false, message: e });
    }
  },
);

export default app;
