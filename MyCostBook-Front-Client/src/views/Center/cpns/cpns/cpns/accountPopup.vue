<script setup>
import { computed } from 'vue';

const emit = defineEmits(['click:overlay', 'submit', 'close:clearPopup', 'update:subMitName', 'update:subMitAmount'])

const props = defineProps({
    subMit: {
        type: Object,
        default: () => { }
    },
    showPopUpBottom: {
        type: Boolean,
        default: false
    },
    text_popupTtile: {
        type: String,
        default: ''
    },
})

const _showPopUpBottom = computed(() => {
    return props.showPopUpBottom
})

</script>

<template>
    <van-popup @click-overlay="emit('click:overlay')" class="popup" @close="emit('close:clearPopup')"
        v-model:show="_showPopUpBottom" position="bottom" :style="{ height: '30%' }" round>
        <div class="inner">
            <div class="banner">
                <div class="left"><van-icon name="arrow-left" size="22" /></div>
                <div class="middle">
                    <h2 v-html="text_popupTtile"></h2>
                </div>
            </div>
            <div class="conten">
                <div class="box icon">
                    <img src="https://s2.loli.net/2023/02/10/cZkBewG65J3SjHr.png" alt="">
                    <div class="iright">
                        <div class="name type">
                            <input @input="emit('update:subMitName', $event.target.value)" type="text" :value="subMit?.name"
                                placeholder="&ensp; Please enter a account name">
                        </div>
                        <div class="amount type">
                            <input @input="emit('update:subMitAmount', $event.target.value)" :value="subMit?.amount"
                                placeholder="&ensp; amount">
                        </div>
                    </div>
                </div>
                <div class=" box submit">
                    <div class="btn" @click="emit('submit')">
                        <van-icon name="success" size="36" />
                    </div>
                </div>
            </div>
        </div>
    </van-popup>
</template>

<style lang="less" scoped>
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup {
    &.webkit-scroll {
        display: none;
    }

    .inner {
        padding: 10px;

        .banner {
            display: grid;
            grid-template-columns: 1fr 2.3fr 1fr;

            .left {
                display: flex;
                align-items: center;
            }

            .middle {
                display: flex;
                justify-content: center;

            }
        }

        .conten {
            padding: 30px 10px 0 10px;

            .icon {
                display: flex;

                img {
                    background-color: #bfbfbfAA;
                    border-radius: 50px;
                    width: 100px;
                }

                .iright {
                    .flex();
                    flex-direction: column;
                    margin-left: 20px;

                    input {
                        width: 60vw;
                        height: 40px;
                        margin-bottom: 10px;
                        text-align: center;
                        border-radius: 24px;
                        background-color: #bfbfbfDD;
                        border: 0;
                        outline: none;
                    }
                }
            }



            .submit {
                display: flex;
                justify-content: flex-end;

                .btn {
                    width: 100px;
                    height: 50px;
                    border-radius: 24px;
                    background-color: #429690;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
}
</style>