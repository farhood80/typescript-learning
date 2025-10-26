export interface PullRequestEvent{
  type: "pull_request";
  pullrequest; {
   id: number;
   title:string;
   url: string;
   author?: string;
  };
}

export interface DeploymentEvent{
  type: "deploy";
  deploy: {
  id: number;
  status: string;
  url?:string;
  };
  metadata?:{
    trackerIssueKey?: string;
  };
}
export type sourceCraftEvent =
PullRequestEvent | DeployEvent;

export function getSourceCraftEvent():
SourceCraftEvent{
  const raw =
process.env.SourceCraft_Event;
  if(!raw){
    throw new Error("Missing SourceCraft_Event env variable");
  }

  try{
    return JSON.parse(raw);
    }catch(err){
     throw new Error("Failed to parse SourceCraft_Event"+ (err as Error).message);
    }
}
