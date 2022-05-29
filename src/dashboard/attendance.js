
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import Dashboardnav from './dashboardnav'
import HeaderNav from '../headernav';




const EditableContext = React.createContext(null);


const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Employee Name',
        dataIndex: 'EmployeeName',
        width: '30%',
        editable: true,
      },
      {
        title: 'Date',
        dataIndex: 'date',
        editable: true,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        editable: true,
      },
      {
        title: 'Clock In',
        dataIndex: 'clockin',
        editable: true,
      },
      {
        title: 'Clock Out',
        dataIndex: 'clockout',
        editable: true,
      },
      {
        title: 'Hours',
        dataIndex: 'hours',
        editable: true,
      },
      {
        title: 'Total Words',
        dataIndex: 'totalwords',
        editable: true,
      },

      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [
        {
          key: '0',
          EmployeeName: 'InfoTech 0',
          date: '01-01-2022',
          status: 'Present',
          clockin: 'Time In',
          clockout: 'Time Out',
          hours: '8:00',
          totalwords: '100',
        },
        {
          key: '1',
          EmployeeName: 'InfoTech 1',
          date: '01-01-2022',
          status: 'Present',
          clockin: 'Time In',
          clockout: 'Time Out',
          hours: '8:00',
          totalwords: '100',
        },
      ],
      count: 2,
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      EmployeeName: `InfoTech ${count}`,
      date: '01-01-2022',
      status: 'Present',
      clockin: 'Time In',
      clockout: 'Time Out',
      hours: '8:00',
      totalwords: '100',
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}



export default function Attendance() {
  return (
    <div>
      <HeaderNav />
       <div className='dashboard'>
          <Dashboardnav />
            <div className='dashboardContent'>
              <EditableTable />
            </div>
        </div>
        
    </div>
  )
}



