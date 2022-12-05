<script setup>
    import { useFeedStore } from '../stores/storeOfMine';
    import { storeToRefs } from 'pinia';
    const feedStore = useFeedStore();

    function handleClick (src){
        feedStore.loadSource(src)
    }
    const {sources} = storeToRefs(feedStore)

</script>

<template>
    <div class="sidebar bg-[#8d99ae] self-stretch justify-self-stretch flex flex-col pt-10 gap-2">
        <div v-for="(source,index) in feedStore.sources" :key="index" @click.prevent="()=>handleClick(source)"
            class="link hover:bg-white pl-2 py-2 transition-all cursor-pointer group">
            <a 
                class="url text-white group-hover:text-black underline transition-all" href="#">
                {{ index+1 }} {{ source.name}}
            </a>
        </div>
    </div>
</template>

<style scoped>
    .sidebar{
        grid-area: n
    }
    /* .link:hover a{
        color:black;
    }  */
</style>
