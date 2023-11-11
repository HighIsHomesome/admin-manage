<script setup>
// Vue
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
// Utils
import dayjs from 'dayjs'
/**
* var
*/
const props = defineProps({
    Deposited: {
        type: Number,
        default: 0
    },
    remaining: {
        type: String || Number,
        default: 0
    },
})

const route = useRoute()

const total = ref(Number(route.query.target_money))
const persentage = computed(() => {
    return ((props.Deposited / total.value) * 100).toFixed(2)
},
)
/**
* function
*/


</script>

<template>
    <div class="infos">
        <div class="info">
            <div class="icon">
                <img src="@/assets/img/home/SavePlan/letterBook.svg" alt="">
            </div>
            <div class="_info">
                <div class="name">{{ route.query.name }}</div>
                <div class="amount">￥{{ route.query.target_money }}</div>
            </div>
            <div class="mode">
                <span>{{ route.query.period }} Day</span>
            </div>
        </div>
        <div class="progress">
            <div class="box top">
                <span>Deposited ￥{{ Deposited }}</span><span>remaining ￥{{ remaining }}</span>
            </div>
            <div class="middle">
                <div class="progresss">
                    <van-progress inactive :percentage="persentage" />
                </div>
                <span>{{ persentage }}%</span>
            </div>
            <div class="box bottom">
                <span>{{ dayjs(route.query.start_date).format('YYYY-MM-DD') }} / {{
                    dayjs(route.query['end-date']).format('YYYY-MM-DD') }}</span><span>
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.infos {
    margin-top: 25px;

    .info {
        display: grid;
        grid-template-columns: .7fr 2fr 1fr;

        .icon {
            padding: 10px;
            background-color: var(--primary--color);
            border-radius: 24px;

            img {
                width: 50px;
                height: 50px;
            }
        }

        ._info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 15px;

            .name {
                font-weight: 550;
                font-size: 18px;
            }

            .amount {
                margin-top: 10px;
                font-size: 24px;
                font-weight: 800;
                color: var(--primary--color);
            }
        }

        .mode {
            padding-bottom: 8px;
            display: flex;
            align-items: flex-end;
            flex-direction: column-reverse;

            span {
                display: block;
                display: flex;
                justify-content: center;
                padding: 2px 4px;
                width: 80px;
                border-radius: 12px;
                background-color: #429690AA;
            }
        }
    }

    .progress {
        margin-top: 25px;

        color: #484848;


        .box {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
        }

        .middle {
            display: flex;
            margin-top: 20px;

            .progresss {
                width: 92%;
                margin-right: 2px;
            }

            span {
                color: #484848;

            }
        }

    }
}
</style>