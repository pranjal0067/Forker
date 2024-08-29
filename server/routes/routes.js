import express from "express";
import { BlogPost } from "../models/articles.model.js";

const router = express.Router();

/*
TODO:

* recent posts - Done
* popular posts - Done
* pagination api calls, number of pages - Done
* likes/dislikes handlers
* get blog a certain blog post details by blogNumber field - Done

*/

// GET request for /recent-posts endpoint
router.get("/recent-posts", async (req, res) => {
  try {
    const fieldsToReturn = {
      BlogNumber: 1,
      createdAt: 1,
      authorName: 1,
      title: 1,
      description:1,
      content: 1,
      titleImage: 1,
    };

    // -1 matlab descending order (most recent first)
    const recentPosts = await BlogPost.find({}, fieldsToReturn)
      .sort({ createdAt: -1 })
      .limit(9);

    res.status(200).json({
      success: true,
      data: recentPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching recent blog posts",
    });
  }
});

// GET request for /popular-posts endpoint
router.get("/popular-posts", async (req, res) => {
  try {
    const fieldsToReturn = {
      BlogNumber: 1,
      like: 1,
      createdAt: 1,
      authorName: 1,
      title: 1,
      description:1,
      content: 1,
      titleImage: 1,
    };
    // sort by -1 matlab decending order, maltab most liked post first
    const popularPosts = await BlogPost.find({}, fieldsToReturn)
      .sort({ like: -1 })
      .limit(9);

    res.status(200).json({
      success: true,
      data: popularPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching popular blog posts",
    });
  }
});

// from client side send with a ?blogNumber=number
router.get("/blog-page", async (req, res) => {
  try {
    const blogNumber = Number(req.query.blogNumber);

    if (!blogNumber) {
      return res.status(400).json({
        success: false,
        error: "Invalid blogNumber parameter",
      });
    }

    const blogPost = await BlogPost.findOne({ BlogNumber: blogNumber });

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        error: "Blog post not found",
      });
    }

    res.status(200).json({
      success: true,
      data: blogPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching blog post",
    });
  }
});

// from client side send with a ?page=number&limit=9
router.get("/blogs/recent-pagination", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 1; // generally ask for 9 limit

    const fieldsToReturn = {
      BlogNumber: 1,
      createdAt: 1,
      authorName: 1,
      title: 1,
      description: 1,
      content: 1,
      titleImage: 1,
    };

    const totalPosts = await BlogPost.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    if (page < 1 || page > totalPages) {
      return res.status(400).json({
        success: false,
        error: "Invalid page parameter",
      });
    }

    const skip = (page - 1) * limit;
    // const endIndex = page * limit;

    const blogPosts = await BlogPost.find({}, fieldsToReturn)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: blogPosts,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching blog posts",
    });
  }
});

router.get("/blogs/popular-pagination", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 1; // generally ask for 9 limit

    const fieldsToReturn = {
      BlogNumber: 1,
      createdAt: 1,
      authorName: 1,
      like:1,
      title: 1,
      description: 1,
      content: 1,
      titleImage: 1,
    };

    const totalPosts = await BlogPost.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    if (page < 1 || page > totalPages) {
      return res.status(400).json({
        success: false,
        error: "Invalid page parameter",
      });
    }

    const skip = (page - 1) * limit;
    // const endIndex = page * limit;

    const blogPosts = await BlogPost.find({}, fieldsToReturn)
      .sort({ like: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: blogPosts,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching blog posts",
    });
  }
});


// from client side send with a ?blogNumber=number&like=true/false
router.get("/liked", async (req, res) => {
  try {
    const blogNumber = Number(req.query.blogNumber);
    const like = req.query.like === "true"; // Convert the like parameter to a boolean

    if (!blogNumber) {
      return res.status(400).json({
        success: false,
        error: "Invalid blogNumber parameter",
      });
    }

    const blogPost = await BlogPost.findOne({ BlogNumber: blogNumber });

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        error: "Blog post not found",
      });
    }

    if (like) {
      blogPost.like++;
    } else {
      blogPost.like--;
    }

    await blogPost.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error updating blog post",
    });
  }
});

export { router };
