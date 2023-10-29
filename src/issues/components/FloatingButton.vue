<script setup lang="ts">

interface Button{
    color: string;
    icon: string;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    action: () => void;
}

const props = defineProps<{ buttons: Button[] }>();

</script>
<template>
    <div class="fab">
        <q-btn
            v-for="(button, index) in buttons" :key="index"
            round 
            :color="button.color" 
            :icon="button.icon" 
            :size="button.size"
            @click="button.action"
           class="q-mr-sm"
        />
    </div>
</template>


<style scoped>
.fab{
    position: fixed;
    bottom: 30px;
    right: 30px;
}


</style>