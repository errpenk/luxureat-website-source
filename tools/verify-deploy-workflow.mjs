import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const workflowPath = path.join(root, '.github/workflows/deploy-theme.yml');
const docsPath = path.join(root, 'docs/github-actions-ssh-deploy.md');
const gitignorePath = path.join(root, '.gitignore');

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

assert(fs.existsSync(workflowPath), '.github/workflows/deploy-theme.yml exists');
assert(fs.existsSync(docsPath), 'docs/github-actions-ssh-deploy.md exists');
assert(fs.existsSync(gitignorePath), '.gitignore exists');

const workflow = read(workflowPath);
assert(/name:\s*Deploy WordPress Theme/.test(workflow), 'workflow has a clear deploy name');
assert(/push:\s*\n\s*branches:\s*\n\s*-\s*main/.test(workflow), 'workflow deploys on pushes to main');
assert(/workflow_dispatch:/.test(workflow), 'workflow can be run manually');
assert(/uses:\s*actions\/checkout@v4/.test(workflow), 'workflow checks out repository code');
assert(/node tools\/verify-theme\.mjs/.test(workflow), 'workflow verifies the generated theme before deploying');
assert(/SSH_HOST:\s*\$\{\{\s*secrets\.SSH_HOST\s*\}\}/.test(workflow), 'workflow reads SSH_HOST from GitHub Secrets');
assert(/SSH_USER:\s*\$\{\{\s*secrets\.SSH_USER\s*\}\}/.test(workflow), 'workflow reads SSH_USER from GitHub Secrets');
assert(/SSH_PORT:\s*\$\{\{\s*secrets\.SSH_PORT\s*\}\}/.test(workflow), 'workflow reads SSH_PORT from GitHub Secrets');
assert(/SSH_KEY:\s*\$\{\{\s*secrets\.SSH_KEY\s*\}\}/.test(workflow), 'workflow reads SSH_KEY from GitHub Secrets');
assert(/TARGET_DIR:\s*\$\{\{\s*secrets\.TARGET_DIR\s*\}\}/.test(workflow), 'workflow reads TARGET_DIR from GitHub Secrets');
assert(/vars\.ENABLE_THEME_DEPLOY\s*==\s*'true'/.test(workflow), 'workflow only auto-deploys after ENABLE_THEME_DEPLOY is enabled');
assert(/ssh-keyscan/.test(workflow), 'workflow records the server host key before SSH');
assert(/rsync\s+-az\s+--delete/.test(workflow), 'workflow syncs with rsync --delete');
assert(/luxureat-static\//.test(workflow), 'workflow deploys the luxureat-static directory');
assert(/wp-content\/themes\/luxureat-static/.test(workflow), 'workflow documents the intended WordPress theme path');
assert(!/BEGIN OPENSSH PRIVATE KEY|BEGIN RSA PRIVATE KEY/.test(workflow), 'workflow does not contain a private key');
assert(!/password\s*[:=]/i.test(workflow), 'workflow does not contain a password');

const docs = read(docsPath);
for (const secret of ['SSH_HOST', 'SSH_USER', 'SSH_PORT', 'SSH_KEY', 'TARGET_DIR']) {
  assert(docs.includes(secret), `deployment docs mention ${secret}`);
}
assert(docs.includes('ENABLE_THEME_DEPLOY'), 'deployment docs mention the deploy enable variable');
assert(docs.includes('ssh-keygen -t ed25519'), 'deployment docs explain how to generate a deploy key');
assert(docs.includes('authorized_keys'), 'deployment docs explain where the public key goes');
assert(docs.includes('Actions'), 'deployment docs explain where GitHub Secrets are configured');
assert(docs.includes('/var/www/vhosts/luxureat.cn/httpdocs/wp-content/themes/luxureat-static/'), 'deployment docs include the likely Plesk target path');

const gitignore = read(gitignorePath);
assert(gitignore.includes('.DS_Store'), '.gitignore excludes macOS metadata');
assert(gitignore.includes('*.zip'), '.gitignore excludes upload zip artifacts');
assert(gitignore.includes('.env'), '.gitignore excludes local env files');
assert(!gitignore.includes('luxureat-static/'), '.gitignore does not exclude the deployable theme directory');

if (failures.length) {
  console.error(`Deploy workflow verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Deploy workflow verification passed for ${workflowPath}`);
