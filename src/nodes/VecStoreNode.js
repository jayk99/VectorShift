import { useState } from "react";
import { BaseNode } from "../components/BaseNode";
import { NodeSelect } from "../components/NodeComponents";
import { MdOutlineFileDownload } from "react-icons/md";

export const VecStoreNode = ({ id, data }) => {
  const [store, setStore] = useState(data?.store || "pinecone");

  const inputs = [{ id: "query", label: "query", position: 128 }];

  const outputs = [{ id: "results", label: "results", position: 128 }];

  const storeOptions = [
    { value: "pinecone", label: "Pinecone" },
    { value: "qdrant", label: "Qdrant" },
    { value: "weaviate", label: "Weaviate" },
  ];

  return (
    <BaseNode
      id={id}
      title="Vector Store Reader"
      icon={MdOutlineFileDownload}
      inputs={inputs}
      outputs={outputs}
      width="250px"
      showSettings={true}
    >
      <div className="flex flex-col gap-4 px-1">
        <NodeSelect
          label="Vector Store"
          value={store}
          onChange={(e) => setStore(e.target.value)}
          options={storeOptions}
        />
      </div>
    </BaseNode>
  );
};
