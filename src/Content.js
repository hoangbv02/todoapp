import {useState,useRef} from 'react'
import styles from './Content.module.css'
function Content({btn}){
    const autoFocus= useRef()
    const [data, setData] = useState('')
    const [jobs, setJobs] = useState(()=>{
        const storeJobs= localStorage.getItem('jobs')
        const newJobs=JSON.parse(storeJobs)
        return newJobs?? []
    })
    const handleOnSubmit= ()=>{
        if(data)
        setJobs(prev => {
           const newJobs = [...prev,data]
           localStorage.setItem('jobs',JSON.stringify(newJobs))
           return newJobs
        })
        setData('')
        autoFocus.current.focus()
    }
    const handleOnDelete= (index)=>{
        const storeJobs =localStorage.getItem('jobs')
        const newJobs= JSON.parse(storeJobs)
        const jobs=newJobs.filter((job,i)=> i!==index)
        localStorage.setItem('jobs',JSON.stringify(jobs))
        setJobs(jobs)
    }
    const handleOnEdit = ()=>{
        setData('')
        autoFocus.current.focus()
    }
    const handleOnOK= (i)=>{
        const storeJobs =localStorage.getItem('jobs')
        const newJobs= JSON.parse(storeJobs)
        if(data)newJobs[i]= data
        localStorage.setItem('jobs', JSON.stringify(newJobs))
        setJobs(newJobs)
        setData('')
    } 
    return(
        <form className={styles.container}>
            <div className={styles.content}>
                <input
                className={styles.formInput}
                ref={autoFocus}
                value={data}
                placeholder="Enter todo..."
                onKeyUp={(e)=>{
                    if(e.which ===27){
                        handleOnSubmit()
                    }
                }}
                onChange={(e)=>{
                    setData(e.target.value)
                }}
                />
                <span onClick={handleOnSubmit} className={btn}>Add</span>
                <ul className={styles.jobsList}>
                    {jobs.map((job,index)=>{
                        return (
                            <li className={styles.jobsItem} key={index}>
                                <span className={styles.job}>{job}</span>
                                <div className={styles.groupBtn}>
                                    <span className={styles.btn} onClick={()=>handleOnDelete(index)}><i className={"fa-solid fa-trash-can"}></i></span>
                                    <span className={styles.btn} onClick={handleOnEdit}><i className={"fa-solid fa-pen"}></i></span>
                                    <span className={styles.btnOk} onClick={()=>handleOnOK(index)}>OK</span>
                                </div>
                            </li>
                        )}
                    )}
                </ul>
            </div>
        </form>
    )
}
export default Content