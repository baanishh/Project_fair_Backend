const projects=require('../models/projectModel')

//add project controller
exports.addProjectController=async(req,res)=>{
    console.log("inside addProjectController");

    const userId=req.userId
    // console.log(userId);
    // console.log(req.body);
    // console.log('file',req.file);
    const {title,languages,overview,github,website}=req.body
    const projectImage=req.file.filename

    try {
        const existingProject=await projects.findOne({github})
        if (existingProject) {
            res.status(406).json("project already exists")
        } else {
            const newProject=new projects({
                title,languages,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

//get home project controller
exports.getHomeProjectController=async(req,res)=>{
    console.log("inside get home project controller");
    try {
        const allHomeProjects=await projects.find().limit(3)
        res.status(200).json(allHomeProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

//get user projects - authorized user
exports.getUserProjectController=async(req,res)=>{
    console.log("inside get user project controller");
    try {
        const userId=req.userId
        const allUserProjects=await projects.find({userId})
        res.status(200).json(allUserProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

//get All projects - authorized user
exports.getAllProjectController=async(req,res)=>{
    console.log("inside get user project controller");
    const searchKey=req.query.search
  
    try {
        const allProjects=await projects.find({languages:{$regex:searchKey,$options:"i"}})
        res.status(200).json(allProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

//edit projects
exports.editProjectController=async(req,res)=>{
const {id}=req.params
const {title,languages,overview,github,website,projectImage}=req.body
const reuploadImageFileName=req.file?req.file.filename : projectImage
const userId=req.userId
console.log(title,languages,overview,github,website,userId,reuploadImageFileName);

try {
    const updatedProject=await projects.findByIdAndUpdate({_id:id},{title,languages,overview,github,website,projectImage:reuploadImageFileName,userId},{new:true})
    await updatedProject.save()
    res.status(200).json(updatedProject)
} catch (error) {
    res.status(401).json(error)
}
}

//remove project
exports.removeProjectController=async(req,res)=>{
    const {id}=req.params
    try {
        const removedItem=await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removedItem)
    } catch (error) {
        res.status(401).json(error)
    }
}