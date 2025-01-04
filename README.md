# VectorShift Technical Assessment

## Project Overview

This project implements a dynamic workflow builder for VectorShift's pipeline system. It enables users to create, customize, and validate automated AI workflows through an intuitive drag-and-drop interface.

## Technical Assessment Tasks

### 1. Node Abstraction System

Created a flexible node abstraction system in `/frontend/src/nodes` that:

- Implements a base node architecture for consistent styling and behavior
- Reduces code duplication across node types
- Enables rapid creation of new node types
- Includes demonstration of 5 custom nodes showcasing the abstraction's flexibility

### 2. UI/UX Enhancement

Implemented comprehensive styling improvements:

- Unified design system across all components
- Responsive and intuitive interface
- Consistent visual hierarchy
- Interactive animations and transitions
- Accessibility considerations

### 3. Text Node Enhancement

Advanced the Text node functionality with:

- Dynamic node resizing based on content
- Variable detection system using `{{variable}}` syntax
- Automatic input handle creation for detected variables
- Real-time handle updates

### 4. Backend Integration

Established frontend-backend communication:

- Pipeline validation through `/pipelines/parse` endpoint
- DAG (Directed Acyclic Graph) verification
- Node and edge counting
- User-friendly alert system for validation results

## Technology Stack

- React.js
- TailwindCSS
- React Flow
- FastAPI (Backend)

## Setup Instructions

1. Install dependencies:
   bash
   cd frontend
   npm install

2. Start development server:

```bash
npm start
```

3. Start backend server (separate terminal):

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## Project Structure

frontend/README.md

frontend/
├── src/
│ ├── components/ # Reusable UI components
│ ├── nodes/ # Node implementations
│ │ ├── inputNode.js
│ │ ├── outputNode.js
│ │ ├── llmNode.js
│ │ └── textNode.js
│ ├── constants/ # Configuration constants
│ └── submit.js # Backend integration
backend/
├── main.py # FastAPI backend
└── requirements.txt # Python dependencies

## Implementation Details

### Node Abstraction

- Base node component with shared functionality
- Configurable input/output handles
- Consistent styling and behavior
- Easy extension for new node types

### Styling System

- TailwindCSS for consistent design
- Responsive layouts
- Interactive states
- Accessibility features

### Text Node Features

- Content-based resizing
- Variable detection regex: `{{\s*([a-zA-Z_]\w*)\s*}}`
- Dynamic handle management
- Real-time updates

### Backend Integration

```javascript
// submit.js example
const handleSubmit = async (nodes, edges) => {
  const response = await fetch("/pipelines/parse", {
    method: "POST",
    body: JSON.stringify({ nodes, edges }),
  });
  const data = await response.json();
  alert(
    `Nodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag}`
  );
};
```

## Testing

- Run tests: `npm test`
- Coverage report: `npm test -- --coverage`

## Notes

- This implementation focuses on maintainability and extensibility
- Code follows React best practices and modern JavaScript conventions
- Emphasis on user experience and visual consistency
- Built with scalability in mind for future enhancements

## Future Improvements

- Additional node types
- Enhanced variable handling
- Advanced pipeline validation
- More interactive feedback
- Performance optimizations

## Submission

This project was completed as part of VectorShift's technical assessment, demonstrating proficiency in:

- React component architecture
- UI/UX design
- State management
- Backend integration
- Code organization and documentation

---

For any questions or clarifications, please contact [Jayakrishna] at [jayakrishhna.v@gmail.com]
