<script setup lang='ts'>
import { useIssueStore } from 'src/stores/issues';

const issueStore = useIssueStore();



</script>

<template>
  <q-btn-toggle v-model="issueStore.state" toggle-color="primary" push spread :options="[
    { label: 'All', value: '' },
    { label: 'Open', value: 'open' },
    { label: 'Closed', value: 'closed' }
  ]" />
</template>

<style scoped></style>
