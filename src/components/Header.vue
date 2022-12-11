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

    /* Responsive nav */
    const isOpen = ref(false)
    const toggle = () => {
        isOpen.value = !isOpen.value
    }
    /* Responsive nav end */

    const handleClick = (source) => {
        /* console.log(source); */
        feedStore.loadSource(source);
        isOpen.value = !isOpen.value;
    }

</script>

<template>
    <div class="header flex justify-between md:justify-center gap-1 items-center self-stretch px-8 py-6 md:px-10 bg-[#2b2d42] relative over">
        <form 
            @submit.prevent="handleSubmit"    
            class="form flex md:w-full" action="">
                <div class="input flex w-full ">

                    <input 
                        v-model="url"
                        class="input px-1 border w-full border-slate-400  rounded-l-md" type="url" required>
                    <button 
                    class="button transition-all min-w-max bg-[#8d99ae] p-1 border border-[#8d99ae] hover:border-[#788294] rounded-r-md hover:bg-[#788294] hover:text-white" type="submit">Add source</button>

                </div>
        </form>
        
        <button 
            :class="[isOpen ? 'active' : '']" @click="toggle"
            class="smallNav md:hidden  text-white flex flex-col gap-[4px] justify-center self-stretch caret-transparent px-3 py-1 rounded-md border border-white">
                <div class="line h-[3px] bg-white w-[30px] rounded-lg transition duration-1000"></div>
                <div class="line h-[3px] bg-white w-[30px] rounded-lg transition duration-1000"></div>
                <div class="line h-[3px] bg-white w-[30px] rounded-lg transition duration-1000"></div>
        </button>
        <nav 
            class="menu block gap-1 md:hidden pt-4 absolute bg-white min-w-[50%] left-0 top-[82.5px] z-10 "
            :class="[isOpen ? 'active' : '']">
            
            <ol class="flex flex-col gap-1">
                <li 
                    class="bg-[#8d99ae] w-full p-2 cursor-pointer hover:text-white hover:underline"
                    v-for="source in feedStore.sources" :key="source.id"
                    @click="()=>handleClick(source)" >
                    <a class="link ">{{ source.name }}</a>
                </li>

            </ol>
        </nav>
    </div>
</template>

<style scoped>
    .header{
        height: 80.5px;
    }
    .menu{
        height: calc(100vh - 82.5px);
        transform:translateX(-100%);
        transition:all 1s;
    }
    .menu.active{
        transform: translateX(0);
    }

    .active .line:nth-child(1){
        transform: rotate(45deg) translate(6px, 4px);
        width:25.5px;
        transition: all .5s;
    }
    .active .line:nth-child(2){
        transform:scaleX(0);
        transition: all .4s;
    }
    .active .line:nth-child(3){
        transform: rotate(-45deg) translate(6px, -4px);
        width:25.5px;
        transition: all .5s;
    }


</style>
