<script setup>
    import { useFeedStore } from '../stores/storeOfMine';
    import { storeToRefs } from 'pinia';
    import { ref } from 'vue';
    const feedStore = useFeedStore();

    function handleClick (src){
        feedStore.loadSource(src)
    }
    const {sources} = storeToRefs(feedStore);

    const isExpanded = ref(true);
    const showText = ref(true);
    const toggleAppearance = () => {
        let time;
        time = !isExpanded.value ? 290 : 0
        isExpanded.value = !isExpanded.value
        setTimeout(()=>{
            showText.value = !showText.value
        },
        time)
    }

</script>

<template>
    <div 
        :class="[isExpanded ? 'expanded' : 'closed']"
        class="sidebar bg-[#8d99ae] self-stretch justify-self-start px-4 min-w-[240px] flex flex-col pt-8 gap-2 relative">
        <button
            @click="toggleAppearance"
            class="border shadow-md rounded border-[#2b2d42] min-w-min absolute right-2 px-3 p-1 hover:bg-[#2b2d42]  caret-transparent hover:text-white"
        >
            {{ isExpanded ? 'Close' : 'Open' }}
        </button>
        <div class="mt-10">
            <div v-for="(source,index) in feedStore.sources" :key="index" @click.prevent="()=>handleClick(source)"
            class="link hover:bg-white pl-2 py-2 transition-all cursor-pointer group"
            :class="[!isExpanded?'text-center pl-[0px]':'']"    
            >
            <a 
                class="url text-white group-hover:text-black underline transition-all" href="#">
                <span class="caret-transparent">{{ index+1 }}</span>  <span v-if="showText">{{ source.name}}</span>
            </a>
        </div>
        </div>
        
    </div>
</template>

<style scoped>
    .sidebar{
        transition: all .3s !important;
    }
    .closed{
        width: 80px;
        min-width: 80px;
    }
</style>
