//import editor js tools
import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Code from "@editorjs/code";

import { uploadImage } from "../common/aws";
const uploadImageByUrl = async (e) => {
    let link = new Promise((resolve, reject) => {
        try{
          resolve(e)
        }catch(err){
          reject(err)
        }
    })

    return link.then(url=>{
        return{
            success:1,
            file:{url}
        }
    })
}

const uploadImageByFile = async (e) => {
   return uploadImage(e).then(url=>{
        if(url){
            return {
                success:1,
                file:{url}
            }
        }
    })
}




export const tools ={
    embed: Embed,
    list: {
        class: List,
        inlineToolbar: true
    },
    quote: {
        class: Quote,
        inlineToolbar: true
    },
    image: {
        class: Image,
        config: {
           uploader:{
                  uploadByUrl:uploadImageByUrl ,
                  uploadByFile:uploadImageByFile
           }
        },
    },
    header: {
        class: Header,
        config:{
            placeholder: "Enter a header",
            levels:[2,3],
            defaultLevel:2
        }
    },
    marker: Marker,
    inlineCode: InlineCode,
    code: Code
}