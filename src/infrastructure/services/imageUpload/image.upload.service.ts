import { Injectable } from "@nestjs/common";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from 'uuid';
import fs, { createWriteStream }  from 'fs';
import { FileUpload } from "graphql-upload";
import stream from "stream";

import { S3Configuration } from "./s3.config";

const pathToImageUpload = process.cwd() + "\\uploads"

export interface IS3ImageUploadResponse {
    ETag: string;
    Location: string;
    key: string;
    Key: string;
    Bucket: string;
}

@Injectable()
export class S3ImageUpload {
    constructor(private s3Config: S3Configuration) { }

    private s3Object = new AWS.S3({
        credentials: {
            accessKeyId: this.s3Config.getAccessKey(),
            secretAccessKey: this.s3Config.getSecretAccessKey(),
        },
        region: this.s3Config.getRegion(),
        correctClockSkew: true,
    });

    public async doSingleImageUpload(data: any): Promise<IS3ImageUploadResponse> {

        try {
            const resp = await data.then(async (file: FileUpload) => {
                const { filename, mimetype, createReadStream } = file;

                const uploadStream = ({ Key, ContentType }) => {
                    const pass = new stream.PassThrough();
                    return {
                        writeStream: pass,
                        promise: this.s3Object.upload({
                            Bucket: this.s3Config.getBucketName(),
                            Body: pass,
                            Key,
                            ContentType,

                        }).promise(),
                    };
                }

                const { writeStream, promise } = uploadStream({
                    Key: uuidv4() + filename,
                    ContentType: mimetype
                });



                if (!fs.existsSync(pathToImageUpload)) {
                    fs.mkdirSync(pathToImageUpload);
                }

                const uploadImage = (): Promise<any> => {
                    return new Promise(async (resolve, reject) => {
                        createReadStream().pipe(createWriteStream(pathToImageUpload + `/${filename}`))
                            .on("finish", async () => {
                                // upload image to s3
                                fs.createReadStream(pathToImageUpload + `/${filename}`).pipe(writeStream)

                                await promise
                                    .then((data) => {
                                        fs.unlinkSync(pathToImageUpload + `/${filename}`)
                                        resolve(data);
                                    }).catch((err) => {
                                        fs.unlinkSync(pathToImageUpload + `/${filename}`)
                                        reject(err.message);
                                    });

                            }).on("error", (data) => reject(data))

                    })
                }

                try {
                    const data = await uploadImage()
                    console.log("Data", data)
                    return data
                } catch (err) {
                    return err;
                }

            })
            return resp;
        } catch (err) {
            return err;
        }
    }
}