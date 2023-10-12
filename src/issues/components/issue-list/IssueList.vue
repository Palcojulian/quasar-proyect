<script setup lang='ts'>
import IssueCard from 'src/issues/components/issue-list/IssueCard.vue';


</script>

<template>
  <div class="row">
    <IssueCard  v-for="(item, index) in 10" :key="index" />
  </div>
</template>

<style scoped>

</style>
