import { Command } from 'commander';
import dotenv from 'dotenv';
import { generateArchitecture } from './agent/orchestrator';
import { evaluatePerformance } from './metrics/evaluator';

dotenv.config();

const program = new Command();

program
  .name('ff-orchestrator')
  .description('Flutter-Firebase Schema & Logic Orchestrator AI Agent')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate Flutter-Firebase architecture from a description')
  .argument('<description>', 'Natural language description of the feature')
  .action(async (description) => {
    console.log(`\n🚀 Analyzing requirements: "${description}"...\n`);
    try {
      const result = await generateArchitecture(description);
      console.log('✅ Generation Complete!\n');
      console.log('--- FIRESTORE RULES ---');
      console.log(result.securityRules);
      console.log('\n--- FLUTTER MODELS ---');
      console.log(result.flutterModels);
      console.log('\n--- REPOSITORY LAYER ---');
      console.log(result.repositoryLayer);

      console.log('\n📊 Evaluating Performance Metrics...');
      const score = evaluatePerformance(result);
      console.log(`\n🏆 Agent Performance Score: ${score}/10000\n`);
      console.log(`Note: Score calculated based on security robustness, code quality standards (Freezed/JsonSerializable), and error handling coverage.`);
    } catch (error: any) {
      console.error('❌ Error during generation:', error.message);
    }
  });

program.parse();
