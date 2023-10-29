<script setup lang='ts'>
import { useRoute } from 'vue-router';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue'
import IssueCard from 'src/issues/components/issue-list/IssueCard.vue';
import useIssue from '../composables/useIssue';
import { Issue } from '../interfaces/issue';


const route = useRoute();
const { id = '' } = route.params;
const { issueQuery, issueCommentQuery } = useIssue(+id );


</script>

<template>
  <router-link class="text-white" to="/">Go Back</router-link>

  <LoaderSpinner v-if="issueQuery.isLoading.value" :show-text="false" size="1.5rem" :thickness="1" color="white" />
  <IssueCard v-else-if="issueQuery.data.value" :issue="issueQuery.data.value"/>
  <p v-else>Issue with Id {{ id }} no found</p>

  <LoaderSpinner v-if="issueCommentQuery.isLoading.value" :show-text="false" size="1.5rem" :thickness="1" color="white" />
  <div v-else-if="issueCommentQuery.data.value" class="column ">
    <span class="text-h4 q-mb-md">Comentarios {{ issueCommentQuery.data.value.length || 0 }}</span>
    <IssueCard v-for="(comment, index) in issueCommentQuery.data.value" :key="index" :issue="comment"/>
  </div>

</template>

<style scoped></style>
