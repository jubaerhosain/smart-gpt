// minioConfig.js
import { Client } from "minio";

const minioClient = new Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: '166OlOJnsUovc4qi0DJf',
    secretKey: 'nJEFSdcWSlnL7mQ4iBivIDKcSBrOzTCZnKeCWgh8'
});

export default minioClient;
