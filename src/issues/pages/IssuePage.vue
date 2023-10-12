<script setup lang='ts'>
import { useRoute } from 'vue-router';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue'
import IssueCard from 'src/issues/components/issue-list/IssueCard.vue';


const route = useRoute();
const { id = '' } = route.params;



</script>

<template>
  <LoaderSpinner color="accent" size="4rem" :thickness="6" />

  <router-link class="text-white" to="/">Go Back</router-link>

  <IssueCard />

  <LoaderSpinner :show-text="false" size="1.5rem" :thickness="1" color="white" />

  <div class="column ">
    <span class="text-h4 q-mb-md">Comentario (5)</span>
    <IssueCard v-for="(item, index) in 5" :key="index"/>
  </div>

</template>

<style scoped></style>
