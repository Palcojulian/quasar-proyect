import { useQuery } from "@tanstack/vue-query"
import { gitHubApi } from "src/api/gitHubApi"
import { Label } from "../interfaces/labels";
import { useIssueStore } from "src/stores/issues";
import { computed } from "vue";
import { storeToRefs } from "pinia";

const getLabels = async (): Promise<Label[]> => {
    const {data} = await gitHubApi<Label[]>('/labels?per_page=100')
    return data;
}




const useLabels = () => {
    
    const issueStore = useIssueStore()
    // const { labels} = storeToRefs(issueStore); => manera de traer la informacion del store sin que este pierda reactividad

    const labelsQuery = useQuery(
        ['labels'],
        getLabels,
        {
            staleTime: 1000 * 60 * 60
        }
    );

    return {
        labelsQuery,

        selectedLabels: computed(() => issueStore.labels),

        //Methods
        toggleLabel: issueStore.toggleLabel
    }
}

export default useLabels;