import { useEffect } from 'react'
import { useState } from 'react'
import closeIcon from "../images/close-button.svg"
import { useSearchParams } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Send, Paperclip } from "lucide-react"

export default function Jobs() {


  const [jobs, setJobs] = useState([])
  const [is_edit,set_is_edit]=useState(null)
  const [edit_fade,set_edit_fade]=useState(true)
  const [compList, setCompList] = useState("");  // Search input state
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedName, setSelectedName] = useState(""); 
  const token=localStorage.getItem("token")
  const [searchParams]=useSearchParams()
  const userId=searchParams.get("userId")
  const [initialOpen, setInitialOpen]=useState(false)
  const [isCompose, setIsCompose]=useState(false)
  const params = [];
  const [selectedJob, setSelectedJob]=useState()
  const [companiesData, setCompaniesData]=useState()
  const [companyEmail,setCompanyEmail]=useState()
  const [hrName,setHrName]=useState("")
  const [message,setMessage]=useState("")
  for (const [key, value] of searchParams.entries()) {
    params.push({ key, value });
  }

  function getCompanyEmail(companyName){
    console.log(companyName)
    companiesData.forEach((comp)=>{
      if(comp.companyName.toLowerCase()===companyName.toLowerCase()){
        
        setCompanyEmail(comp["email"])
        setHrName(comp["hr"])
      }
    })
  }
  function getMessage(hrName,applicantName,jobPosition,companyName){
    const message = `
Dear ${hrName},

I hope this message finds you well. My name is ${applicantName}, and I am writing to express my interest in the ${jobPosition} position at ${companyName}. With my background in ${jobPosition}, I am excited about the opportunity to contribute to your team and leverage my skills to support ${companyName}'s goals.

I have attached my resume and cover letter for your review. I would greatly appreciate the opportunity to further discuss how my experience and skills align with the needs of your company. Please feel free to contact me at gpulkitgupta72@gmail.com .

Thank you for considering my application. I look forward to hearing from you.

Sincerely,
${applicantName}
`;

setMessage(message);
  }

  async function sendEmail(){
    
    console.log(message);
    try{
      let response=await fetch(`http://localhost:5555/send?email=${companyEmail}`,{
      method:"POST",
      headers:{"Content-type":"text/plain" },
      body: message})
  
      let res=await response.json()
      console.log(res)
      
  
      
  }catch(error){
      console.log(error)
  }}
  
  
  useEffect(()=>{
    let getComp=async ()=>{
        try{
            let response=await fetch(`http://localhost:5555/email`,{headers:{"authorization":`Bearer ${token}`}})
        let res=await response.json();

        setCompaniesData(res)
        res=res.map((item)=>{
            return item["companyName"].toLowerCase()
        })
        setCompList(res)
        }catch(err){  
            console.log(err)
        }
        
    }
    getComp()
  },[0])


  async function getData(searchExp){
    try{
        console.log("getting")

      let response=await fetch(`http://localhost:5555/jobs?seacrhExpKey=${searchExp}&userId=${userId}`,{headers:{"authorization":`Bearer ${token}`}})
      let list_temp =await response.json()
      console.log(typeof list_temp)
      setJobs(list_temp)
      
      if (!response.ok) {
          // Throw an error if the response status is not OK
          throw new Error(`HTTP error! Status: ${response.status}`);
        }else{
            return null
        }
  }catch(error){
      console.log(error.message)
  }
  }

  
  async function sendData(form){
    console.log("post")
    try{
        let response=await fetch(`http://localhost:5555/jobs?userId=${userId}`,{
        method:"POST",
        headers:{"Content-type":"application/json","authorization":`Bearer ${token}` },
        body: JSON.stringify(form)})

        let res=await response.json()
        console.log(res._id)
        
    
        
    }catch(error){
        console.log(error)
    }}



  async function onsubmit(event){
    event.preventDefault()
    
    let form=document.getElementsByClassName("form")[0]
        let formData=new FormData(form)
        let formItrt2=formData.entries()
        console.log(formItrt2)
        let formDict2={}
        for(const [key,value] of formItrt2){
            formDict2[key]=value
        }
        
        console.log(formDict2)

    await sendData(formDict2)
    let companyName_input=document.getElementById("companyName")
    let position_input=document.getElementById("position")
    companyName_input.value=""
    position_input.value=""
    setSelectedName("")
    
    setTimeout(async ()=>{
        await getData()  
    },1500)}
  
  

  useEffect(()=>{
    setTimeout(()=>{
        getData()

    },500)

    
    
    let companyNameLabel=document.getElementsByClassName("company_name_label")[0]
    let positionLabel=document.getElementsByClassName("position_label")[0]
    window.addEventListener("resize",(event)=>{
        if(window.innerWidth<=625){
            companyNameLabel.textContent="Company"
         
        }else{
          companyNameLabel.textContent="Company Name"
          positionLabel.textContent="Position"
        }
    })

// code to check for the visibility of the edit button
    if(is_edit!==null){
    let companyNameInput=document.getElementsByClassName("company_name_input")[0]
    console.log(companyNameInput)
    let positionInput=document.getElementsByClassName("position_input")[0]
   
    companyNameInput.addEventListener("input",()=>{
      if(companyNameInput.value!==is_edit.companyName || positionInput.value!==is_edit.position){
          set_edit_fade(false)
      }else{
          set_edit_fade(true)
      }
    })
     positionInput.addEventListener("input",()=>{
      if(companyNameInput.value!==default_value_company || positionInput.value!==default_value_position){
          set_edit_fade(false)
      }else{
          set_edit_fade(true)
      }
    })
  }
  },[is_edit])





  function onED(event){
    set_is_edit(()=>{
        return null
    })
    
    event.preventDefault()
    let action=event.target.className.split(" ")[0]
        console.log(action)

        let EDdata=async ()=>{
            let EDform=document.getElementsByClassName("ED_form")[0]
            console.log(EDform)
            let EDformData=new FormData(EDform)
     
            let EDformItrt2=EDformData.entries()
            console.log(EDformData.get("companyName"))
            let EDformDict2={}
        for(const [key,value] of EDformItrt2){
            console.log(value)
            EDformDict2[key]=value
        }
        console.log(EDformDict2)

            try{
               
                let response=await fetch(`http://localhost:5555/jobs?jobId=${is_edit._id}&userId=${userId}`,{
                method:action.toUpperCase(),
                headers:{"Content-type":"application/json","authorization":`Bearer ${token}`},
                body: JSON.stringify(EDformDict2)
            })
      
                let res=await response.json()
                console.log(res)
                
            }catch(error){
                console.log(error)
            }
  }
        EDdata()
        
         
    }
    console.log(jobs)
  let jobs_html=jobs.length===0 || jobs.acknowledged!==undefined ? null:jobs.map((elem)=>{
        return <div  className={`job_card bg-[white] flex flex-col justify-center items-center mt-[10px] mb-[10px] h-[150px]  bg-[rbg()] shadow-lg pl-[10px] pr-[10px]  text-nowrap mr-[2vw] overflow-scroll`} id={elem._id} key={elem._id} onClick={(event)=>{
            
            getCompanyEmail(elem.companyName)
            set_is_edit(()=>{
                return elem
            })}}>    
      <div className="company_name_mini ${jobs.indexOf(elem)}  text-nowrap flex justify-center items-center mb-[5px]" id={elem._id}>
          {elem.companyName}
        </div>
        
        <div className='position ${jobs.indexOf(elem)} text-nowrap flex justify-center items-center' id={elem._id}>
          {elem.position}
        </div>  
    </div>
  })
  let grid_length=`grid-cols-${jobs.length}`
  console.log("lrngth",jobs.length)




  return <div><main className="main flex justify-center  h-[61vh] relative">
      
  <form className='form flex flex-col bg-white h-md:h-[320px] h-md:w-[330px] h-sm:w-[270px] h-sm:h-[51vh] shadow-md p-[15px] justify-between mt-[40px]'>
  <h1 className='flex justify-center items-start'>
    
    <span className='text-[22px]'>Jobs </span></h1>
    <div className="name flex flex-col justify-between">
    <label htmlFor="companyName" className='company_name_label text-sm text-[12px] text-[#5E5E5E] font-semibold'>Company Name:</label>
      <input type="text" id="companyName" name="companyName" required className=" border-[rbg(0,10,0)] border-[0.5px] bg-[rgb(249,252,254)] ]" value={selectedName} onChange={(event)=>{
        setSearchTerm(event.target.value)
        setSelectedName(event.target.value)
      }}/>

      {searchTerm && (
        <ul className="border border-gray-300 mt-2 p-2 rounded max-h-40 overflow-y-auto">
          {
          compList.filter(cname=>cname.startsWith(searchTerm)).map((item, index) => (
            <li
              key={index}
              onClick={() => {
                item=item[0].toUpperCase() + item.slice(1,item.length)
                setSelectedName(item)
                setSearchTerm("")
            }}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
          {compList.length === 0 && (
            <li className="p-2">No items found</li>
          )}
        </ul>
      )}
      </div>
      <div className="name flex flex-col justify-between">
      <label htmlFor="position" className='position_label text-[12px] text-[#5E5E5E] font-semibold'>Position:</label>
      <input type="text" id="position" name="position" required className="border-[rbg(0,10,0)] border-[0.5px] bg-[rgb(249,252,254)]"/>
      </div>

      <button type="submit " className='bg-[rgb(86,52,243)] text-[white]' onClick={onsubmit}>Submit</button>
  </form>
  </main>
 <footer style={{gridTemplateColumns:`repeat(${jobs.length>6?jobs.length:6}, minmax(120px, 1fr))`,display:"grid"}} className={` pl-[2vw] pr-[2vw]  h-[25vh] pb-[20px] w-[100vw] overflow-hidden `}>
    {jobs_html}
 </footer>
 {is_edit===null? null: <div className=" pl-[20px] shadow-lg  h-[320px] w-[330px] absolute bg-[white] top-[104px] left-[calc(50vw-165px)] pt-[10px]">
    <div className="close_container flex justify-end pr-[10px]" onClick={()=>{
        set_is_edit(()=>{
            return null
        })
    }}>
    <img src={closeIcon} class="close_img h-[20px]"/>
    </div>
    <form className="ED_form pb-[15px] flex flex-col justify-around h-[100%] w-[100%]">
    <div className='flex flex-col justify-center items-start'>
        <label htmlFor='companyName' >Company Name:</label>

        <input className="company_name_input w-[70%] mt-[5px] pl-[6px] border-[rbg(0,10,0)] border-[0.5px] bg-[rgb(249,252,254)]" type="text" id="companyName" name="companyName" required defaultValue={is_edit.companyName}/>
        

        </div>

        <div>
        <label htmlFor='position'>Position:</label>
        <input className="position_input w-[70%] mt-[5px] pl-[6px] border-[rbg(0,10,0)] border-[0.5px] bg-[rgb(249,252,254)] " type="text" id="position" name="position" required defaultValue={is_edit.position}
        
        />
    </div>
    <div className="buttons_container grid grid-cols-2 grid-rows-2 pr-[20px] gap-2 justify-start items-start">
    <button type="submit" className="put w-[55%] bg-[rgb(148,128,238)] shadow-lg text-white m-auto " onClick={edit_fade==true?(event)=>{
      console.log("change values")
      event.preventDefault()
    }:onED} style={edit_fade===true?{backgroundColor:"rgb(148,128,238)"}:{backgroundColor:"rgb(85,51,235)"}}>Edit</button>
    <button type="submit" className="delete w-[55%] bg-[rgb(86,52,243)] shadow-lg text-white m-auto" onClick={onED}>Delete</button>

    <div className="draft  w-[55%] bg-[rgb(86,52,243)] shadow-lg text-white m-auto flex justify-center items-center" onClick={(event)=>{
        event.preventDefault()
    }}>
        Draft
    </div>
    <div className="compose  w-[55%] bg-[rgb(86,52,243)] shadow-lg text-white m-auto  flex justify-center items-center" onClick={(event)=>{
        event.preventDefault()
        setIsCompose(true)
        getMessage(hrName,"Pulkit",is_edit.position,is_edit.companyName,"gpulkitgupta72@gmail.com")

    }}>Compose</div>
    </div>
    </form>
    </div>}
    {isCompose?
        <Card className="w-full max-w-2xl mx-auto absolute top-[68px]   left-[15vw]">
        <CardHeader className="bg-gray-100 border-b">
          <h2 className="text-lg font-semibold">New Message</h2>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">To</Label>
            <Input
              id="recipient"
              placeholder="recipient@example.com"
              value={companyEmail}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Enter subject"
              value={`Job Application as a ${is_edit.position}`}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body" className="sr-only">Email body</Label>
            <Textarea
              id="body"
              placeholder="Write your message here..."
              rows={10}
              value={message}
              
              className="resize-none"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center bg-gray-100 border-t">
          <div className='flex flex-row w-[200px] justify-between'>
          <Button className="bg-blue-500 hover:bg-blue-600 mt-[20px]" onClick={()=>{
            sendEmail()}}>
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 mt-[20px]" onClick={()=>{
            setIsCompose(false)
            }}>
        
            Abort
          </Button>
          </div>
          <Button variant="outline " className="mt-[20px]">
            <Paperclip className="w-4 h-4 mr-2" />
            Attach
          </Button>
        </CardFooter>
      </Card>:null
    }
    </div>}
