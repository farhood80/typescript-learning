import { getSourceCraftEvent, type SourceCraftEvent } from "./sourcecraft.js";
import { createIssue, addComment } from "./tracker.js";
import { log, formatMarkdownLink } from "./utils.js";

async function handlePullRequest(event: SourceCraftEvent) {
  const pr = event.pullrequest;
  const summary = `PR: ${pr.title}`;
  const description = `Linked to ${formatMarkdownLink("SourceCraft PR", pr.url)}`;

  const issue = await createIssue(summary, description);
  log(`✅ Created Yandex Tracker issue: ${issue.key}`);
}

async function handleDeploy(event: SourceCraftEvent) {
  if(event.type !== "deploy") return;
  const issueKey = event.metadata?.trackerIssueKey;
  if (issueKey) {
    await addComment(issueKey, `🚀 Deployment finished with status: ${event.deploy.status}`);
    log(`💬 Comment added to issue ${issueKey}`);
  }
}

export async function main() {
  const event = await getSourceCraftEvent();

  if (event.type === "pull_request") await handlePullRequest(event);
  if (event.type === "deploy") await handleDeploy(event);
}

main().catch((err)=> {
  log("❌ Fatal error:", err);
  process.exit(1);
});