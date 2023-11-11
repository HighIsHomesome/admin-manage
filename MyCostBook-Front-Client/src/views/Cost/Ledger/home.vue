<script setup>
import topBar from '@/components/topBar.vue';
import homeBanner from './cpns/homeBanner.vue';
import infos from './cpns/infos.vue'
import planList from './cpns/planList.vue';
// Async component
import { defineAsyncComponent } from 'vue'
const mybook = defineAsyncComponent(() =>
    import('./cpns/mybook.vue')
)

</script>
<template>
    <div class="LedgerHome">
        <topBar />
        <homeBanner />
        <infos />
        <Suspense>
            <mybook />
        </Suspense>
        <planList />
    </div>
</template>

<style lang="less" scoped>
.LedgerHome {
    position: relative;
    font-family: Inter;
    color: #cdcdcd;
    height: 100vh;
    margin-bottom: 100px;
}
</style>