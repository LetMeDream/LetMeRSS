<script setup>
    import { useFeedStore } from '../stores/storeOfMine';
    const feedStore = useFeedStore();
</script>

<template>
    <div class="main w-full h-full p-10 bg-[#edf2f4]">

        <div class="">
            <h1 v-if="feedStore.current.source">{{feedStore.current.source.name}}</h1>
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
