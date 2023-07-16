import React, { useEffect, useState, useRef } from 'react';
import { Input, Button, Form, Row, Col, message, Upload, Tooltip, Checkbox, Spin } from 'antd';
import { UploadOutlined, SendOutlined, AudioOutlined } from '@ant-design/icons';
import axios from 'axios';
import './ChatInput.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const ChatInput = () => {
  const [form] = Form.useForm();
  const [loading,setLoading] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [inputBoxValue, setInputBoxValue] = useState();
  const [viewTextList, setViewTextList] = useState([]);
  const [inputType, setInputType] = useState('text');
  const viewTextListRef = useRef(null);
  const [createBook,setCreateBook] = useState(false);

  useEffect(() => {
    setInputBoxValue(transcript);
  }, [transcript]);

  useEffect(() => {
    if (viewTextListRef.current) {
      viewTextListRef.current.scrollTop = viewTextListRef.current.scrollHeight;
    }
  }, [viewTextList]);

  const handleVoiceInput = () => {
    if (SpeechRecognition.browserSupportsSpeechRecognition()) {
      if (!listening) {
        setInputType('voice');
        resetTranscript();
        startListening();
      } else {
        stopListening();
      }
    } else {
      message.error('Your browser does not support speech recognition');
    }
  };

  const startListening = () => {
    console.log('Listening started');
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    console.log('Listening stopped');
    console.log('Transcript', transcript);
    if(createBook){
      setInputType("pdf");
      getPdfBook(transcript);
    }else{
      getResponse(transcript);
    }
    SpeechRecognition.stopListening();
  };

  const handleSpeak = (text, inputText) => {
    setViewTextList(prevList => [...prevList.slice(0, prevList.length ), { }]);
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onboundary = (event) => {
      const spokenWord = text.slice(0, event.charIndex + event.charLength);
      setViewTextList(prevList => [...prevList.slice(0, prevList.length-1), { userText: inputText, responseText: spokenWord, inputType: inputType}]);
    };

    speechSynthesis.speak(utterance);
  };

  const getResponse = async (inputText) => {
    try {
      const response = await axios.post('http://10.19.104.62:4002/api/v1', { inputText: inputText });
      const responseText = response.data.response;
      console.log("Response", responseText, inputText);
      if (inputType === 'text') setViewTextList([...viewTextList, { userText: inputText, responseText: responseText,inputType: inputType }]);
      else {
        handleSpeak(responseText, inputText);
      }
      console.log(viewTextList);
      form.resetFields();
    } catch (error) {
      message.error("Something went wrong in the server");
    }
  };

  const getPdfBook = async(inputText) => {
    console.log("book creat",inputText);
    try {
      setLoading(true);
      const bookRsponse = await axios.post('http://10.19.104.62:4002/api/v1/pdf',{prompt: inputText});
      console.log(bookRsponse);
      setViewTextList([...viewTextList, { userText: inputText, responseText: bookRsponse.data ,inputType:inputType}]);
    } catch (error) {
      message.error("Something went wrong in the server");
    }finally{
      setLoading(false);
    }
  }

  const handleformSubmit = (values) => {
    if(createBook){
      setInputType("pdf");
      getPdfBook(values.inputText);
    }else{
      setInputType('text');
      getResponse(values.inputText);
    }
  };

  const handleFileUpload = async(file) => {
    setInputType("file");
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post('http://10.19.104.62:4002/api/v1/file', formData)
    console.log(response);
    const {inputText,responseText} = response.data;
    setViewTextList([...viewTextList, { userText: inputText, responseText: responseText ,inputType:inputType}]);
    console.log(inputText,responseText);
  };
  

  return (
    <>
    <Spin size='large' tip="Please wait, It will take some times to generate your book" spinning={loading}>
      <Row justify="center" align="middle" style={{display:'flex', flexDirection:'column'}}>
        <Checkbox onChange={(e)=>{setCreateBook(e.target.checked)}}>Create Book Mode</Checkbox>
        <br />
        <Col xs={24} sm={16} style={{minWidth:'60%', minHeight: '90vh', border: '2px dotted green', borderRadius: '15px', backgroundColor: '#f2f1ed', display: 'flex', overflowY: 'auto', justifyContent: 'center' }}>
          <Row style={{ flex: 'flex', flexDirection: 'column', overflowY: 'auto', margin: '20px', maxHeight: '80vh' }}>
            {/* Content */}
            <div ref={viewTextListRef} style={{ overflowY: 'auto', maxHeight: '100%' }}>
              {viewTextList.map((currentText, i) => (
                <div key={i} style={{ marginTop: '10px', border: '2px dotted white', borderRadius: '15px', background: i % 2 === 0 ? 'white' : '#f7f6f2', padding: '20px' }}>
                  <div>
                    User: {currentText.userText}
                  </div>
                  <br />
                  {currentText.inputType==='pdf' && (<div>
                    SmartGPT: <a href={`http://10.19.104.62:4002/${currentText?.responseText}`}>Click here to download</a>
                  </div>)}
                  {inputType!=='pdf' && (<div>
                    SmartGPT: {currentText?.responseText}
                  </div>)}
                  <br /><hr />
                </div>
              ))}
            </div>
          </Row>
          <Form form={form} onFinish={handleformSubmit} layout="inline" className="floating-input-box-container">
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <Form.Item name="inputText" rules={[{ required: true, message: 'Please provide a text prompt.' }]}>
                <Input
                  type="text"
                  className="floating-input-box input-box"
                  value={inputBoxValue}
                  placeholder="Enter prompt text"
                  suffix={<Tooltip title="Click & hold to speak">
                    <Button type="link" icon={<AudioOutlined />} onMouseDown={handleVoiceInput} onMouseUp={stopListening} />
                    </Tooltip>}
                />
              </Form.Item>
              <Form.Item style={{marginTop:'15px'}}>
                <Tooltip title="Upload Image/Text file">
                  <Upload accept=".pdf,.txt,.jpg,.jpeg,.png" showUploadList={false} beforeUpload={handleFileUpload}>
                    <Button icon={<UploadOutlined />} />
                  </Upload>
                </Tooltip>
              </Form.Item>
            </div>
            <Form.Item style={{ marginBottom: '10px', alignSelf: 'flex-end' }}>
              <Button type="primary" icon={<SendOutlined />} htmlType="submit" />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      </Spin>
    </>
  );
};

export default ChatInput;
