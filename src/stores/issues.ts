import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { State } from 'src/issues/interfaces/issue';

export const useIssueStore = defineStore('issues', () => {
  const state = ref<State>(State.All);
  const labels = ref<string[]>([]);

  return {
    //state
    state,
    labels,

    //getters


    //actions

    toggleLabel(labelName: string) {
      if (labels.value.includes(labelName)) {
        labels.value = labels.value.filter(label => label !== labelName);
        return;
      }
      labels.value.push(labelName);
    }

  }

})
