import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { Issue } from "../interfaces/issue"
import { gitHubApi } from "src/api/gitHubApi";

interface Args{
    title: string;
    body?: string;
    labels?: string[];
}




const addIssue = async ({title, body = '', labels = []}: Args): Promise<Issue> => {

    const newIssueData = { title, body, labels };
    const { data } = await gitHubApi.post<Issue>('/issues', newIssueData);

    console.log({ DataFromGitHub: data });
    return data;
}




function useIssueMutation() {
    
    const queryClient = useQueryClient();

    const issueMutation = useMutation(addIssue, {
        onSuccess: (issue) => {
            //Cuando termina con success
            queryClient.invalidateQueries({
                queryKey: ['issues'],
                exact: false,
            });
            
            queryClient.refetchQueries(
                ['issues'],
                {
                    exact: false
                }
            );

            queryClient.setQueryData(
                ['issue', issue.number],
                issue
            )


            
        },
        onSettled: () => {
            //Cuando termina con error o success
        }


    })
    

    return {
        issueMutation
    }
}

export default useIssueMutation;