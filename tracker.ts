import axios from "axios"

import {getEvVar} from "./utils.js";
const token = getEvVar("YANDEX_TOKEN");

const BASE_URL =
"https://api.tracker.yandex.net/v2";

export async function createIssuse(summary;
string,description: string) {
  const token = process.env.YANDEX_TOKEN;
  const orgId =
process.env.YANDEX_ORG_ID!;
  const queue =
process.env.YANDEX_QUEUE!;

  const response = await axios.post(
    `${BASE_URL}/issues`,
    {
      summary,
      description,
      queue,
      type: "task"
    }
    {
      headers:{
        Authorization: 'OAuth ${token}',
        "X-Org-ID":orgId,
      },
    }

  );

  return response.data;
}

export async function addComment(issuesKey:
string, text: string) {
  const token = process.env.YANDEX_TOKEN!;
  const orgId =
process.env.YANDEX_ORG_ID!;

  await axios.post(
     `${BASE_URL}/issues/${issuesKey}/
     comments`,
          {text},
          {
            headers:{
            Authorization:`OAuth ${token}`,
            "X-Org-ID": orgId,
            },
          }
   )
}

);
}