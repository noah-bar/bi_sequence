import { readFileSync } from "fs";
import LabelConvertor from "./LabelConvertor";
import { resolve } from 'path'
import dotenv from 'dotenv'

dotenv.config()

const imagePath = resolve("./data/cat.jpg")
const remoteFilename = "cat"
const labelDetectorApiUrl = process.env.LABEL_DETECTOR_API_URL
const dataObjectApiUrl = process.env.DATA_OBJECT_API_URL

async function main() {

    //upload cat image
    const uploadImageFormData = new FormData()
    const image = readFileSync(imagePath)
    uploadImageFormData.append('file', new Blob([image]))
    uploadImageFormData.append('name', remoteFilename)
    await fetch(`${dataObjectApiUrl}/upload`, {
        method: "POST",
        body: uploadImageFormData
    })

    //get cat image url
    const {url} = await fetch(`${dataObjectApiUrl}/publish/${remoteFilename}`).then(res => res.json())

    //get labels
    const labels = await fetch(`${labelDetectorApiUrl}/analyse`, {
        headers: {
            "Content-Type" : "application/json"
        },
        method: "POST",
        body: JSON.stringify({image: url})
    })
    .then(res => res.json())

    //convert labels to sql
    const sql = LabelConvertor.toSql(labels, 'labels')

    //Send sql file
    const uploadSqlFormData = new FormData()
    uploadSqlFormData.append('file', new Blob([Buffer.from(sql)]))
    uploadSqlFormData.append('name', `labels_${Math.floor(Date.now() / 1000)}.sql`)

    await fetch(`${dataObjectApiUrl}/upload`, {
        method: "POST",
        body: uploadSqlFormData
    })
}

main()
