import { BaseNode } from "../components/BaseNode";

export const DatabaseNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="Database"
    inputs={[{ id: "query" }]}
    outputs={[{ id: "result" }]}
  >
    <div>Database operations</div>
  </BaseNode>
);

export const APINode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="API"
    inputs={[{ id: "request" }]}
    outputs={[{ id: "response" }]}
  >
    <div>API endpoint</div>
  </BaseNode>
);

export const FilterNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="Filter"
    inputs={[{ id: "input" }]}
    outputs={[{ id: "filtered" }]}
  >
    <div>Data filter</div>
  </BaseNode>
);

export const TransformNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="Transform"
    inputs={[{ id: "input" }]}
    outputs={[{ id: "transformed" }]}
  >
    <div>Data transformer</div>
  </BaseNode>
);

export const WebhookNode = ({ id, data }) => (
  <BaseNode
    id={id}
    title="Webhook"
    inputs={[{ id: "trigger" }]}
    outputs={[{ id: "event" }]}
  >
    <div>Webhook handler</div>
  </BaseNode>
);
