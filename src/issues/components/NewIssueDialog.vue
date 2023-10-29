<script setup lang="ts">
import { ref,watch } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import useIssueMutation from '../composables/useIssueMutation';

interface Props{
    isOpen: boolean;
    labelsP: string[];
}

interface Emits{
    (e: 'is-open'): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const {issueMutation} = useIssueMutation()
const isOpenDialog = ref<boolean>(false);
const title = ref<string>('');
const body = ref<string>('');
const labels = ref<string[]>([]);

watch(props, () => {
    isOpenDialog.value = props.isOpen;
})

watch(() => issueMutation.isSuccess.value, (isSuccess) => {
    if (isSuccess) {
        title.value = '';
        body.value = '';
        labels.value = [];
        issueMutation.reset();
        emits('is-open');
    }

})

</script>

<template>
    <template>
        <div class="q-pa-md q-gutter-sm">
            <q-dialog v-model="isOpenDialog" position="bottom" persistent>
                <q-card style="width: 400px; ">
                    <q-form @submit="issueMutation.mutate({title, body,labels})">
                        <q-linear-progress :value="1" color="primary" />
                        <q-card-section class="column  no-wrap">
                            <div>
                                <div class="text-weight-bold">New Issue</div>
                                <div class="text-grey">Add new issue with labels</div>
                            </div>

                            <q-space />
                            <div>
                                <q-input dense v-model="title" filled label="Title" placeholder="Title" class="q-mb-sm" 
                                    :rules="[val => !!val || 'Field is required']"
                                />
                                <q-select dense filled v-model="labels" multiple :options="labelsP" use-chips stack-label
                                    label="Multiple Selection" class="q-mb-sm" 
                                />
                                
                                <MdEditor v-model="body" placeholder="# Markdown" language="en-US" />

                            </div>
                        </q-card-section>

                        <q-card-actions align="left">
                            <q-btn :disable="issueMutation.isLoading.value" @click="emits('is-open')" flat label="Cancel" v-close-popup color="dark" />
                            <q-space />
                            <q-btn :disable="issueMutation.isLoading.value" type="submit" flat label="Add issue"  color="dark" />

                        </q-card-actions>
                    </q-form>
                </q-card>
            </q-dialog>
        </div>
    </template>
</template>


<style scoped></style>