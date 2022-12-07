<script setup>
    import Post from './Post.vue';
    import Header from './Header.vue';
    import Sidebar from './Sidebar.vue';
    import {ref} from 'vue'
    const suggestion = ref('')
    const handleSuggestion = (suggest) =>{
        suggestion.value = suggest;
    }

</script>

<template>
    <div class="main-container min-h-[100vh] grid place-items-center">
        <Header :suggestion="suggestion"/>
        <Sidebar/>
        <Post @click-suggested="handleSuggestion" />

    </div>
</template>

<style scoped>

    .main-container{
        max-height: 100vh;
        grid-template-rows: 120px 1fr;
        grid-template-columns: 200px 1fr;
        grid-template-areas: 
        " n h h h h "
        " n p p p p"
        " n p p p p"
        " n p p p p"
        " n p p p p";
    }

</style>