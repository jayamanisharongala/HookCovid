import React ,{useState,useEffect} from 'react'
import axios from "axios"
import 'antd/dist/antd.css';
import {Table} from 'antd';
function HookCovid ()  {
            const [data,setData]=useState([])
            const [loading,setLoading]=useState(false)
            const[searching,setSearching]=useState([])
            const [text,setText]=useState("")
            const columns = [
                {
                  title: 'Country',
                  dataIndex:'Country',
                  key: 'Country',
                  sorter: (a, b) => a.Country.length - b.Country.length,
                },
                {
                  title: 'ConfirmedCases',
                  dataIndex: 'NewConfirmed',
                  key: 'NewConfirmed',
                  sorter: (a, b) => a.NewConfirmed - b.NewConfirmed,
                },
                {
                  title: 'TotalConfirmedCases',
                  dataIndex: 'TotalConfirmed',
                  key: 'TotalConfirmed',
                  sorter: (a, b) => a.TotalConfirmed - b.TotalConfirmed,
                },
                {
                  title: 'Deaths',
                  dataIndex: 'NewDeaths',
                  key: 'NewDeaths',
                  sorter: (a, b) => a.NewDeaths - b.NewDeaths,
                },
                {
                  title: 'TotalDeathsCases',
                  dataIndex: 'TotalDeaths',
                  key: 'TotalDeaths',
                  sorter: (a, b) => a.TotalDeaths - b.TotalDeaths,
                },
                {
                  title: 'RecoveredCases',
                  dataIndex: 'NewRecovered',
                  key: 'NewRecovered',
                  sorter: (a, b) => a.NewRecovered - b.NewRecovered,
                },
                {
                  title: 'TotalRecoveredCases',
                  dataIndex: 'TotalRecovered',
                  key: 'TotalRecovered',
                  sorter: (a, b) => a.TotalRecovered- b.TotalRecovered,
                },
                {
                  title: 'Date',
                  dataIndex: 'Date',
                  key: 'Date',
                },
          
              ];
            useEffect(()=>{
                setLoading(true)
                axios.get('https://api.covid19api.com/summary')
                .then(response =>{
                    console.log(response)
                    setData(response.data.Countries)
                    setLoading(false)
                })
            },[])
            function handleSearching(e){
                setText(e.target.value)
                const newdata= data.filter((info)=>{
                    return Object.values(info).join("").includes(text.toLowerCase());
                });
                setSearching(newdata);
                console.log(newdata)
            }
            if(loading){
                return <p>Loading Countries....</p>
            }
           return(
               <div>
                   <h1>Simple Covid Status</h1>
                   <input  type='text' value={text} onChange={handleSearching} placeholder="Enter the Country Name"/> 
                   <Table columns={columns} dataSource={text.length<1?data:searching}  />
               </div>
           )
}
export default HookCovid
