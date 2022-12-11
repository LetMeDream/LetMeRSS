<script setup>
    import { useFeedStore } from '../stores/storeOfMine';

    const feedStore = useFeedStore();
    const emits = defineEmits(['clickSuggested']);

    const handleClick = (e) => {
        emits('clickSuggested', e.target.textContent)
    }
    const resetCurrent = () => {
        feedStore.current.source = null;
        setTimeout(()=>{
            feedStore.current = {
                source:null,
                items: null
            };
        },100)
    }
</script>

<template>
    <div class="main w-full h-full p-10 bg-[#edf2f4] z-0">

        <div class="">
            <div v-if="feedStore.current.source" class="title flex justify-between mb-2">
                <h1 >{{feedStore.current.source.name}}</h1>
                <button @click="resetCurrent" class="border border-gray-400 px-4 py-2 hover:bg-gray-400 hover:text-white">Show Suggestions</button>
            </div>
            <div v-else>
                <h2>This looks rather empty</h2>
                <p>Here, try some of these options:</p><br>
                <ul>
                    <li @click="(e)=>handleClick(e)" class="list list-disc list-inside cursor-pointer hover:underline mb-2 caret-transparent">https://www.latimes.com/local/rss2.0.xml</li>
                    <li @click="(e)=>handleClick(e)" class="list list-disc list-inside cursor-pointer hover:underline mb-2 caret-transparent">https://www.theverge.com/microsoft/rss/index.xml</li>

                </ul>
                
            </div>
        </div>

        <details class="" v-for="post in feedStore.current.items" :key="post.title">
            <summary class="hover:bg-[#afbed8] cursor-pointer px-4">{{ post.title }}</summary>
            <div class="post px-8 pt-4" v-html="post.content"></div>
            <div v-if="post.link" class="post-link px-8 py-4">
                <strong>Link:</strong> {{ post.link }}
            </div>
        </details>


    </div>


</template>

<style scoped>

    .main{
        grid-area: p;
        overflow-y: scroll;
    }


</style>
<style>
    img{
        margin:0 auto !important;
        max-width: min(75%, 600px) !important;
    }
    details a{
        color:blueviolet !important;
    }
    details a:hover{
        color:blue !important;
        text-decoration: underline !important;
    }
</style>
