import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();

const trackedFiles = execFileSync('git', ['ls-files'], {
  cwd: repoRoot,
  encoding: 'utf8',
})
  .split(/\r?\n/)
  .filter(Boolean)
  .filter((file) => {
    const normalized = file.replace(/\\/g, '/');

    return ![
      '.env',
      '.env.local',
      '.env.production',
      '.env.development',
      '.env.test',
    ].includes(normalized);
  });

const findings = [];

const envProjectIdPattern = /^[ \t]*SANITY_PROJECT_ID[ \t]*=[ \t]*([^\r\n#]*)[ \t]*$/gm;
const literalProjectIdPattern = /projectId\s*:\s*['"`]([a-z0-9-]{4,})['"`]/gi;
const envTokenPattern = /^[ \t]*SANITY_READ_TOKEN[ \t]*=[ \t]*([^\r\n#]*)[ \t]*$/gm;

for (const relativeFile of trackedFiles) {
  const absoluteFile = path.join(repoRoot, relativeFile);

  if (!existsSync(absoluteFile)) {
    continue;
  }

  let contents;

  try {
    contents = readFileSync(absoluteFile, 'utf8');
  } catch {
    continue;
  }

  for (const match of contents.matchAll(envProjectIdPattern)) {
    const value = match[1]?.trim();

    if (!value || value === '<your_sanity_project_id>' || value === '""' || value === "''") {
      continue;
    }

    findings.push(
      `${relativeFile}: hardcoded Sanity project ID "${value}" found in a tracked file.`
    );
  }

  for (const match of contents.matchAll(literalProjectIdPattern)) {
    const value = match[1]?.trim();

    if (!value) {
      continue;
    }

    findings.push(
      `${relativeFile}: hardcoded Sanity project ID "${value}" found in code.`
    );
  }

  for (const match of contents.matchAll(envTokenPattern)) {
    const value = match[1]?.trim();

    if (!value) {
      continue;
    }

    findings.push(
      `${relativeFile}: non-empty SANITY_READ_TOKEN found in a tracked file.`
    );
  }
}

if (findings.length > 0) {
  console.error('Commit blocked: remove hardcoded Sanity config values from tracked files.\n');
  for (const finding of findings) {
    console.error(`- ${finding}`);
  }
  console.error('\nUse environment files like .env.local for real values and keep placeholders in committed files.');
  process.exit(1);
}

console.log('Sanity config check passed.');
