import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const workflowPath = path.join(root, '.github/workflows/publish-theme-repo.yml');
const docsPath = path.join(root, 'docs/deployer-for-git.md');

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

assert(fs.existsSync(workflowPath), '.github/workflows/publish-theme-repo.yml exists');
assert(fs.existsSync(docsPath), 'docs/deployer-for-git.md exists');

const workflow = read(workflowPath);
assert(/name:\s*Publish Theme Repository/.test(workflow), 'workflow has a clear publish name');
assert(/push:\s*\n\s*branches:\s*\n\s*-\s*main/.test(workflow), 'workflow runs on pushes to main');
assert(/workflow_dispatch:/.test(workflow), 'workflow can be run manually');
assert(/node scripts\/build-luxureat-theme\.mjs/.test(workflow), 'workflow builds the WordPress theme');
assert(/node tools\/verify-theme\.mjs/.test(workflow), 'workflow verifies the built theme');
assert(/THEME_REPO_DEPLOY_KEY:\s*\$\{\{\s*secrets\.THEME_REPO_DEPLOY_KEY\s*\}\}/.test(workflow), 'workflow reads deploy key from GitHub Secrets');
assert(/git@github\.com:errpenk\/luxureat-wordpress-theme\.git/.test(workflow), 'workflow pushes to the theme repository');
assert(/\.publish\/theme/.test(workflow), 'workflow publishes only the built theme folder');
assert(/rsync\s+-a\s+--delete/.test(workflow), 'workflow mirrors the built theme into the publish worktree');
assert(!/BEGIN OPENSSH PRIVATE KEY|BEGIN RSA PRIVATE KEY/.test(workflow), 'workflow does not contain a private key');
assert(!/password\s*[:=]/i.test(workflow), 'workflow does not contain a password');

const docs = read(docsPath);
assert(docs.includes('Deployer for Git'), 'docs name the WordPress plugin');
assert(docs.includes('errpenk/luxureat-wordpress-theme'), 'docs include the theme repository name');
assert(docs.includes('Install Theme'), 'docs explain which plugin page to use');
assert(docs.includes('main'), 'docs mention the branch to install');

if (failures.length) {
  console.error(`Theme repo publish workflow verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Theme repo publish workflow verification passed for ${workflowPath}`);
