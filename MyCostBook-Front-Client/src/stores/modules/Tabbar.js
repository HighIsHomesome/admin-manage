import { defineStore } from 'pinia'

// 一个对象
const tabbar = {
    state: () => (
        // state函数返回一个对象，对象里的属性都是全局变量（状态）
        {
            isShowBigButton: false,
            isShowBoundaries: true,
            current_index: 0,
            tabBar: [
                {
                    img: 'home.png',
                    text: 'Ledger',
                    activeimg: 'home_active.png',
                    JumpPath: '/home',
                    // style: { position: 'relative', right: '10px' }
                }, {
                    img: 'chart.png',
                    text: 'account chart',
                    activeimg: 'chart_active.png',
                    JumpPath: '/chart',
                    style: { position: 'relative', right: '0' }
                }, {
                    img: 'plan.png',
                    text: 'personal plan ',
                    activeimg: 'plan_active.png',
                    JumpPath: '/plan',
                    style: { position: 'relative', left: '0' }
                }, {
                    img: 'user.png',
                    text: '用户',
                    activeimg: 'useer_active.png',
                    JumpPath: '/center',
                },
            ],
        }
    ),
}
// 变成全局对象
const useTabBarStore = defineStore('tabbar', tabbar)
// 导出
export default useTabBarStore