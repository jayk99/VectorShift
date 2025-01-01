import { useState } from "react";
import { BaseNode, createNode } from "../components/BaseNode";
import { NodeField } from "../components/NodeComponents";
import { NODE_DIMENSIONS } from "../constants/constants";
import { SiSlack, SiGmail, SiNotion, SiDiscord } from "react-icons/si";

// Slack Node
const SLACK_NODE_CONFIG = createNode("slack", {
  width: NODE_DIMENSIONS.WIDE,
  inputs: [{ id: "message", label: "message", position: 128 }],
  outputs: [{ id: "response", label: "response", position: 128 }],
  showSettings: true,
});

export const SlackNode = ({ id, data }) => {
  const [webhook, setWebhook] = useState(data?.webhook || "");

  return (
    <BaseNode
      id={id}
      title="Slack Integration"
      icon={SiSlack}
      {...SLACK_NODE_CONFIG}
      data={data}
    >
      <div className="flex flex-col gap-4 px-1">
        <NodeField
          label="Webhook URL"
          value={webhook}
          onChange={(e) => setWebhook(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};

// Gmail Node
const GMAIL_NODE_CONFIG = createNode("gmail", {
  width: NODE_DIMENSIONS.WIDE,
  inputs: [
    { id: "subject", label: "subject", position: 85 },
    { id: "body", label: "body", position: 170 },
  ],
  outputs: [{ id: "sent", label: "sent", position: 128 }],
  showSettings: true,
});

export const GmailNode = ({ id, data }) => {
  const [recipient, setRecipient] = useState(data?.recipient || "");

  return (
    <BaseNode
      id={id}
      title="Gmail Integration"
      icon={SiGmail}
      {...GMAIL_NODE_CONFIG}
      data={data}
    >
      <div className="flex flex-col gap-4 px-1">
        <NodeField
          label="Recipient Email"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};

// Notion Node
const NOTION_NODE_CONFIG = createNode("notion", {
  width: NODE_DIMENSIONS.WIDE,
  inputs: [{ id: "content", label: "content", position: 128 }],
  outputs: [{ id: "pageId", label: "pageId", position: 128 }],
  showSettings: true,
});

export const NotionNode = ({ id, data }) => {
  const [pageId, setPageId] = useState(data?.pageId || "");

  return (
    <BaseNode
      id={id}
      title="Notion Integration"
      icon={SiNotion}
      {...NOTION_NODE_CONFIG}
      data={data}
    >
      <div className="flex flex-col gap-4 px-1">
        <NodeField
          label="Page ID"
          value={pageId}
          onChange={(e) => setPageId(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};

// Discord Node
const DISCORD_NODE_CONFIG = createNode("discord", {
  width: NODE_DIMENSIONS.WIDE,
  inputs: [{ id: "message", label: "message", position: 128 }],
  outputs: [{ id: "sent", label: "sent", position: 128 }],
  showSettings: true,
});

export const DiscordNode = ({ id, data }) => {
  const [webhook, setWebhook] = useState(data?.webhook || "");

  return (
    <BaseNode
      id={id}
      title="Discord Integration"
      icon={SiDiscord}
      {...DISCORD_NODE_CONFIG}
      data={data}
    >
      <div className="flex flex-col gap-4 px-1">
        <NodeField
          label="Webhook URL"
          value={webhook}
          onChange={(e) => setWebhook(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};
