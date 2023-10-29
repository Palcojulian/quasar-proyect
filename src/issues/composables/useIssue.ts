import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { Issue } from '../interfaces/issue';

import { gitHubApi } from 'src/api/gitHubApi';
import { computed } from 'vue';

const getIssue = async (issueNumber: number): Promise<Issue> => {
    const { data } = await gitHubApi.get<Issue>(`/issues/${issueNumber}`);
    return data;
}

const getIssueComment = async (issueNumber: number): Promise<Issue[]> => {
    const { data } = await gitHubApi.get<Issue[]>(`/issues/${issueNumber}/comments`);
    return data;
} 

interface Options{
    autoload?: boolean;
}


function useIssue(issueNumber: number, options?: Options) {
    
    const {autoload = true} = options || {}

    const queryClient = useQueryClient();

    const issueQuery = useQuery(
        ['issue', issueNumber],
        () => getIssue(issueNumber),
        {
            staleTime: 1000 * 60,
            enabled: autoload
        }
    )

    const issueCommentQuery = useQuery(
        ['issue', issueNumber ,'comments'],
        // () => getIssueComment(issueNumber),
        () => getIssueComment(issueQuery.data.value?.number || 0),
        {
            staleTime: 1000 * 15,
            enabled: autoload
            // enabled: computed(() => !!issueQuery.data.value?.number)
        }
    )
    
    const prefetchIssue = (issueNumber: number) => {
        queryClient.prefetchQuery(
            ['issue', issueNumber],
            () => getIssue(issueNumber),
            {
                staleTime: 1000 * 60
            },
        );
        
        queryClient.prefetchQuery(
            ['issue', issueNumber, 'comments'],

            () => getIssueComment(issueQuery.data.value?.number || 0),
            {
                staleTime: 1000 * 15,
            }
            
        )
    }

    const setIssueCacheData = (issue: Issue) => {
        queryClient.setQueryData(
            ['issue', issue.number],
            issue,
        );

    }

    return {
        issueQuery,
        issueCommentQuery,

        prefetchIssue,
        setIssueCacheData,
    }
}

export default useIssue;