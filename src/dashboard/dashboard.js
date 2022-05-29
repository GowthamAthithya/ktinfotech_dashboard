import React from 'react'
import HeaderNav from '../headernav';
import Dashboardnav from './dashboardnav'
import './dashboard.css'
import { Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

export default function Dashboard() {
  return (
    <div>
      <HeaderNav />
        <div className='dashboard'>
          <Dashboardnav />
          <div>
            <div className='profileContainer'>
              {/* <p>Profile</p>
              <p>User Name</p>
              <p>Designation</p>
              <Button className='clockButton'>Clock in<LoginOutlined /></Button> */}
              
            </div>
            <div className='dashboardContent'>
              <div className='payslip'>
                <h1>Payslip</h1>
                <button download href="">Download Payslip</button>
              </div>
              <div className='leaveRequest'>
                    <h1>Leave Request</h1>
                    <lable>Reason for Leave</lable>
                    <div><textarea></textarea></div>
                    <button className='btn'>Send</button>
              </div>
            </div>
            
          </div>
    </div>
            
       
    </div>
  )
}
