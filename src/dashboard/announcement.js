import React, {useState, useEffect} from 'react'
import Dashboardnav from './dashboardnav'
import { Collapse } from 'antd';
import HeaderNav from '../headernav';
import {db} from '../Firebase/firebase'
import Cookies from 'universal-cookie';
import { addDoc, collection, getDocs} from 'firebase/firestore'
import {
  PlusCircleOutlined
} from '@ant-design/icons';


const cookies = new Cookies();

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


export default function Announcement() {
  const [data, setData] = useState()
  const [header, setHeader] = useState()
  const [text, setText] = useState()
  const userData = cookies.get('userData');
  const announcementsRef = collection(db, 'Announcements')


  useEffect(async() => {
    const announcements = await getDocs(announcementsRef);
    setData(announcements.docs.map((doc) => ({...doc.data(),id:doc.id})))
  }, [])

  console.log('data',data);

  const handleAnnHeader = (e) => { 
    setHeader(e.target.value);
   }

   const handleAnnText = (e) => { 
    setText(e.target.value);
   }

   const onSubmit = async () => { 
     if(header && text){
    const addRes = await addDoc(announcementsRef, {name: header, Subject: text});
    setHeader('');
    setText('');
    const announcements = await getDocs(announcementsRef);
    setData(announcements.docs.map((doc) => ({...doc.data(),id:doc.id})))
     }
    }

  return (
    <div>
      <HeaderNav />

          <div className='dashboard'>
              <Dashboardnav />
            
              <div className='dashboardContent'>
                { userData.isAdmin ? 
                <div>
                  <h1>Admin Announcement</h1>
                  <div style={{display:'flex',  justifyContent:'space-between'}}>
                      <Collapse onChange={callback} >
                          <Panel style={{width:'700px'}} header={ <input type="text" value={header} style={{width:'100%'}} onChange={handleAnnHeader}></input>  }  key="99">
                            <p><textarea style={{width:'100%'}} value={text} onChange={handleAnnText}></textarea></p>
                            <button className='btn' onClick={onSubmit}>Submit</button>
                          </Panel>
                         
                          {data?.map((d,i)=> 
                              <Panel header={d.name} key={i}>
                              <p>{d.Subject}</p>
                              </Panel>
                            )}
                      </Collapse>
                            {/* <span><PlusCircleOutlined /></span> */}
                    </div>
                </div> : 
                 <Collapse onChange={callback} >
                
                 {data?.map((d,i)=> 
                     <Panel header={d.name} key={i}>
                     <p>{d.Subject}</p>
                     </Panel>
                   )}
             </Collapse>}
            </div>
          </div>
    </div>
  )
}
