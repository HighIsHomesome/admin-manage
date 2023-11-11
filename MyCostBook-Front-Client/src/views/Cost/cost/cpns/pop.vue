<script setup>
// Vue
import { ref, toRaw, computed } from 'vue'
// 组件
import popTabs from './cpns/pop_tabs.vue'
import popCategory from './cpns/pop_category.vue'
import popAccount from './cpns/pop_account.vue'
import popDate from './cpns/pop_date.vue'
import mydialog from '@/components/dialog.vue';
// Vant
import { showNotify } from 'vant';
import 'vant/es/notify/style'
// Util
import { createURLObj } from '@/utils'
import dayjs from 'dayjs'
// router
import { useRoute } from 'vue-router'
// Store
import { storeToRefs } from 'pinia'
import useMainStore from '@/stores/modules/main'
import useCenterStore from '@/stores/modules/center';
import useCostStore from '@/stores/modules/cost'
// Store - - Login
const mainStore = useMainStore()
const { user } = storeToRefs(mainStore)
// Store - - Center
const centerStore = useCenterStore()
const { add_category_info } = storeToRefs(centerStore)
// Store - - Cost
const costStore = useCostStore()
const { obj, add_bill_info, show, popUp_account, type, transform_bill_info } = storeToRefs(costStore)
// 路由
const route = useRoute()
// 保留两位小数
function keepTwoDecimalStr(num) {
    const result = Number(num.toString().match(/^\d+(?:\.\d{0,2})?/));
    let s = result.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return Number(s);
};

/**
 * Tabs
 */
const active = ref('Expense')


/**
 * 开关
 */
const isShowOutAccount = ref(false)
const isShowSelectAccount = ref(false)   //开关 -- 账户选择器
const isShowSelectCategory = ref(false)  //开关 -- 类别选择器
const showDataSelect_PopUp = ref(false)       //开关 -- 日期选择器


/**
 * Form -- 用户选择
 */
// 默认值 
const Text_category = ref('选择分类')  //绑定类别选择器 -- Placeholder
const text_select_account_out = ref('选择转出账户')   // 绑定选择账户的 -- Placeholder
let text_select_account = computed({    // 绑定选择账户的 -- Placeholder
    get() {
        if (active.value == 'Expense' || active.value == 'Income') return `${popUp_account.value[0].name}`
        else if (active.value == 'transform') return '选择转入账户'
    },
    set(value) { return value }

})
const select_date = ref('今日')  // 绑定日期选择器 -- Placeholder

// 信息
const Plus_or_Subtract = computed(() => {    // 绑定账户选择器、数字键盘 -- 金额的正负
    if (active.value == 'Income') return '+'
    else if (active.value == 'Expense') return '-'
    else return '+'
})
// 按钮的文字
const text_submit = computed(() => {
    if (active.value == 'Expense') return 'Expense'
    if (active.value == 'Income') return 'Income'
    if (active.value == 'transform') return 'Transform'
})
const amount_value = ref()   // 绑定数字键盘 -- 账单的金额
const select_account_id = ref()  // 绑定账户选择器 -- 账户ID
const select_Outaccount_id = ref()  // 绑定账户选择器 -- 账户ID
const currentDate = ref([dayjs().format('YYYY'), dayjs().format('MM'), dayjs().format('DD')])  // 日期可选择的类型


/**
 * 展示可选择数据
 */
const options_account = computed(() => {   // 账户
    return popUp_account.value
})
const items = computed({     //类别
    get() {
        return type.value[active.value]  //
    },
    set() { }
})




/**
 * 完成选择 
 */
// 一级类别
function clickNav(index) {
    // console.log(index);
}
// 二级类别
function click_category_second_item(item) {
    isShowSelectCategory.value = false
    choice_category.value = item
    Text_category.value = item.text
}
// 账户
function select_OutAccount(option, index) {
    select_Outaccount_id.value = option.id      //更新当前选择的账户ID
    text_select_account_out.value = option.name  //更新Placeholder
    isShowOutAccount.value = false
}
function selectAccount(option, index) {
    select_account_id.value = option.id      //更新当前选择的账户ID
    text_select_account = option.name  //更新Placeholder
    isShowSelectAccount.value = false
}
// 日期
function confirm_DateSelect() {
    showDataSelect_PopUp.value = false
    select_date.value = `${currentDate.value[0]}-${currentDate.value[1]}-${currentDate.value[2]}`
}


/**
 * 提交
 */

