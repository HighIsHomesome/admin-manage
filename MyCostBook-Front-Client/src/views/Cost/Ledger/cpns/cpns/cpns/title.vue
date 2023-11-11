<script setup>

const emit = defineEmits(['update:scrooTo'])

</script>

<template>
    <div class="title"><span>Deposit Detail</span>
        <div class="icon"><img @click="emit('update:scrooTo')" src="@/assets/img/home/SavePlan/shangxiafanjiantou.svg"
                alt="">
        </div>
    </div>
</template>

<style lang="less" scoped>
.title {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        font-weight: 700;
        font-size: 24px;
    }

    .icon {
        padding: 5px;
        background-color: #e8e8e8AA;
        border-radius: 50px;

        img {
            width: 35px;
            height: 35px;
        }
    }
}
</style>