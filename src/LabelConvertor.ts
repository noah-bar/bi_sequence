import {Label} from "bi_label_detector";

export default class LabelConvertor {
    public static toSql(data: Label[] | Label, tableName: string) {
        if(Array.isArray(data)) {
            let lines = ""
            data.forEach(label => {
                lines += `INSERT INTO ${tableName} (description, score) VALUES ('${label.description}', ${label.score})\n`
            })
            return lines
        }
        return `INSERT INTO ${tableName} (description, score) VALUES ('${data.description}', ${data.score})\n`
    }
}
