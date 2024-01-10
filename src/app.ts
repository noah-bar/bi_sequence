import { GoogleDataObject } from "bi_dataobject";
import { GoogleLabelDetector } from "bi_label_detector";
import { resolve } from "path"
import dotenv from 'dotenv'

dotenv.config()

const keyFilename = resolve("./config/es-bi-noah.json")
const bucketName = process.env.BUCKET_NAME as string

const googleDataObject = new GoogleDataObject(keyFilename, bucketName)
const googleLabelDetector = new GoogleLabelDetector(keyFilename)
