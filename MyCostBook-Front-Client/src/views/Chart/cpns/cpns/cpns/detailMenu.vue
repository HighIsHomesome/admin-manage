<script setup>
// Vue
import { useRoute } from 'vue-router'

/**
* var
*/
const route = useRoute()
/**
* function
*/


</script>

<template>
    <div class="menus">
        <div class="menu">
            <div class="menuItem " :class="{ active: true }"><span>{{ route.params.ledger.replace(':', '') }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.menus {
    position: relative;
    display: flex;
    justify-content: center;
    margin: 10px 0;


    .menu {
        background-color: #dcdada;
        // 
        display: flex;
        justify-content: center;
        align-items: center;
        // 
        width: 160px;
        height: 40px;
        padding: 3px;
        // border: 1px solid #438883;
        border-radius: 12px;
        color: #438883;

        .menuItem {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 98%;
            height: 92%;
            border-radius: 10px;

            span {
                font-size: 18px;
                font-weight: 700;
            }

        }

        .active {
            background-color: #fff;
        }



    }
}
</style>