function Submit(params) {
    // 日期默认选择处理
    let date = (() => {
        if (select_date.value == '今日') { return dayjs().format('YYYY-MM-DD') }
        else { return select_date.value }
    })()
    if (text_select_account.value == popUp_account.value[0].name) {
        console.warn('默认默认默认账户');
        select_account_id.value = popUp_account.value[0].id
    }
    // 账单类型处理 : 支出or收入
    let pay_type = active.value == 'Expense' ? 2 : active.value == 'Income' ? 1 : 3
    // 
    if (pay_type == 3 && active.value == 'transform') {
        if (!select_Outaccount_id.value || !select_account_id.value) {
            showNotify({ type: 'warning', message: '参数不可为空' });
            return
        }
        else {
            transform_bill_info.value = createURLObj({ out_account_id: select_Outaccount_id.value, in_account_id: select_account_id.value, amount: amount_value.value })
            costStore.post_transform().then(data => {
                console.warn('转账成功', data);
                setTimeout(() => {
                    showNotify({ type: 'success', message: '转账成功' });
                    (() => {
                        show.value = false
                        setTimeout(() => {
                            select_date.value = '今日'
                            Text_category.value = '选择分类'
                            text_select_account_out.value = '选择转出账户'
                            text_select_account = popUp_account.value[0].name
                            select_account_id.value = 0
                            choice_category.value = {}
                            amount_value.value = undefined
                        }, 1000);
                    })();
                }, 500);
                return
            }).catch(error => {
                showNotify({ type: 'warning', message: '失败，出错了!' });
                return
            })
        }
    }
    else if (!amount_value.value || !select_account_id.value || !choice_category.value.id || !choice_category.value.text || !date) {
        showNotify({ type: 'warning', message: '参数不可为空' });
        return
    }
    else {
        /**
         * Create Form data -- 创建 post参数对象 
         * Send Request  --  发送网络请求
         */
        add_bill_info.value = createURLObj({
            pay_type,
            amount: amount_value.value,
            account_id: select_account_id.value,
            book_id: route.params.bookname.replace(':', ''),
            category_id: choice_category.value.id,
            category_name: choice_category.value.name,
            budget_mode: 0,
            date,
        })
        costStore.post_add_bill().then(data => {
            console.log(data);
            // 添加成功后处理
            const target_objIndex = obj.value.list.findIndex(_obj => {
                return _obj.date == date
            })
            const insertObj = { id: data.id, pay_type: pay_type, amount: amount_value.value, date: date, category_id: choice_category.value.id, category_name: choice_category.value.name }
            if (target_objIndex !== -1) {
                console.log('找到targetIndex');
                obj.value.list[target_objIndex].bills.unshift(insertObj)
                if (pay_type == 1) {
                    obj.value.total_income += keepTwoDecimalStr(amount_value.value)    //修改总金额
                }
                else if (pay_type == 2) {
                    obj.value.total_expense += keepTwoDecimalStr(amount_value.value)    //修改总金额
                }
                setTimeout(() => { showNotify({ type: 'success', message: '添加账单成功' }); }, 500);
                // 修改预算
                user.value.userInfo.currentBudget = user.value.userInfo.currentBudget - amount_value.value
            }
            else if (target_objIndex == -1) {
                // 找不到即找位置插入
                let target_arrIndex = obj.value.list.findIndex(el => {
                    console.log(el.date);
                    return dayjs(date) > dayjs(el.date)
                })
                console.warn(target_arrIndex, obj.value.list[target_arrIndex], obj.value.list)
                obj.value.list.splice(target_arrIndex, 0, {
                    date: date,
                    bills: [insertObj]
                })
                if (pay_type == 1) {
                    obj.value.total_income += keepTwoDecimalStr(amount_value.value)    //修改总金额
                }
                else if (pay_type == 2) {
                    obj.value.total_expense += keepTwoDecimalStr(amount_value.value)    //修改总金额
                }
                setTimeout(() => { showNotify({ type: 'success', message: '添加账单成功' }); }, 500);
                // 修改预算
                user.value.userInfo.currentBudget = user.value.userInfo.currentBudget - amount_value.value
            }
        });
        /**
         * 还原表单初始化
         */
        (() => {
            show.value = false
            setTimeout(() => {
                select_date.value = '今日'
                text_select_account.value = '选择账户'
                Text_category.value = '选择分类'
                select_account_id.value = 0
                choice_category.value = {}
                amount_value.value = undefined
            }, 1500);
        })();
    }


    // // 
    // function _debugger() {
    //     console.group('Submit');
    //     console.log('pay_type:', pay_type)
    //     console.log('account_id:', select_account_id.value);
    //     console.log('book_id:', route.params.bookname.replace(':', ''))
    //     console.log('category_id:', choice_category.value.id);
    //     console.log('category_name:', choice_category.value.name);
    //     console.log('amount:', amount_value.value);
    //     console.log('date:', date);
    //     console.groupEnd('Submit');
    // }

}


//category
const activeId = ref()
const activeIndex = ref(0)
const choice_category = ref()
/**
 * 加类别
 */
