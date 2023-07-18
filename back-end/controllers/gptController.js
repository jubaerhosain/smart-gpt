import axios from "axios";
import fs from 'fs/promises';
import { createWorker } from 'tesseract.js';
import { getTextFromGpt } from "../utils/getGPTtextToTextResponse.js";


export const getGPTResponseByFile = async(req, res, next) => {
    console.log("getGPTResponseByFile");
    try {
        const { file, body } = req;
        const { originalname, mimetype } = file;
        const filePath = file.path; 
        if (mimetype === 'image/jpeg' || mimetype === 'image/png' || mimetype === 'image/jpg') {
          const imageText = await extractTextFromImage(filePath);
          const response = await getTextFromGpt(imageText);
          res.send({response:response,inputText:imageText});
          // Handle the extracted image text
        //   console.log(imageText);
        //   res.send({
        //         response: "Hello how can i help you?. lorem ipsum dolor sit amet lorem ipsum dolor sit amet lore lorem ipsum dolor sit amet"
        //     })
        }
        else {
            const text = await extractTextFromTxt(filePath);
            console.log(text);
            const response = await getTextFromGpt(text);
            res.send({response:response,inputText:text});
            // console.log(text);
            // res.send({
            //     response: "Hello how can i help you?. lorem ipsum dolor sit amet lorem ipsum dolor sit amet lore lorem ipsum dolor sit amet"
            // })
        } 

      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error.');
    }
}



export const getGPTResponse = async(req,res) => {

    const {inputText} = req.body;
    console.log(inputText);

    const response = await getTextFromGpt(inputText);
    res.send({response: response});

    // res.send({
    //     response: "Hello how can i help you?. lorem ipsum dolor sit amet lorem ipsum dolor sit amet lore lorem ipsum dolor sit amet"
    // })

}



async function extractTextFromTxt(filePath) {
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const extractedText = fileContent.trim();
      console.log('Extracted text:', extractedText);
      return extractedText;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }



  async function extractTextFromImage(imagePath) {
    const worker = await createWorker();
  
    try {
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
  
      const { data: { text } } = await worker.recognize(imagePath);
      console.log('Result:', text);
  
      await worker.terminate();
  
      return text;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
  


