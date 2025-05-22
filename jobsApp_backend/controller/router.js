const express=require("express")
let {get_func_jobs,post_func_jobs,delete_func_jobs,edit_func_jobs,errHandler}=require("./functions")
let routerJobs=express.Router()

routerJobs.use(express.urlencoded({extended:false}))
routerJobs.use(express.json())

routerJobs.route("/jobs").get(get_func_jobs,errHandler).post(post_func_jobs).put(edit_func_jobs).delete(delete_func_jobs)

module.exports={routerJobs}