const showDialog = ref(false)
const default_placeholder = '输入二级分类名吧'
let dialog_title = `一级分类：`
let dialog_input = ''
function click_Add_Category() {
    showDialog.value = true  //弹出对话框 输入分类名
    dialog_title = `一级分类：${items.value[activeIndex.value].name}`
}
function watch_input(value) {
    dialog_input = value
}
function Close_dialog(action) {
    if (action == 'cancel') showDialog.value = false  //结束对话框 
    else if (action == 'confirm') {
        const first_type_id = items.value[activeIndex.value].id
        // undefined 
        add_category_info.value = createURLObj({ name: dialog_input, type_id: first_type_id, avator: '' })
        // 
        centerStore.Post_addCategory(first_type_id, active.value == 'Expense' ? 'Expend' : 'Income', true)
            .then((id) => {
                // 页面中修改View
                console.warn(id);
                if (typeof items.value[activeIndex.value].children == 'undefined') {
                    console.log('该二级分类为空！');
                    items.value[activeIndex.value].children = []
                    items.value[activeIndex.value].children.push({
                        id: id,
                        name: dialog_input,
                        text: dialog_input,
                        type_id: first_type_id,
                        avatar: ''
                    })
                }
                else {
                    items.value[activeIndex.value].children.push({
                        id: id,
                        text: dialog_input,
                        name: dialog_input,
                        type_id: first_type_id,
                        avatar: ''
                    })
                }
                // 成功提示
                showNotify({ type: 'success', message: '添加类别成功' });
                showDialog.value = false
            })
        // 
        // console.warn(toRaw(items.value[activeIndex.value]));
        // console.warn(toRaw(items.value[activeIndex.value].children));

    }
}

/**
 * 转账
 * 
 *
 */


</script>

<template>
    <div class="pop">
        <!-- 主页面 -->
        <van-popup v-model:show="show" position="bottom" :style="{ padding: '58px 30px', height: '100%' }" closeable
            close-icon-position="top-left">
            <!-- 切换 支出 收入 转帐 -->
            <popTabs @update:ActiveTabs="data => active = data" />
            <!-- 用户选择 -->
            <div class="content">
                <!-- 类别选择器 -->
                <popCategory @ShowPopUp:select_outAccount="isShowOutAccount = true"
                    :text_select_account_out="text_select_account_out" :active_tab="active"
                    @ShowPopUp:category="isShowSelectCategory = true" :Text_category="Text_category" />
                <!-- 账户选择器  -->
                <popAccount :amount_value="amount_value" :Plus_or_Subtract="Plus_or_Subtract"
                    :text_select_account="text_select_account" @ShowPopUp:account="isShowSelectAccount = true" />
                <!-- 日期选择器 -->
                <popDate :select_date="select_date" @ShowPopUp:date="showDataSelect_PopUp = true" />
                <!-- 提交按钮 -->
                <div class="cost-popUp-box submit" @click="Submit"><span v-html="text_submit"></span></div>
                <!-- 数字键盘（计算器） -->
                <div class="calculator">
                    <van-number-keyboard v-model="amount_value" :show="show" title=" " extra-key="." @blur="show = false"
                        :hide-on-click-outside=false :afe-area-inset-bottom=false />
                </div>
            </div>
            <!-- PopUp -->
            <!-- PopUp -->
            <!-- PopUp -->
            <!-- 选择分类 PopUp弹出层 -->
            <van-popup v-model:show="isShowSelectCategory" round position="bottom"
                :style="{ padding: '58px 30px', height: '62%' }" closeable close-icon-position="top-left">
                <div @click="click_Add_Category" id="Select-category-addbtn-icon"><van-icon size="22" name="add" />
                </div>
                <van-tree-select @click-nav="clickNav" @click-item="click_category_second_item" height="450"
                    v-model:active-id="activeId" v-model:main-active-index="activeIndex" :items="items">
                </van-tree-select>
            </van-popup>
            <!-- 圆角弹窗（底部） -->
            <van-popup v-model:show="showDataSelect_PopUp" round position="center"
                :style="{ height: '30%', width: '100%', }">
                <van-date-picker v-model="currentDate" title="选择日期" @confirm="confirm_DateSelect"
                    @cancel="showDataSelect_PopUp = false" />
            </van-popup>
            <!-- 弹出对话框 添加类别-->
            <mydialog @update:amount="watch_input" :title=dialog_title :show="showDialog"
                :default_placeholder="default_placeholder" :Close="Close_dialog">
            </mydialog>
            <!-- 选择账户 -->
            <van-share-sheet :options="options_account" @select="select_OutAccount" title="选择转出账户"
                v-model:show="isShowOutAccount" />
            <van-share-sheet :options="options_account" @select="selectAccount" title="选择账户"
                v-model:show="isShowSelectAccount" />
        </van-popup>
    </div>
</template>

<style lang="less" scoped>
.pop {
    .content {
        display: flex;
        flex-direction: column;

        .submit {
            // padding: 0 15px;

            position: absolute;
            left: 135px;
            top: 385px;
            width: 150px;
            height: 50px;
            border-radius: 48px;
            background-color: #5e10bf;
            color: aliceblue;
            display: flex;
            justify-content: center;
            align-items: center;

            span {
                font-size: 16px;
                font-weight: 600;
                text-shadow: 0 5px 5px #9e6cd8;
                position: relative;
                right: 2px;
            }
        }

    }
}

#Select-category-addbtn-icon {
    display: flex;
    justify-content: flex-end;
}
</style>