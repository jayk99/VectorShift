// submit.js
import { useStore } from "./store";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const pipelineData = {
        nodes: nodes,
        edges: edges,
      };
      formData.append("pipeline", JSON.stringify(pipelineData));

      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      const message = `Pipeline Analysis:\n
                Number of nodes: ${result.num_nodes}\n
                Number of edges: ${result.num_edges}\n
                Is a valid DAG: ${result.is_dag ? "Yes" : "No"}`;

      alert(message);
    } catch (error) {
      alert("Error submitting pipeline: " + error.message);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 ">
      <button
        onClick={handleSubmit}
        className="px-4 py-2 text-sm border border-gray-300 rounded shadow-sm 
                 bg-white hover:bg-gray-50 focus:outline-none"
      >
        Submit
      </button>
    </div>
  );
};
