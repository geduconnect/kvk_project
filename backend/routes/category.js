const { Category } = require("../model/category");
const {ImageUpload} = require("../model/imagesUpload")

const express = require("express");
const router = express.Router();
const slugify = require("Slugify");

const fs = require("fs")

const cloudinary = require("cloudinary").v2
var imagesArr = [];


router.post("/create", async (req, res) => {
  let catObj = {};

  if (imagesArr.length > 0) {
    catObj = {
      name: req.body.name,
      color: req.body.color,
      images: imagesArr,
      slug: req.body.name,
      parentId: req.body.name,
    };
  } else {
    catObj = {
      name: req.body.name,
      slug: req.body.name,
    };
  }
  if (req.body.parentId) {
    catObj.parentId = req.body.parentId;
  }
  let category = new Category(catObj);
  if (!category) {
    res.status(500).json({
      error: err,
      success: false,
    });
  }
});
category = await category.save();
imagesArr=[]

res.status(201).json(category)
