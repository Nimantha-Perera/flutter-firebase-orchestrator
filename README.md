# Flutter-Firebase Schema & Logic Orchestrator 🤖

This is an AI-first development agent specifically designed to solve the workflow bottleneck when generating highly repetitive yet critical Flutter-Firebase boilerplate. 

## 1. Problem Specialization
**Why this problem?** Mobile developers spend countless hours syncing Firebase Firestore rules with Flutter client code (Models & Repositories). When database schemas change, updating Freezed models, parsing logic, and Security Rules is an error-prone task. 
**Why was this the #1 priority?** By automating this orchestration, we transform AI from a "support tool" to the **primary development tool** that architects the infrastructure simultaneously, saving days of manual configuration.

## 2. Cursor-Based Setup
This repository is 100% Cursor-ready. It includes a `.cursorrules` file that configures Cursor to behave as the Orchestrator, prioritizing security and modern Flutter practices.

## 3. Security Requirements
- **No hardcoded secrets:** This project uses the `dotenv` library. API keys are safely managed via `.env`.
- **Security First Generation:** The agent is heavily penalized (via the scoring system) if it generates insecure database rules (e.g., `allow read, write: if true;`).

## 4. Performance Metrics (1 to 10,000)
The agent self-evaluates its generation using a custom algorithm found in `src/metrics/evaluator.ts`. 
**Calculation Method:**
- **Security Posture (4,000 points):** Deducts points for insecure rules, rewards proper authentication checks.
- **Code Accuracy & Standards (4,000 points):** Enforces the usage of `freezed` and `json_serializable`, and checks for `try-catch` structures in the Repository layer.
- **Completeness (2,000 points):** Validates all 3 layers (Rules, Models, Repo) were successfully generated.

## 5. Benchmark Comparison

| Feature | Default Cursor Claude | Our Orchestrator Agent |
| :--- | :--- | :--- |
| **Output Type** | Generic, often standard classes | Strict `freezed` classes for immutability |
| **Layer Synchronization** | Often ignores tight matching of rules & models | Perfectly synchronizes Security Rules with Flutter Models |
| **Security Rules** | Basic, sometimes uses `allow read, write: if true;` | Enforces tight security, role-based checks, and auth validation |
| **Quality Assurance** | No quantifiable metric | Self-evaluates and scores output (1-10,000) for production-readiness |

## How to Run

1. Run `npm install`
2. Rename `.env.example` to `.env` and add your Gemini API Key.
3. Run the agent using the CLI:
   ```bash
   npm run build
   npm start generate "I need a social media app with Users, Posts, and Comments. Users can only edit their own posts."
   ```

## Self-Review (Appendix)
- **Strengths:** Rapid generation of synced backend/frontend layers. Real-time scoring.
- **Limitations:** Dependent on the context window limit of the LLM for extremely massive database architectures.
