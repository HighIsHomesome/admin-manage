<script setup>
// Router
import { useRouter } from 'vue-router';
const router = useRouter()

const props = defineProps({
    options: {
        type: Object,
        default: () => { }
    },
    current_index: {
        type: Number,
        default: 0
    },
})
const emit = defineEmits(['update:current_option', 'edit:category'])

</script>

<template>
    <div class="options">
        <div class="Ol">
            <VanIcon @click="router.back()" name="arrow-left" size="16px" />
        </div>
        <div class="Om">
            <div class="menu">
                <template v-for="(item, index) in options" :key="index">
                    <div class=" item " :class="{ active: current_index == index }"
                        @click="emit('update:current_option', index, item)">
                        <span>{{ item }}</span>
                    </div>
                </template>
            </div>
        </div>
        <div class="Or">
            <VanIcon @click="emit('edit:category')" name="edit" size="20" />
        </div>
    </div>
</template>

<style lang="less" scoped>
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.options {
    .flex();
    justify-content: space-between;
    margin-top: 20px;

    .menu {
        .flex();
        justify-content: center;
        width: 160px;
        height: 30px;
        padding: 3px;
        color: #438883;
        background-color: #dcdada;
        border-radius: 12px;

        .item {
            .flex();
            justify-content: center;
            width: 50%;
            height: 30px;
            border-radius: 8px;
        }

        .active {
            background-color: #fff;
        }

        span {
            line-height: 24px;
        }

        .icon {
            margin-left: 10px;
        }
    }
}
</style>