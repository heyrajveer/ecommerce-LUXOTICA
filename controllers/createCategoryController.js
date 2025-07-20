import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(401).send({
        success: false,
        message: "Name is required",
      });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(201).send({
        success: true,
        message: "Category already exists",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    //Missing Response Fixed Below:
    res.status(200).send({
      success: true,
      message: "New category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating category",
      error,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    if (!category) {
      return res.status(401).send({
        success: false,
        message: "category not find by this id",
      });
    }
    res.status(200).send({
        success:true,
        message:"category Updated successfully",
        category,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

export const categoryContoller =async(req,res)=>{
try {
    const category = await categoryModel.find({});
    res.status(200).send({
        success:true,
        message:"all Category List",
        category,
    });
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        messsag:"category not found while tryong to access"
    })
}
}
export const singleCategoryController =async(req,res)=>{
     try {
        const category =await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"successfully getting the single category",
            category,
        })
     } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error while getting single category"
        })
     }
}

export const  deleteCategoryCOntroller=async(req,res)=>{
    try {
        const {id}=req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"category deleted successfully"
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error while trying to deleting ",
            error,
        })
    }
}