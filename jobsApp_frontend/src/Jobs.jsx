import { useEffect } from 'react'
import { useState } from 'react'
import closeIcon from "../images/close-button.svg"
import { useSearchParams } from 'react-router-dom'

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [is_edit,set_is_edit]=useState([])
  const [edit_fade,set_edit_fade]=useState(true)
  const token=localStorage.getItem("token")
  const [searchParams]=useSearchParams()
  const userId=searchParams.get("userId")
  const params = [];
  for (const [key, value] of searchParams.entries()) {
    params.push({ key, value });
  }



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
        console.log(res)
        
    }catch(error){
        console.log(error)
    }}



  async function onsubmit(event){
    event.preventDefault()
    console.log("vjdsjv")
    let form=document.getElementsByClassName("form")[0]
        let formData=new FormData(form)
        let formItrt2=formData.entries()
        console.log(formItrt2)
        let formDict2={}
        for(const [key,value] of formItrt2){
            formDict2[key]=value
        }
        console.log(formDict2)

    sendData(formDict2)

  let companyName_input=document.getElementById("companyName")
    let position_input=document.getElementById("position")
    companyName_input.value=""
    position_input.value=""
    setTimeout(()=>{
        console.log("hfshv")
        getData()
      },300)

    }
  


  useEffect(()=>{
    console.log("yi")
    setTimeout(()=>{
        getData()
    },500)

    console.log(is_edit.length)
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
    if(is_edit.length!==0){
    let companyNameInput=document.getElementsByClassName("company_name_input")[0]
    console.log(companyNameInput)
    let positionInput=document.getElementsByClassName("position_input")[0]
    let default_value_company=(()=>
      {
          let selected_job=jobs.filter((elem)=>{
          if(elem._id===is_edit[0]){
              return elem
          }
      })
      return selected_job[0].companyName
  })()
  let default_value_position=(()=>
      {
          let selected_job=jobs.filter((elem)=>{
          if(elem._id===is_edit[0]){
              return elem
          }
      })
      return selected_job[0].position
  })()
    companyNameInput.addEventListener("input",()=>{
      if(companyNameInput.value!==default_value_company || positionInput.value!==default_value_position){
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
        return []
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
                console.log(is_edit[0],userId,action.toUpperCase())
                let response=await fetch(`http://localhost:5555/jobs?jobId=${is_edit[0]}&userId=${userId}`,{
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
            set_is_edit(()=>{
                return [event.target.id]
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
  return <div><main className="main flex justify-center  h-[61vh]">
      
  <form className='form flex flex-col bg-white h-md:h-[320px] h-md:w-[330px] h-sm:w-[270px] h-sm:h-[51vh] shadow-md p-[15px] justify-between mt-[40px]'>
  <h1 className='flex justify-center items-start'>
    
    <span className='text-[22px]'>Jobs </span></h1>
    <div className="name flex flex-col justify-between">
    <label htmlFor="companyName" className='company_name_label text-sm text-[12px] text-[#5E5E5E] font-semibold'>Company Name:</label>
      <input type="text" id="companyName" name="companyName" required className=" border-[rbg(0,10,0)] border-[0.5px] bg-[rgb(249,252,254)] ]"/>
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
 {is_edit.length===0? null: <div className="container pl-[20px] shadow-lg  h-[320px] w-[330px] absolute bg-[white] top-[50vh] left-[50vw] pt-[10px]">
    <div className="close_container flex justify-end pr-[10px]" onClick={()=>{
        set_is_edit(()=>{
            return []
        })
    }}>
        <img src={closeIcon} class="close_img h-[20px]"/>
    </div>
    <form className="ED_form pb-[15px] flex flex-col justify-around h-[100%] w-[100%]">
    <div className='flex flex-col justify-center items-start'>
        <label htmlFor='companyName' >Company Name:</label>
        <input className="company_name_input w-[70%] mt-[5px] pl-[6px] border-[rbg(0,10,0)] border-[0.5px] bg-[rgb(249,252,254)]" type="text" id="companyName" name="companyName" required defaultValue={(()=>
        {
            let selected_job=jobs.filter((elem)=>{
           
            if(elem._id===is_edit[0]){
                
                return elem
            }
        })
        return selected_job[0].companyName
    })()
        }/>
        </div>

        <div>
        <label htmlFor='position'>Position:</label>
        <input className="position_input w-[70%] mt-[5px] pl-[6px] border-[rbg(0,10,0)] border-[0.5px] bg-[rgb(249,252,254)] " type="text" id="position" name="position" required defaultValue={(()=>
        {
            let selected_job=jobs.filter((elem)=>{
            if(elem._id===is_edit[0]){
                return elem
            }
        })
        return selected_job[0].position
    })()
        } 
        />
    </div>
    <div className="buttons_container flex flex-row justify-between pr-[20px]">
    <button type="submit" className="put w-[40%] bg-[rgb(148,128,238)] shadow-lg text-white" onClick={edit_fade==true?(event)=>{
      console.log("change values")
      event.preventDefault()
    }:onED} style={edit_fade===true?{backgroundColor:"rgb(148,128,238)"}:{backgroundColor:"rgb(85,51,235)"}}>Edit</button>
    <button type="submit" className="delete w-[40%] bg-[rgb(86,52,243)] shadow-lg text-white" onClick={onED}>Delete</button>
    </div>

 
    </form>
    </div>}
    </div>}
