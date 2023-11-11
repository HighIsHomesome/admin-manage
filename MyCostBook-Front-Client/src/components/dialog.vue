<script setup>
// Vant
import 'vant/es/dialog/style'
// Vue
import { ref, computed, watch, onMounted, onUpdated, toRaw, getCurrentInstance } from 'vue'
// Store
import usePlanStore from '@/stores/modules/plan';
import { storeToRefs } from 'pinia';
const planStore = usePlanStore()
const { } = storeToRefs(planStore)
const props = defineProps({
    title: {
        type: String,
        default: 'Set Budget'
    },
    show: {
        type: Boolean,
        default: false,
    },
    default_placeholder: {
        type: String,
        default: '￥/月'
    },
    Close: {
        type: Function,
        default: () => { }
    },
    _amount: {
        type: String,
        default: '',
    },
})
/**
 *  变量
 */
const showDialog = computed(() => {
    return props.show
})
const placeholder = computed(() => {
    return props.default_placeholder
})
const amount = computed({
    get() {
        return props._amount
    },
    set(value) {
        emit('update:amount', value)
    }
})
/**
 *  方法
 */
const emit = defineEmits(['update:amount'])
</script>

<template>
    <div class="dialog">
        <van-dialog v-model:show="showDialog" :title="title" show-cancel-button
            confirm-button-color=" rgba(66.17, 149.81, 143.75, 1)" :before-close="Close">
            <div class="inner">
                <input tabindex="1" autofocus="autofocus" v-model="amount" :placeholder="placeholder"
                    style="width: 50%;height: 40px;background-color: #bfbfbfAA;border:0;outline: none;border-radius: 24px;" />
            </div>
            <!-- <template #title>
                                                                                                                                                                                <div>
                                                                                                                                                                                    <span>{{ title }}</span>
                                                                                                                                                                                </div>
                                                                                                                                                                            </template> -->
        </van-dialog>
    </div>
</template>

<style lang="less" scoped>
.dialog {
    .inner {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;

        input {
            position: relative;
            text-align: center;
        }

        input::-webkit-input-placeholder {
            // input::-moz-placeholder、input:-moz-placeholder 、 input:-ms-input-placeholder
            display: flex;
            justify-content: center;
            align-items: center;
            // position: absolute;
            color: #a1a1a1;
            // position: relative;
            // top: 10px;
            // right: 10px;
        }
    }
}
</style>