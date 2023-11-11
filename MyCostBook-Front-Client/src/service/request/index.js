import axios from 'axios'

import { rabbit_URL, TimeOut } from './config'

import useMainStore from '@/stores/modules/main'


class LAxios {
    constructor(baseURL, TIMEOUT) {
        this.instance = axios.create({
            baseURL,
            TIMEOUT,
        })

        this.instance.interceptors.request.use(config => {
            config.headers = {
                authorization: sessionStorage.getItem('token')
            }
            // 加载动画
            useMainStore().isShowPlaneLoading = true
            return config
        }, err => {
            return err
        })
        this.instance.interceptors.response.use(config => {
            useMainStore().isShowPlaneLoading = false
            return config
        }, err => {
            useMainStore().isShowPlaneLoading = false
            return err
        })
    }



    request(config) {
        return new Promise((resolve, reject) => {
            this.instance.request(config)
                .then((res) => {
                    resolve(res.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    post(config) {
        return this.request({ ...config, method: 'post' })
    }
    get(config) {
        return this.request({ ...config, method: 'get' })
    }
}

export default new LAxios(rabbit_URL)