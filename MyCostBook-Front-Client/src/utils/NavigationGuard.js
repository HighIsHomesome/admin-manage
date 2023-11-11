import { useRouter } from "vue-router";

function useNavigationGuard() {
    const router = useRouter()
    let isAuthenticated = false


    // 让未登录的用户跳转到登陆页面
    // 1.
    function getout() {
        // 全局前置守卫
        router.beforeEach((to, from) => {
            // return == router.push()
            // 
            if (
                !isAuthenticated     //未登录的
                &&
                to.name !== 'login'  //不是已经在登录页的
            ) {
                return '/login'
                return { name: 'login' }
                // 两种写法都可以
            }
        })
    } //放在有router的页面中
    // 2.
    function getout_async() {
        router.beforeEach(async (to, from) => {
            // canUserAccess() 返回 `true` 或 `false`
            const canAccess = await canUserAccess(to)
            if (!canAccess) return '/login'
        })
    }

    return { getout, getout_async }
}


export default useNavigationGuard

