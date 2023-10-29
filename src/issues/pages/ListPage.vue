<script setup lang='ts'>
import { computed, ref } from 'vue';
import useIssues from '../composables/useIssues';
import useLabels from '../composables/useLabels';

import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue'
import FilterSelector from 'src/issues/components/filter-selector/FilterSelector.vue';
import IssueList from 'src/issues/components/issue-list/IssueList.vue'
import FloatingButton from '../components/FloatingButton.vue';
import NewIssueDialog from '../components/NewIssueDialog.vue';

interface Button {
    color: string;
    icon: string;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    action: () => void;
}

const { issuesQuery } = useIssues();
const { labelsQuery } = useLabels();

const isOpenDialog = ref<boolean>(false);

const openDialog = () => {
    isOpenDialog.value = true;
}


const buttons:Button[] = [
    {
        color: 'accent',
        icon: 'add',
        size: 'lg',
        action: openDialog,
    },
]

</script>

<template>
    <div class="row q-mb-md">
        <div class="col-12">
            <span class="text-h4">GitHub Page</span>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-12 col-md-4">
            <!-- TODO FILTROS -->
            <!-- Filter Selector -->
            <FilterSelector />
        </div>

        <div class="col-xs-12 col-md-8">
            <!-- TODO LOADER  -->
            <LoaderSpinner v-if="issuesQuery.isLoading.value" color="accent" size="4rem" :thickness="6"/>
            <!-- TODO ISSUE LIST ARRAY ISSUE CARD -->
            <IssueList v-else :issues="issuesQuery.data.value || []"/>
        </div>
    </div>

    <!-- floating buttons -->
    <FloatingButton :buttons="buttons"/>

    <!-- NewIssueDialog -->
    <NewIssueDialog
        v-if="labelsQuery.data" 
        :labels-p="labelsQuery.data.value?.map(label=>label.name) || []" 
        :is-open="isOpenDialog" 
        @is-open="isOpenDialog = false"
    />

</template>

<style scoped>

</style>
