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
    <div class="main-container min-h-[100vh] flex">
        
        <Sidebar class="side hidden md:block" />
        <div class="content grow flex flex-col">
            <Header :suggestion="suggestion"/>
            <Post @click-suggested="handleSuggestion" />
        </div>


    </div>
</template>

<style scoped>

    /* .main-container{
        max-height: 100vh;
        grid-template-rows: 120px 1fr;
        grid-template-columns: 200px 1fr;
        grid-template-areas: 
        " h h h h "
        " p p p p"
        " p p p p"
        " p p p p"
        " p p p p";
    } */


</style>