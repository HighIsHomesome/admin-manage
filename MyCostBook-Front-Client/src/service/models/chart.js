import LAxios from '../request/index'

/**
 * @returns 
 */
export function exp_Exp_Inc_Trf() {
    return LAxios.get({
        url: `chart/get_Exp_Inc_Trf`,
    })
}