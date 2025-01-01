import { useState } from "react";
import { BaseNode, createNode } from "../components/BaseNode";
import { NodeSelect } from "../components/NodeComponents";
import { MdOutlineFileDownload } from "react-icons/md";
import { VECTOR_STORE_OPTIONS, NODE_DIMENSIONS } from "../constants/constants";

const VECSTORE_NODE_CONFIG = createNode("vecStore", {
  width: NODE_DIMENSIONS.WIDE,
  inputs: [{ id: "query", label: "query", position: 128 }],
  outputs: [{ id: "results", label: "results", position: 128 }],
  showSettings: true,
});

export const VecStoreNode = ({ id, data }) => {
  const [store, setStore] = useState(data?.store || "pinecone");

  return (
    <BaseNode
      id={id}
      title="Vector Store Reader"
      icon={MdOutlineFileDownload}
      {...VECSTORE_NODE_CONFIG}
      data={data}
    >
      <div className="flex flex-col gap-4 px-1">
        <NodeSelect
          label="Vector Store"
          value={store}
          onChange={(e) => setStore(e.target.value)}
          options={VECTOR_STORE_OPTIONS}
        />
      </div>
    </BaseNode>
  );
};
