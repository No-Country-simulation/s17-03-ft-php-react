import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  // Initialize Husky
  execSync('npx husky', { stdio: 'inherit' });

  // Create .husky directory if it doesn't exist
  const huskyDir = path.join(__dirname, '.husky');
  if (!fs.existsSync(huskyDir)) {
    fs.mkdirSync(huskyDir);
  }

  // Create commit-msg hook for Commitlint
  const commitMsgPath = path.join(huskyDir, 'commit-msg');
  const commitMsgHook = `npx commitlint --edit || { echo 'The commit message does not meet the requirements. Look at "commitlint.config.js" file.'; exit 1; }`;
  fs.writeFileSync(commitMsgPath, commitMsgHook);

  // Create pre-commit hook
  const preCommitPath = path.join(huskyDir, 'pre-commit');
  const preCommitHook = `npx lint-staged`;
  fs.writeFileSync(preCommitPath, preCommitHook);

  // Create pre-push hook
  const prePushPath = path.join(huskyDir, 'pre-push');
  const prePushHook = `npx tsc || { echo 'Type checking failed. Push aborted.'; exit 1; }
npx jest --detectOpenHandles --passWithNoTests || { echo 'Tests failed. Push aborted.'; exit 1; }`;
  fs.writeFileSync(prePushPath, prePushHook);

  // Make hooks executable
  if (process.platform !== 'win32') {
    execSync(`chmod +x ${commitMsgPath}`, { stdio: 'inherit' });
    execSync(`chmod +x ${preCommitPath}`, { stdio: 'inherit' });
    execSync(`chmod +x ${prePushPath}`, { stdio: 'inherit' });
  }

  console.log('Husky has been set up with a commit-msg, pre-commit and pre-push hook');
} catch (error) {
  console.error('Error setting up Husky:', error);
  process.exit(1);
}
