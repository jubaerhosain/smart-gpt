import { Button, Col, Row, Table } from 'antd';
import './fileList.css';
import { useEffect, useState } from 'react';


const columns = [
    {
      title: "Job Title",
      dataIndex: "job_title",
      key: "job_title",
      align: "center",
      width: "12%",
    },
    {
      title: "Vacancy",
      dataIndex: "vacancy",
      key: "vacancy",
      align: "center",
      width: "12%",
    },
    {
      title: "Job Type",
      dataIndex: "job_type",
      key: "job_type",
      align: "center",
      width: "12%",
    },
    {
      title: "Salary Range",
      dataIndex: "salary_range",
      key: "salary_range",
      align: "center",
      width: "12%",
    },
    {
      title: "Application Starts",
      key: "start_date",
      align: "center",
      width: "12%",
    },
    {
      title: "Submission Deadline",
      key: "end_date",
      align: "center",
      width: "12%",
      
    },
    {
      title: "Remaining Time to Apply",
      key: "remaining_time",
      align: "center",
      width: "12%",
      
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: "12%",
      render: (_, record) => {
        const currentTime = new Date().getTime();
        const deadline = new Date(
          new Date(record.end_date).getTime() + 24 * 60 * 60 * 1000
        ).getTime();
        if (currentTime > deadline) {
          return (
            <Button disabled type="link">
              Apply Now
            </Button>
          );
        } else
          return (
            <link
              to={`job-post-details/${record.id}`}
              style={{ textDecoration: "none" }}
            >
              Apply Now
            </link>
          );
      },
    },
  ];

const FileList = () => {
    const [jobPostList, ] = useState([]);
    const [loading, ] = useState(false);
    const rowClassName = () => "my-table-row";
  
    useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       setLoading(true);
    //       const { data: tempJobList } = await axios.get(
    //         `${process.env.REACT_APP_API_URL}/jobpost`
    //       );
    //     } catch (error) {
    //       message.error("Internal Server Error!!!");
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    //   fetchData();
    }, []);
  
    return (
      <Row justify="center" align="middle" style={{ marginTop: "20px" }}>
        <Col span={24}>
          <h1
            style={{
              textAlign: "center",
              color: "green",
              paddingBottom: "20px",
              fontSize: "1.5rem",
            }}
          >
            E-Book System
          </h1>
        </Col>
  
        <Col className="applicant-list-table-container" xl={{ span: 21 }}>
          <Table
            rowKey={(record) => record.id}
            className="applicant-list-table"
            loading={{ spinning: loading, tip: "Loading...." }}
            dataSource={jobPostList}
            columns={columns}
            pagination={true}
            rowClassName={rowClassName}
            scroll={{ x: 1000 }}
            bordered
          />
        </Col>
      </Row>
    );
  };
  
  export default FileList;
  