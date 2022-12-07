<script setup>
    import {ref,watch} from 'vue'
    import {useFeedStore} from '../stores/storeOfMine'
    const props = defineProps(['suggestion'])

    const feedStore = useFeedStore()
    const url = ref('')
    const handleSubmit = () => {
        if(!url) return
        feedStore.registerNewSource(url.value)
        url.value = ''
    }

    watch(()=>props.suggestion, ()=>{
        console.log('Suggestion changed to: ' + props.suggestion)
        url.value=props.suggestion
    })


</script>

<template>
    <div class="header flex justify-center items-center  justify-self-stretch self-stretch px-10 bg-[#2b2d42]">
        <form 
            @submit.prevent="handleSubmit"    
            class="form flex w-full" action="">
            <input 
                v-model="url"
                class="input px-1 border w-full border-slate-400 p-2 rounded-l-md" type="url" required>
            <button 
                class="button transition-all min-w-max bg-[#8d99ae] p-2 border border-[#8d99ae] hover:border-[#788294] rounded-r-md hover:bg-[#788294] hover:text-white" type="submit">Add source</button>
        </form>
    </div>
</template>

<style scoped>
    .header{
        grid-area: h;

    }

</style>
