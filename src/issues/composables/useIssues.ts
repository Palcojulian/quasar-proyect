import { useQuery } from '@tanstack/vue-query';
import { Issue, State } from '../interfaces/issue';
import { gitHubApi } from 'src/api/gitHubApi';
import { useIssueStore } from 'src/stores/issues';
import { storeToRefs } from 'pinia';

const getIssues = async (labels:string[], state: State): Promise<Issue[]> => {
    const params = new URLSearchParams();

    if (state) params.append('state', state);
    
    if (labels.length > 0) {
        const labelsString = labels.join(',');
        params.append('labels', labelsString)
    }

    params.append('per_page', '10');
    const { data } = await gitHubApi.get<Issue[]>('/issues', {
        params
    })

    return data;
}




function useIssues() {

    const issuesStore = useIssueStore();
    const { labels, state} = storeToRefs(issuesStore);

    const issuesQuery = useQuery(
        ['issues', {labels, state}],
        ()=>getIssues(labels.value, state.value),
    )

    return {
        issuesQuery
    }
}

export default useIssues;