<script setup lang='ts'>
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useLabels from 'src/issues/composables/useLabels'
const { labelsQuery, toggleLabel, selectedLabels } = useLabels();

const { data, isLoading } = labelsQuery;

</script>

<template>
    <div class="q-my-md">
        <template v-if="isLoading">
            <LoaderSpinner color="negative" size="3rem" :thickness="6" :show-text="false" />
        </template>
        <q-chip v-else v-for="(label) in data" :key="label.id" 
            :style="{ color: `#${label.color}` }"
            class="glossy" 
            :outline="!selectedLabels.includes(label.name)" 
            clickable 
            @click="toggleLabel(label.name)">
            {{ label.name }}
        </q-chip>
    </div>
</template>

<style scoped></style>