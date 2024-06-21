"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AxiosClient_1 = require("./clients/AxiosClient");
const GotClient_1 = require("./clients/GotClient");
const DataService_1 = require("./services/DataService");
const flaskUrl = 'http://127.0.0.1:5000/quiz/';
const springBootUrl = 'http://localhost:8080/api/quizzes';
const axiosClient = new AxiosClient_1.AxiosClient();
const gotClient = new GotClient_1.GotClient();
const axiosDataService = new DataService_1.DataService(axiosClient);
const gotDataService = new DataService_1.DataService(gotClient);
const fetchAndLogData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Fetching data using Axios client...');
        const flaskDataWithAxios = yield axiosDataService.fetchData(flaskUrl);
        console.log('Data from Flask (Axios):', flaskDataWithAxios);
        const springBootDataWithAxios = yield axiosDataService.fetchData(springBootUrl);
        console.log('Data from Spring Boot (Axios):', springBootDataWithAxios);
    }
    catch (error) {
        console.error('Error fetching data with Axios client:', error);
    }
    try {
        console.log('Fetching data using Got client...');
        const flaskDataWithGot = yield gotDataService.fetchData(flaskUrl);
        console.log('Data from Flask (Got):', flaskDataWithGot);
        const springBootDataWithGot = yield gotDataService.fetchData(springBootUrl);
        console.log('Data from Spring Boot (Got):', springBootDataWithGot);
    }
    catch (error) {
        console.error('Error fetching data with Got client:', error);
    }
});
fetchAndLogData();
