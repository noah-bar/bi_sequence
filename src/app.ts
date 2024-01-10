import { GoogleDataObject } from "bi_dataobject";
import {GoogleLabelDetector, Label} from "bi_label_detector";
import { resolve } from "path"
import dotenv from 'dotenv'
import { readFileSync } from "fs";
import LabelConvertor from "./LabelConvertor";

dotenv.config()

const keyFilename = resolve("./config/es-bi-noah.json")
const bucketName = process.env.BUCKET_NAME as string
const imagePath = resolve("./data/cat.jpg")
const remoteFilename = "cat"

const googleDataObject = new GoogleDataObject(keyFilename, bucketName)
const googleLabelDetector = new GoogleLabelDetector(keyFilename)

async function main() {
    //upload cat image
    const exists = await googleDataObject.doesExist(remoteFilename)
    if(!exists) {
        const buffer = readFileSync(imagePath)
        await googleDataObject.upload(buffer, remoteFilename)
    }

    //analyse cat image from bucket url
    const catUrl = await googleDataObject.publish(remoteFilename)
    const labels = await googleLabelDetector.analyze(catUrl)

    //convert labels to sql and upload sql file to bucket
    const sql = LabelConvertor.toSql(labels, 'labels')
    if(await googleDataObject.doesExist('labels.sql')) {
        await googleDataObject.remove('labels.sql')
    }
    await googleDataObject.upload(Buffer.from(sql), "labels.sql")

}

main()
